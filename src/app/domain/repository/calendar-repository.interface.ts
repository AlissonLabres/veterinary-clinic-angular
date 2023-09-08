import { Observable } from "rxjs";
import { BulletEntity } from "../entity/bullet.entity";

export interface CalendarRepositoryInterface {
  getBulletsAvailable(): Observable<BulletEntity[]>;
}
