import { css } from 'glamor';

const animSpeed = '300ms';

const animations = {
  fromBottom: css.keyframes('fromCenter', {
    '0%': {
      opacity: 0,
      transform: 'translate(0%, 10%)',
    },
    '100%': {
      opacity: 1,
      transform: 'translate(0%, 0%)',
    }
  }),

  fromLeft: css.keyframes('fromLeft', {
    '0%': {
      transform: 'translateX(-100%)',
    },
    '100%': {
      transform: 'translateX(0%)',
    }
  }),

  fromRight: css.keyframes('fromRight', {
    '0%': {
      transform: 'translateX(100%)',
    },
    '100%': {
      transform: 'translateX(0%)',
    }
  }),

  fromCenterToLeft: css.keyframes('fromCenterToLeft', {
    '0%': {
      transform: 'translateX(0%)',
    },
    '100%': {
      transform: 'translateX(-100%)',
    }
  }),

  fromCenterToRight: css.keyframes('fromCenterToRight', {
    '0%': {
      transform: 'translateX(0%)',
    },
    '100%': {
      transform: 'translateX(100%)',
    }
  }),
};

const styles = {
  container: css({
    position: 'relative',
  }),

  panel: css({
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    transform: 'translateX(-100%)',
  }),

  slideFromBottom: css({
    animation: `${animations.fromBottom} ${animSpeed} forwards`,
  }),

  slideFromLeft: css({
    animation: `${animations.fromLeft} ${animSpeed} forwards`,
  }),

  slideFromRight: css({
    animation: `${animations.fromRight} ${animSpeed} forwards`,
  }),

  slideFromCenterToLeft: css({
    animation: `${animations.fromCenterToLeft} ${animSpeed} forwards`,
  }),

  slideFromCenterToRight: css({
    animation: `${animations.fromCenterToRight} ${animSpeed} forwards`,
  }),
};

export default styles;