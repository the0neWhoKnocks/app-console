import React from 'react';
import { arrayOf, shape, string } from 'prop-types';
import ConsolePluginError from '../../ConsolePluginError';
import pad from '../../../utils/pad';
import styles from './styles';

const formatTimestamp = (time) => {
  const d = new Date(+time);
  const hour = d.getHours();
  const strMonth = pad(d.getMonth());
  const strDate = pad(d.getDate());
  const strHour = hour > 12 ? pad(hour - 12) : pad(hour);
  const strMins = pad(d.getMinutes());
  const meridiem = hour >= 12 ? 'pm' : 'am';

  return `${strMonth}/${strDate}/${d.getFullYear()} ${strHour}:${strMins}${meridiem}`;
};

const MetaData = ({ data }) => {
  if(!data.length){
    return (
      <ConsolePluginError>
        No meta-data provided.
      </ConsolePluginError>
    );
  }

  const scopedData = [...data]; // sort will mutate what's passed in
  const sortedData = scopedData.sort((a, b) => a.name > b.name);

  return (
    <div className={`${styles.root}`}>
      <div className={`${styles.body}`}>
        <div className={`${styles.column}`}>
          {sortedData.map((att) => (
            <div key={att.name} className={`${styles.columnCell}`}>
              <div>{att.name}</div>
            </div>
          ))}
        </div>
        <div className={`${styles.column}`}>
          {sortedData.map((att) => {
            let attVal = att.value;

            if (att.name.toLowerCase() === 'build time') {
              attVal = formatTimestamp(attVal);
            }

            return (
              <div key={att.name} className={`${styles.columnCell}`}>
                <div>{attVal}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

MetaData.defaultProps = {
  data: [],
};
MetaData.propTypes = {
  data: arrayOf(shape({
    name: string,
    value: string,
  })),
};

export default MetaData;
export {
  formatTimestamp,
};
