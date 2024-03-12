import { CancelSchedule, CancelScheduleError, CancelScheduleSuccess, CreateSchedule, CreateScheduleError, CreateScheduleSuccess, GetSchedules, GetSchedulesError, GetSchedulesSuccess } from "./schedule.action";
import { ScheduleReducer } from "./schedule.reducer";
import { ScheduleStateInterface } from "./schedule.state";

const initialState: ScheduleStateInterface = {
  entities: [],
  error: undefined,
  success: undefined,
  isLoading: false
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

    expect(result.isLoading).toBeTruthy();
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
    expect(result.isLoading).toBeFalsy();
  });

  it('should update state when GetSchedulesError action is dispatched', () => {
    const action = GetSchedulesError();
    const result = ScheduleReducer(initialState, action);

    expect(result.isLoading).toBeFalsy();
  });

  it('should set isLoading to true when CreateSchedule action is dispatched', () => {
    const input = { date: '2022-01-01', hour: '15:00' };
    const action = CreateSchedule(input);
    const result = ScheduleReducer(initialState, action);

    expect(result.isLoading).toBeTruthy();
  });

  it('should update state when CreateScheduleSuccess action is dispatched', () => {
    const action = CreateScheduleSuccess();
    const result = ScheduleReducer(initialState, action);

    expect(result.success).toBeTruthy();
    expect(result.isLoading).toBeFalsy();
  });

  it('should update state when CreateScheduleSuccess action is dispatched', () => {
    const error = { message: 'Error' };
    const action = CreateScheduleError(error);
    const result = ScheduleReducer(initialState, action);

    expect(result.error).toEqual('Error');
    expect(result.isLoading).toBeFalsy();
  });

  it('should set isLoading to true when CancelSchedule action is dispatched', () => {
    const input = { schedule_id: 1 };
    const action = CancelSchedule(input);
    const result = ScheduleReducer(initialState, action);

    expect(result.isLoading).toBeTruthy();
  });

  it('should update state when CancelScheduleSuccess action is dispatched', () => {
    const action = CancelScheduleSuccess();
    const result = ScheduleReducer(initialState, action);

    expect(result.success).toBeTruthy();
    expect(result.isLoading).toBeFalsy();
  });

  it('should update state when CancelScheduleError action is dispatched', () => {
    const error = { message: 'Error' };
    const action = CancelScheduleError(error);
    const result = ScheduleReducer(initialState, action);

    expect(result.error).toEqual('Error');
    expect(result.isLoading).toBeFalsy();
  });
});
