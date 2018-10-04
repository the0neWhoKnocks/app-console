import React from 'react';
import { func, shape } from 'prop-types';
import ConsolePluginError from '../../ConsolePluginError';
import Toggle from '../../Toggle';
import styles from './styles';

const updateQuery = ({ flags, setFlags }, ev) => {
  const el = ev.currentTarget;
  const flagName = el.dataset.name;
  const isToggled = el.checked;
  const paramName = `flags.${flagName}`;
  const param = `${paramName}=${isToggled || ''}`;
  let params = (window.location.search)
    ? window.location.search.replace('?', '').split('&')
    : [];

  params = params.filter(p => !p.includes(paramName));
  params.push(param);

  const newURL = `${window.location.origin}${window.location.pathname}?${params.join('&')}`;

  window.history.replaceState('', '', newURL);

  setFlags(Object.assign({}, flags, {
    [flagName]: isToggled,
  }));
};

const FeatureFlags = ({ flags, setFlags }) => {
  if (!Object.keys(flags).length) {
    return (
      <ConsolePluginError>
        No <code>flags</code> data was provided.
      </ConsolePluginError>
    );
  }

  const boundUpdate = updateQuery.bind(null, { flags, setFlags });

  return (
    <ul className={`${styles.root}`}>
      {Object.keys(flags)
        .sort((a, b) => {
          if (a < b) return -1;
          else if (a > b) return 1;
          return 0;
        })
        .map((flag) => {
          const enabled = !!flags[flag];
          const icon = (enabled) ? 'check_circle' : 'cancel';
          const enabledClass = (enabled) ? 'is--enabled' : 'is--disabled';
          return (
            <li className={`${styles.li}`} key={flag}>
              <Toggle
                data={{
                  'data-name': flag,
                }}
                id={`flagToggle_${flag}`}
                onToggle={boundUpdate}
                rootClass={`${styles.flagToggle}`}
                title="Click to toggle feature"
                toggled={enabled}
              >
                <i className={`material-icons ${styles.icon} ${enabledClass}`}>{icon}</i>
                <span className={`${styles.flagName}`}>{flag}</span>
              </Toggle>
            </li>
          );
        })}
    </ul>
  );
};

FeatureFlags.defaultProps = {
  flags: {},
  setFlags: () => {},
};
FeatureFlags.propTypes = {
  // The feature flags
  flags: shape({}),
  // A handler that changes the state of a feature flag
  setFlags: func,
};

export default FeatureFlags;
export {
  updateQuery,
};
