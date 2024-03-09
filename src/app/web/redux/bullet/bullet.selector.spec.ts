import { GetDatesAvailableSelector, GetErrorBullet, GetLoadingBullet, GetTimesAvailabelPerDaySelector } from './bullet.selector';
import { BulletInterface } from './bullet.state';

describe('Bullet Selectors', () => {
  let state: any;

  beforeEach(() => {
    state = {
      bulletState: {
        entities: [
          { code: '2022-01-01T10:00:00' },
          { code: '2022-01-01T11:00:00' },
          { code: '2022-01-02T10:00:00' },
        ] as BulletInterface[],
      },
    };
  });

  it('GetDatesAvailableSelector should return empty entities', () => {
    state.bulletState.entities = undefined;
    const result = GetDatesAvailableSelector(state);
    expect(result).toEqual([]);
  });

  it('GetDatesAvailableSelector should return unique dates from bullet entities', () => {
    const result = GetDatesAvailableSelector(state);
    expect(result).toEqual(['2022-01-01', '2022-01-02']);
  });

  it('GetTimesAvailabelPerDaySelector should return emtpy for date empty', () => {
    const result = GetTimesAvailabelPerDaySelector('')(state);
    expect(result).toEqual([]);
  });

  it('GetTimesAvailabelPerDaySelector should return unique times for a specific day', () => {
    const result = GetTimesAvailabelPerDaySelector('2022-01-01')(state);
    expect(result).toEqual(['10:00:00', '11:00:00']);
  });

  it('GetTimesAvailabelPerDaySelector should return empty times for a specific day', () => {
    const result = GetTimesAvailabelPerDaySelector('2022-01-05')(state);
    expect(result).toEqual([]);
  });

  it('GetLoadingBullet should return false', () => {
    state.bulletState.isLoading = false;
    const result = GetLoadingBullet(state);
    expect(result).toBeFalsy();
  });

  it('GetErrorBullet should return error', () => {
    state.bulletState.error = 'error';
    const result = GetErrorBullet(state);
    expect(result).toEqual('error');
  });
});
