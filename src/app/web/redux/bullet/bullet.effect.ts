import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, repeat, switchMap } from 'rxjs';

import { CalendarRepositoryInterface } from '../../../domain/repository/calendar-repository.interface';
import { CalendarRepositoryToken } from '../../../config/injection-token.repositories';

import { GetBullet, GetBulletSuccess, SendBullet, SendBulletError, SendBulletSuccess } from './bullet.action';
import { BulletEntity } from '../../../domain/entity/bullet.entity';
import { BulletEntityInterface, BulletInterface } from './bullet.state';
import { GetBulletsAvailableUsecase } from '../../../domain/usecase/get-bullets-available.usecase';
import { BulletOutput } from '../../../domain/usecase/bullets-output';

@Injectable({ providedIn: 'root' })
export class BulletEffect {

  protected getBulletsAvailable: GetBulletsAvailableUsecase = inject(GetBulletsAvailableUsecase);
  calendarRepository: CalendarRepositoryInterface = inject(CalendarRepositoryToken);

  constructor(private readonly actions$: Actions) { }

  loadingCalendar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetBullet),
      switchMap(() => this.getBulletsAvailable.execute()),
      map((bullets: BulletOutput[]) => bullets.map(bullet => ({ ...bullet } as BulletInterface))),
      map((entities) => GetBulletSuccess({ entities })),
      repeat()
    )
  );

  sendBullet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SendBullet),
      map((state: { entity: BulletEntityInterface } ) => this.mapperToEntity(state)),
      switchMap((bullet) => this.calendarRepository.sendSchedule(bullet)),
      map(() => SendBulletSuccess()),
      catchError((error) => of(SendBulletError({ error: error.error?.message }))),
      repeat()
    )
  );

  private mapperToEntity(state: { entity: BulletEntityInterface }) {
    const date = new Date(state.entity.date);
    const code = `${date.getFullYear()}-${this.toString(date.getMonth() + 1)}-${this.toString(date.getDate())}T${state.entity.hour}`;

    return new BulletEntity('0001', code);
  }

  private toString(value: number) {
    return value.toString().padStart(2, '0');
  }
}
