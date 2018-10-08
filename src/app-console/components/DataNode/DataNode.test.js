import React from 'react';
import { mount, shallow } from 'enzyme';
import DataNode from './index';
import styles from './styles';

describe('DataNode', () => {
  let data;
  let items;
  let wrapper;

  it('should sort by default', () => {
    data = {
      z: 'end val',
      a: 'start val',
    };
    wrapper = shallow(<DataNode data={data} />);
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
    wrapper = shallow(<DataNode data={data} sort={false} />);
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
    wrapper = mount(<DataNode data={data} />);
    items = wrapper.find('DataBranch');

    expect(items.get(0).props.inputID).toBe('fu');
    expect(items.get(1).props.inputID).toBe('fu_bar');
  });

  it('should have children expanded if they only have one level', () => {
    data = {
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
    wrapper = mount(<DataNode data={data} />);
    items = wrapper.find('DataBranch');

    expect(items.get(0).props.toggled).toBe(true);
    expect(items.get(1).props.toggled).toBe(true);
    expect(items.get(2).props.toggled).toBe(true);
    expect(items.get(3).props.toggled).toBe(true);
    expect(items.get(4).props.toggled).toBe(true);
  });

  it('should apply proper prop-type CSS classes', () => {
    data = {
      bool: true,
      func: () => {},
      num: 1337,
      str: 'hello world',
    };
    wrapper = shallow(<DataNode data={data} />);
    items = wrapper.find('li');

    expect(items.get(0).key).toBe('bool');
    expect(items.get(0).props.children[1].props.children[2].props.className).toBe(`${styles.isBool}`);
    expect(items.get(1).key).toBe('func');
    expect(items.get(1).props.children[1].props.children[2].props.className).toBe(`${styles.isFunc}`);
    expect(items.get(2).key).toBe('num');
    expect(items.get(2).props.children[1].props.children[2].props.className).toBe(`${styles.isNum}`);
    expect(items.get(3).key).toBe('str');
    expect(items.get(3).props.children[1].props.children[2].props.className).toBe(`${styles.isStr}`);
  });

  it('should account for empty prop types', () => {
    data = {
      emptyArray: [],
      emptyObject: {},
      isANull: null,
    };
    wrapper = shallow(<DataNode data={data} />);
    items = wrapper.find('li');

    expect(items.get(0).key).toBe('emptyArray');
    expect(items.get(0).props.children[1].props.children[2].props.children).toBe('[ ]');
    expect(items.get(1).key).toBe('emptyObject');
    expect(items.get(1).props.children[1].props.children[2].props.children).toBe('{ }');
    expect(items.get(2).key).toBe('isANull');
    expect(items.get(2).props.children[1].props.children[2].props.children).toBe('null');
  });

  it('should allow for props with same names but different letter-casing', () => {
    data = {
      Prop: [],
      prop: {},
    };
    wrapper = shallow(<DataNode data={data} />);
    items = wrapper.find('li');

    expect(items.get(0).key).toBe('Prop');
    expect(items.get(1).key).toBe('prop');
  });
});
