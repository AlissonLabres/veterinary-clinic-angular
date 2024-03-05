export class BulletException implements Error {
  name: string = 'BULLET_EXCEPTION';
  message: string;

  constructor(message: string = 'Bullet has error') {
    this.message = message;
  }
}
