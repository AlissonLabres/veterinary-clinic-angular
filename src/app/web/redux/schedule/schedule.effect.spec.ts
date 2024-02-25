import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { ReplaySubject, of } from "rxjs";

import { CalendarRepositoryToken } from "../../../config/injection-token.repositories";
import { CalendarRepositoryInterface } from "../../../domain/repository/calendar-repository.interface";
import { ScheduleEffect } from "./schedule.effect";
import { GetSchedules, GetSchedulesSuccess } from "./schedule.action";

describe('ScheduleEffect', () => {
  let actions$: ReplaySubject<any>;
  let effects: ScheduleEffect;
  let calendarRepository: CalendarRepositoryInterface;

  beforeEach(() => {
    const calendarRepositoryTokenMock = {
      getBulletsAvailable: jest.fn().mockReturnValue(of()),
      sendSchedule: jest.fn().mockReturnValue(of())
    };

    TestBed.configureTestingModule({
      providers: [
        ScheduleEffect,
        provideMockActions(() => actions$),
        {
          provide: CalendarRepositoryToken,
          useValue: calendarRepositoryTokenMock
        }
      ]
    });

    effects = TestBed.inject(ScheduleEffect);
    calendarRepository = TestBed.inject(CalendarRepositoryToken);
    actions$ = new ReplaySubject(1);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadingCalendar$', () => {
    it('should return a GetCalendarSuccess action, with the value, on success', (done) => {
      const value = { schedule_id: 1, schedule_status: 'scheduled', bullet_code: '2022-01-01T13:00', type_service: 'appointment' }
      const action = GetSchedules();
      const outcome = GetSchedulesSuccess({ entities: [value] });

      calendarRepository.getAllSchedules = jest.fn().mockReturnValue(of([value]));
      actions$.next(action);

      effects.loadingCalendar$.subscribe(action => {
        expect(action).toEqual(outcome);
        done();
      });
    });
  });
});
