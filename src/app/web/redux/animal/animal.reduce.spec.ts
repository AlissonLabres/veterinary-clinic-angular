import { CreateAnimal, CreateAnimalError, CreateAnimalSuccess } from './animal.action';
import { AnimalReducer } from './animal.reduce';
import { AnimalInterface, AnimalStateInterface } from './animal.state';

describe('AnimalReducer', () => {
  let initialState: AnimalStateInterface;

  beforeEach(() => {
    initialState = {
      entities: [],
      success: undefined,
      error: undefined,
      isLoading: false,
    };
  });

  it('should set isLoading to true on CreateAnimal', () => {
    const payload = { name: 'Scott', age: 1, weight: 10, type: 'CAT', breed: 'N/A', user_id: 1 } as AnimalInterface;
    const input = { payload };
    const action = CreateAnimal(input);

    const result = AnimalReducer(initialState, action);

    expect(result.isLoading).toBeTruthy();
  });

  it('should set isLoading to false and success to true on CreateAnimalSuccess', () => {
    const action = CreateAnimalSuccess();

    const result = AnimalReducer(initialState, action);

    expect(result.isLoading).toBeFalsy();
    expect(result.success).toBeTruthy();
    expect(result.error).toBeUndefined();
  });

  it('should set isLoading to false and success to false on CreateAnimalError', () => {
    const action = CreateAnimalError({ error: 'error' });

    const result = AnimalReducer(initialState, action);

    expect(result.isLoading).toBeFalsy();
    expect(result.success).toBeFalsy();
    expect(result.error).toEqual('error');
  });
});
