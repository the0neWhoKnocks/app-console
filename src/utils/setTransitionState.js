const setTransitionState = (ctx, state, cb) => {
  setTimeout(() => {
    ctx.setState(state, cb);
  }, 10);
};

export default setTransitionState;