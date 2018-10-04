import React, { Fragment } from 'react';
import { array, bool, object, oneOfType, string } from 'prop-types';
import DataBranch from '../DataBranch';
import styles from './styles';

const DataTree = ({
  data,
  par,
  sort,
}) => {
  let childKeys = Object.keys(data);

  if (sort && !Array.isArray(data)) {
    childKeys = childKeys.sort((a, b) => {
      /* eslint-disable no-param-reassign */
      a = a.toLowerCase();
      b = b.toLowerCase();

      if (a < b) return -1;
      else if (a > b) return 1;
      return 0;
      /* eslint-enable */
    });
  }

  const children = childKeys.map((key) => {
    const item = data[key];
    const itemIsArray = Array.isArray(item);
    const parKey = (par) ? `${par}_${key}` : key;
    let hasChildren = false;
    let childrenToggled = false;
    let val;

    if (
      itemIsArray
      || typeof item === 'object'
    ) {
      if (itemIsArray && !item.length) {
        val = <span className={`${styles.isStr}`}>{`[ ]`}</span>;
      } else if (item === null) {
        val = <span className={`${styles.isNull}`}>{`null`}</span>;
      } else if (typeof item === 'object' && !Object.keys(item).length) {
        val = <span className={`${styles.isStr}`}>{`{ }`}</span>;
      } else {
        hasChildren = true;
      }
    } else {
      switch (typeof item) {
        case 'boolean':
          val = <span className={`${styles.isBool}`}>{`${item}`}</span>;
          break;

        case 'string':
          val = <span className={`${styles.isStr}`}>{`"${item}"`}</span>;
          break;

        case 'function':
          val = <span className={`${styles.isFunc}`}>{'Function'}</span>;
          break;

        default:
          val = <span className={`${styles.isNum}`}>{item}</span>;
      }
    }

    // Have the items with only one level be checked (open) so that there's less to click through
    if (hasChildren && childKeys.length === 1) {
      childrenToggled = true;
    }

    return (
      <li key={parKey} className={`${styles.li} ${(hasChildren) ? 'is--parent' : ''}`}>
        {hasChildren && (
          <DataBranch
            data={item}
            inputID={parKey}
            labelClass={`${styles.isProp}`}
            labelText={key}
            parKey={parKey}
            sort={sort}
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

DataTree.propTypes = {
  data: oneOfType([
    array,
    object,
  ]),
  par: string,
  sort: bool,
};
DataTree.defaultProps = {
  data: {},
  sort: true,
};

export default DataTree;
