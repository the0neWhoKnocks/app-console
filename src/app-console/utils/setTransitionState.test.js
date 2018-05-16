import setTransitionState, { delay } from './setTransitionState';

describe('setTransitionState', () => {
  jest.useFakeTimers();

  it('should set state after a delayed time for CSS animations', () => {
    const ctx = {
      setState: jest.fn(),
    };
    const state = {};
    const cb = jest.fn();

    setTransitionState(ctx, state, cb);
    jest.runTimersToTime(delay);

    expect(ctx.setState).toBeCalledWith(state, cb);
  });
});
