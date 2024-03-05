export class CreateScheduleOutput {
  constructor(
    public id: number,
    public status: string
  ) { }

  static restore(schedule: any): CreateScheduleOutput {
    return new CreateScheduleOutput(
      schedule.schedule_id,
      schedule.schedule_status
    );
  }
}
