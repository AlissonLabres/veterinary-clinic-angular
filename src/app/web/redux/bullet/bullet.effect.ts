import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, repeat, switchMap } from 'rxjs';

import { GetBullet, GetBulletSuccess, SendBullet, SendBulletError, SendBulletSuccess } from './bullet.action';
import { BulletEntity } from '../../../domain/entity/bullet.entity';
import { BulletEntityInterface, BulletInterface } from './bullet.state';
import { GetBulletsAvailableUsecase } from '../../../domain/usecase/get-bullets-available/get-bullets-available.usecase';
import { BulletOutput } from '../../../domain/usecase/get-bullets-available/bullets-output';
import { CreateScheduleUsecase } from '../../../domain/usecase/create-schedule/create-schedule.usecase';

@Injectable({ providedIn: 'root' })
export class BulletEffect {

  private actions$: Actions = inject(Actions);

  protected getBulletsAvailable: GetBulletsAvailableUsecase = inject(GetBulletsAvailableUsecase);
  protected createSchedule: CreateScheduleUsecase = inject(CreateScheduleUsecase);

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
      switchMap(({ entity }) => this.createSchedule.execute(this.generateCode(entity.date, entity.hour))),
      map(() => SendBulletSuccess()),
      catchError((error) => of(SendBulletError({ error: error.error?.message }))),
      repeat()
    )
  );

  private generateCode(dateEntity: Date, hourEntity: string) {
    const date = new Date(dateEntity);
    return `${date.getFullYear()}-${this.toString(date.getMonth() + 1)}-${this.toString(date.getDate())}T${hourEntity}`;
  }

  private toString(value: number) {
    return value.toString().padStart(2, '0');
  }
}
