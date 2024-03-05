import { ScheduleEntity } from "../../entity/schedule.entity";

export class ScheduleOutput {

  constructor(
    public schedule_id: number,
    public schedule_status: string,
    public bullet_code: string,
    public type_service: string,
  ) { }

  static restore(schedule: ScheduleEntity) {
    return new ScheduleOutput(
      schedule.schedule_id,
      schedule.schedule_status,
      schedule.bullet_code,
      schedule.type_service
    );
  }

}
