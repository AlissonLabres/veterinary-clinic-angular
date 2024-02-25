import { createReducer, on } from "@ngrx/store";

import { CalendarInterface, CalendarStateInterface } from "./calendar.state";
import { GetCalendar, GetCalendarSuccess, NextMonthCalendar, NextMonthCalendarSuccess, PreviousMonthCalendar, PreviousMonthCalendarSuccess } from "./calendar.action";

const initialState: CalendarStateInterface = {
  entity: {
    date: new Date(),
    last: [],
    current: [],
    next: []
  },
  isLoading: 'false'
};

const updateStateSuccess = (state: CalendarStateInterface, { value }: { value: CalendarInterface }) => ({ ...state, entity: value, isLoading: 'false' })
const loadingState = (state: CalendarStateInterface) => ({ ...state, isLoading: 'true' })

export const CalendarReducer = createReducer(
  initialState,
  on(GetCalendar, loadingState),
  on(GetCalendarSuccess, updateStateSuccess),

  on(NextMonthCalendar, loadingState),
  on(NextMonthCalendarSuccess, updateStateSuccess),

  on(PreviousMonthCalendar, loadingState),
  on(PreviousMonthCalendarSuccess, updateStateSuccess)
)
