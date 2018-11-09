import React, { Fragment } from 'react';
import { arrayOf, func, shape, string } from 'prop-types';
import Toggle from '../../Toggle';
import styles from './styles';


const updateQuery = ({
  addParam,
  changeOptions,
  options,
  queryPrefix,
}, ev) => {
  const el = ev.currentTarget;
  const { handler, name } = el.dataset;
  const isToggled = el.checked;
  
  if (addParam) {
    const paramName = `${queryPrefix}${name}`;
    const param = `${paramName}=${isToggled || ''}`;
    let params = (window.location.search)
    ? window.location.search.replace('?', '').split('&')
    : [];
    
    params = params.filter(p => !p.includes(paramName));
    params.push(param);
    
    const newURL = `${window.location.origin}${window.location.pathname}?${params.join('&')}`;
    
    window.history.replaceState('', '', newURL);
  }

  const updatedOptions = Object.assign({}, options, { [name]: isToggled });
  changeOptions(updatedOptions, handler);
};

const AppOptions = ({
  changeOptions,
  queryPrefix: defaultPrefix,
  sections,
}) => {
  return (
    <Fragment>
      {sections.map(({ addParam, handler, options, queryPrefix, title }, ndx) => {
        const toggleHandler = updateQuery.bind(null, {
          addParam,
          changeOptions,
          options,
          queryPrefix: queryPrefix || defaultPrefix,
        });

        return (
          <div
            key={`${ndx}_${title}`}
            className={`${styles.section}`}
          >
            {title && <h3 className={`${styles.sectionHeader}`}>{title}</h3>}
            <ul className={`${styles.list}`}>{
              Object.keys(options)
                .sort((a, b) => (a < b) ? -1 : 1) // eslint-disable-line
                .map((option) => {
                  const enabled = !!options[option];
                  const icon = (enabled) ? 'check_circle' : 'cancel';
                  const enabledClass = (enabled) ? 'is--enabled' : 'is--disabled';
                  return (
                    <li className={`${styles.li}`} key={option}>
                      <Toggle
                        data={{
                          'data-name': option,
                          'data-handler': handler,
                        }}
                        id={`optionToggle_${option}`}
                        onToggle={toggleHandler}
                        rootClass={`${styles.toggle}`}
                        title="Click to toggle option"
                        toggled={enabled}
                      >
                        <i className={`material-icons ${styles.icon} ${enabledClass}`}>{icon}</i>
                        <span className={`${styles.name}`}>{option}</span>
                      </Toggle>
                    </li>
                  );
                })
            }</ul>
          </div>
        );
      })}
    </Fragment>
  );
};

AppOptions.defaultProps = {
  changeOptions: () => {},
  queryPrefix: '',
  sections: [],
};
AppOptions.propTypes = {
  changeOptions: func.isRequired,
  queryPrefix: string,
  sections: arrayOf(shape({
    options: shape({}).isRequired,
    title: string,
  })).isRequired,
};

export default AppOptions;
export {
  updateQuery,
};
