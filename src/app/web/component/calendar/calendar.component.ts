import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subject, of } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { MonthNameEnum } from './calendar-month-name.component';

import { GetBulletsAvailable } from '../../redux/bullet/bullet.action';
import { GetErrorBullet, GetLoadingBullet, GetDatesAvailableSelector, GetTimesAvailabelPerDaySelector } from '../../redux/bullet/bullet.selector';

import { GetCalendarSelector } from '../../redux/calendar/calendar.selector';
import { GetCalendar, NextMonthCalendar, PreviousMonthCalendar } from '../../redux/calendar/calendar.action';

import { CreateSchedule } from '../../redux/schedule/schedule.action';
import { CreateErrorSchedule, CreateSuccessSchedule } from '../../redux/schedule/schedule.selector';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {

  router: Router = inject(Router);
  store: Store = inject(Store);

  isLoadingBullet$ = this.store.pipe(select(GetLoadingBullet));
  bulletError$ = this.store.pipe(select(GetErrorBullet));

  calendar$ = this.store.pipe(select(GetCalendarSelector));

  datesAvailable$ = this.store.pipe(select(GetDatesAvailableSelector));
  timesAvailable$ = of<string[]>([]);

  createSuccess$ = this.store.pipe(select(CreateSuccessSchedule));
  scheduleError$ = this.store.pipe(select(CreateErrorSchedule));

  destroy$ = new Subject();
  schedule?: { date: string, hour: string };

  ngOnInit(): void {
    this.store.dispatch(GetBulletsAvailable());
    this.store.dispatch(GetCalendar());

    this.createSuccess$
      .pipe(
        takeUntil(this.destroy$),
        filter((value: boolean | undefined) => value === true)
      )
      .subscribe(() => this.router.navigate(['/']));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  monthAndFullYear(calendarDate: Date) {
    const month: number = calendarDate.getMonth();
    const year: number = calendarDate.getFullYear();

    return `${MonthNameEnum[month]} ${year}`
  }

  previousMonth() {
    this.store.dispatch(PreviousMonthCalendar());
  }

  nextMonth() {
    this.store.dispatch(NextMonthCalendar());
  }

  selectDay($event: string) {
    this.timesAvailable$ = this.store.pipe(
      select(GetTimesAvailabelPerDaySelector($event))
    );

    this.schedule = { date: $event, hour: '' };
  }

  selectBullet($event: string | undefined) {
    if (this.schedule) {
      this.schedule.hour = $event!;
    }
  }

  createSchedule() {
    if (!this.schedule?.date || !this.schedule?.hour) {
      return;
    }

    this.store.dispatch(CreateSchedule(this.schedule))
  }

}
