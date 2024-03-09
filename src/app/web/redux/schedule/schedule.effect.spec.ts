import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { ReplaySubject, of, take, throwError } from "rxjs";

import { GetSchedulesByUserUsecase } from "../../../domain/usecase/get-schedules-by-user/get-schedules-by-user.usecase";
import { CreateScheduleUsecase } from "../../../domain/usecase/create-schedule/create-schedule.usecase";
import { CreateScheduleOutput } from "../../../domain/usecase/create-schedule/create-schedule-output";

import { ScheduleEffect } from "./schedule.effect";
import { CreateSchedule, CreateScheduleError, CreateScheduleSuccess, GetSchedules, GetSchedulesSuccess } from "./schedule.action";

describe('ScheduleEffect', () => {
  let actions$: ReplaySubject<any>;
  let effects: ScheduleEffect;
  let getSchedulesByUserUsecase: GetSchedulesByUserUsecase;
  let createScheduleUsecase: CreateScheduleUsecase;

  beforeEach(() => {
    const getScheduleByUserUsecaseMock = {
      getBulletsAvailable: jest.fn().mockReturnValue(of()),
      sendSchedule: jest.fn().mockReturnValue(of())
    };

    const createScheduleUsecaseMock = {
      execute: jest.fn().mockReturnValue(of())
    };

    TestBed.configureTestingModule({
      providers: [
        ScheduleEffect,
        provideMockActions(() => actions$),
        {
          provide: GetSchedulesByUserUsecase,
          useValue: getScheduleByUserUsecaseMock
        },
        {
          provide: CreateScheduleUsecase,
          useValue: createScheduleUsecaseMock
        }
      ]
    });

    effects = TestBed.inject(ScheduleEffect);
    getSchedulesByUserUsecase = TestBed.inject(GetSchedulesByUserUsecase);
    createScheduleUsecase = TestBed.inject(CreateScheduleUsecase);
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

  describe('createSchedule$', () => {
    it('should return a SendBulletSuccess action, on success', () => {
      const action = CreateSchedule({ date: '2022-02-01T12:00', hour: '12:00' });
      const outputMock = { id: '0001', status: 'SCHEDULED' } as unknown as CreateScheduleOutput;
      const outcome = CreateScheduleSuccess();

      jest.spyOn(createScheduleUsecase, 'execute').mockReturnValue(of(outputMock));
      actions$.next(action);

      effects.createSchedule$
        .pipe(take(1))
        .subscribe(action => expect(action).toEqual(outcome));
    });

    it('should return a SendBulletError action, on error', () => {
      const action = CreateSchedule({ date: '2022-02-01T12:00', hour: '12:00' });
      const outcome = CreateScheduleError({ message: 'Error' });

      jest.spyOn(createScheduleUsecase, 'execute').mockReturnValue(
        throwError(() => ({ error: { message: 'Error' } }))
      );
      actions$.next(action);

      effects.createSchedule$
        .pipe(take(1))
        .subscribe(action => expect(action).toEqual(outcome));
    });

    it('should return a SendBulletError action, on error with message default', () => {
      const action = CreateSchedule({ date: '2022-02-01T12:00', hour: '12:00' });
      const outcome = CreateScheduleError({ message: 'Erro ao criar agendamento' });

      jest.spyOn(createScheduleUsecase, 'execute').mockReturnValue(
        throwError(() => ({ error: { } }))
      );
      actions$.next(action);

      effects.createSchedule$
        .pipe(take(1))
        .subscribe(action => expect(action).toEqual(outcome));
    });
  });
});
