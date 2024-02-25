import { GetCalendarSelector } from "./calendar.selector";

describe('Calendar Selectors', () => {
  let state: any;

  beforeEach(() => {
    state = {
      calendarState: {
        entity: {
          date: new Date('2022-01-01T00:00:00-03:00'),
          last: [],
          current: [],
          next: []
        },
        isLoading: 'false'
      }
    };
  });

  it('GetCalendarSelector should return calendar entity', () => {
    const result = GetCalendarSelector(state);
    expect(result).toEqual(state.calendarState.entity);
  });
});
