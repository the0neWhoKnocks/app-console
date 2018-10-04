import React from 'react';
import { mount, render } from 'enzyme';
import setTransitionState from '../../utils/setTransitionState';
import { transitionEnd } from '../../utils/prefixTransition';
import DataTree from '../DataTree';
import DataBranch from './index';
import styles from './styles';

jest.mock('../../utils/setTransitionState');
jest.mock('../DataTree');

describe('DataBranch', () => {
  let wrapper;
  let instance;

  beforeEach(() => {
    DataTree.mockReturnValue(null);
  });

  it('should set default state', () => {
    instance = mount(<DataBranch />).instance();

    expect(instance.state).toEqual({
      branchData: null,
      heightClass: '',
      childStyles: undefined,
      toggled: false,
    });
  });

  it('should display data if toggled by default', () => {
    const branchProps = {
      data: {
        stuff: [],
      },
      parKey: 'someKey',
      sort: true,
      toggled: true,
    };
    instance = mount(<DataBranch { ...branchProps } />).instance();

    expect(instance.state).toEqual(expect.objectContaining({
      branchData: (
        <DataTree
          data={ branchProps.data }
          par={ branchProps.parKey }
          sort={ branchProps.sort }
        />
      ),
    }));
  });

  describe('getExpandedHeight', () => {

    it("should get the full height of a branch in it's expanded state", () => {
      const autoHeight = `${styles.autoHeight}`;
      const mockEl = {
        classList: {
          add: jest.fn(() => {
            mockEl.offsetHeight = 300;
          }),
          remove: jest.fn(() => {
            mockEl.offsetHeight = 0;
          }),
        },
        offsetHeight: 0,
      };
      instance = mount(<DataBranch />).instance();
      instance.childrenEl = mockEl;

      // Unfortunately JSDom doesn't calculate height so this is just verifying
      // functions are called.
      const expandedHeight = instance.getExpandedHeight();

      expect(expandedHeight).toEqual(300);
      expect(mockEl.classList.add).toHaveBeenCalledWith(autoHeight);
      expect(mockEl.classList.remove).toHaveBeenCalledWith(autoHeight);
    });
  });

  describe('executeTransition', () => {
    it('should open & close the branch', () => {
      let instanceCTX;
      let transitionStateCB;
      let checked;
      let expandedHeight = 100;
      instance = mount(<DataBranch />).instance();
      instance.childrenEl = {
        addEventListener: jest.fn(),
      };
      checked = true;
      instance.getExpandedHeight = jest.fn(() => expandedHeight);
      instance.handleTransitionEnd = jest.fn();
      setTransitionState.mockImplementation((ctx, state, cb) => {
        instanceCTX = ctx;
        if(cb) transitionStateCB = cb;
      });

      instance.executeTransition(checked);
      transitionStateCB();

      expect(instance.childrenEl.addEventListener).toHaveBeenCalledWith(
        transitionEnd,
        instance.transitionCB,
        false
      );
      expect(setTransitionState).toHaveBeenCalledWith(
        instanceCTX,
        {
          childStyles: {
            height: `${expandedHeight}px`,
          },
          heightClass: 'is--opening',
          toggled: checked,
        },
        transitionStateCB,
      );

      // close
      checked = false;

      instance.executeTransition(checked);
      transitionStateCB();

      expect(setTransitionState).toHaveBeenCalledWith(
        instanceCTX,
        {
          childStyles: {
            height: `${expandedHeight}px`,
          },
          heightClass: 'is--closing',
          toggled: checked,
        },
        transitionStateCB,
      );
      expect(setTransitionState).toHaveBeenCalledWith(
        instanceCTX,
        {
          childStyles: {
            height: '0px',
          },
        }
      );
    });
  });

  describe('handleToggle', () => {
    let checked;

    beforeEach(() => {
      wrapper = mount(<DataBranch />);
      instance = wrapper.instance();
      instance.executeTransition = jest.fn();
    });

    it('should load the data only after a user opened a data node', () => {
      const treeProps = {
        data: {
          items: [],
        },
        parKey: 'someProp',
        sort: true,
      };
      wrapper.setProps(treeProps);
      checked = true;
      instance.inputEl = { checked };

      expect(instance.state.branchData).toBe(null);

      instance.handleToggle();
      wrapper.update();

      expect(instance.executeTransition).toHaveBeenCalledWith(checked);
      expect(instance.state.branchData).toEqual(
        <DataTree data={ treeProps.data } par={ treeProps.parKey } sort={ treeProps.sort } />
      );
    });

    it('should just close the data node', () => {
      checked = false;
      instance.inputEl = { checked };

      expect(instance.state.branchData).toBe(null);

      instance.handleToggle();
      wrapper.update();

      expect(instance.executeTransition).toHaveBeenCalledWith(checked);
      expect(instance.state.branchData).toBe(null);
    });
  });

  describe('handleTransitionEnd', () => {
    let removeStub;

    beforeEach(() => {
      removeStub = jest.fn();
      wrapper = mount(<DataBranch />);
      instance = wrapper.instance();
      instance.childrenEl = {
        removeEventListener: removeStub,
      };
      instance.transitionCB = jest.fn();
    });

    it('should remove listener', () => {
      instance.handleTransitionEnd();

      expect(removeStub).toHaveBeenCalledWith(
        transitionEnd,
        instance.transitionCB
      );
      expect(instance.state).toEqual(expect.objectContaining({
        childStyles: {
          height: '',
        },
        heightClass: '',
      }));
    });

    it('should set the height to auto so child branches can open and close freely', () => {
      wrapper.setState({ toggled: true });
      wrapper.update();

      instance.handleTransitionEnd();
      wrapper.update();

      expect(instance.state).toEqual(expect.objectContaining({
        childStyles: {
          height: 'auto',
        },
        heightClass: 'is--open',
      }));
    });
  });
});
