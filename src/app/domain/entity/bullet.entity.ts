import { BulletException } from "./exception/bullet.exception";

export class BulletEntity {
  readonly id: string;
  readonly code: string;

  constructor(id: string, code: string) {
    if (!id) {
      throw new BulletException('Bullet not exist');
    }

    this.id = id;
    this.code = code;
  }

  static restore(bullet: { id: string, code: string }) {
    if (!bullet) {
      throw new BulletException();
    }

    return new BulletEntity(bullet.id, bullet.code);
  }
}
