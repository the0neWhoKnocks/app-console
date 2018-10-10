import React, { Component, Fragment } from 'react';
import { arrayOf, bool, func, number, shape } from 'prop-types';
import setTransitionState from '../../utils/setTransitionState';
import Toggle from '../Toggle';
import Slide from '../Slide';
import styles, {
  REVEAL_SPEED,
} from './styles';

const globalStyles = [
  {
    href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
    id: 'materialIcons',
  },
];

class Console extends Component {
  constructor(props) {
    super();
    this.state = {
      activePlugin: undefined,
      isOpen: props.toggled,
      pluginNdx: undefined,
      stylesLoaded: false,
    };
    this.handleConsoleToggle = this.handleConsoleToggle.bind(this);
    this.handlePluginToggle = this.handlePluginToggle.bind(this);
  }

  componentDidMount() {
    const glamorStyles = document.head.querySelector('[data-glamor]');

    globalStyles.forEach((style) => {
      const styleTag = document.createElement('link');
      styleTag.id = style.id;
      styleTag.href = style.href;
      styleTag.rel = 'stylesheet';

      if (!glamorStyles) {
        document.head.appendChild(styleTag);
      } else {
        document.head.insertBefore(styleTag, glamorStyles);
      }
    });

    // most likely not truly loaded on an empty cache, but close enough
    setTransitionState(this, {
      stylesLoaded: true,
    });
  }
  
  loadFirstPlugin() {
    const {
      defaultPluginNdx,
      plugins,
    } = this.props;
    const {
      isOpen,
      pluginNdx,
    } = this.state;
    
    if(isOpen){
      setTimeout(() => {
        const ndx = pluginNdx || defaultPluginNdx || 0;
        const plugin = plugins[ndx];
        
        this.handlePluginToggle({
          currentTarget: {
            id: plugin.id,
            dataset: { ndx },
          },
        });
      }, REVEAL_SPEED);
    }
  }

  handleConsoleToggle(ev) {
    this.setState({
      activePlugin: undefined,
      isOpen: ev.currentTarget.checked,
    }, this.loadFirstPlugin);
  }

  handlePluginToggle(ev) {
    const toggle = ev.currentTarget;
    const { onPluginLoad } = this.props;

    this.setState({
      activePlugin: toggle.id,
      pluginNdx: toggle.dataset.ndx,
    }, () => {
      if(onPluginLoad) onPluginLoad(this.state.pluginNdx);
    });
  }

  render() {
    const { plugins } = this.props;
    const { activePlugin, isOpen, pluginNdx, stylesLoaded } = this.state;
    const consoleOpen = isOpen ? ' is--open' : '';
    const togglesClass = activePlugin ? ' plugin-active' : '';
    let currPlugin;

    return (
      <Fragment>
        <div
          className={`console ${styles.base} ${styles.console} ${consoleOpen}`}
        >
          <div className={`${styles.mask}`} />
          <div className={`${styles.toggles} ${togglesClass}`}>
            <div className={`${styles.togglesWrapper}`}>
              {plugins.map((plugin, ndx) => {
                if (activePlugin === plugin.id) currPlugin = plugin;

                return (
                  <Toggle
                    key={plugin.id}
                    id={plugin.id}
                    onToggle={this.handlePluginToggle}
                    rootClass={`${styles.toggle} ${styles.pluginToggle}`}
                    childStyle={{ animationDelay: `${ndx * 0.1}s` }}
                    style={{ animationDelay: `${ndx * 0.1}s` }}
                    toggled={activePlugin === plugin.id}
                    data={{
                      'data-ndx': ndx,
                    }}
                  >
                    <i className={`${styles.pluginIcon} material-icons`}>
                      {plugin.icon}
                    </i>
                    {plugin.name}
                  </Toggle>
                );
              })}
            </div>
          </div>
          {currPlugin && (
            <Slide
              className={`${styles.pluginWrapper}`}
              component={{
                Component: currPlugin.Component,
                key: activePlugin,
                props: {
                  ...this.props,
                  ...currPlugin.props,
                },
              }}
              ndx={pluginNdx}
              panelClass={`${styles.pluginPanel} ${currPlugin.panelClass}`}
            />
          )}
        </div>
        <Toggle
          id="consoleToggle"
          onToggle={this.handleConsoleToggle}
          rootClass={`${styles.toggle} ${styles.consoleToggle}  ${(stylesLoaded) ? 'is--visible' : ''}`}
          toggled={isOpen}
        >
          <i className="material-icons">view_comfy</i>
        </Toggle>
      </Fragment>
    );
  }
}

Console.defaultProps = {
  plugins: [],
  toggled: false,
};
Console.propTypes = {
  defaultPluginNdx: number,
  onPluginLoad: func,
  plugins: arrayOf(shape({})),
  toggled: bool,
};

export default Console;
export {
  globalStyles,
};
