import { Observable } from "rxjs";
import { BulletEntity } from "../entity/bullet.entity";

export interface BulletRepositoryInterface {

  getBulletsAvailable(): Observable<BulletEntity[]>;

}
