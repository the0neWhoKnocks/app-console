import React from 'react';
import { shallow } from 'enzyme';
import AppStore from './index';

describe('AppStore', () => {
  let wrapper;

  it('should display an error if no `data` was passed in', () => {
    wrapper = shallow(<AppStore />);

    expect(wrapper.find('ConsolePluginError').length).toBe(1);
    expect(wrapper.find('DataTree').length).toBe(0);
  });

  it('should display the data that was passed in', () => {
    const data = {
      fu: 'bar',
    };
    wrapper = shallow(<AppStore data={data} />);

    expect(wrapper.find('ConsolePluginError').length).toBe(0);
    expect(wrapper.find('DataTree').length).toBe(1);
  });
});
