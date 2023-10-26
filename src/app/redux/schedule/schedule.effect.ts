import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';

import { CalendarRepositoryInterface } from '../../domain/repository/calendar-repository.interface';
import { CalendarRepositoryToken } from '../../config/injection-token.repositories';
import { GetSchedules, GetSchedulesSuccess } from './schedule.action';
import { ScheduleEntity } from '../../domain/entity/schedule.entity';
import { ScheduleInterface } from './schedule.state';

@Injectable({ providedIn: 'root' })
export class ScheduleEffect {

  private calendarRepository: CalendarRepositoryInterface;

  constructor(
    private readonly actions$: Actions,
    @Inject(CalendarRepositoryToken) calendarRepository: CalendarRepositoryInterface
  ) { this.calendarRepository = calendarRepository; }

  loadingCalendar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetSchedules),
      switchMap(() => this.calendarRepository.getAllSchedules()),
      map((entities: ScheduleEntity[]) => entities.map(entity => ({ ...entity } as ScheduleInterface))),
      map((entities) => GetSchedulesSuccess({ entities }))
    )
  );
}
