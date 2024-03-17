import { createReducer, on } from '@ngrx/store';

import { AnimalStateInterface } from './animal.state';
import { CreateAnimal, CreateAnimalError, CreateAnimalSuccess } from './animal.action';

const initialState: AnimalStateInterface = {
  isLoading: false,
  entities: [],
  success: undefined,
  error: undefined,
}

export const AnimalReducer = createReducer(
  initialState,
  on(CreateAnimal, (state) => ({
    ...state,
    error: undefined,
    isLoading: true
  })),
  on(CreateAnimalSuccess, (state) => ({
    ...state,
    error: undefined,
    isLoading: false,
    success: true
  })),
  on(CreateAnimalError, (state, { error }) => ({
    ...state,
    success: false,
    isLoading: false,
    error
  }))
)
