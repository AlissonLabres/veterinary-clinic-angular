import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ReplaySubject, of, take, throwError } from 'rxjs';

import { GetBulletsAvailableUsecase } from '../../../domain/usecase/get-bullets-available/get-bullets-available.usecase';

import { GetBulletsAvailable, GetBulletsAvailableError, GetBulletsAvailableSuccess } from './bullet.action';
import { BulletEffect } from './bullet.effect';
import { BulletInterface } from './bullet.state';

describe('BulletEffect', () => {
  let actions$: ReplaySubject<any>;
  let effects: BulletEffect;
  let getBulletsAvailableUsecase: GetBulletsAvailableUsecase;

  beforeEach(() => {
    const getBulletsAvailableUsecaseMock = {
      execute: jest.fn().mockReturnValue(of()),
    };

    TestBed.configureTestingModule({
      providers: [
        BulletEffect,
        provideMockActions(() => actions$),
        {
          provide: GetBulletsAvailableUsecase,
          useValue: getBulletsAvailableUsecaseMock
        }
      ]
    });

    effects = TestBed.inject(BulletEffect);
    getBulletsAvailableUsecase = TestBed.inject(GetBulletsAvailableUsecase);
    actions$ = new ReplaySubject(1);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('getBulletsAvailable$', () => {
    it('should return a GetBulletsAvailableSuccess action, with the bullets, on success', () => {
      const bullets: BulletInterface[] = [{ id: '1', code: '2021-01-01T12:00' }];
      const action = GetBulletsAvailable();
      const outcome = GetBulletsAvailableSuccess({ entities: bullets });

      jest.spyOn(getBulletsAvailableUsecase, 'execute').mockReturnValue(of(bullets));
      actions$.next(action);

      effects.getBulletsAvailable$
        .pipe(take(1))
        .subscribe(action => expect(action).toEqual(outcome));
    });

    it('should return a GetBulletsAvailableError action, on error', () => {
      const action = GetBulletsAvailable();
      const outcome = GetBulletsAvailableError({ message: 'Error' });

      jest.spyOn(getBulletsAvailableUsecase, 'execute').mockReturnValue(
        throwError(() => ({ error: { message: 'Error ' } }))
      );
      actions$.next(action);

      effects.getBulletsAvailable$
        .pipe(take(1))
        .subscribe(action => expect(action).toEqual(outcome));
    });

    it('should return a GetBulletsAvailableError action, on error with default error', () => {
      const action = GetBulletsAvailable();
      const outcome = GetBulletsAvailableError({ message: 'Erro ao criar agendamento' });

      jest.spyOn(getBulletsAvailableUsecase, 'execute').mockReturnValue(
        throwError(() => ({ defaultError: true }))
      );
      actions$.next(action);

      effects.getBulletsAvailable$
        .pipe(take(1))
        .subscribe(action => expect(action).toEqual(outcome));
    });
  });
});
