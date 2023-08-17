import { createAction, props } from "@ngrx/store";
import { PetshopCalendarDateStateInterface } from "../states/petshop-calendar.state";

export const loadDates = createAction('[Petshop Calendar] Load dates to calendar');
export const loadDatesError = createAction('[Petshop Calendar] Load dates to calendar error')

export const loadDatesSuccess = createAction(
  '[Petshop Calendar] Load dates to calendar success',
  props<{ payload: PetshopCalendarDateStateInterface[] }>()
);
