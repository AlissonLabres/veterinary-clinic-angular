import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';

import { CalendarGatewayInterface } from '../../../domain/gateway/calendar-gateway.interface';
import { CalendarGatewayToken } from '../../../config/injection-token.gateway';

import { GetCalendar, GetCalendarSuccess, NextMonthCalendar, NextMonthCalendarSuccess, PreviousMonthCalendar, PreviousMonthCalendarSuccess } from './calendar.action';

@Injectable({ providedIn: 'root' })
export class CalendarEffect {

  private calendarGateway: CalendarGatewayInterface;

  constructor(
    private readonly actions$: Actions,
    @Inject(CalendarGatewayToken) calendarGateway: CalendarGatewayInterface
  ) { this.calendarGateway = calendarGateway; }

  loadingCalendar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetCalendar),
      switchMap(() => this.calendarGateway.get()),
      map((entity) => GetCalendarSuccess({ entity }))
    )
  );

  previousCalendar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PreviousMonthCalendar),
      switchMap(() => this.calendarGateway.previous()),
      map((entity) => PreviousMonthCalendarSuccess({ entity }))
    )
  );

  nextCalendar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NextMonthCalendar),
      switchMap(() => this.calendarGateway.next()),
      map((entity) => NextMonthCalendarSuccess({ entity }))
    )
  );
}
