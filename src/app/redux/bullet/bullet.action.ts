import { createAction, props } from "@ngrx/store";

import { BulletInterface } from "./bullet.state";

const propsBulletEntity = props<{ entities: BulletInterface[] }>();
const propsSendEntity = props<{ entity: { date: Date, hour: string } }>();

export const GetBullet = createAction('[Bullet] Load dates to bullet');
export const GetBulletError = createAction('[Bullet] Load dates to bullet error')
export const GetBulletSuccess = createAction('[Bullet] Load dates to bullet success', propsBulletEntity);

export const SendBullet = createAction('[Bullet] Send bullet to server', propsSendEntity);
export const SendBulletSuccess = createAction('[Bullet] Send success to server');
