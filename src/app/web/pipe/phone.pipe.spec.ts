import { PhonePipe } from './phone.pipe';

describe('Pipe: Phonee', () => {
  it('create an instance', () => {
    let pipe = new PhonePipe();
    expect(pipe).toBeTruthy();
  });

  it('Should transform phone when receive correct value', () => {
    const pipe = new PhonePipe();
    const value = '11999999999';
    expect(pipe.transform(value)).toEqual('(11) 99999-9999');
  });

  it('Don`t should transform phone when value is empty', () => {
    const pipe = new PhonePipe();
    const value = '';
    expect(pipe.transform(value)).toEqual('');
  });
});
