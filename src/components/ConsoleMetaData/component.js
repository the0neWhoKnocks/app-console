import React from 'react';
import pad from '../../utils/pad';
import styles from './styles';

const MetaDataConsolePlugin = () => {
  const atts = document.head.querySelector('[name="application-data"]').attributes;
  let parsed = [];

  Object.keys(atts).forEach((ndx) => {
    const att = atts[ndx];
    if (att.name.indexOf('data-') === 0) parsed.push({
      name: att.name.replace('data-', '').replace(/-/g, ' '),
      value: att.nodeValue,
    });
  });

  parsed = parsed.sort((a, b) => a.name > b.name);

  return (
    <div className={`${styles.root}`}>
      <div className={`${styles.body}`}>
        <div className={`${styles.column}`}>
          {parsed.map((att) => (
            <div key={att.name} className={`${styles.columnCell}`}>
              <div>{att.name}</div>
            </div>
          ))}
        </div>
        <div className={`${styles.column}`}>
          {parsed.map((att) => {
            if (att.name.toLowerCase() === 'build time') {
              const d = new Date(+att.value);
              const hour = d.getHours();
              const strMonth = pad(d.getMonth());
              const strDate = pad(d.getDate());
              const strHour = hour > 12 ? pad(hour - 12) : pad(hour);
              const strMins = pad(d.getMinutes());
              const meridiem = hour >= 12 ? 'pm' : 'am';
              att.value = `${strMonth}/${strDate}/${d.getFullYear()} ${strHour}:${strMins}${meridiem}`;
            }

            return (
              <div key={att.name} className={`${styles.columnCell}`}>
                <div>{att.value}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MetaDataConsolePlugin;