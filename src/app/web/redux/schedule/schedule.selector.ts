import { createFeatureSelector, createSelector } from "@ngrx/store";

import { ScheduleStateInterface } from "./schedule.state";

const GetScheduleState = createFeatureSelector<ScheduleStateInterface>('scheduleState');

export const GetScheduleSelector = createSelector(
  GetScheduleState,
  (state: ScheduleStateInterface) => state.entities
);

export const GetLoadingSchedule = createSelector(
  GetScheduleState,
  (state: ScheduleStateInterface) => state.isLoading
);
