import { PresentErrorPipe } from './present-error.pipe';

describe('PresentErrorPipe', () => {
  let pipe: PresentErrorPipe;

  beforeEach(() => pipe = new PresentErrorPipe());

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform the error message when a required field is not filled', () => {
    const value = { 'required': true };
    const exceptions = { 'required': { 'message': 'This field is required' } }

    expect(pipe.transform(value, exceptions)).toEqual('This field is required');
  });

  it('should not return an error message when the value is empty', () => {
    const value = {};
    const exceptions = { 'required': { 'message': 'This field is required' }, }

    expect(pipe.transform(value, exceptions)).toEqual('');
  });
});
