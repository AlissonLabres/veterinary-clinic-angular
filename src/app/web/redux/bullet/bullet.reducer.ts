import { createReducer, on } from "@ngrx/store";

import { BulletStateInterface } from "./bullet.state";
import { GetBulletsAvailable, GetBulletsAvailableError, GetBulletsAvailableSuccess } from "./bullet.action";

const initialState: BulletStateInterface = {
  entities: [],
  success: undefined,
  error: undefined,
  isLoading: false
};

export const BulletReducer = createReducer(
  initialState,
  on(GetBulletsAvailable, (state) => ({ ...state, success: undefined, error: undefined, isLoading: true })),
  on(GetBulletsAvailableError, (state, { message }) => ({ ...state, error: message, isLoading: false })),
  on(GetBulletsAvailableSuccess, (state, { entities }) => ({
    ...state,
    entities,
    success: true,
    isLoading: false
  })),
)
