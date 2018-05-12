import { createStore } from 'redux';

const initialState = {
  flags: {
    feature_A: true,
    feature_G: false,
    feature_C: true,
    feature_D: true,
    feature_B: false,
    feature_E: false,
    feature_H: true,
    feature_F: true,
  },
  topLevelString: "I'm just here to \"demonstrate\" other data",
  bigBoy: {
    'this': {
      is: {
        nested: {
          way: {
            down: ['Welcome', 'to', 'Jurassic', 'Park']
          }
        }
      }
    }
  },
  topLevelBool: true,
  topLevelNum: 1000,
  z_mixedObj: {
    bool: true,
    c_obj: {
      fu: 'bar'
    },
    num: 1337,
  }
};

const types = {
  SET_FLAGS: 'SET_FLAGS',
};

const actions = {
  setFlags: (flags) => ({
    type: types.SET_FLAGS,
    flags,
  })
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_FLAGS:
      const n = Object.assign({}, state, {
        flags: action.flags
      });
      return n;
    default:
      return state;
  }
};

const store = createStore(reducers);

export default store;
export {
  actions,
};
