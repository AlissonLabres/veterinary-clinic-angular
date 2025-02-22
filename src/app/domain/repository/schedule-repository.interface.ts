import { Observable } from "rxjs";
import { ScheduleEntity } from "../entity/schedule.entity";

export interface ScheduleRepositoryInterface {

  createSchedule(bullet_code: string, user_id: number): Observable<ScheduleEntity>;

  getScheduleByUser(id: string): Observable<ScheduleEntity[]>;

  cancelSchedule(id: number): Observable<void>;

}
