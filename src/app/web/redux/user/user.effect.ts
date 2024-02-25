import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, repeat, switchMap, tap, throwError } from 'rxjs';

import UserEntity from '../../../domain/entity/user.entity';
import { UserRepositoryToken } from '../../../config/injection-token.repositories';
import { CreateUser, CreateUserError, CreateUserSuccess, GetUser, GetUserError, GetUserSuccess } from './user.action';
import { UserInterface } from './user.state';
import { UserRepositoryInterface } from '../../../domain/repository/user-repository.interface';

@Injectable({ providedIn: 'root' })
export class UserEffect {

  private userRepository: UserRepositoryInterface;

  constructor(
    private readonly actions$: Actions,
    @Inject(UserRepositoryToken) userRepository: UserRepositoryInterface
  ) { this.userRepository = userRepository; }

  loadingUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetUser),
      switchMap(() => this.userRepository.getUsers()),
      map((entities: UserEntity[]) => entities.map(entity => ({ ...entity } as UserInterface))),
      map((entities) => GetUserSuccess({ entities })),
      catchError((error) => of(GetUserError({ error: error.error.message }))),
      repeat()
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateUser),
      map(({ entity }) => new UserEntity(entity.user_name, entity.user_email, entity.user_phone, [])),
      switchMap((entity: UserEntity) => this.userRepository.createUser(entity)),
      map((user: UserEntity) => CreateUserSuccess({ entity: { ...user } })),
      catchError((error) => of(CreateUserError({ error: error.error.message }))),
      repeat()
    )
  );
}
