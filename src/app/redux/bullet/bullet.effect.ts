import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';

import { CalendarRepositoryInterface } from '../../domain/repository/calendar-repository.interface';
import { CalendarRepositoryToken } from '../../config/injection-token.repositories';

import { GetBullet, GetBulletSuccess, SendBullet, SendBulletSuccess } from './bullet.action';
import { BulletEntity } from '../../domain/entity/bullet.entity';
import { BulletInterface } from './bullet.state';

@Injectable({ providedIn: 'root' })
export class BulletEffect {

  private calendarRepository: CalendarRepositoryInterface;

  constructor(
    private readonly actions$: Actions,
    @Inject(CalendarRepositoryToken) calendarRepository: CalendarRepositoryInterface
  ) { this.calendarRepository = calendarRepository; }

  loadingCalendar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetBullet),
      switchMap(() => this.calendarRepository.getBulletsAvailable()),
      map((entities: BulletEntity[]) => entities.map(entity => ({ ...entity } as BulletInterface))),
      map((entities) => GetBulletSuccess({ entities }))
    )
  );

  sendBullet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SendBullet),
      map((state: { entity: { date: Date, hour: string } }) => this.mapperToEntity(state)),
      switchMap((bullet: BulletEntity) => this.calendarRepository.sendSchedule(bullet)),
      map(() => SendBulletSuccess())
    )
  );

  private mapperToEntity(state: { entity: { date: Date, hour: string } }) {
    const date = new Date(state.entity.date);
    const code = `${date.getFullYear()}-${this.toString(date.getMonth() + 1)}-${this.toString(date.getDate())}T${state.entity.hour}`;

    return new BulletEntity(undefined, code);
  }

  private toString(value: number) {
    return value.toString().padStart(2, '0');
  }
}
