import { GetBulletSelector, GetBulletsDateSelector, GetBulletsTimePerDaySelector, GetLoadingBullet } from './bullet.selector';
import { BulletEntity } from '../../../domain/entity/bullet.entity';

describe('Bullet Selectors', () => {
  let state: any;

  beforeEach(() => {
    state = {
      bulletState: {
        date: new Date('2022-01-01T00:00:00-03:00'),
        hour: '10:00',
        entities: [
          { code: '2022-01-01T10:00:00' },
          { code: '2022-01-01T11:00:00' },
          { code: '2022-01-02T10:00:00' },
        ] as BulletEntity[],
      },
    };
  });

  it('GetBulletSelector should return date and hour', () => {
    const result = GetBulletSelector(state);
    expect(result).toEqual({ date: state.bulletState.date, hour: state.bulletState.hour });
  });

  it('GetBulletsDateSelector should return unique dates from bullet entities', () => {
    const result = GetBulletsDateSelector(state);
    expect(result).toEqual(['2022-01-01', '2022-01-02']);
  });

  it('GetBulletsTimePerDaySelector should return unique times for a specific day', () => {
    const result = GetBulletsTimePerDaySelector(state);
    expect(result).toEqual(['10:00:00', '11:00:00']);
  });

  it('GetBulletsTimePerDaySelector should return empty times for a specific day', () => {
    state.bulletState.date = new Date('2022-01-05T00:00:00-03:00');
    const result = GetBulletsTimePerDaySelector(state);
    expect(result).toEqual([]);
  });

  it('GetLoadingBullet should return false', () => {
    state.bulletState.isLoading = false;
    const result = GetLoadingBullet(state);
    expect(result).toBeFalsy();
  });
});
