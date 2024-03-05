import { Injectable, inject } from "@angular/core";
import { ScheduleRepositoryInterface } from "../../repository/schedule-repository.interface";
import { ScheduleRepositoryToken } from "../../../config/injection-token.repositories";
import { ScheduleOutput } from "./schedule-output";
import { Observable, map } from "rxjs";
import { ScheduleEntity } from "../../entity/schedule.entity";

@Injectable({ providedIn: 'root' })
export class GetSchedulesByUserUsecase {

  protected scheduleRepository: ScheduleRepositoryInterface = inject(ScheduleRepositoryToken);

  execute(user_id: string): Observable<ScheduleOutput[]> {
    return this.scheduleRepository.getScheduleByUser(user_id)
      .pipe(
        map((schedules: ScheduleEntity[]) => schedules.map((schedule: ScheduleEntity) => ScheduleOutput.restore(schedule)))
      );
  }

}
