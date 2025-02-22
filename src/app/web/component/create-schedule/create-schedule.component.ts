import { Component, inject, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { of, take, tap } from 'rxjs';

import { GetTimesAvailabelPerDaySelector } from '../../redux/bullet/bullet.selector';
import { GetUsersSelector } from '../../redux/user/user.selector';
import { GetUser } from '../../redux/user/user.action';
import { CreateSchedule } from '../../redux/schedule/schedule.action';

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.scss'],
})
export class CreateScheduleComponent {
  store: Store = inject(Store);

  users$ = this.store.pipe(select(GetUsersSelector));

  schedule?: { date: string; hour: string; user_id: number };
  timesAvailable: string[] = [];

  stepper: number[] = [1];
  userselect: number = 0;

  get quantitySteps(): number[] {
    return Array.from({ length: 4 }, (_, index) => index + 1);
  }

  get stepActive() {
    return this.stepper.length;
  }

  previousStep() {
    this.stepper.pop();
  }

  nextStep() {
    this.stepper.push(this.stepActive + 1);
  }

  setSchedule(hour: string) {
    const date = this.schedule?.date;
    const user_id = this.schedule?.user_id || 0;

    if (date) {
      this.schedule = { date, hour, user_id };
      this.store.dispatch(GetUser());
      this.nextStep();
    }
  }

  setUser(user_id: any) {
    const date = this.schedule?.date;
    const hour = this.schedule?.hour;

    if (date && hour) {
      this.schedule = { date, hour, user_id };
      this.nextStep();
    }
  }

  getBulletsBy(date: string) {
    const user_id = this.schedule?.user_id || 0;
    this.schedule = { date, user_id, hour: '' };
    this.store
      .pipe(select(GetTimesAvailabelPerDaySelector(date)))
      .pipe(take(1))
      .subscribe((dates) => (this.timesAvailable = dates));
  }

  getUser(users: any) {
    return users.find((user: any) => user.user_id === this.schedule?.user_id)
      .user_name;
  }

  getDate() {
    return new Date(`${this.schedule?.date}T03:00`).toLocaleDateString();
  }

  createSchedule() {
    if (
      !this.schedule?.date ||
      !this.schedule?.hour ||
      !this.schedule?.user_id
    ) {
      return;
    }

    this.store.dispatch(CreateSchedule(this.schedule));
  }
}
