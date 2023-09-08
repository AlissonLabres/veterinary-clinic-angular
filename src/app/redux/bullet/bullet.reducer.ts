import { createReducer, on } from "@ngrx/store";

import { BulletStateInterface } from "./bullet.state";
import { GetBullet, GetBulletError, GetBulletSuccess } from "./bullet.action";
import { SelectDateCalendar } from "../calendar/calendar.action";

const initialState: BulletStateInterface = {
  entities: [],
  select: undefined,
  isLoading: 'false'
};

export const BulletReducer = createReducer(
  initialState,
  on(GetBullet, (state) => ({ ...state, isLoading: 'true' })),
  on(GetBulletSuccess, (state, { entities }) => ({
    ...state,
    entities,
    isLoading: 'false'
  })),
  on(GetBulletError, (state) => ({ ...state, isLoading: 'false' })),
  on(SelectDateCalendar, (state, { date }) => ({ ...state, select: date }))
)
