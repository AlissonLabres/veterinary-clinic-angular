import { Observable } from "rxjs";
import { ScheduleEntity } from "../entity/schedule.entity";

export interface ScheduleRepositoryInterface {

  createSchedule(bullet_code: string): Observable<ScheduleEntity>;

}
