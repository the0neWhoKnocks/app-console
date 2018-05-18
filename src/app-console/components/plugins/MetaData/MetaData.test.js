import React from 'react';
import { shallow } from 'enzyme';
import MetaData, { formatTimestamp } from './index';
import styles from './styles';

describe('MetaData', () => {
  let wrapper;
  let props;

  it('should display an error when no `data` was passed', () => {
    wrapper = shallow(<MetaData />);

    expect(wrapper.find('ConsolePluginError').length).toBe(1);
    expect(wrapper.find(`.${styles.root}`).length).toBe(0);
  });

  it('should display data', () => {
    props = {
      data: [
        {
          name: 'fu',
          value: 'bar',
        }
      ],
    };

    wrapper = shallow(<MetaData {...props} />);

    expect(wrapper.find('ConsolePluginError').length).toBe(0);
    expect(wrapper.find(`.${styles.root}`).length).toBe(1);
  });

  it('should sort data by `name`', () => {
    props = {
      data: [
        {
          name: 'z',
          value: 'last',
        },
        {
          name: 'a',
          value: 'first',
        },
      ],
    };
    wrapper = shallow(<MetaData {...props} />);
    const columns = wrapper.find(`.${styles.column}`);

    expect(columns.length).toBe(2);

    columns.forEach((column, columnNdx) => {
      column.find(`.${styles.columnCell}`).forEach((cell, cellNdx) => {
        // left column (names)
        if(columnNdx === 0){
          (cellNdx === 0)
            ? expect(cell.text()).toEqual(props.data[1].name)
            : expect(cell.text()).toEqual(props.data[0].name);
        }
        // right column (values)
        else{
          (cellNdx === 0)
            ? expect(cell.text()).toEqual(props.data[1].value)
            : expect(cell.text()).toEqual(props.data[0].value);
        }
      });
    });
  });

  it('should convert `build time` into a human-readable format', () => {
    props = {
      data: [
        {
          name: 'Build Time',
          value: '1525877727373',
        },
      ],
    };
    wrapper = shallow(<MetaData {...props} />);
    const buildTime = shallow(wrapper.find(`.${styles.columnCell}`).get(1));

    expect(buildTime.text()).toEqual('04/09/2018 07:55am PST');
  });

  describe('formatTimestamp', () => {

    it('should account for strings and numbers', () => {
      expect(formatTimestamp('1525877727373')).toEqual('04/09/2018 07:55am PST');
      expect(formatTimestamp(1525877727373)).toEqual('04/09/2018 07:55am PST');
    });

    it('should account post-meridiem', () => {
      expect(formatTimestamp('1525897727373')).toEqual('04/09/2018 01:28pm PST');
    });
  });
});
