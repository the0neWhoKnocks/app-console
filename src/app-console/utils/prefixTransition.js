const endPrefixes = {
  WebkitTransition: 'webkitTransitionEnd',
  MozTransition: 'transitionend',
  MSTransition: 'msTransitionEnd',
  OTransition: 'oTransitionEnd',
  transition: 'transitionend'
};

const getTransition = (prefixes) => {
  const el = document.createElement('div');
  let prefix;

  for(let t in prefixes){
    if(el.style[t] !== undefined){
      prefix = prefixes[t];
      break;
    }
  }

  return prefix;
};

const transitionEnd = getTransition(endPrefixes);

export {
  transitionEnd,
};
