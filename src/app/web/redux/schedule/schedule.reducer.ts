import { createReducer, on } from "@ngrx/store";

import { ScheduleStateInterface } from "./schedule.state";
import { CancelSchedule, CancelScheduleError, CancelScheduleSuccess, CreateSchedule, CreateScheduleError, CreateScheduleSuccess, GetSchedules, GetSchedulesError, GetSchedulesSuccess } from "./schedule.action";

const initialState: ScheduleStateInterface = {
  entities: [],
  error: undefined,
  success: undefined,
  isLoading: false
};

export const ScheduleReducer = createReducer(
  initialState,
  on(GetSchedules, (state) => ({ ...state, success: undefined, error: undefined, isLoading: true })),
  on(GetSchedulesSuccess, (state, { entities }) => ({ ...state, entities, isLoading: false })),
  on(GetSchedulesError, (state) => ({ ...state, isLoading: false })),

  on(CreateSchedule, (state) => ({ ...state, success: undefined, error: undefined, isLoading: true })),
  on(CreateScheduleSuccess, (state) => ({ ...state, success: true, isLoading: false })),
  on(CreateScheduleError, (state, { message }) => ({ ...state, error: message, isLoading: false })),

  on(CancelSchedule, (state) => ({ ...state, isLoading: true })),
  on(CancelScheduleSuccess, (state) => ({ ...state, success: true, isLoading: false })),
  on(CancelScheduleError, (state, { message }) => ({ ...state, error: message, isLoading: false }))
)
