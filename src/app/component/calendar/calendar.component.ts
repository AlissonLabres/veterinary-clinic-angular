import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { MonthNameEnum } from './calendar-month-name.component';

import { GetBulletsDateSelector, GetBulletsTimePerDaySelector, GetLoadingBullet } from '../../redux/bullet/bullet.selector';
import { GetBullet } from '../../redux/bullet/bullet.action';

import { GetCalendarSelector } from '../../redux/calendar/calendar.selector';
import { GetCalendar, NextMonthCalendar, PreviousMonthCalendar, SelectDateCalendar } from '../../redux/calendar/calendar.action';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  isLoadingBullet$ = this.store.pipe(select(GetLoadingBullet));
  bulletsDateAvailable$ = this.store.pipe(select(GetBulletsDateSelector));
  bulletsTimeAvailable$ = this.store.pipe(select(GetBulletsTimePerDaySelector));
  calendar$ = this.store.pipe(select(GetCalendarSelector));

  day: Date | undefined = undefined;

  constructor(private readonly store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(GetBullet());
    this.store.dispatch(GetCalendar());
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

  select($event: Date | undefined) {
    this.store.dispatch(SelectDateCalendar({ date: $event }))
  }
}
