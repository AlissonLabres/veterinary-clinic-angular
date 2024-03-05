import { BulletEntity } from "./bullet.entity"

describe('BulletEntity', () => {
  it('should restore bullet correct values', () => {
    const input = { id: '0001', code: '2022-02-01T16:00' };
    const output = new BulletEntity('0001', '2022-02-01T16:00');

    expect(BulletEntity.restore(input)).toEqual(output);
  });

  it('should restore bullet empty and receive message bullet excpetion', () => {
    const input = undefined as any;
    expect(() => BulletEntity.restore(input)).toThrowError('Bullet has error');
  });

  it('should restore bullet id empty and receive message bullet not exist', () => {
    const input = {  } as any;
    expect(() => BulletEntity.restore(input)).toThrowError('Bullet not exist');
  });
})
