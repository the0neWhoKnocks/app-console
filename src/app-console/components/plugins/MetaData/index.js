import React from 'react';
import { array } from 'prop-types';
import ConsolePluginError from '../../ConsolePluginError';
import pad from '../../../utils/pad';
import styles from './styles';

const MetaData = ({ data }) => {
  if(!data.length){
    return (
      <ConsolePluginError>
        No meta-data provided.
      </ConsolePluginError>
    );
  }

  const sortedData = data.sort((a, b) => a.name > b.name);

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
              const d = new Date(+attVal);
              const hour = d.getHours();
              const strMonth = pad(d.getMonth());
              const strDate = pad(d.getDate());
              const strHour = hour > 12 ? pad(hour - 12) : pad(hour);
              const strMins = pad(d.getMinutes());
              const meridiem = hour >= 12 ? 'pm' : 'am';
              attVal = `${strMonth}/${strDate}/${d.getFullYear()} ${strHour}:${strMins}${meridiem}`;
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
  data: array,
};

export default MetaData;
