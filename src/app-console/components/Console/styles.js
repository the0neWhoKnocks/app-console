import { css } from 'glamor';

// NOTE - Only newer browsers support CSS variables. Setting up these consts so
// we can use them in the fallback rules.
export const BTN_X_POS = '0.5em';
export const BTN_Y_POS = '0.5em';
export const PLUGIN_BTN_COLOR = '#ccc';
export const PLUGIN_BTN_TOGGLED_COLOR = '#333';
export const MODULE_FONT_PRIMARY_COLOR = '#a5edff';
export const MODULE_FONT_SECONDARY_COLOR = '#446279';
export const MODULE_BG_PRIMARY_COLOR = '#00182754';
export const MODULE_BG_SECONDARY_COLOR = '#81d4ff26';
export const REVEAL_SPEED = 300;

css.insert(`
  :root {
    --console-btn-x-pos: ${BTN_X_POS};
    --console-btn-y-pos: ${BTN_Y_POS};
    --console-plugin-btn-color: ${PLUGIN_BTN_COLOR};
    --console-plugin-btn-toggled-color: ${PLUGIN_BTN_TOGGLED_COLOR};
    --console-module-font-primary-color: ${MODULE_FONT_PRIMARY_COLOR};
    --console-module-font-secondary-color: ${MODULE_FONT_SECONDARY_COLOR};
    --console-module-bg-primary-color: ${MODULE_BG_PRIMARY_COLOR};
    --console-module-bg-secondary-color: ${MODULE_BG_SECONDARY_COLOR};
  }

  .material-icons {
    font-size: inherit;
  }
`);

const animations = {
  expand: (range) => {
    const ret = {};

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < range; i++) {
      const perc = `${5 * i}%`;
      ret[perc] = {
        backgroundImage: [
          // fallback rule for older browsers
          `radial-gradient(circle at ${BTN_X_POS} ${BTN_Y_POS}, ${PLUGIN_BTN_TOGGLED_COLOR} ${perc}, transparent ${perc})`,
          // utilizing CSS variables
          `radial-gradient(circle at var(--console-btn-x-pos) var(--console-btn-y-pos), var(--console-plugin-btn-toggled-color) ${perc}, transparent ${perc})`,
        ],
      };
    }

    return css.keyframes('expand', ret);
  },

  showModuleToggles: css.keyframes('showModuleToggles', {
    '100%': {
      opacity: 1,
    },
  }),

  rotateModuleToggles: css.keyframes('rotateModuleToggles', {
    '100%': {
      transform: 'rotateY(0deg)',
    },
  }),
};

const revealSpeed = `${REVEAL_SPEED}ms`;
const fontReset = '16px Helvetica, Arial, sans-serif';

const styles = {
  base: css({
    boxSizing: 'border-box',
    ' *': {
      boxSizing: 'border-box',
    },
  }),

  console: css({
    font: fontReset,
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    pointerEvents: 'none',
    display: 'flex',
    flexFlow: 'column',
    zIndex: 100,

    '&.is--open': {
      pointerEvents: 'all',
    },
  }),

  consoleToggle: css({
    transform: 'translateX(-140%)',
    transition: `transform ${revealSpeed}`,
    position: 'fixed',
    top: [
      BTN_Y_POS,
      'var(--console-btn-y-pos)',
    ],
    left: [
      BTN_X_POS,
      'var(--console-btn-x-pos)',
    ],
    zIndex: 101,

    '.is--visible': {
      transform: 'translateX(0%)',
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

  toggle: css({
    font: fontReset,
    
    '.toggle': {
      margin: '0em 0.5em 0.5em 0em',
    },

    ' .toggle__btn': {
      width: '3.5em',
      height: '3.5em',
      padding: '0.05em',
      borderRadius: '0.5em',
      boxSizing: 'content-box',
    },

    ' .toggle__content-wrapper': {
      width: '100%',
      textAlign: 'center',
      fontSize: '0.5em', // make labels small
      whiteSpace: 'normal',
      wordWrap: 'break-word',
      display: 'inline-block',
      lineHeight: '1em',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      overflow: 'hidden',
    },

    ' .material-icons': {
      fontSize: '4.5em', // make icons large
      display: 'block',
    },
  }),

  pluginWrapper: css({
    position: 'relative',
    display: 'flex',
    flexGrow: 1,
  }),

  pluginPanel: css({
    padding: '1em',
  }),

  pluginToggle: css({
    margin: '0em 1em 1em 0em',
    display: 'inline-block',
    flex: '1 1 0',
    transformOrigin: '50% 50%',
    opacity: 0,
    perspective: '800px',

    ' .toggle__btn': {
      textAlign: 'center',
      transform: 'rotateY(-90deg)',

      '.is--open &': {
        animation: `${animations.rotateModuleToggles} ${revealSpeed} forwards`,
      },

      '.is--current': {
        pointer: 'default',
        pointerEvents: 'none',
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
