import { css } from 'glamor';
import {
  mobile
} from '../../../breakpoints';
import {
  MODULE_BG_PRIMARY_COLOR,
  MODULE_BG_SECONDARY_COLOR,
  MODULE_FONT_PRIMARY_COLOR,
  MODULE_FONT_SECONDARY_COLOR,
} from '../../Console/styles';

const styles = {
  root: css({
    width: '100%',
    display: ['block', 'grid'],
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gridGap: '1px',
    padding: 0,
    margin: 0,
    
    [mobile]: {
      display: 'block',
    },
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
    ' .toggle__content-wrapper': {
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
    
    ' .toggle__btn': {
      color: [
        MODULE_FONT_SECONDARY_COLOR,
        'var(--console-module-font-secondary-color)',
      ],
      textTransform: 'none',
      whiteSpace: 'nowrap',
      padding: '0.25em',
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
