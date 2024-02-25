import { GetCalendar, GetCalendarSuccess } from "./calendar.action";
import { CalendarReducer } from "./calendar.reducer";
import { CalendarStateInterface } from "./calendar.state";

const initialState: CalendarStateInterface = {
  entity: {
    date: new Date(),
    last: [],
    current: [],
    next: []
  },
  isLoading: 'false'
};

describe('CalendarReducer', () => {
  it('should return the default state', () => {
    const action = { type: 'NOOP' } as any;
    const result = CalendarReducer(initialState, action);

    expect(result).toBe(initialState);
  });

  it('should set isLoading to true when GetCalendar action is dispatched', () => {
    const action = GetCalendar();
    const result = CalendarReducer(initialState, action);

    expect(result.isLoading).toBe('true');
  });

  it('should update state when GetCalendarSuccess action is dispatched', () => {
    const value = {
      date: new Date('2022-01-01T00:00:00-03:00'),
      last: [1, 2, 3],
      current: [4, 5, 6],
      next: [7, 8, 9]
    };
    const action = GetCalendarSuccess({ value });
    const result = CalendarReducer(initialState, action);

    expect(result.entity).toEqual(value);
    expect(result.isLoading).toBe('false');
  });

});
