import { css } from 'glamor';

const styles = {
  root: css({
    width: '100%',
    color: '#eee',
    padding: 0,
    margin: 0,
    listStyle: 'none',
  }),

  ul: css({
    padding: '0.25em 0 0.25em 1em',
    margin: 0,
    listStyle: 'none',
    background: 'rgba(0,0,0,0.25)',
  }),

  li: css({
    margin: '0.25em 0',
    overflowX: 'auto',
    position: 'relative',

    ':not(.is--parent)': {
      padding: '0.25em 0.5em',
      background: 'rgba(255, 255, 255, 0.05)',
    },

    ' input': {
      display: 'none',
    },
  }),

  isProp: css({
    color: 'cyan',
  }),

  isBool: css({
    color: '#5c9aff',
  }),

  isStr: css({
    color: '#b7da6a',
  }),

  isNum: css({
    color: '#ff62f0',
  }),

  isNull: css({
    color: '#ec85bd',
  }),

  isFunc: css({
    color: '#8e8e8e',
  }),
};

export default styles;
