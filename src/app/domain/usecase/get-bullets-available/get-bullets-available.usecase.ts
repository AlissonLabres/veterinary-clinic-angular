import { Injectable, inject } from "@angular/core";
import { BulletRepositoryToken } from "../../../config/injection-token.repositories";
import { BulletRepositoryInterface } from "../../repository/bullet-repository.interface";
import { BulletOutput } from "./bullets-output";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { BulletEntity } from "../../entity/bullet.entity";

@Injectable({ providedIn: 'root' })
export class GetBulletsAvailableUsecase {

  protected bulletRepository: BulletRepositoryInterface = inject(BulletRepositoryToken);

  execute(): Observable<BulletOutput[]> {
    return this.bulletRepository.getBulletsAvailable()
      .pipe(
        map((bullets: BulletEntity[]) => bullets.map((bullet: BulletEntity) => BulletOutput.restore(bullet)))
      );
  }
}
