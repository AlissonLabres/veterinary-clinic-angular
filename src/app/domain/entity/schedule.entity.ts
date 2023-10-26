export class ScheduleEntity {
  constructor(
    public schedule_id: number,
    public schedule_status: string,
    public bullet_code: string,
    public type_service: string
  ) { }
}
