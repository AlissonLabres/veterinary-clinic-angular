import { CancelErrorSchedule, CancelSuccessSchedule, CreateErrorSchedule, CreateSuccessSchedule, GetLoadingSchedule, GetScheduleSelector } from "./schedule.selector";
import { ScheduleStateInterface } from "./schedule.state";

describe('ScheduleSelector', () => {
  let state: any;

  beforeEach(() => {
    state = {
      scheduleState: {
        entities: [{
          schedule_id: 1,
          schedule_status: 'scheduled',
          bullet_code: '2022-01-01T00:00:00.000Z',
          type_service: 'appointment',
        }],
        error: undefined,
        success: undefined,
        isLoading: false
      } as ScheduleStateInterface
    };
  });

  it('GetScheduleSelector should return list entities', () => {
    const result = GetScheduleSelector(state);
    expect(result).toEqual(state.scheduleState.entities);
  });

  it('GetLoadingSchedule should return loading false', () => {
    const result = GetLoadingSchedule(state);
    expect(result).toBeFalsy();
  });

  it('CreateSuccessSchedule should return success true', () => {
    state.scheduleState.success = true;
    const result = CreateSuccessSchedule(state);
    expect(result).toBeTruthy();
  });

  it('CreateErrorSchedule should return error message', () => {
    state.scheduleState.error = 'Error'
    const result = CreateErrorSchedule(state);
    expect(result).toEqual('Error');
  });

  it('CancelSuccessSchedule should return success true', () => {
    state.scheduleState.success = true;
    const result = CancelSuccessSchedule(state);
    expect(result).toBeTruthy();
  });

  it('CancelErrorSchedule should return error message', () => {
    state.scheduleState.error = 'Error'
    const result = CancelErrorSchedule(state);
    expect(result).toEqual('Error');
  });
});
