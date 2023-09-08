import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';

import { CalendarRepositoryInterface } from '../../domain/repository/calendar-repository.interface';
import { CalendarRepositoryToken } from '../../config/injection-token.repositories';

import { GetBullet, GetBulletSuccess } from './bullet.action';

@Injectable({ providedIn: 'root' })
export class BulletEffect {

  private calendarRepository: CalendarRepositoryInterface;

  constructor(
    private readonly actions$: Actions,
    @Inject(CalendarRepositoryToken) calendarRepository: CalendarRepositoryInterface
  ) { this.calendarRepository = calendarRepository; }

  loadingCalendar = createEffect(() =>
    this.actions$.pipe(
      ofType(GetBullet),
      switchMap(() => this.calendarRepository.getBulletsAvailable()),
      map((entities) => GetBulletSuccess({ entities }))
    )
  );
}
