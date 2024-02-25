import { PhonePipe } from './phone.pipe';

describe('PhonePipe', () => {
  let pipe: PhonePipe;

  beforeEach(() => pipe = new PhonePipe());

  it('should create an instance of PhonePipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('should correctly format a full 11-digit phone number', () => {
    const value = '11999999999';
    expect(pipe.transform(value)).toEqual('(11) 99999-9999');
  });

  it('should correctly format a phone number with only the area code', () => {
    const value = '11';
    expect(pipe.transform(value)).toEqual('(11');
  });

  it('should correctly format a phone number with area code and partial number', () => {
    const value = '1199999';
    expect(pipe.transform(value)).toEqual('(11) 99999');
  });

  it('should return an empty string when the input is empty', () => {
    const value = '';
    expect(pipe.transform(value)).toEqual('');
  });
});
