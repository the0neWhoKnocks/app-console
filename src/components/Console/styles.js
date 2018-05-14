import { css } from 'glamor';

css.insert(`
  :root {
    --console-btn-x-pos: 1em;
    --console-btn-y-pos: 1em;
    --console-plugin-btn-color: #ccc;
    --console-plugin-btn-toggled-color: #333;
    --console-module-font-primary-color: #a5edff;
    --console-module-font-secondary-color: #446279;
    --console-module-bg-primary-color: #00182754;
    --console-module-bg-secondary-color: #81d4ff26;
  }

  .material-icons {
    font-size: inherit;
  }
`);

const animations = {
  expand: range => {
    const ret = {};

    for (let i = 0; i < range; i++) {
      const perc = `${5 * i}%`;
      ret[perc] = {
        // May have to use the `fallback` syntax for vars in IE https://github.com/threepointone/glamor/blob/master/docs/howto.md#fallbacks.
        // Glamor doesn't prefix radial gradients correctly, basically it adds them all to one `background` prop wrather than multiple stacked properties
        // which results in a bad rule, and the animation not working. Right now, radial and webkit play alright, but moz does not.
        // backgroundImage: [
        //   `radial-gradient(circle at var(--console-btn-x-pos) var(--console-btn-y-pos), var(--console-plugin-btn-toggled-color) ${perc}, transparent ${perc})`,
        //   `-webkit-radial-gradient(var(--console-btn-x-pos) var(--console-btn-y-pos), circle cover, var(--console-plugin-btn-toggled-color) ${perc}, transparent ${perc})`
        //   // `-moz-radial-gradient(var(--console-btn-x-pos) var(--console-btn-y-pos), circle cover, var(--console-plugin-btn-toggled-color) ${perc}, transparent ${perc})`,
        // ].join(',')

        backgroundImage: `radial-gradient(circle at var(--console-btn-x-pos) var(--console-btn-y-pos), var(--console-plugin-btn-toggled-color) ${perc}, transparent ${perc})`,
      };
    }

    return css.keyframes('expand', ret);
  },

  showModuleToggles: css.keyframes('showModuleToggles', {
    '100%': {
      opacity: 1,
    }
  }),

  rotateModuleToggles: css.keyframes('rotateModuleToggles', {
    '100%': {
      transform: 'rotateY(0deg)',
    }
  })
};

const revealSpeed = '300ms';

const styles = {
  base: css({
    boxSizing: 'border-box',
    ' *': {
      boxSizing: 'border-box',
    }
  }),

  console: css({
    font: '16px Helvetica, Arial, sans-serif',
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    pointerEvents: 'none',
    display: 'flex',
    flexFlow: 'column',

    '&.is--open': {
      pointerEvents: 'all',
    },
  }),

  toggle: css({
    transform: 'translateX(-100%)',
    transition: `transform ${revealSpeed}`,
    position: 'fixed',
    top: '0.5em',
    left: '0.5em',

    ' i': {
      fontSize: '1.5em',
    },

    '.is--visible': {
      transform: 'translateX(0%)'
    },
  }),

  mask: css({
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    pointerEvents: 'none',

    '.is--open &': {
      animation: `${animations.expand(50)} ${revealSpeed} forwards`,
    },
  }),

  toggles: css({
    paddingLeft: '5em',
    paddingTop: '0.5em',
    position: 'relative',
    transition: `background ${revealSpeed}`,
    whiteSpace: 'nowrap',

    '.is--open &': {
      background: 'rgba(0, 0, 0, 0.5)',
    },
  }),

  togglesWrapper: css({
    overflow: 'none',

    '.is--open &': {
      overflow: 'auto',
    },
  }),

  pluginWrapper: css({
    position: 'relative',
    display: 'flex',
    flexGrow: 1,
  }),

  pluginPanel: css({
    padding: '1em'
  }),

  pluginToggle: css({
    fontSize: '0.5em',
    minWidth: '8em',
    maxWidth: '8em',
    margin: '0em 1em 1em 0em',
    display: 'inline-block',
    flex: '1 1 0',
    transformOrigin: '50% 50%',
    opacity: 0,
    perspective: '800px',

    ' label': {
      width: '100%',
      textAlign: 'center',
      transform: 'rotateY(-90deg)',

      '.is--open &': {
        animation: `${animations.rotateModuleToggles} ${revealSpeed} forwards`,
      },
    },

    ' input:checked + label': {
      borderColor: 'transparent',
    },

    '.is--open &': {
      animation: `${animations.showModuleToggles} ${revealSpeed} forwards`,
    },
  }),

  pluginIcon: css({
    fontSize: '4.8em',
    display: 'block',
  }),
};

export default styles;
