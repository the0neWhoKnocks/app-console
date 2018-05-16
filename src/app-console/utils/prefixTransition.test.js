describe('prefixTransition', () => {
  const createElementStub = jest.fn();
  document.createElement = createElementStub;
  let prefixTransition;

  beforeEach(() => {
    jest.resetModules();
  });

  it('should return a Webkit prefix', () => {
    createElementStub.mockReturnValue({
      style: {
        WebkitTransition: true,
      },
    });
    prefixTransition = require('./prefixTransition');

    expect(prefixTransition.transitionEnd).toEqual('webkitTransitionEnd');
  });

  it('should return a Microsoft prefix', () => {
    createElementStub.mockReturnValue({
      style: {
        MSTransition: true,
      },
    });
    prefixTransition = require('./prefixTransition');

    expect(prefixTransition.transitionEnd).toEqual('msTransitionEnd');
  });

  it('should return a Opera prefix', () => {
    createElementStub.mockReturnValue({
      style: {
        OTransition: true,
      },
    });
    prefixTransition = require('./prefixTransition');

    expect(prefixTransition.transitionEnd).toEqual('oTransitionEnd');
  });

  it('should return non-browser specific prefix', () => {
    // Firefox
    createElementStub.mockReturnValue({
      style: {
        MozTransition: true,
      },
    });
    prefixTransition = require('./prefixTransition');

    expect(prefixTransition.transitionEnd).toEqual('transitionend');

    // Modern browsers
    jest.resetModules();
    createElementStub.mockReturnValue({
      style: {
        transition: true,
      },
    });
    prefixTransition = require('./prefixTransition');

    expect(prefixTransition.transitionEnd).toEqual('transitionend');
  });
});
