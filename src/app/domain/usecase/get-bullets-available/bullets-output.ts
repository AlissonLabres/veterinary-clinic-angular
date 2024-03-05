import { BulletEntity } from "../../entity/bullet.entity";

export class BulletOutput {
  constructor(
    public id: string,
    public code: string
  ) { }

  static restore(bullet: BulletEntity): any {
    return new BulletOutput(bullet.id, bullet.code);
  }
}
