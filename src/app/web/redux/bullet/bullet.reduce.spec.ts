import { BulletStateInterface } from './bullet.state';
import { BulletReducer } from './bullet.reducer';
import {
  GetBullet,
  GetBulletSuccess,
  GetBulletError
} from './bullet.action';
import { CleanSelectionCalendar, SelectDateCalendar, SelectHourCalendar } from '../calendar/calendar.action';

const initialState: BulletStateInterface = {
  entities: [],
  date: undefined,
  hour: undefined,
  isLoading: 'false'
}

describe('BulletReducer', () => {
  it('should return the default state', () => {
    const action = { type: 'NOOP' } as any;
    const result = BulletReducer(initialState, action);

    expect(result).toBe(initialState);
  });

  it('should set isLoading to true when GetBullet action is dispatched', () => {
    const action = GetBullet();
    const result = BulletReducer(initialState, action);

    expect(result.isLoading).toBe('true');
  });

  it('should update state when GetBulletSuccess action is dispatched', () => {
    const entities = [
      { id: '1', code: '2022-01-01T10:00:00' },
      { id: '2', code: '2022-01-01T11:00:00' }
    ];
    const action = GetBulletSuccess({ entities });
    const result = BulletReducer(initialState, action);

    expect(result.entities).toEqual(entities);
    expect(result.isLoading).toBe('false');
  });

  it('should set isLoading to false when GetBulletError action is dispatched', () => {
    const action = GetBulletError();
    const result = BulletReducer(initialState, action);

    expect(result.isLoading).toBe('false');
  });

  it('should update date when SelectDateCalendar action is dispatched with a Date', () => {
    const date = new Date();
    const action = SelectDateCalendar({ value: date });
    const result = BulletReducer(initialState, action);

    expect(result.date).toEqual(date);
  });

  it('should not update date when SelectDateCalendar action is dispatched with a non-Date', () => {
    const value = 'not a date';
    const action = SelectDateCalendar({ value });
    const result = BulletReducer(initialState, action);

    expect(result.date).toBe(initialState.date);
  });

  it('should update hour when SelectHourCalendar action is dispatched with a non-Date', () => {
    const hour = '10:00';
    const action = SelectHourCalendar({ value: hour });
    const result = BulletReducer(initialState, action);

    expect(result.hour).toEqual(hour);
  });

  it('should not update hour when SelectHourCalendar action is dispatched with a Date', () => {
    const value = new Date();
    const action = SelectHourCalendar({ value });
    const result = BulletReducer(initialState, action);

    expect(result.hour).toBe(initialState.hour);
  });

  it('should reset date and hour when CleanSelectionCalendar action is dispatched', () => {
    const action = CleanSelectionCalendar();
    const result = BulletReducer(initialState, action);

    expect(result.date).toBeUndefined();
    expect(result.hour).toBeUndefined();
  });
});
