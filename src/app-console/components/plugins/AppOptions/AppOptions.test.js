import React from 'react';
import { shallow } from 'enzyme';
import AppOptions, {
  updateQuery,
} from './index';
import styles from './styles';

describe('AppOptions', () => {
  const optionNames = ['option1', 'option2'];
  let options;
  let sections;
  let wrapper;
  let props;
  let ev;
  let handler;

  beforeEach(() => {
    options = {
      [optionNames[0]]: true,
      [optionNames[1]]: false,
    };
    handler = 'callbackName';
    sections = [
      {
        addParam: true,
        handler,
        options: {
          z: true,
          a: false,
        },
        queryPrefix: 'prefix.',
      },
      {
        addParam: true,
        handler,
        options: {
          z: true,
          a: false,
        },
      },
      {
        handler,
        options: {
          b: false,
          z: true,
          a: false,
        },
        title: 'Section Title',
      },
    ];
    ev = {
      currentTarget: {
        checked: options[optionNames[0]],
        dataset: {
          handler,
          name: optionNames[0],
        },
      },
    };
  });

  it('should handle missing data gracefully', () => {
    expect(() => {
      wrapper = shallow(<AppOptions />);
      expect(wrapper.html()).toEqual('');
    }).not.toThrow();
  });

  it('should display the Options interface', () => {
    jest.spyOn(updateQuery, 'bind');
    props = { sections };
    wrapper = shallow(<AppOptions {...props} />);

    expect(wrapper.find('ConsolePluginError').length).toBe(0);
    expect(wrapper.find(`.${styles.list}`).length).toBe(sections.length);

    wrapper.find(`.${styles.section}`).forEach((section, sectionNdx) => {
      const sectionData = sections[sectionNdx];
      
      if (sectionNdx === 0) {
        expect(updateQuery.bind).toHaveBeenCalledWith(null, expect.objectContaining({
          queryPrefix: sectionData.queryPrefix,
        }));
        
        section.find('Toggle').forEach((toggle, ndx) => {
          // validates sorting and toggled
          if (ndx === 0) {
            expect(toggle.props()).toEqual(expect.objectContaining({
              data: expect.objectContaining({
                'data-name': 'a',
              }),
              id: 'optionToggle_a',
              title: 'Click to toggle option',
              toggled: false,
            }));

            // validate styling and icon
            expect(toggle.find('i').props()).toEqual(expect.objectContaining({
              className: `material-icons ${styles.icon} is--disabled`,
              children: 'cancel',
            }));
            // validate option name is displayed
            expect(toggle.find('span').props()).toEqual(expect.objectContaining({
              children: 'a',
            }));
          } else {
            expect(toggle.props()).toEqual(expect.objectContaining({
              data: expect.objectContaining({
                'data-name': 'z',
              }),
              id: 'optionToggle_z',
              title: 'Click to toggle option',
              toggled: true,
            }));

            // validate styling and icon
            expect(toggle.find('i').props()).toEqual(expect.objectContaining({
              className: `material-icons ${styles.icon} is--enabled`,
              children: 'check_circle',
            }));
            // validate option name is displayed
            expect(toggle.find('span').props()).toEqual(expect.objectContaining({
              children: 'z',
            }));
          }
        });
      } else if(sectionNdx === 1) {
        expect(updateQuery.bind).toHaveBeenCalledWith(null, expect.objectContaining({
          queryPrefix: AppOptions.defaultProps.queryPrefix,
        }));
      } else {
        expect(section.find(`.${styles.sectionHeader}`).text()).toEqual(sectionData.title);
        expect(updateQuery.bind).toHaveBeenCalledWith(null, expect.objectContaining({
          addParam: undefined,
        }));
      }
    });
  });

  it('should call default `changeOptions` method', () => {
    const changeOptionsSpy = jest.spyOn(AppOptions.defaultProps, 'changeOptions');
    props = { sections };
    wrapper = shallow(<AppOptions {...props} />);
    const firstToggle = shallow(wrapper.find('Toggle').get(0));

    firstToggle.find('input').simulate('change', ev);

    expect(changeOptionsSpy).toHaveBeenCalled();
  });

  describe('updateQuery', () => {
    let opts;
    let changeOptions;
    let queryPrefix;

    beforeEach(() => {
      changeOptions = jest.fn();
      queryPrefix = '';
      opts = {
        addParam: true,
        changeOptions,
        options,
        queryPrefix,
      };

      window.history.replaceState('', '', `${window.location.origin}${window.location.pathname}`);
    });

    it('should change the state of an option and update the query param', () => {
      opts.queryPrefix = 'prefix.';
      const paramName = `${opts.queryPrefix}${optionNames[0]}`;

      expect(window.location.search).toEqual('');

      ev.currentTarget.checked = false;
      updateQuery(opts, ev);

      expect(changeOptions).toHaveBeenCalledWith(expect.objectContaining({
        [optionNames[0]]: false,
      }), handler);
      expect(window.location.search).toEqual(`?${paramName}=`);

      ev.currentTarget.checked = true;
      updateQuery(opts, ev);

      expect(window.location.search).toEqual(`?${paramName}=true`);
    });

    it('should account for multiple query params', () => {
      const param = 'fu=bar';
      const paramName = optionNames[0];
      window.history.replaceState('', '', `${window.location.origin}${window.location.pathname}?${paramName}=true&${param}`);

      ev.currentTarget.checked = false;
      updateQuery(opts, ev);
      expect(window.location.search).toEqual(`?${param}&${paramName}=`);

      ev.currentTarget.checked = true;
      updateQuery(opts, ev);
      expect(window.location.search).toEqual(`?${param}&${paramName}=true`);
    });

    it('should NOT update query params', () => {
      opts.addParam = false;
      window.history.replaceState('', '', `${window.location.origin}${window.location.pathname}`);

      ev.currentTarget.checked = false;
      updateQuery(opts, ev);
      expect(window.location.search).toEqual('');
    });
  });
});
