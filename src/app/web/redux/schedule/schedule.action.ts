import { createAction, props } from "@ngrx/store";
import { ScheduleInterface } from "./schedule.state";

const propsScheduleEntity = props<{ entities: ScheduleInterface[] }>();

export const GetSchedules = createAction('[Schedules] Load all schedules');
export const GetSchedulesError = createAction('[Schedules] Load all schedules error')
export const GetSchedulesSuccess = createAction('[Schedules] Load all schedules success', propsScheduleEntity);
