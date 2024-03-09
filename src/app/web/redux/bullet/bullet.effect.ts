import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, repeat, switchMap } from 'rxjs';

import { GetBulletsAvailable, GetBulletsAvailableSuccess, GetBulletsAvailableError } from './bullet.action';
import { BulletInterface } from './bullet.state';
import { GetBulletsAvailableUsecase } from '../../../domain/usecase/get-bullets-available/get-bullets-available.usecase';
import { BulletOutput } from '../../../domain/usecase/get-bullets-available/bullets-output';

@Injectable({ providedIn: 'root' })
export class BulletEffect {

  private actions$: Actions = inject(Actions);

  protected getBulletsAvailable: GetBulletsAvailableUsecase = inject(GetBulletsAvailableUsecase);

  getBulletsAvailable$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetBulletsAvailable),
      switchMap(() => this.getBulletsAvailable.execute()),
      map((bullets: BulletOutput[]) => bullets.map(bullet => ({ ...bullet } as BulletInterface))),
      map((entities) => GetBulletsAvailableSuccess({ entities })),
      catchError((error) => of(GetBulletsAvailableError({ message: error?.error?.message ?? 'Erro ao obter slots' }))),
      repeat()
    )
  );
}
