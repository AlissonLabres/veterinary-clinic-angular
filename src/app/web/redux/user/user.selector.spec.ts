import { GetErrorUser, GetLoadingUser, GetUsersSelector, UserCreated } from "./user.selector";

describe('UserSelector', () => {
  let state: any;

  beforeEach(() => {
    state = {
      userState: {
        isLoading: 'false',
        entities: [{
          user_name: 'Testing Mock',
          user_email: 'testing@mock.com.br',
          user_phone: '4188889999',
          user_id: 1,
          user_animals: []
        }],
        entity: {
          user_name: 'Testing Mock',
          user_email: 'testing@mock.com.br',
          user_phone: '4188889999',
          user_id: 1,
          user_animals: []
        },
        error: null
      }
    };
  });

  it('GetUserSelector should return list entities', () => {
    const result = GetUsersSelector(state);
    expect(result).toEqual(state.userState.entities);
  });

  it('GetLoadingUser should return loading false', () => {
    const result = GetLoadingUser(state);
    expect(result).toEqual('false');
  });

  it('GetErrorUser should return loading false', () => {
    const result = GetErrorUser(state);
    expect(result).toBeNull();
  });

  it('UserCreated should return true', () => {
    state.userState.isLoading = 'false';
    state.userState.entity = {
      user_name: 'Testing Mock',
      user_email: 'testing@mock.com.br',
      user_phone: '4188889999',
      user_id: 1,
      user_animals: []
    };
    const result = UserCreated(state);
    expect(result).toBeTruthy();
  });
});
