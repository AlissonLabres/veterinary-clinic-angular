import { createReducer, on } from "@ngrx/store";

import { ScheduleStateInterface } from "./schedule.state";
import { GetSchedules, GetSchedulesError, GetSchedulesSuccess } from "./schedule.action";

const initialState: ScheduleStateInterface = {
  entities: [],
  isLoading: 'false'
};

export const ScheduleReducer = createReducer(
  initialState,
  on(GetSchedules, (state) => ({ ...state, isLoading: 'true' })),
  on(GetSchedulesSuccess, (state, { entities }) => ({
    ...state,
    entities,
    isLoading: 'false'
  })),
  on(GetSchedulesError, (state) => ({ ...state, isLoading: 'false' }))
)
