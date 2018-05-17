import React from 'react';
import { mount, shallow } from 'enzyme';
import DataTree from './index';
import styles from './styles';

describe('DataTree', () => {
  let data;
  let items;
  let wrapper;

  it('should sort by default', () => {
    data = {
      z: 'end val',
      a: 'start val',
    };
    wrapper = shallow(<DataTree data={data} />);
    items = wrapper.find('li');

    expect(items.length).toBe(Object.keys(data).length);
    expect(items.get(0).key).toBe('a');
    expect(items.get(1).key).toBe('z');
  });

  it("shouldn't sort items", () => {
    data = {
      z: 'end val',
      a: 'start val',
    };
    wrapper = shallow(<DataTree data={data} sort={false} />);
    items = wrapper.find('li');

    expect(items.length).toBe(Object.keys(data).length);
    expect(items.get(0).key).toBe('z');
    expect(items.get(1).key).toBe('a');
  });

  it('should build out a nested `key` based on prop names', () => {
    data = {
      fu: {
        bar: {
          val: true
        },
      },
    };
    wrapper = mount(<DataTree data={data} />);
    items = wrapper.find('DataBranch');

    expect(items.get(0).props.inputID).toBe('fu');
    expect(items.get(1).props.inputID).toBe('fu_bar');
  });

  it('should have children expanded if they only have one level', () => {
    data = {
      str: 'hi',
      zis: {
        is: {
          a: {
            heavily: {
              nested: {
                obj: true,
              },
            },
          }
        },
      },
    };
    wrapper = mount(<DataTree data={data} />);
    items = wrapper.find('DataBranch');

    expect(items.get(0).props.toggled).toBe(false);
    expect(items.get(1).props.toggled).toBe(true);
    expect(items.get(2).props.toggled).toBe(true);
    expect(items.get(3).props.toggled).toBe(true);
    expect(items.get(4).props.toggled).toBe(true);
  });

  it('should apply proper prop-type CSS classes', () => {
    data = {
      bool: true,
      num: 1337,
      str: 'hello world',
    };
    wrapper = shallow(<DataTree data={data} />);
    items = wrapper.find('li');

    expect(items.get(0).key).toBe('bool');
    expect(items.get(0).props.children[1].props.children[2].props.className).toBe(`${styles.isBool}`);
    expect(items.get(1).key).toBe('num');
    expect(items.get(1).props.children[1].props.children[2].props.className).toBe(`${styles.isNum}`);
    expect(items.get(2).key).toBe('str');
    expect(items.get(2).props.children[1].props.children[2].props.className).toBe(`${styles.isStr}`);
  });
});
