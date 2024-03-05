import { Inject, Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';

import { GetSchedules, GetSchedulesSuccess } from './schedule.action';
import { ScheduleEntity } from '../../../domain/entity/schedule.entity';
import { ScheduleInterface } from './schedule.state';
import { GetSchedulesByUserUsecase } from '../../../domain/usecase/get-schedules-by-user/get-schedules-by-user.usecase';
import { ScheduleOutput } from '../../../domain/usecase/get-schedules-by-user/schedule-output';

@Injectable({ providedIn: 'root' })
export class ScheduleEffect {

  protected getAllSchedulesByUserUsecase = inject(GetSchedulesByUserUsecase);
  private actions$: Actions = inject(Actions);

  loadingCalendar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetSchedules),
      switchMap(() => this.getAllSchedulesByUserUsecase.execute('1')),
      map((entities: ScheduleOutput[]) => entities.map(entity => ({ ...entity } as ScheduleInterface))),
      map((entities) => GetSchedulesSuccess({ entities }))
    )
  );
}
