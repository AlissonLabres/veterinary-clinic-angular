export interface ScheduleInterface {
  schedule_id: number,
  schedule_status: string,
  bullet_code: string,
  type_service: string
}

export interface ScheduleStateInterface {
  entities: ScheduleInterface[];
  error: string | undefined;
  success: boolean | undefined;
  isLoading: boolean | undefined;
}

export interface CreateScheduleInterface {
  date: string,
  hour: string
}
