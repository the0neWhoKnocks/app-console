import { css } from 'glamor';

const styles = {
  root: css({
    width: '100%',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'start',
  }),

  li: css({
    listStyle: 'none',
    margin: '0em 0.25em 0.5em 0.25em',
    flexGrow: 1,
    flexBasis: '24%',
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
    ' label': {
      color: 'var(--console-module-font-secondary-color)',
      whiteSpace: 'nowrap',
      borderColor: 'var(--console-module-bg-primary-color)',
      background: 'var(--console-module-bg-primary-color)',
      display: 'block',
    },

    ' input:checked + label': {
      color: 'var(--console-module-font-primary-color)',
      borderColor: 'var(--console-module-bg-secondary-color)',
      background: 'var(--console-module-bg-secondary-color)',
    }
  }),
};

export default styles;