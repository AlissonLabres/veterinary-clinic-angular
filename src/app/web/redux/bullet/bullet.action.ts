import { createAction, props } from "@ngrx/store";

import { BulletInterface } from "./bullet.state";

const propsBulletEntities = props<{ entities: BulletInterface[] }>();
const propsBulletError = props<{ message: string }>();

export const GetBulletsAvailable = createAction('[Bullet] Loading bullets');
export const GetBulletsAvailableError = createAction('[Bullet] Error loading bullets', propsBulletError);
export const GetBulletsAvailableSuccess = createAction('[Bullet] Success loading bullets', propsBulletEntities);
