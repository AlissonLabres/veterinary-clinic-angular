import { createAction, props } from "@ngrx/store";
import { CreateScheduleInterface, ScheduleInterface } from "./schedule.state";

const propsScheduleEntity = props<{ entities: ScheduleInterface[] }>();
const propsCreateSchedule = props<CreateScheduleInterface>();
const propsScheduleError = props<{ message: string }>();


export const GetSchedules = createAction('[Schedules] Load all schedules');
export const GetSchedulesError = createAction('[Schedules] Load all schedules error')
export const GetSchedulesSuccess = createAction('[Schedules] Load all schedules success', propsScheduleEntity);

export const CreateSchedule = createAction('[Schedule] Creating schedule', propsCreateSchedule);
export const CreateScheduleSuccess = createAction('[Schedule] Sucess create schedule');
export const CreateScheduleError = createAction('[Schedule] Error create schedule', propsScheduleError);
