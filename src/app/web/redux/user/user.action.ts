import { createAction, props } from "@ngrx/store";
import { UserInterface } from "./user.state";

const propsUsersEntity = props<{ entities: UserInterface[] }>();
const propUserEntity = props<{ entity: UserInterface }>();
const propUserError = props<{ error: string }>();

export const GetUser = createAction('[User] Load users');
export const GetUserError = createAction('[User] Load users error', propUserError);
export const GetUserSuccess = createAction('[User] Load users success', propsUsersEntity);

export const CreateUser = createAction('[User] Create user', propUserEntity);
export const CreateUserError = createAction('[User] Create user error', propUserError);
export const CreateUserSuccess = createAction('[User] Create user success', propUserEntity);
