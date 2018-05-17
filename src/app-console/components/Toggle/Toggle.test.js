import React from 'react';
import { shallow } from 'enzyme';
import Toggle from './index';

describe('Toggle', () => {
  const requiredProps = {
    id: 'testToggle',
  };

  it('should not be toggled by default', () => {
    const wrapper = shallow(<Toggle {...requiredProps} />);
    const props = wrapper.find('input').props();

    expect(props).toEqual(expect.objectContaining({
      defaultChecked: false,
      id: requiredProps.id,
      onChange: undefined,
    }));
  });

  it('should add what ever label the user set', () => {
    const labelText = 'hello';
    const label = <div>{labelText}</div>;
    const wrapper = shallow(<Toggle {...requiredProps}>{label}</Toggle>);
    const props = wrapper.find('label').props();

    expect(props).toEqual(expect.objectContaining({
      htmlFor: requiredProps.id,
    }));
    expect(shallow(props.children).text()).toEqual(labelText);
  });

  it('should call handler on toggle change', () => {
    const props = {
      toggled: true,
      onToggle: jest.fn(),
    };
    const wrapper = shallow(<Toggle {...requiredProps} {...props} />);
    const input = wrapper.find('input');

    expect(props.onToggle).not.toHaveBeenCalled();
    input.simulate('change');
    expect(props.onToggle).toHaveBeenCalled();
  });
});
