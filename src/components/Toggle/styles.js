import { css } from 'glamor';

const styles = {
  input: css({
    position: 'absolute',
    zIndex: '-1',
    opacity: 0,

    ':checked + label': {
      color: 'var(--console-plugin-btn-color)',
      background: 'var(--console-plugin-btn-toggled-color)',
    }
  }),

  label: css({
    textTransform: 'uppercase',
    padding: '1em',
    border: 'solid 0.2em var(--console-plugin-btn-color)',
    borderRadius: '1em',
    background: 'var(--console-plugin-btn-color)',
    verticalAlign: 'middle',
    cursor: 'pointer',
    display: 'inline-block',
    transition: 'all 0.1s',
    userSelect: 'none',

    '*': {
      pointerEvents: 'none',
    },
  })
};

export default styles;