import { GetLoadingSchedule, GetScheduleSelector } from "./schedule.selector";

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
        isLoading: 'false'
      }
    };
  });

  it('GetScheduleSelector should return list entities', () => {
    const result = GetScheduleSelector(state);
    expect(result).toEqual(state.scheduleState.entities);
  });

  it('GetLoadingSchedule should return loading false', () => {
    const result = GetLoadingSchedule(state);
    expect(result).toEqual('false');
  });
});
