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
  overrides: {
    opt_1: true,
    opt_2: false,
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
  },
  metaData: [],
  providers: [
    {
      name: 'search',
      duration: '200',
      req: {
        type: 'GET',
        url: 'https://domain.com/search',
        data: {
          query: 'Organically sourced fluffer nutters',
        },
      },
      resp: {
        status: 404,
        msg: 'No results found for "Organically sourced fluffer nutters"',
      },
    },
    {
      name: 'products',
      duration: '3000',
      req: {
        type: 'GET',
        url: 'https://domain.com/api/get/products',
        data: {
          styleNumber: 123456,
        },
      },
      resp: {
        status: 200,
        data: Array.from(Array(50)).map((val, ndx) => ({
          title: `product ${ndx}`
        })),
      },
    },
    {
      name: 'user',
      req: {
        type: 'POST',
        url: 'https://domain.com/api/get/user',
        data: {
          token: 'masda654asdf13a2sdf46a5sd4f6a',
        },
      },
      resp: {
        status: 200,
        data: {
          id: '1354as321dfa354sd3f21',
          name: 'John Doe',
          email: 'jd@whois.me',
        },
      },
    }
  ],
};

const metaDataEl = document.head.querySelector('[name="application-data"]');
if(!metaDataEl) throw Error("No DOM element found with `name` `application-data`.");
const metaDataAtts = metaDataEl.attributes;

Object.keys(metaDataAtts).forEach((ndx) => {
  const att = metaDataAtts[ndx];
  if (att.name.indexOf('data-') === 0) initialState.metaData.push({
    name: att.name.replace('data-', '').replace(/-/g, ' '),
    value: att.nodeValue,
  });
});

const types = {
  SET_FLAGS: 'SET_FLAGS',
  SET_OVERRIDES: 'SET_OVERRIDES',
};

const actions = {
  setFlags: (flags) => ({
    type: types.SET_FLAGS,
    payload: flags,
  }),
  
  setOverrides: (overrides) => ({
    type: types.SET_OVERRIDES,
    payload: overrides,
  })
};

const reducers = (state = initialState, { payload, type }) => {
  switch (type) {
    case types.SET_FLAGS:
      return {
        ...state,
        flags: payload,
      };
      
    case types.SET_OVERRIDES:
      return {
        ...state,
        overrides: payload,
      };
    
    default:
      return state;
  }
};

const store = createStore(reducers);

export default store;
export {
  actions,
};
