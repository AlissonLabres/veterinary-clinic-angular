import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, repeat, switchMap } from 'rxjs';

import { GetSchedulesByUserUsecase } from '../../../domain/usecase/get-schedules-by-user/get-schedules-by-user.usecase';
import { ScheduleOutput } from '../../../domain/usecase/get-schedules-by-user/schedule-output';
import { CreateScheduleUsecase } from '../../../domain/usecase/create-schedule/create-schedule.usecase';

import { CreateSchedule, CreateScheduleError, CreateScheduleSuccess, GetSchedules, GetSchedulesSuccess } from './schedule.action';
import { ScheduleInterface } from './schedule.state';

@Injectable({ providedIn: 'root' })
export class ScheduleEffect {

  protected getAllSchedulesByUserUsecase: GetSchedulesByUserUsecase = inject(GetSchedulesByUserUsecase);
  protected createScheduleUsecase: CreateScheduleUsecase = inject(CreateScheduleUsecase);
  private actions$: Actions = inject(Actions);

  loadingCalendar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetSchedules),
      switchMap(() => this.getAllSchedulesByUserUsecase.execute('1')),
      map((entities: ScheduleOutput[]) => entities.map(entity => ({ ...entity } as ScheduleInterface))),
      map((entities) => GetSchedulesSuccess({ entities }))
    )
  );

  createSchedule$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateSchedule),
      switchMap((input) => this.createScheduleUsecase.execute(this.generateCode(input.date, input.hour))),
      map(() => CreateScheduleSuccess()),
      catchError((error) => of(CreateScheduleError({ message: error?.error?.message ?? 'Erro ao criar agendamento' }))),
      repeat()
    )
  );

  private generateCode(date: string, hourEntity: string) {
    return `${date}T${hourEntity}`;
  }
}
