import { css } from 'glamor';
import {
  PLUGIN_BTN_COLOR,
  PLUGIN_BTN_TOGGLED_COLOR,
} from '../Console/styles';

const styles = {
  input: css({
    position: 'absolute',
    zIndex: '-1',
    opacity: 0,

    ':checked + label': {
      color: [
        PLUGIN_BTN_COLOR,
        'var(--console-plugin-btn-color)',
      ],
      background: [
        PLUGIN_BTN_TOGGLED_COLOR,
        'var(--console-plugin-btn-toggled-color)',
      ],
    },
  }),

  label: css({
    textTransform: 'uppercase',
    padding: '1em',
    border: [
      `solid 0.2em ${PLUGIN_BTN_COLOR}`,
      'solid 0.2em var(--console-plugin-btn-color)',
    ],
    borderRadius: '1em',
    background: [
      PLUGIN_BTN_COLOR,
      'var(--console-plugin-btn-color)',
    ],
    verticalAlign: 'middle',
    cursor: 'pointer',
    display: 'inline-block',
    transition: 'all 0.1s',
    userSelect: 'none',

    '*': {
      pointerEvents: 'none',
    },
  }),
  
  contentWrapper: css({
    pointerEvents: 'none',
  }),
};

export default styles;
