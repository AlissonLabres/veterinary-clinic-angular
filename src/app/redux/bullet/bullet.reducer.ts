import { createReducer, on } from "@ngrx/store";

import { BulletStateInterface } from "./bullet.state";
import { GetBullet, GetBulletError, GetBulletSuccess } from "./bullet.action";
import { SelectDateCalendar, SelectHourCalendar } from "../calendar/calendar.action";

const initialState: BulletStateInterface = {
  entities: [],
  date: undefined,
  hour: undefined,
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
  on(SelectDateCalendar, (state, { value }) => {
    if (value instanceof Date) {
      return { ...state, date: value };
    }

    return { ...state };
  }),
  on(SelectHourCalendar, (state, { value }) => {
    if (value instanceof Date) {
      return { ...state };
    }

    return { ...state, hour: value };
  })
)
