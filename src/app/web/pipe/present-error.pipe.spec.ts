import { PresentErrorPipe } from './present-error.pipe';

describe('Pipe: PresentError', () => {
  it('create an instance', () => {
    const pipe = new PresentErrorPipe();
    expect(pipe).toBeTruthy();
  });

  it('Should transforme message error when field not filled', () => {
    const pipe = new PresentErrorPipe();

    const value = { 'required': true };
    const exceptions = { 'required': { 'message': 'This field is required' } }

    expect(pipe.transform(value, exceptions)).toEqual('This field is required');
  });

  it('Don`t should receive message error when value empty', () => {
    const pipe = new PresentErrorPipe();

    const value = { };
    const exceptions = { 'required': { 'message': 'This field is required' }, }

    expect(pipe.transform(value, exceptions)).toEqual('');
  });
});
