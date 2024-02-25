import { CreateUser, CreateUserError, CreateUserSuccess, GetUser, GetUserError, GetUserSuccess } from "./user.action";
import { UserReducer } from "./user.reducer";
import { UserStateInterface } from "./user.state";

const initialState: UserStateInterface = {
  error: null,
  entity: null,
  entities: [],
  isLoading: 'false'
};

describe('CalendarReducer', () => {
  it('should return the default state', () => {
    const action = { type: 'NOOP' } as any;
    const result = UserReducer(initialState, action);

    expect(result).toBe(initialState);
  });

  it('should set isLoading to true when GetUser action is dispatched', () => {
    const action = GetUser();
    const result = UserReducer(initialState, action);

    expect(result.isLoading).toBe('true');
  });

  it('should update state when GetUserSuccess action is dispatched', () => {
    const value = {
      user_name: 'Testing Mock',
      user_email: 'testing@mock.com.br',
      user_phone: '4188889999',
      user_animals: []
    };
    const action = GetUserSuccess({ entities: [value] });
    const result = UserReducer(initialState, action);

    expect(result.entities).toEqual([value]);
    expect(result.isLoading).toBe('false');
  });

  it('should update state when GetSchedulesError action is dispatched', () => {
    const action = GetUserError({ error: 'Error' });
    const result = UserReducer(initialState, action);

    expect(result.error).toBe('Error');
    expect(result.isLoading).toBe('false');
  });

  it('should update state when CreateUser action is dispatched', () => {
    const value = { user_name: 'Testing Mock', user_email: 'testing@mock.com.br', user_phone: '4188889999' };
    const action = CreateUser({ entity: value });
    const result = UserReducer(initialState, action);

    expect(result.entity).toBe(null);
    expect(result.isLoading).toBe('true');
  });

  it('should update state when CreateUserSuccess action is dispatched', () => {
    const value = { user_name: 'Testing Mock', user_email: 'testing@mock.com.br', user_phone: '4188889999', user_animals: [] };
    const action = CreateUserSuccess({ entity: value });
    const result = UserReducer(initialState, action);

    expect(result.entity).toBe(value);
    expect(result.isLoading).toBe('false');
  });

  it('should update state when CreateUserError action is dispatched', () => {
    const action = CreateUserError({ error: 'Error' });
    const result = UserReducer(initialState, action);

    expect(result.error).toBe('Error');
    expect(result.isLoading).toBe('false');
  });
});
