import { createFeatureSelector, createSelector } from "@ngrx/store";

import { BulletStateInterface } from "./bullet.state";
import { BulletEntity } from "../../../domain/entity/bullet.entity";

const GetBulletState = createFeatureSelector<BulletStateInterface>('bulletState');

export const GetBulletSelector = createSelector(
  GetBulletState,
  (state: BulletStateInterface) => {
    return { date: state.date, hour: state.hour };
  }
);

export const GetBulletsDateSelector = createSelector(
  GetBulletState,
  (state: BulletStateInterface) => {
    const values: string[] = state.entities
      .map((entity: BulletEntity) => entity.code.split('T')[0]);

    return [...new Set(values)];
  }
);

export const GetBulletsTimePerDaySelector = createSelector(
  GetBulletState,
  (state: BulletStateInterface) => {
    if (state?.date) {
      const values: any[] = state.entities
        .filter((entity: BulletEntity) => new Date(entity.code).getDate() === state.date!.getDate())
        .map((entity: BulletEntity) => entity.code.split('T')[1]);

      return [...new Set(values)];
    }

    return;
  }
);

export const GetLoadingBullet = createSelector(
  GetBulletState,
  (state: BulletStateInterface) => state.isLoading
);
