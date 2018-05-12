import { css } from 'glamor';

const openDur = 300;
const styles = {
  autoHeight: css({
    height: 'auto !important',
  }),

  children: css({
    height: 0,
    overflow: 'hidden',
    transition: `height ${openDur}ms`,
  }),

  input: css({
    ':checked + label::after': {
      content: `'remove'`,
    },

    ':checked + label + div:not(.is--opening):not(.is--open):not(.is--closing)': {
      height: 'auto',
    }
  }),

  label: css({
    padding: '0.3em 0.5em',
    background: 'rgba(0,0,0,0.25)',
    userSelect: 'none',
    display: 'block',
    cursor: 'pointer',
    position: 'relative',

    '::before': {
      content: `''`,
      background: 'linear-gradient(to right, transparent, #00b8ff)',
      opacity: 0,
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      transition: 'opacity 0.25s',
    },

    '::after': {
      fontFamily: 'Material Icons',
      content: `'add'`,
      float: 'right',
    },

    ':hover::before': {
      opacity: 0.15,
    },
  }),
};

export default styles;