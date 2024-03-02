import { createReducer, on } from "@ngrx/store";

import { BulletStateInterface } from "./bullet.state";
import { GetBullet, GetBulletError, GetBulletSuccess, SendBullet, SendBulletError, SendBulletSuccess } from "./bullet.action";
import { CleanSelectionCalendar, SelectDateCalendar, SelectHourCalendar } from "../calendar/calendar.action";

const initialState: BulletStateInterface = {
  entities: [],
  date: undefined,
  hour: undefined,
  error: undefined,
  created: 'false',
  isLoading: 'false'
};

export const BulletReducer = createReducer(
  initialState,
  on(GetBullet, (state) => ({ ...state, isLoading: 'true' })),
  on(GetBulletSuccess, (state, { entities }) => ({ ...state, entities, isLoading: 'false' })),
  on(GetBulletError, (state) => ({ ...state, isLoading: 'false' })),
  on(SendBullet, (state) => ({ ...state, error: undefined, created: undefined, isLoading: 'true' })),
  on(SendBulletSuccess, (state) => ({ ...state, date: undefined, hour: undefined, error: undefined, created: 'OK', isLoading: 'false' })),
  on(SendBulletError, (state, { error }) => ({ ...state, error, isLoading: 'false' })),
  on(SelectDateCalendar, (state, { value }) => (value instanceof Date ? { ...state, date: value } : { ...state })),
  on(SelectHourCalendar, (state, { value }) => (value instanceof Date ? { ...state } : { ...state, hour: value })),
  on(CleanSelectionCalendar, (state) => ({ ...state, date: undefined, hour: undefined }))
)
