import { createAction, props } from "@ngrx/store";

import { CalendarInterface } from "./calendar.state";

const propsCalendarEntity = props<{ value: CalendarInterface }>();

export const GetCalendar = createAction('[Calendar] Loading calendar');
export const GetCalendarSuccess = createAction('[Calendar] Loading calendar success', propsCalendarEntity);

export const NextMonthCalendar = createAction('[Calendar] Loading next month');
export const NextMonthCalendarSuccess = createAction('[Calendar] Load next month success', propsCalendarEntity);

export const PreviousMonthCalendar = createAction('[Calendar] Loading previous month');
export const PreviousMonthCalendarSuccess = createAction('[Calendar] Load previous month success', propsCalendarEntity);
