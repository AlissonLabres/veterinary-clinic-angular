import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { MonthNameEnum } from './calendar-month-name.component';

import { GetBulletSelector, GetBulletsDateSelector, GetBulletsTimePerDaySelector, GetLoadingBullet } from '../../redux/bullet/bullet.selector';
import { GetBullet, SendBullet } from '../../redux/bullet/bullet.action';

import { GetCalendarSelector } from '../../redux/calendar/calendar.selector';
import { CleanSelectionCalendar, GetCalendar, NextMonthCalendar, PreviousMonthCalendar, SelectDateCalendar, SelectHourCalendar } from '../../redux/calendar/calendar.action';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  isLoadingBullet$ = this.store.pipe(select(GetLoadingBullet));
  bullets$ = this.store.pipe(select(GetBulletSelector));
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
    this.store.dispatch(CleanSelectionCalendar());
    this.store.dispatch(PreviousMonthCalendar());
  }

  nextMonth() {
    this.store.dispatch(CleanSelectionCalendar());
    this.store.dispatch(NextMonthCalendar());
  }

  selectDay($event: Date | undefined) {
    this.store.dispatch(SelectDateCalendar({ value: $event }))
  }

  selectBullet($event: string | undefined) {
    this.store.dispatch(SelectHourCalendar({ value: $event }))
  }

  sendBullet(bullet: { date: Date | undefined, hour: string | undefined }) {
    this.store.dispatch(SendBullet({ entity: { date: bullet.date!, hour: bullet.hour! } }))
  }

}
