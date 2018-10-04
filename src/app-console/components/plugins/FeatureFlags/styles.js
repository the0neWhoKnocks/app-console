import { css } from 'glamor';
import {
  MODULE_BG_PRIMARY_COLOR,
  MODULE_BG_SECONDARY_COLOR,
  MODULE_FONT_PRIMARY_COLOR,
  MODULE_FONT_SECONDARY_COLOR,
} from '../../Console/styles';

const styles = {
  root: css({
    width: '100%',
    columnCount: 2,
    padding: 0,
    margin: 0,
  }),

  li: css({
    listStyle: 'none',
    margin: '0em 0.25em 0.5em 0.25em',
  }),

  icon: css({
    fontSize: '1.4em',
    paddingRight: '0.25em',
    display: 'inline-block',
    verticalAlign: 'middle',

    '.is--enabled': {
      color: '#45ffa3',
    },

    '.is--disabled': {
      color: '#006f94',
    },
  }),

  flagName: css({
    display: 'inline-block',
    verticalAlign: 'middle',
  }),

  flagToggle: css({
    ' .toggle__btn': {
      color: [
        MODULE_FONT_SECONDARY_COLOR,
        'var(--console-module-font-secondary-color)',
      ],
      textTransform: 'none',
      whiteSpace: 'nowrap',
      borderColor: [
        MODULE_BG_PRIMARY_COLOR,
        'var(--console-module-bg-primary-color)',
      ],
      background: [
        MODULE_BG_PRIMARY_COLOR,
        'var(--console-module-bg-primary-color)',
      ],
      display: 'block',
    },

    ' input:checked + .toggle__btn': {
      color: [
        MODULE_FONT_PRIMARY_COLOR,
        'var(--console-module-font-primary-color)',
      ],
      borderColor: [
        MODULE_BG_SECONDARY_COLOR,
        'var(--console-module-bg-secondary-color)',
      ],
      background: [
        MODULE_BG_SECONDARY_COLOR,
        'var(--console-module-bg-secondary-color)',
      ],
    },
  }),
};

export default styles;
