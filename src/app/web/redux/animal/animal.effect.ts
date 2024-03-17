import { catchError, map, of, repeat, switchMap } from 'rxjs';

import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import {
  CreateAnimal,
  CreateAnimalError,
  CreateAnimalSuccess,
} from './animal.action';
import { AnimalRepositoryInterface } from '../../../domain/repository/animal-repository.interface';
import { AnimalRepositoryToken } from '../../../config/injection-token.repositories';
import { CreateAnimalUsecase } from '../../../domain/usecase/create-animal/create-animal.usecase';

@Injectable({ providedIn: 'root' })
export class AnimalEffect {
  actions$: Actions = inject(Actions);
  createAnimalUsecase: CreateAnimalUsecase = inject(CreateAnimalUsecase);

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
}
