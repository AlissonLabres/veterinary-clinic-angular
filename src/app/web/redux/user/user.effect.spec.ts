import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { ReplaySubject, of, take, throwError } from "rxjs";

import { UserEffect } from "./user.effect";
import { UserRepositoryInterface } from "../../../domain/repository/user-repository.interface";
import { UserRepositoryToken } from "../../../config/injection-token.repositories";
import { CreateUser, CreateUserError, CreateUserSuccess, GetUser, GetUserError, GetUserSuccess } from "./user.action";

describe('ScheduleEffect', () => {
  let actions$: ReplaySubject<any>;
  let effects: UserEffect;
  let userRepository: UserRepositoryInterface;

  beforeEach(() => {
    const userRepositoryTokenMock = {
      getUsers: jest.fn().mockReturnValue(of()),
      createUser: jest.fn().mockReturnValue(of())
    };

    TestBed.configureTestingModule({
      providers: [
        UserEffect,
        provideMockActions(() => actions$),
        {
          provide: UserRepositoryToken,
          useValue: userRepositoryTokenMock
        }
      ]
    });

    effects = TestBed.inject(UserEffect);
    userRepository = TestBed.inject(UserRepositoryToken);
    actions$ = new ReplaySubject(1);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadingUser$', () => {
    it('should return a GetUser action, with the value, on success', () => {
      const value = { user_name: 'Testing Mock', user_email: 'testing@mock.com.br', user_phone: '4188889999', user_animals: [] };
      const action = GetUser();
      const outcome = GetUserSuccess({ entities: [value] });

      jest.spyOn(userRepository, 'getUsers').mockReturnValue(of([value]));
      actions$.next(action);

      effects.loadingUser$
        .pipe(take(1))
        .subscribe(action => expect(action).toEqual(outcome));
    });

    it('should return a GetUser action, with the value, on error', () => {
      const action = GetUser();
      const outcome = GetUserError({ error: 'Error' });

      jest.spyOn(userRepository, 'getUsers')
        .mockReturnValue(throwError(() => ({ error: { message: 'Error' } })));
      actions$.next(action);

      effects.loadingUser$
        .pipe(take(1))
        .subscribe((action) => expect(action).toEqual(outcome));
    });
  });

  describe('createUser$', () => {
    it('should return a CreateUser action, with the value, on success', () => {
      const value = { user_name: 'Testing Mock', user_email: 'testing@mock.com.br', user_phone: '4188889999', user_animals: [] };
      const action = CreateUser({ entity: value });
      const outcome = CreateUserSuccess({ entity: value });

      jest.spyOn(userRepository, 'createUser').mockReturnValue(of(value));
      actions$.next(action);

      effects.createUser$
        .pipe(take(1))
        .subscribe(action => expect(action).toEqual(outcome));
    });

    it('should return a CreateUser action, with the value, on error', () => {
      const value = { user_name: 'Testing Mock', user_email: 'testing@mock.com.br', user_phone: '4188889999', user_animals: [] };
      const action = CreateUser({ entity: value });
      const outcome = CreateUserError({ error: 'Error' });

      jest.spyOn(userRepository, 'createUser')
        .mockReturnValue(throwError(() => ({ error: { message: 'Error' } })));
      actions$.next(action);

      effects.createUser$
        .pipe(take(1))
        .subscribe((action) => expect(action).toEqual(outcome));
    });
  });
});
