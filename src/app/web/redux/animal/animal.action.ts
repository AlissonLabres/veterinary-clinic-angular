import { createAction, props } from "@ngrx/store";
import { AnimalInterface } from "./animal.state";

const propAnimalEntity = props<{ payload: AnimalInterface }>();
const propGetAllAnimalsByUser = props<{ user_id: number }>();
const propGetAllAnimalsByUserSuccss = props<{ payload: AnimalInterface[] }>();
const propAnimalError = props<{ error: string }>();

export const CreateAnimal = createAction('[Animal] Create animal', propAnimalEntity);
export const CreateAnimalSuccess = createAction('[Animal] Create animal success');
export const CreateAnimalError = createAction('[Animal] Create animal error', propAnimalError);

export const GetAllAnimalsByUser = createAction('[Animal] Get All Animals by user', propGetAllAnimalsByUser);
export const GetAllAnimalsByUserSuccess = createAction('[Animal] Get All Animals by user success', propGetAllAnimalsByUserSuccss);
export const GetAllAnimalsByUserError = createAction('[Animal] Get All Animals by user error', propAnimalError);

