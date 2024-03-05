import { BulletEntity } from "../entity/bullet.entity";

export class BulletOutput {
  id: string;
  code: string;

  constructor(id: string, code: string) {
    this.id = id;
    this.code = code;
  }

  static restore(bullet: BulletEntity): any {
    return new BulletOutput(bullet.id, bullet.code);
  }
}
