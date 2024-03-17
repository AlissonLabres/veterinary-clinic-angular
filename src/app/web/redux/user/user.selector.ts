import { createFeatureSelector, createSelector } from '@ngrx/store';

import { UserStateInterface } from './user.state';

const GetUserState = createFeatureSelector<UserStateInterface>('userState');

export const GetUsersSelector = createSelector(
  GetUserState,
  (state: UserStateInterface) => state.entities
);

export const GetUserSelector = (id: number) =>
  createSelector(GetUserState, (state: UserStateInterface) =>
    state.entities.find((entity) => entity.user_id === Number(id))
  );

export const GetLoadingUser = createSelector(
  GetUserState,
  (state: UserStateInterface) => state.isLoading
);

export const GetErrorUser = createSelector(
  GetUserState,
  (state: UserStateInterface) => state.error
);

export const UserCreated = createSelector(
  GetUserState,
  (state: UserStateInterface) => {
    return state.isLoading === 'false' && state.entity !== null;
  }
);
