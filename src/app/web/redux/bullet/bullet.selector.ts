import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BulletInterface, BulletStateInterface } from "./bullet.state";

const GetBulletState = createFeatureSelector<BulletStateInterface>('bulletState');

export const GetDatesAvailableSelector = createSelector(
  GetBulletState,
  (state: BulletStateInterface) => {
    if (!state?.entities) {
      return [];
    }

    return state.entities
      .map((entity: BulletInterface) => entity.code.split('T')[0])
      .filter((value, index, self) => self.indexOf(value) === index);
  }
);

export const GetTimesAvailabelPerDaySelector = (date: string) => createSelector(
  GetBulletState,
  (state: BulletStateInterface) => {
    if (!date) return [];

    const value = state.entities
      .filter((entity: BulletInterface) => new Date(entity.code).getDate() === new Date(`${date}T03:00`).getDate())
      .map((entity: BulletInterface) => entity.code.split('T')[1])
      .filter((value, index, self) => self.indexOf(value) === index);

    return value;
  }
);

export const GetLoadingBullet = createSelector(
  GetBulletState,
  (state: BulletStateInterface) => state.isLoading
);

export const GetErrorBullet = createSelector(
  GetBulletState,
  (state: BulletStateInterface) => state.error
);

