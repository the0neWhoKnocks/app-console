import pad from './pad';

describe('pad', ()=> {

  it('should pad a value with the default token', () => {
    expect(pad(4)).toEqual('04');
  });

  it('should pad a value with a custom token', () => {
    expect(pad(4, 'XXXX')).toEqual('XXX4');
  });
});
