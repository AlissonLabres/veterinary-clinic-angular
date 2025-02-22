import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";

import { ScheduleRepositoryToken } from "../../../config/injection-token.repositories";
import { ScheduleRepositoryInterface } from "../../repository/schedule-repository.interface";

import { CreateScheduleOutput } from "./create-schedule-output";

@Injectable({ providedIn: 'root' })
export class CreateScheduleUsecase {

  protected scheduleRepository: ScheduleRepositoryInterface = inject(ScheduleRepositoryToken);

  execute(bullet_code: string, user_id: number): Observable<CreateScheduleOutput> {
    return this.scheduleRepository.createSchedule(bullet_code, user_id)
      .pipe(
        map(scheduleEntity => CreateScheduleOutput.restore(scheduleEntity))
      );
  }

}
