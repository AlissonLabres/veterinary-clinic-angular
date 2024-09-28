import { createReducer, on } from '@ngrx/store';

import { UserStateInterface } from './user.state';
import {
  GetUser,
  GetUserSuccess,
  GetUserError,
  CreateUser,
  CreateUserError,
  CreateUserSuccess,
  RestoreUser,
} from './user.action';

const initialState: UserStateInterface = {
  error: null,
  entity: null,
  entities: [],
  isLoading: 'false',
};

export const UserReducer = createReducer(
  initialState,
  on(GetUser, (state) => ({
    ...state,
    error: null,
    entity: null,
    entities: [],
    isLoading: 'true',
  })),
  on(GetUserSuccess, (state, { entities }) => ({
    ...state,
    error: null,
    entity: null,
    entities,
    isLoading: 'false',
  })),
  on(GetUserError, (state, { error }) => ({
    ...state,
    error,
    entity: null,
    isLoading: 'false',
  })),
  on(CreateUser, (state) => ({
    ...state,
    error: null,
    entity: null,
    entities: [],
    isLoading: 'true',
  })),
  on(CreateUserError, (state, { error }) => ({
    ...state,
    error,
    entity: null,
    entities: [],
    isLoading: 'false',
  })),
  on(CreateUserSuccess, (state, { entity }) => ({
    ...state,
    error: null,
    entity,
    entities: [...state.entities, entity],
    isLoading: 'false',
  })),
  on(RestoreUser, (state) => ({
    ...state,
    error: null,
    entity: null,
    entities: [],
    isLoading: 'false',
  }))
);
