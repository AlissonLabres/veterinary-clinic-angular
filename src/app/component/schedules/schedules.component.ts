import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { GetSchedules } from '../../redux/schedule/schedule.action';
import { GetScheduleSelector } from '../../redux/schedule/schedule.selector';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss']
})
export class SchedulesComponent implements OnInit {

  $schedules = this.store.pipe(select(GetScheduleSelector));

  constructor(private readonly store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(GetSchedules());
  }

}
