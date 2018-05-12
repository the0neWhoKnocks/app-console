import { css } from 'glamor';

const styles = {
  container: css({
    width: '100%',
    overflow: 'auto',
  }),
  
  table: css({
    width: '100%',
    color: '#eee',
    border: 'solid 1px rgba(255, 255, 255, 0.2)',

    ' th': {
      color: '#eee',
      textAlign: 'left',
      padding: '0.5em',
      background: 'rgba(0,0,0,0.5)',
    },

    ' tbody tr': {
      ':nth-child(odd)': {
        background: 'rgba(255, 255, 255, 0.05)',
      },

      ':nth-child(even)': {
        background: 'rgba(0, 0, 0, 0.05)',
      },
    },
  }),

  btn: css({
    width: '100%',
    height: '100%',
    fontSize: 'inherit',
    textAlign: 'left',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    transition: 'background 0.25s',

    ':hover': {
      background: 'rgba(0, 161, 255, 0.1)',
    }
  }),

  name: css({
    color: '#b4fbb4',
  }),

  url: css({
    color: '#00e7ff',
  }),

  status: css({
    fontWeight: 'bold',

    '.is--good': {
      color: '#00a284',
    },

    '.is--bad': {
      color: '#ca3800',
    },
  }),

  duration: css({
    fontWeight: 'bold',

    '.is--good': {
      color: '#00a284',
    },

    '.is--bad': {
      color: '#ca3800',
    },
  }),

  paddedCell: css({
    padding: '0.5em',
  }),

  modal: css({
    padding: '2em 1em 1em 1em',
    background: '#343e46',
    overflow: 'auto',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    transform: 'translateX(-100%)',
    transition: 'transform 0.5s',

    '.is--open': {
      transform: 'translateX(0%)',
    }
  }),

  closeRegion: css({
    width: '100%',
    background: 'transparent',
    border: 'none',
    outline: 'none',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    cursor: 'pointer',
  }),

  fakeCloseBtn: css({
    color: '#eee',
    padding: '0.25em',
    fontSize: '1em',
    background: 'transparent',
    border: 'none',
    position: 'absolute',
    top: '0.25em',
    right: '0.25em',
    pointerEvents: 'none',
  }),
};

export default styles;