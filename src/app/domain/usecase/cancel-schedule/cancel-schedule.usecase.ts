import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";

import { ScheduleRepositoryToken } from "../../../config/injection-token.repositories";
import { ScheduleRepositoryInterface } from "../../repository/schedule-repository.interface";

@Injectable({ providedIn: 'root' })
export class CancelScheduleUsecase {

  protected scheduleRepository: ScheduleRepositoryInterface = inject(ScheduleRepositoryToken);

  execute(schedule_id: number): Observable<void> {
    return this.scheduleRepository.cancelSchedule(schedule_id);
  }

}
