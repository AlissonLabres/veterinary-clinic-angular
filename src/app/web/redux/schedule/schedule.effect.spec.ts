import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { ReplaySubject, of } from "rxjs";

import { CalendarRepositoryInterface } from "../../../domain/repository/calendar-repository.interface";
import { ScheduleEffect } from "./schedule.effect";
import { GetSchedules, GetSchedulesSuccess } from "./schedule.action";
import { GetSchedulesByUserUsecase } from "../../../domain/usecase/get-schedules-by-user/get-schedules-by-user.usecase";

describe('ScheduleEffect', () => {
  let actions$: ReplaySubject<any>;
  let effects: ScheduleEffect;
  let getSchedulesByUserUsecase: GetSchedulesByUserUsecase;

  beforeEach(() => {
    const getScheduleByUserUsecaseMock = {
      getBulletsAvailable: jest.fn().mockReturnValue(of()),
      sendSchedule: jest.fn().mockReturnValue(of())
    };

    TestBed.configureTestingModule({
      providers: [
        ScheduleEffect,
        provideMockActions(() => actions$),
        {
          provide: GetSchedulesByUserUsecase,
          useValue: getScheduleByUserUsecaseMock
        }
      ]
    });

    effects = TestBed.inject(ScheduleEffect);
    getSchedulesByUserUsecase = TestBed.inject(GetSchedulesByUserUsecase);
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

      getSchedulesByUserUsecase.execute = jest.fn().mockReturnValue(of([value]));
      actions$.next(action);

      effects.loadingCalendar$.subscribe(action => {
        expect(action).toEqual(outcome);
        done();
      });
    });
  });
});
