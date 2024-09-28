import { catchError, map, of, repeat, switchMap } from 'rxjs';

import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import {
  CreateAnimal,
  CreateAnimalError,
  CreateAnimalSuccess,
  GetAllAnimalsByUser,
  GetAllAnimalsByUserError,
  GetAllAnimalsByUserSuccess,
} from './animal.action';
import { CreateAnimalUsecase } from '../../../domain/usecase/create-animal/create-animal.usecase';
import { GetAllAnimalsByUserUsecase } from '../../../domain/usecase/get-all-animals-by-user/get-schedules-by-user.usecase';

@Injectable({ providedIn: 'root' })
export class AnimalEffect {
  actions$: Actions = inject(Actions);
  createAnimalUsecase: CreateAnimalUsecase = inject(CreateAnimalUsecase);
  getAllAnimalsByUserUsecase: GetAllAnimalsByUserUsecase = inject(
    GetAllAnimalsByUserUsecase
  );

  createAnimal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateAnimal),
      switchMap(({ payload }) => this.createAnimalUsecase.execute(payload)),
      map(() => CreateAnimalSuccess()),
      catchError((error) =>
        of(CreateAnimalError({ error: error.error.message }))
      ),
      repeat()
    )
  );

  getAnimalsByUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetAllAnimalsByUser),
      switchMap(({ user_id }) =>
        this.getAllAnimalsByUserUsecase.execute(user_id)
      ),
      map((animals: Array<any>) =>
        GetAllAnimalsByUserSuccess({
          payload: animals.map((animal) => ({
            name: animal.animal_name,
            age: animal.animal_age,
            weight: animal.animal_weight,
            type: animal.animal_type,
            breed: animal.animal_breed,
            user_id: animal.user_id,
          })),
        })
      ),
      catchError((error) =>
        of(GetAllAnimalsByUserError({ error: error.error.message }))
      ),
      repeat()
    )
  );
}
