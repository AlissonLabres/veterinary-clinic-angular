import { createReducer, on } from "@ngrx/store";
import { PetshopCalendarStateInterface } from "../states/petshop-calendar.state";
import { loadDates } from "../actions/petshop-calendar.action";

export const initialState: PetshopCalendarStateInterface = {
  entities: [],
  isLoading: false
};

export const petshopCalendarReducer = createReducer(
  initialState,
  on(loadDates, (state) => ({ ...state, isLoading: true }))
)
