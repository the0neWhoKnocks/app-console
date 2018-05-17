import React from 'react';
import { mount, render } from 'enzyme';
import setTransitionState from '../../utils/setTransitionState';
import { transitionEnd } from '../../utils/prefixTransition';
import DataBranch from './index';
import styles from './styles';

jest.mock(
  '../../utils/setTransitionState',
  () => jest.genMockFromModule('../../utils/setTransitionState')
);

describe('DataBranch', () => {
  let wrapper;
  let instance;

  it('should set default state', () => {
    instance = mount(<DataBranch />).instance();

    expect(instance.state).toEqual({
      heightClass: '',
      styles: undefined,
      toggled: false,
    });
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

  describe('handleToggle', () => {

    it('should open & close the branch', () => {
      let instanceCTX;
      let transitionStateCB;
      instance = mount(<DataBranch />).instance();
      instance.childrenEl = {
        addEventListener: jest.fn(),
        classList: {
          add: jest.fn(),
          remove: jest.fn(),
        },
        offsetHeight: 30,
      };
      instance.inputEl = {
        checked: true,
      };
      instance.handleTransitionEnd = jest.fn();
      setTransitionState.mockImplementation((ctx, state, cb) => {
        instanceCTX = ctx;
        if(cb) transitionStateCB = cb;
      });

      instance.handleToggle();
      transitionStateCB();

      expect(instance.childrenEl.addEventListener).toHaveBeenCalledWith(
        transitionEnd,
        instance.transitionCB,
        false
      );
      expect(setTransitionState).toHaveBeenCalledWith(
        instanceCTX,
        {
          heightClass: 'is--opening',
          styles: {
            height: `${instance.childrenEl.offsetHeight}px`,
          },
          toggled: instance.inputEl.checked,
        },
        transitionStateCB,
      );

      // close
      instance.inputEl = {
        checked: false,
      };

      instance.handleToggle();
      transitionStateCB();

      expect(setTransitionState).toHaveBeenCalledWith(
        instanceCTX,
        {
          heightClass: 'is--closing',
          styles: {
            height: `${instance.childrenEl.offsetHeight}px`,
          },
          toggled: instance.inputEl.checked,
        },
        transitionStateCB,
      );
      expect(setTransitionState).toHaveBeenCalledWith(
        instanceCTX,
        {
          styles: {
            height: '0px',
          },
        }
      );
    });
  });

  describe('handleTransitionEnd', () => {
    let removeStub;
    let instance;

    beforeEach(() => {
      removeStub = jest.fn();
      instance = mount(<DataBranch />).instance();
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
        heightClass: '',
        styles: {
          height: '',
        },
      }));
    });

    it('should set the height to auto so child branches can open and close freely', (done) => {
      instance.setState({
        toggled: true,
      }, () => {
        instance.handleTransitionEnd();

        process.nextTick(() => {
          expect(instance.state).toEqual(expect.objectContaining({
            heightClass: 'is--open',
            styles: {
              height: 'auto',
            },
          }));

          done();
        });
      });
    });
  });
});
