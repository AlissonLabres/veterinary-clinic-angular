import { createFeatureSelector, createSelector } from "@ngrx/store";

import { CalendarStateInterface } from "./calendar.state";

const GetCalendarState = createFeatureSelector<CalendarStateInterface>('calendarState');

export const GetCalendarSelector = createSelector(
  GetCalendarState,
  (state: CalendarStateInterface) => state.entity
);
