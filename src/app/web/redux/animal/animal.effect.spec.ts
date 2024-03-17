import { of, ReplaySubject, take, throwError } from 'rxjs';

import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import {
  CreateAnimal,
  CreateAnimalError,
  CreateAnimalSuccess,
} from './animal.action';
import { AnimalEffect } from './animal.effect';
import { AnimalRepositoryToken } from '../../../config/injection-token.repositories';
import { CreateAnimalUsecase } from '../../../domain/usecase/create-animal/create-animal.usecase';

describe('AnimalEffect', () => {
  let actions$: ReplaySubject<any>;
  let effects: AnimalEffect;
  let createAnimalUsecase: CreateAnimalUsecase;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AnimalEffect,
        provideMockActions(() => actions$),
        {
          provide: CreateAnimalUsecase,
          useValue: { execute: jest.fn() },
        },
      ],
    });

    createAnimalUsecase = TestBed.inject(CreateAnimalUsecase);
    effects = TestBed.inject(AnimalEffect);
    actions$ = new ReplaySubject(1);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should return a CreateAnimalSuccess action, with the value, on success', () => {
    const payload = {
      name: 'Scott',
      type: 'CAT',
      breed: 'N/A',
      weight: 10,
      age: 10,
      user_id: 1,
    };
    const action = CreateAnimal({ payload });
    const outcome = CreateAnimalSuccess();

    jest
      .spyOn(createAnimalUsecase, 'execute')
      .mockReturnValue(of({ animal_id: 1 }));
    actions$.next(action);

    effects.createAnimal$
      .pipe(take(1))
      .subscribe((action) => expect(action).toEqual(outcome));
  });

  it('should return a CreateAnimalError action, with the error message, on error', () => {
    const payload = {
      name: 'Scott',
      type: 'CAT',
      breed: 'N/A',
      weight: 10,
      age: 10,
      user_id: 1,
    };
    const action = CreateAnimal({ payload });
    const outcome = CreateAnimalError({ error: 'An error occurred' });

    jest
      .spyOn(createAnimalUsecase, 'execute')
      .mockReturnValue(
        throwError(() => ({ error: { message: 'An error occurred' } }))
      );
    actions$.next(action);

    effects.createAnimal$
      .pipe(take(1))
      .subscribe((action) => expect(action).toEqual(outcome));
  });
});
