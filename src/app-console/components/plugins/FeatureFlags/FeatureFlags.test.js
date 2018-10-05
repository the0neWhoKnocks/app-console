import React from 'react';
import { shallow } from 'enzyme';
import FeatureFlags, {
  QUERY_PREFIX,
  updateQuery,
} from './index';
import styles from './styles';

describe('FeatureFlags', () => {
  const flagNames = ['flag1', 'flag2'];
  let flags;
  let wrapper;
  let props;
  let ev;

  beforeEach(() => {
    flags = {
      [flagNames[0]]: true,
      [flagNames[1]]: false,
    };
    ev = {
      currentTarget: {
        checked: flags[flagNames[0]],
        dataset: {
          name: flagNames[0],
        },
      },
    };
  });

  it('should display an error if no `flags` were passed in', () => {
    wrapper = shallow(<FeatureFlags />);

    expect(wrapper.find('ConsolePluginError').length).toBe(1);
    expect(wrapper.find(`.${styles.root}`).length).toBe(0);
  });

  it('should display the flags interface', () => {
    props = {
      flags: {
        z: true,
        a: false,
      },
    };
    wrapper = shallow(<FeatureFlags {...props} />);

    expect(wrapper.find('ConsolePluginError').length).toBe(0);
    expect(wrapper.find(`.${styles.root}`).length).toBe(1);

    wrapper.find('Toggle').forEach((toggle, ndx) => {
      // validates sorting and toggled
      if(ndx === 0){
        expect(toggle.props()).toEqual(expect.objectContaining({
          data: {
            'data-name': 'a',
          },
          id: 'flagToggle_a',
          title: 'Click to toggle feature',
          toggled: false,
        }));

        // validate styling and icon
        expect(toggle.find('i').props()).toEqual(expect.objectContaining({
          className: `material-icons ${styles.icon} is--disabled`,
          children: 'cancel',
        }));
        // validate flag name is displayed
        expect(toggle.find('span').props()).toEqual(expect.objectContaining({
          children: 'a',
        }));
      }
      else{
        expect(toggle.props()).toEqual(expect.objectContaining({
          data: {
            'data-name': 'z',
          },
          id: 'flagToggle_z',
          title: 'Click to toggle feature',
          toggled: true,
        }));

        // validate styling and icon
        expect(toggle.find('i').props()).toEqual(expect.objectContaining({
          className: `material-icons ${styles.icon} is--enabled`,
          children: 'check_circle',
        }));
        // validate flag name is displayed
        expect(toggle.find('span').props()).toEqual(expect.objectContaining({
          children: 'z',
        }));
      }
    });
  });

  it('should call default `setFlags` method', () => {
    const setFlagsSpy = jest.spyOn(FeatureFlags.defaultProps, 'setFlags');
    props = {
      flags,
    };
    wrapper = shallow(<FeatureFlags {...props} />);
    const firstToggle = shallow(wrapper.find('Toggle').get(0));

    firstToggle.find('input').simulate('change', ev);

    expect(setFlagsSpy).toHaveBeenCalled();
  });

  describe('updateQuery', () => {
    let opts;
    let setFlags;

    beforeEach(() => {
      setFlags = jest.fn();
      opts = {
        flags,
        setFlags,
      };

      window.history.replaceState('', '', `${window.location.origin}${window.location.pathname}`);
    });

    it('should change the state of a flag and update the query param', () => {
      const paramName = `${ QUERY_PREFIX }${ flagNames[0] }`;

      expect(window.location.search).toEqual('');

      ev.currentTarget.checked = false;
      updateQuery(opts, ev);

      expect(setFlags).toHaveBeenCalledWith(expect.objectContaining({
        [flagNames[0]]: false,
      }));
      expect(window.location.search).toEqual(`?${ paramName }=`);

      ev.currentTarget.checked = true;
      updateQuery(opts, ev);

      expect(window.location.search).toEqual(`?${ paramName }=true`);
    });

    it('should account for multiple query params', () => {
      const param = 'fu=bar';
      const paramName = `${ QUERY_PREFIX }${ flagNames[0] }`;
      window.history.replaceState('', '', `${window.location.origin}${window.location.pathname}?${paramName}=true&${param}`);

      ev.currentTarget.checked = false;
      updateQuery(opts, ev);
      expect(window.location.search).toEqual(`?${param}&${ paramName }=`);

      ev.currentTarget.checked = true;
      updateQuery(opts, ev);
      expect(window.location.search).toEqual(`?${param}&${ paramName }=true`);
    });
  });
});
