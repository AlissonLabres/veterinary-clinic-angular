import { Inject, Injectable, inject } from "@angular/core";
import { ScheduleRepositoryToken } from "../../../config/injection-token.repositories";
import { ScheduleRepositoryInterface } from "../../repository/schedule-repository.interface";
import { Observable, map } from "rxjs";
import { ScheduleOutput } from "./schedule-output";

@Injectable({ providedIn: 'root' })
export class CreateScheduleUsecase {

  protected scheduleRepository: ScheduleRepositoryInterface = inject(ScheduleRepositoryToken);

  execute(bullet_code: string): Observable<ScheduleOutput> {
    return this.scheduleRepository.createSchedule(bullet_code)
      .pipe(
        map(scheduleEntity => ScheduleOutput.restore(scheduleEntity))
      );
  }

}
