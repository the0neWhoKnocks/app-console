import React, { Fragment } from 'react';
import { array, bool, object, oneOfType, string } from 'prop-types';
import DataBranch from '../DataBranch';
import styles from './styles';

const DataTree = ({ data, par, sort }) => {
  let childKeys = Object.keys(data);

  if (sort) childKeys = childKeys.sort((a, b) => a > b);

  const children = childKeys.map((key) => {
    const item = data[key];
    const parKey = (par) ? `${par}_${key}` : key;
    let hasChildren = false;
    let childrenToggled = false;
    let val;

    if (
      Array.isArray(item)
      || typeof item === 'object'
    ) {
      hasChildren = true;
      val = <DataTree data={item} par={parKey} sort={sort} />;
    }
    else {
      if (typeof item === 'boolean') val = <span className={`${styles.isBool}`}>{`${item}`}</span>;
      else if (typeof item === 'string') val = <span className={`${styles.isStr}`}>&quot;{item}&quot;</span>;
      else val = <span className={`${styles.isNum}`}>{item}</span>;
    };

    // Have the items with only one level be checked (open) so that there's less to click through
    if (hasChildren && childKeys.length === 1) {
      childrenToggled = true;
    }

    return (
      <li key={parKey} className={`${styles.li} ${(hasChildren) ? 'is--parent' : ''}`}>
        {hasChildren && (
          <DataBranch
            branchData={val}
            inputID={parKey}
            labelClass={`${styles.isProp}`}
            labelText={key}
            toggled={childrenToggled}
          />
        )}
        {!hasChildren && (
          <Fragment>
            <span className={`${styles.isProp}`}>{key}</span>: {val}
          </Fragment>
        )}
      </li>
    );
  });

  return <ul className={(!par) ? `${styles.root}` : `${styles.ul}`} key={par}>{children}</ul>;
};

DataTree.defaultProps = {
  data: {},
  sort: true,
};
DataTree.propTypes = {
  data: oneOfType([
    array,
    object,
  ]),
  par: string,
  sort: bool,
};

export default DataTree;
