import { ScheduleException } from "./exception/schedule.exception";

export class ScheduleEntity {
  constructor(
    public schedule_id: number,
    public schedule_status: string,
    public bullet_code: string,
    public type_service: string
  ) { }

  static restore(schedule: any): ScheduleEntity {
    if (!schedule) {
      throw new ScheduleException();
    }

    return new ScheduleEntity(
      schedule.schedule_id,
      schedule.schedule_status,
      schedule.bullet_code,
      schedule.type_service
    );
  }
}
