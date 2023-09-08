import { createAction, props } from "@ngrx/store";

import { BulletInterface } from "./bullet.state";

const propsBulletEntity = props<{ entities: BulletInterface[] }>();

export const GetBullet = createAction('[Bullet] Load dates to bullet');
export const GetBulletError = createAction('[Bullet] Load dates to bullet error')
export const GetBulletSuccess = createAction('[Bullet] Load dates to bullet success', propsBulletEntity);
