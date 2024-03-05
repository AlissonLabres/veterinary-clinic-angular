import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ReplaySubject, of, pipe, take, tap, throwError } from 'rxjs';
import { GetBullet, GetBulletSuccess, SendBullet, SendBulletError, SendBulletSuccess } from './bullet.action';
import { BulletEffect } from './bullet.effect';
import { BulletInterface } from './bullet.state';
import { GetBulletsAvailableUsecase } from '../../../domain/usecase/get-bullets-available/get-bullets-available.usecase';
import { CalendarRepositoryToken } from '../../../config/injection-token.repositories';
import { CalendarRepositoryInterface } from '../../../domain/repository/calendar-repository.interface';
import { CreateScheduleUsecase } from '../../../domain/usecase/create-schedule/create-schedule.usecase';
import { ScheduleOutput } from '../../../domain/usecase/create-schedule/schedule-output';

describe('BulletEffect', () => {
  let actions$: ReplaySubject<any>;
  let effects: BulletEffect;
  let getBulletsAvailableUsecase: GetBulletsAvailableUsecase;
  let createScheduleUsecase: CreateScheduleUsecase;

  beforeEach(() => {
    const getBulletsAvailableUsecaseMock = {
      execute: jest.fn().mockReturnValue(of()),
    };

    const createScheduleUsecaseMock = {
      execute: jest.fn().mockReturnValue(of())
    };

    TestBed.configureTestingModule({
      providers: [
        BulletEffect,
        provideMockActions(() => actions$),
        {
          provide: GetBulletsAvailableUsecase,
          useValue: getBulletsAvailableUsecaseMock
        },
        {
          provide: CreateScheduleUsecase,
          useValue: createScheduleUsecaseMock
        }
      ]
    });

    effects = TestBed.inject(BulletEffect);
    getBulletsAvailableUsecase = TestBed.inject(GetBulletsAvailableUsecase);
    createScheduleUsecase = TestBed.inject(CreateScheduleUsecase);
    actions$ = new ReplaySubject(1);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadingCalendar$', () => {
    it('should return a GetBulletSuccess action, with the bullets, on success', () => {
      const bullets: BulletInterface[] = [{ id: '1', code: '2021-01-01T12:00' }];
      const action = GetBullet();
      const outcome = GetBulletSuccess({ entities: bullets });

      jest.spyOn(getBulletsAvailableUsecase, 'execute').mockReturnValue(of(bullets));
      actions$.next(action);

      effects.loadingCalendar$
        .pipe(take(1))
        .subscribe(action => expect(action).toEqual(outcome));
    });
  });

  describe('sendBullet$', () => {
    it('should return a SendBulletSuccess action, on success', () => {
      const action = SendBullet({ entity: { date: new Date('2022-02-01T12:00'), hour: '12:00' } });
      const outputMock = { id: '0001', status: 'SCHEDULED' } as unknown as ScheduleOutput;
      const outcome = SendBulletSuccess();

      jest.spyOn(createScheduleUsecase, 'execute').mockReturnValue(of(outputMock));
      actions$.next(action);

      effects.sendBullet$
        .pipe(take(1))
        .subscribe(action => expect(action).toEqual(outcome));
    });

    it('should return a SendBulletError action, on error', () => {
      const action = SendBullet({ entity: { date: new Date('2022-02-01T12:00'), hour: '12:00' } });
      const outcome = SendBulletError({ error: 'Error' });

      jest.spyOn(createScheduleUsecase, 'execute')
        .mockReturnValue(throwError(() => ({ error: { message: 'Error' } })));
      actions$.next(action);

      effects.sendBullet$
        .pipe(take(1))
        .subscribe(action => expect(action).toEqual(outcome));
    });
  });
});
