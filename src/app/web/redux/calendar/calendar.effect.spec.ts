import { ReplaySubject, of, take } from "rxjs";
import { CalendarEffect } from "./calendar.effect";
import { CalendarGatewayInterface } from "../../../domain/gateway/calendar-gateway.interface";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { CalendarGatewayToken } from "../../../config/injection-token.gateway";
import { GetCalendar, GetCalendarSuccess, NextMonthCalendar, NextMonthCalendarSuccess, PreviousMonthCalendar, PreviousMonthCalendarSuccess } from "./calendar.action";

describe('CalendarEffect', () => {
  let actions$: ReplaySubject<any>;
  let effects: CalendarEffect;
  let calendarGateway: CalendarGatewayInterface;

  beforeEach(() => {
    const calendarGatewayMock = {
      get: jest.fn().mockReturnValue(of()),
      previous: jest.fn().mockReturnValue(of()),
      next: jest.fn().mockReturnValue(of())
    };

    TestBed.configureTestingModule({
      providers: [
        CalendarEffect,
        provideMockActions(() => actions$),
        {
          provide: CalendarGatewayToken,
          useValue: calendarGatewayMock
        }
      ]
    });

    effects = TestBed.inject(CalendarEffect);
    calendarGateway = TestBed.inject(CalendarGatewayToken);
    actions$ = new ReplaySubject(1);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadingCalendar$', () => {
    it('should return a GetCalendarSuccess action, with the value, on success', () => {
      const value = { date: new Date('2022-02-01T12:00'), last: [], current: [], next: [] };
      const action = GetCalendar();
      const outcome = GetCalendarSuccess({ value });

      calendarGateway.get = jest.fn().mockReturnValue(of(value));
      actions$.next(action);

      effects.loadingCalendar$
        .pipe(take(1))
        .subscribe(action => expect(action).toEqual(outcome));
    });
  });

  describe('previousCalendar$', () => {
    it('should return a PreviousMonthCalendarSuccess action, with the value, on success', () => {
      const value = { date: new Date('2022-02-01T12:00'), last: [], current: [], next: [] };
      const action = PreviousMonthCalendar();
      const outcome = PreviousMonthCalendarSuccess({ value });

      calendarGateway.previous = jest.fn().mockReturnValue(of(value));
      actions$.next(action);

      effects.previousCalendar$
        .pipe(take(1))
        .subscribe(action => expect(action).toEqual(outcome));
    });
  });

  describe('nextCalendar$', () => {
    it('should return a NextMonthCalendarSuccess action, with the value, on success', () => {
      const value = { date: new Date('2022-02-01T12:00'), last: [], current: [], next: [] };
      const action = NextMonthCalendar();
      const outcome = NextMonthCalendarSuccess({ value });

      calendarGateway.next = jest.fn().mockReturnValue(of(value));
      actions$.next(action);

      effects.nextCalendar$
        .pipe(take(1))
        .subscribe(action => expect(action).toEqual(outcome));
    });
  });

});
