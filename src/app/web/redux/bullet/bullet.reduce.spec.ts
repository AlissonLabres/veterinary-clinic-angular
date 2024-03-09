import { BulletStateInterface } from './bullet.state';
import { BulletReducer } from './bullet.reducer';
import {
  GetBulletsAvailable,
  GetBulletsAvailableSuccess,
  GetBulletsAvailableError,
} from './bullet.action';

const initialState: BulletStateInterface = {
  entities: [],
  error: undefined,
  success: undefined,
  isLoading: false
}

describe('BulletReducer', () => {
  it('should return the default state', () => {
    const action = { type: 'NOOP' } as any;
    const result = BulletReducer(initialState, action);

    expect(result).toBe(initialState);
  });

  it('should set isLoading to true when GetBullet action is dispatched', () => {
    const action = GetBulletsAvailable();
    const result = BulletReducer(initialState, action);

    expect(result.isLoading).toBeTruthy();
  });

  it('should update state when GetBulletSuccess action is dispatched', () => {
    const entities = [
      { id: '1', code: '2022-01-01T10:00:00' },
      { id: '2', code: '2022-01-01T11:00:00' }
    ];
    const action = GetBulletsAvailableSuccess({ entities });
    const result = BulletReducer(initialState, action);

    expect(result.entities).toEqual(entities);
    expect(result.isLoading).toBeFalsy();
    expect(result.success).toBeTruthy();
  });

  it('should set isLoading to false when GetBulletError action is dispatched', () => {
    const action = GetBulletsAvailableError({ message: 'Error' });
    const result = BulletReducer(initialState, action);

    expect(result.isLoading).toBeFalsy();
    expect(result.error).toBe('Error');
  });
});
