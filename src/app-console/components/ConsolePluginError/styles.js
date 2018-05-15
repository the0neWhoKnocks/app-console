import { css } from 'glamor';

const styles = {
  error: css({
    color: '#eae2aa',
    padding: '1em',
    borderRadius: '0.25em',
    background: '#881e36',

    ' code': {
      color: '#ec8db0',
      padding: '0.15em 0.25em',
      borderRadius: '0.25em',
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'inline-block',
    },
  }),
};

export default styles;
