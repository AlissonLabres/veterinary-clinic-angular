import { GetErrorAnimal, GetLoadingAnimal, GetSuccessAnimal } from "./animal.selector";

describe('AnimalSelector', () => {
  let state: any;

  beforeEach(() => {
    state = {
      animalState: {
        isLoading: false,
        entities: [],
        success: undefined,
        error: undefined
      }
    };
  });

  it('should return isLoading is falsy', () => {
    state.animalState.isLoading = false;
    const result = GetLoadingAnimal(state);
    expect(result).toBeFalsy();
  });

  it('should return isLoading is true', () => {
    state.animalState.isLoading = true;
    const result = GetLoadingAnimal(state);
    expect(result).toBeTruthy();
  });

  it('should return error is falsy', () => {
    state.animalState.error = undefined;
    const result = GetErrorAnimal(state);
    expect(result).toBeFalsy();
  });

  it('should return error is truthy', () => {
    state.animalState.error = 'error';
    const result = GetErrorAnimal(state);
    expect(result).toEqual('error');
  });

  it('should return success is falsy', () => {
    state.animalState.success = undefined;
    const result = GetSuccessAnimal(state);
    expect(result).toBeFalsy();
  });

  it('should return success is truthy', () => {
    state.animalState.success = true;
    const result = GetSuccessAnimal(state);
    expect(result).toBeTruthy();
  });
});
