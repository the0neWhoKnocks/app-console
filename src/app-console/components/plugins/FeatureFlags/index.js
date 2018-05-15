import React from 'react';
import ConsolePluginError from '../../ConsolePluginError';
import Toggle from '../../Toggle';
import styles from './styles';

const ConsoleFeatureFlags = ({ flags, setFlags }) => {
  const updateQuery = (ev) => {
    const el = ev.currentTarget;
    const param = `${el.dataset.name}=${el.checked}`;
    let params = (window.location.search)
      ? window.location.search.replace('?', '').split('&')
      : [];

    params = params.filter((p) => p.indexOf(el.dataset.name));
    params.push(param);

    const newURL = `${window.location.origin}${window.location.pathname}${(params.length ? '?' : '')}${params.join('&')}`;

    window.history.replaceState('', '', newURL);

    setFlags(Object.assign({}, flags, {
      [el.dataset.name]: el.checked,
    }));
  };

  if(!flags || !Object.keys(flags).length){
    return (
      <ConsolePluginError>
        No <code>flags</code> data was provided.
      </ConsolePluginError>
    );
  }

  return (
    <ul className={`${styles.root}`}>
      {Object.keys(flags)
        .sort((a, b) => a > b)
        .map((flag) => {
          const enabled = flags[flag];
          const icon = (enabled) ? 'check_circle' : 'cancel';
          const enabledClass = (enabled) ? 'is--enabled' : 'is--disabled';
          return (
            <li className={`${styles.li}`} key={flag}>
              <Toggle
                data={{
                  'data-name': flag,
                }}
                id={`flagToggle_${flag}`}
                onToggle={updateQuery}
                rootClass={`${styles.flagToggle}`}
                title="Click to toggle feature"
                toggled={enabled}
              >
                <i className={`material-icons ${styles.icon} ${enabledClass}`}>{icon}</i>
                <span className={`${styles.flagName}`}>{flag}</span>
              </Toggle>
            </li>
          );
        }
        )}
    </ul>
  );
};

export default ConsoleFeatureFlags;
