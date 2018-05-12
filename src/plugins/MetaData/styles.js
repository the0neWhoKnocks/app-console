import { css } from 'glamor';

const styles = {
  root: css({
    width: '100%',
  }),

  body: css({
    color: 'var(--console-module-font-primary-color)',
    fontFamily: 'monospace',
    fontSize: '1.2em',
    border: 'solid 1px',
    borderCollapse: 'collapse',
    background: 'var(--console-module-bg-primary-color)',
    display: 'flex',
    overflow: 'auto',
  }),

  column: css({
    display: 'flex',
    flexDirection: 'column',

    ':nth-child(1)': {
      textTransform: 'capitalize',
      borderRight: 'solid 1px',
    },

    ':nth-child(2)': {
      flexGrow: 1,
    },
  }),

  columnCell: css({
    whiteSpace: 'nowrap',
    padding: '0.5em 0.75em',

    ':nth-child(even)': {
      background: 'var(--console-module-bg-secondary-color)',
    },
  }),
};

export default styles;