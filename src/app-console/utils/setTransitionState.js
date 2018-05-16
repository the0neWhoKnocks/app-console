const delay = 20;

/**
 * For some reason this is needed when using CSS transitions with React,
 * otherwise some transitions don't behave as expected.
 *
 * @param {Object} ctx - The context containing the state
 * @param {Object} state - The new state that will be applied
 * @param {Function} cb - The callback that will execute after the state has been updated
 */
const setTransitionState = (ctx, state, cb) => {
  setTimeout(() => {
    ctx.setState(state, cb);
  }, delay);
};

export default setTransitionState;
export {
  delay,
};
