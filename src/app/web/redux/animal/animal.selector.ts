import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AnimalStateInterface } from './animal.state';

const GetAnimalState =
  createFeatureSelector<AnimalStateInterface>('animalState');

export const GetSuccessAnimal = createSelector(
  GetAnimalState,
  (state: AnimalStateInterface) => state.success
);

export const GetErrorAnimal = createSelector(
  GetAnimalState,
  (state: AnimalStateInterface) => state.error
);

export const GetLoadingAnimal = createSelector(
  GetAnimalState,
  (state: AnimalStateInterface) => state.isLoading
);

export const GetAllAnimalsByUserSelector = createSelector(
  GetAnimalState,
  (state: AnimalStateInterface) => state.entities
);
