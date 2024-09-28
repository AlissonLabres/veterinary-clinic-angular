import { createReducer, on } from '@ngrx/store';

import { AnimalStateInterface } from './animal.state';
import {
  CreateAnimal,
  CreateAnimalError,
  CreateAnimalSuccess,
  GetAllAnimalsByUser,
  GetAllAnimalsByUserError,
  GetAllAnimalsByUserSuccess,
} from './animal.action';

const initialState: AnimalStateInterface = {
  isLoading: false,
  entities: [],
  success: undefined,
  error: undefined,
};

export const AnimalReducer = createReducer(
  initialState,
  on(CreateAnimal, (state) => ({
    ...state,
    error: undefined,
    isLoading: true,
  })),
  on(CreateAnimalSuccess, (state) => ({
    ...state,
    error: undefined,
    isLoading: false,
    success: true,
  })),
  on(CreateAnimalError, (state, { error }) => ({
    ...state,
    success: false,
    isLoading: false,
    error,
  })),
  on(GetAllAnimalsByUser, (state) => ({
    ...state,
    error: undefined,
    success: false,
    isLoading: true,
  })),
  on(GetAllAnimalsByUserSuccess, (state, { payload }) => ({
    ...state,
    error: undefined,
    isLoading: false,
    entities: payload,
    success: false,
  })),
  on(GetAllAnimalsByUserError, (state, { error }) => ({
    ...state,
    success: false,
    isLoading: false,
    entities: [],
    error,
  }))
);
