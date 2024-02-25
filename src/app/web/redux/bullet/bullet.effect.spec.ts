import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ReplaySubject, of, pipe, take, tap } from 'rxjs';
import { CalendarRepositoryToken } from '../../../config/injection-token.repositories';
import { CalendarRepositoryInterface } from '../../../domain/repository/calendar-repository.interface';
import { GetBullet, GetBulletSuccess, SendBullet, SendBulletSuccess } from './bullet.action';
import { BulletEffect } from './bullet.effect';
import { BulletInterface } from './bullet.state';

describe('BulletEffect', () => {
  let actions$: ReplaySubject<any>;
  let effects: BulletEffect;
  let calendarRepository: CalendarRepositoryInterface;

  beforeEach(() => {
    const calendarRepositoryTokenMock = {
      getBulletsAvailable: jest.fn().mockReturnValue(of()),
      sendSchedule: jest.fn().mockReturnValue(of())
    };

    TestBed.configureTestingModule({
      providers: [
        BulletEffect,
        provideMockActions(() => actions$),
        {
          provide: CalendarRepositoryToken,
          useValue: calendarRepositoryTokenMock
        }
      ]
    });

    effects = TestBed.inject(BulletEffect);
    calendarRepository = TestBed.inject(CalendarRepositoryToken);
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

      jest.spyOn(calendarRepository, 'getBulletsAvailable').mockReturnValue(of(bullets));
      actions$.next(action);

      effects.loadingCalendar$
        .pipe(take(1))
        .subscribe(action => expect(action).toEqual(outcome));
    });
  });

  describe('sendBullet$', () => {
    it('should return a SendBulletSuccess action, on success', () => {
      const action = SendBullet({ entity: { date: new Date('2022-02-01T12:00'), hour: '12:00' } });
      const outcome = SendBulletSuccess();

      jest.spyOn(calendarRepository, 'sendSchedule').mockReturnValue(of({ id: undefined, code: '2022-02-01T12:00' }));
      actions$.next(action);

      effects.sendBullet$
        .pipe(take(1))
        .subscribe(action => expect(action).toEqual(outcome));
    });
  });
});
