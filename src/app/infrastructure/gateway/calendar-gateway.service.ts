import { Injectable } from '@angular/core';
import { CalendarGatewayInterface } from '../../domain/gateway/calendar-gateway.interface';
import { CalendarEntity } from '../../domain/entity/calendar.entity';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CalendarGatewayService implements CalendarGatewayInterface {

  private date: Date;

  constructor() {
    this.date = new Date();
  }

  get(): Observable<CalendarEntity> {
    const date = this.date || new Date();
    return of(this.start(date));
  }

  previous(): Observable<CalendarEntity> {
    const date = this.date;
    const month = date.getMonth() - 1;
    const year = date.getFullYear();

    return of(this.start(month < 0 ? new Date(year - 1, 11) : new Date(year, month)));
  }

  next(): Observable<CalendarEntity> {
    const date = this.date;
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return of(this.start(month > 12 ? new Date(year + 1, 0) : new Date(year, month)));
  }

  private start(date: Date) {
    this.date = date;
    return this.create(date);
  }

  private create(date: Date) {
    const calendar = this.restoreWith(date);
    const year = date.getFullYear();
    const month = date.getMonth()
    const dayWeek = new Date(year, month, 1).getDay();

    const lastMonth = {
      counterDay: 0,
      quantityDays: new Date(year, month - 1, 0).getDate()
    }

    const currentMonth = {
      counterDay: 0,
      quantityDays: new Date(year, month, 0).getDate()
    }

    for (let day = 1; day < currentMonth.quantityDays; day++) {
      if (day <= dayWeek) {
        lastMonth.counterDay++;
        calendar.last.push(lastMonth.quantityDays--);

      } else {
        currentMonth.counterDay++;
        calendar.current.push(currentMonth.counterDay);
      }
    }

    for (let day = 0; day < lastMonth.counterDay + 1; day++) {
      currentMonth.counterDay++;
      calendar.current.push(currentMonth.counterDay);
    }

    const someDays = currentMonth.quantityDays + calendar.last.length;
    const iteratorNextWeek = Math.floor(someDays / 7) > 4 ? 42 : 35;

    for (let day = 0; day < (iteratorNextWeek - someDays); day++) {
      calendar.next.push(day + 1);
    }

    calendar.last = calendar.last.reverse();
    return calendar;
  }

  private restoreWith(date: Date) {
    return CalendarEntity.restore({
      last: [],
      current: [],
      next: [],
      date
    });
  }
}
