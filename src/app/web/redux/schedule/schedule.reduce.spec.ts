import { GetSchedules, GetSchedulesError, GetSchedulesSuccess } from "./schedule.action";
import { ScheduleReducer } from "./schedule.reducer";
import { ScheduleStateInterface } from "./schedule.state";

const initialState: ScheduleStateInterface = {
  entities: [],
  isLoading: 'false'
};

describe('CalendarReducer', () => {
  it('should return the default state', () => {
    const action = { type: 'NOOP' } as any;
    const result = ScheduleReducer(initialState, action);

    expect(result).toBe(initialState);
  });

  it('should set isLoading to true when GetSchedules action is dispatched', () => {
    const action = GetSchedules();
    const result = ScheduleReducer(initialState, action);

    expect(result.isLoading).toBe('true');
  });

  it('should update state when GetSchedulesSuccess action is dispatched', () => {
    const value = {
      schedule_id: 1,
      schedule_status: 'scheduled',
      bullet_code: '2022-01-01T00:00:00.000Z',
      type_service: 'appointment',
    };
    const action = GetSchedulesSuccess({ entities: [value] });
    const result = ScheduleReducer(initialState, action);

    expect(result.entities).toEqual([value]);
    expect(result.isLoading).toBe('false');
  });

  it('should update state when GetSchedulesError action is dispatched', () => {
    const action = GetSchedulesError();
    const result = ScheduleReducer(initialState, action);

    expect(result.isLoading).toBe('false');
  });

});
