import React from 'react';
import { shallow } from 'enzyme';
import Providers from './index';
import styles from './styles';

describe('Providers', () => {
  const dataNdx = 0;
  let wrapper;
  let props;
  let ev;

  beforeEach(() => {
    props = {
      providers: [
        {
          name: 'search',
          duration: 200,
          req: {
            type: 'GET',
            url: 'https://domain.com/search',
            data: {
              query: 'Organically sourced fluffer nutters',
            },
          },
          resp: {
            status: 404,
            msg: 'No results found for "Organically sourced fluffer nutters"',
          },
        },
        {
          name: 'products',
          duration: '3000',
          req: {
            type: 'GET',
            url: 'https://domain.com/api/get/products',
            data: {
              styleNumber: 123456,
            },
          },
          resp: {
            status: 200,
            data: Array.from(Array(50)).map((val, ndx) => ({
              title: `product ${ndx}`
            })),
          },
        },
        {
          name: 'user',
          req: {
            type: 'POST',
            url: 'https://domain.com/api/get/user',
            data: {
              token: 'masda654asdf13a2sdf46a5sd4f6a',
            },
          },
          resp: {
            status: 200,
            data: {
              id: '1354as321dfa354sd3f21',
              name: 'John Doe',
              email: 'jd@whois.me',
            },
          },
        }
      ],
    };
    ev = {
      currentTarget: {
        dataset: {
          ndx: dataNdx,
        },
      }
    };
  });

  const verifyModalData = (elNdx, data) => {
    wrapper = shallow(<Providers {...props} />);
    const reqBtn = shallow(wrapper.find('tr td button').get(elNdx));
    let dataNode = wrapper.find('DataNode');
    let closeRegion;

    expect(dataNode.length).toBe(0);

    // opens the modal
    reqBtn.simulate('click', ev);
    wrapper.update();
    dataNode = wrapper.find('DataNode');
    closeRegion = wrapper.find(`button.${styles.closeRegion}`);

    expect(wrapper.find(`.${styles.modal}.is--open`).length).toBe(1);
    expect(dataNode.length).toBe(1);
    expect(dataNode.props().data).toEqual(data);

    // closes the modal
    closeRegion.simulate('click');
    wrapper.update();
    dataNode = wrapper.find('DataNode');

    expect(wrapper.find(`.${styles.modal}.is--open`).length).toBe(0);
    expect(dataNode.length).toBe(0);
  };

  const verifyVisibleEls = (visible, hidden, elProps = {}) => {
    wrapper = shallow(<Providers {...elProps} />);

    visible.forEach((selector) => {
      expect(wrapper.find(selector).length).toBe(1);
    });

    hidden.forEach((selector) => {
      expect(wrapper.find(selector).length).toBe(0);
    });
  };

  it('should display an error when no `providers` were passed', () => {
    verifyVisibleEls(
      ['ConsolePluginError'],
      [`.${styles.container}`, `.${styles.modal}`]
    );
  });

  it('should display the providers', () => {
    verifyVisibleEls(
      [`.${styles.container}`, `.${styles.modal}`],
      ['ConsolePluginError'],
      props
    );
  });

  it('should display request data on item click', () => {
    verifyModalData(0, props.providers[dataNdx].req);
  });

  it('should display response data', () => {
    verifyModalData(1, props.providers[dataNdx].resp);
  });

  it("should color-code status' and durations", () => {
    wrapper = shallow(<Providers {...props} />);
    const rows = wrapper.find('tbody tr');

    rows.forEach((row, ndx) => {
      const columns = row.find('td');
      // last two columns are request-status and duration
      const status = shallow(columns.get(2)).find('button').get(0).props;
      const duration = columns.get(3).props;

      switch(ndx){
        case 0:
          expect(status.className).toEqual(expect.stringContaining('is--bad'));
          expect(duration.className).toEqual(expect.stringContaining('is--good'));
          break;

        case 1:
          expect(status.className).toEqual(expect.stringContaining('is--good'));
          expect(duration.className).toEqual(expect.stringContaining('is--bad'));
          break;
      }
    });
  });
});
