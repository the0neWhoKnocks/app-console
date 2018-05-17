import React from 'react';
import { shallow } from 'enzyme';
import ConsolePluginError from './index';

describe('ConsolePluginError', () => {

  it('should render error text in a consistently styled wrapper', () => {
    const errMsg = 'Something bad happened!!!';
    const wrapper = shallow(<ConsolePluginError>{errMsg}</ConsolePluginError>);

    expect(wrapper.text()).toEqual(errMsg);
  });
});
