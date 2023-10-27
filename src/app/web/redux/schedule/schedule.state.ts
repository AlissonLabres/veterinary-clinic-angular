export interface ScheduleInterface {
  schedule_id: number,
  schedule_status: string,
  bullet_code: string,
  type_service: string
}

export interface ScheduleStateInterface {
  entities: ScheduleInterface[];
  isLoading: string;
}
