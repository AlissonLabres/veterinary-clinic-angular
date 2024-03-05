export class ScheduleOutput {
  constructor(
    public id: number,
    public status: string
  ) { }

  static restore(schedule: any): ScheduleOutput {
    return new ScheduleOutput(
      schedule.schedule_id,
      schedule.schedule_status
    );
  }
}
