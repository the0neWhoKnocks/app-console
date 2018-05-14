import { css } from 'glamor';
import { connect } from 'react-redux';
import store, { actions } from './store';
import consolePlugin from './utils/consolePlugin';
import ConsoleAppStore from './components/ConsoleAppStore';
import ConsoleFeatureFlags from './components/ConsoleFeatureFlags';
import ConsoleMetaData from './components/ConsoleMetaData';
import ConsoleProviders from './components/ConsoleProviders';

// this is just mock data
const providersData = [
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
];

const plugins = [
  consolePlugin({
    Component: ConsoleAppStore,
    icon: 'layers',
    id: 'storeToggle',
    name: 'Store',
    panelClass: css({
      overflow: 'auto',
    }).toString(),
    props: {
      data: store.getState(),
    },
  }),

  consolePlugin({
    Component: ConsoleProviders,
    icon: 'device_hub',
    id: 'providersToggle',
    name: 'Providers',
    props: {
      providers: providersData,
    },
  }),

  consolePlugin({
    Component: connect(
      (state) => ({
        flags: state.flags,
      }),
      {
        setFlags: actions.setFlags,
      }
    )(ConsoleFeatureFlags),
    icon: 'book',
    id: 'flagsToggle',
    name: 'Flags',
  }),

  consolePlugin({
    Component: ConsoleMetaData,
    icon: 'info',
    id: 'metadataToggle',
    name: 'Meta Data',
  }),
];

export default plugins;
