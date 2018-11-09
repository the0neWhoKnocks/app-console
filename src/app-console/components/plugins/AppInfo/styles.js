import { css } from 'glamor';
import {
  MODULE_BG_PRIMARY_COLOR,
  MODULE_BG_SECONDARY_COLOR,
  MODULE_FONT_PRIMARY_COLOR,
} from '../../Console/styles';

const styles = {
  root: css({
    width: '100%',
  }),

  body: css({
    color: [
      MODULE_FONT_PRIMARY_COLOR,
      'var(--console-module-font-primary-color)',
    ],
    fontFamily: 'monospace',
    fontSize: '1.2em',
    border: 'solid 1px',
    borderCollapse: 'collapse',
    background: [
      MODULE_BG_PRIMARY_COLOR,
      'var(--console-module-bg-primary-color)',
    ],
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
      background: [
        MODULE_BG_SECONDARY_COLOR,
        'var(--console-module-bg-secondary-color)',
      ],
    },
  }),
};

export default styles;
