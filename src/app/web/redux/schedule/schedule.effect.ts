import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, repeat, switchMap } from 'rxjs';

import { GetSchedulesByUserUsecase } from '../../../domain/usecase/get-schedules-by-user/get-schedules-by-user.usecase';
import { ScheduleOutput } from '../../../domain/usecase/get-schedules-by-user/schedule-output';
import { CreateScheduleUsecase } from '../../../domain/usecase/create-schedule/create-schedule.usecase';
import { CancelScheduleUsecase } from '../../../domain/usecase/cancel-schedule/cancel-schedule.usecase';

import {
  CancelSchedule,
  CancelScheduleError,
  CancelScheduleSuccess,
  CreateSchedule,
  CreateScheduleError,
  CreateScheduleSuccess,
  GetSchedules,
  GetSchedulesSuccess,
} from './schedule.action';
import { ScheduleInterface } from './schedule.state';

@Injectable({ providedIn: 'root' })
export class ScheduleEffect {
  protected getAllSchedulesByUserUsecase: GetSchedulesByUserUsecase = inject(
    GetSchedulesByUserUsecase
  );
  protected createScheduleUsecase: CreateScheduleUsecase = inject(
    CreateScheduleUsecase
  );
  protected cancelScheduleUsecase: CancelScheduleUsecase = inject(
    CancelScheduleUsecase
  );

  private actions$: Actions = inject(Actions);

  loadingCalendar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetSchedules),
      switchMap(() => this.getAllSchedulesByUserUsecase.execute('1')),
      map((entities: ScheduleOutput[]) =>
        entities.map((entity) => ({ ...entity } as ScheduleInterface))
      ),
      map((entities) => GetSchedulesSuccess({ entities }))
    )
  );

  createSchedule$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateSchedule),
      switchMap((input) =>
        this.createScheduleUsecase.execute(
          this.generateCode(input.date, input.hour),
          input.user_id
        )
      ),
      map(() => CreateScheduleSuccess()),
      catchError((error) =>
        of(
          CreateScheduleError({
            message: error?.error?.message ?? 'Erro ao criar agendamento',
          })
        )
      ),
      repeat()
    )
  );

  cancelSchedule$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CancelSchedule),
      switchMap((input) =>
        this.cancelScheduleUsecase.execute(input.schedule_id)
      ),
      map(() => CancelScheduleSuccess()),
      map(() => GetSchedules()),
      catchError((error) =>
        of(
          CancelScheduleError({
            message: error?.error?.message ?? 'Erro ao cancelar agendamento',
          })
        )
      ),
      repeat()
    )
  );

  private generateCode(date: string, hourEntity: string) {
    return `${date}T${hourEntity}`;
  }
}
