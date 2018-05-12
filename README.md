# App Console

A component used for development or support debugging.

---

## Creating a new plugin

Below is an example of the plugin configuration.

```js
import SomeConsolePlugin from './component';
import someData from './data';

const somePlugin = {
  // A React component that'll render the plugin
  Component: SomeConsolePlugin,
  // The plugins utilize Google's Material icons. To find icons go to https://material.io/icons/
  icon: 'device_hub',
  // A unique plugin-specific ID 
  id: 'someToggle',
  // The name of the plugin, will also be used for the label in the UI
  name: 'Some',
  // If the component needs any props, pass them here
  props: {
    data: someData,
  },
};

export default somePlugin;
```