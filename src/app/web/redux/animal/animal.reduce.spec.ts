import {
  CreateAnimal,
  CreateAnimalError,
  CreateAnimalSuccess,
  GetAllAnimalsByUser,
  GetAllAnimalsByUserError,
  GetAllAnimalsByUserSuccess,
} from './animal.action';
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
    const payload = {
      name: 'Scott',
      age: 1,
      weight: 10,
      type: 'CAT',
      breed: 'N/A',
      user_id: 1,
    } as AnimalInterface;
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

  it('should set isLoading to true on GetAllAnimalsByUser', () => {
    const action = GetAllAnimalsByUser({ user_id: 1 });

    const result = AnimalReducer(initialState, action);

    expect(result.isLoading).toBeTruthy();
  });

  it('should set entity with payload on GetAllAnimalsByUserSuccess', () => {
    const action = GetAllAnimalsByUserSuccess({
      payload: [
        { name: 'Scott', age: 1, breed: '', type: '', user_id: 1, weight: 1 },
      ],
    });

    const result = AnimalReducer(initialState, action);

    expect(result.entities.length).toEqual(1);
  });

  it('should set entity with payload on GetAllAnimalsByUserSuccess', () => {
    const action = GetAllAnimalsByUserError({ error: 'error' });

    const result = AnimalReducer(initialState, action);

    expect(result.isLoading).toBeFalsy();
    expect(result.entities).toEqual([]);
    expect(result.error).toEqual('error');
  });
});
