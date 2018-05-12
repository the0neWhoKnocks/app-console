import providersData from './data';
import ProvidersConsolePlugin from './component';

const providersPlugin = {
  Component: ProvidersConsolePlugin,
  icon: 'device_hub',
  id: 'providersToggle',
  name: 'Providers',
  props: {
    providers: providersData,
  },
};

export default providersPlugin;