import React from 'react';
import { mount, shallow } from 'enzyme';
import Slide from './index';
import styles from './styles';

describe('Slide', () => {
  let wrapper;
  let instance;

  it("shouldn't have any items on initialization", () => {
    wrapper = mount(<Slide />);
    instance = wrapper.instance();

    expect(instance.state).toEqual({
      items: [],
      ndx: undefined,
      prevNdx: undefined,
    });
  });

  it('should add an item at the specified index', () => {
    const props = {
      component: {
        Component: () => (<div />),
        key: 'testConsolePlugin',
      },
      ndx: 1,
    };
    instance = mount(<Slide {...props} />).instance();

    expect(instance.state.items.length).toBe(2);
    expect(instance.state.items[0]).toBeUndefined();
    expect(instance.state.items[1].Component).toBeInstanceOf(Function);
  });

  it('should insert a new item at the specified index to maintain display order', () => {
    const item1Text = 'Component #1';
    const item2Text = 'Component #2';
    const item1 = {
      component: {
        Component: () => (<div>{item1Text}</div>),
        key: 'testConsolePlugin1',
      },
      ndx: 0,
    };
    const item2 = {
      component: {
        Component: () => (<div>{item2Text}</div>),
        key: 'testConsolePlugin2',
      },
      ndx: 1,
    };
    wrapper = mount(<Slide {...item1} />);
    instance = wrapper.instance();
    wrapper.setProps(item2);
    const items = wrapper.find('Component');

    expect(instance.state.items.length).toBe(2);
    expect(shallow(items.get(0)).text()).toEqual(item1Text);
    expect(shallow(items.get(1)).text()).toEqual(item2Text);
  });

  it('should slide the first item from the bottom', () => {
    const props = {
      component: {
        Component: () => (<div />),
        key: 'testConsolePlugin',
      },
      ndx: 1,
    };
    const panelClass = `.${styles.slideFromBottom}`;
    wrapper = mount(<Slide {...props} />);

    expect(wrapper.find(panelClass).length).toBe(1);
  });

  it('should slide items from side to side', () => {
    const item1Text = 'Component #1';
    const item2Text = 'Component #2';
    const item1 = {
      component: {
        Component: () => (<div>{item1Text}</div>),
        key: 'testConsolePlugin1',
      },
      ndx: 0,
    };
    const item2 = {
      component: {
        Component: () => (<div>{item2Text}</div>),
        key: 'testConsolePlugin2',
      },
      ndx: 1,
    };
    const fromRight = `.${styles.slideFromRight}`;
    const fromLeft = `.${styles.slideFromLeft}`;
    const toRight = `.${styles.slideFromCenterToRight}`;
    const toLeft = `.${styles.slideFromCenterToLeft}`;
    wrapper = mount(<Slide {...item1} />);

    wrapper.setProps(item2);
    const rightEl = wrapper.find(fromRight);
    let centerEl = wrapper.find(toLeft);
    expect(rightEl.length).toBe(1);
    expect(shallow(rightEl.find('Component').get(0)).text()).toBe(item2Text);
    expect(centerEl.length).toBe(1);
    expect(shallow(centerEl.find('Component').get(0)).text()).toBe(item1Text);

    wrapper.setProps(item1);
    const leftEl = wrapper.find(fromLeft);
    centerEl = wrapper.find(toRight);
    expect(leftEl.length).toBe(1);
    expect(shallow(leftEl.find('Component').get(0)).text()).toBe(item1Text);
    expect(centerEl.length).toBe(1);
    expect(shallow(centerEl.find('Component').get(0)).text()).toBe(item2Text);
  });
});
