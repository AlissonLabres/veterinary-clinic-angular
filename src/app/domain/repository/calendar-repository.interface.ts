import { Observable } from "rxjs";
import { BulletEntity } from "../entity/bullet.entity";
import { ScheduleEntity } from "../entity/schedule.entity";

export interface CalendarRepositoryInterface {

  getAllSchedules(): Observable<ScheduleEntity[]>;

  sendSchedule(bullet: BulletEntity): Observable<BulletEntity>;

}
