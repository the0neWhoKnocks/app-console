import React, { Component, Fragment } from 'react';
import { arrayOf, bool, number, oneOfType, shape, string } from 'prop-types';
import DataNode from '../../DataNode';
import ConsolePluginError from '../../ConsolePluginError';
import styles from './styles';

class Providers extends Component {
  constructor() {
    super();

    this.state = {
      modalOpen: false,
      modalData: undefined,
    };

    this.handleReqClick = this.handleReqClick.bind(this);
    this.handleRespClick = this.handleRespClick.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  handleReqClick(ev) {
    this.setState({
      modalOpen: true,
      modalData: this.props.providers[ev.currentTarget.dataset.ndx].req,
    });
  }

  handleRespClick(ev) {
    this.setState({
      modalOpen: true,
      modalData: this.props.providers[ev.currentTarget.dataset.ndx].resp,
    });
  }

  handleModalClose(ev) {
    this.setState({
      modalOpen: false,
      modalData: undefined,
    });
  }

  parseDuration(time) {
    if (!time) return { num: 'N/A', format: '' };

    let num = +time;
    let format = 'ms';

    // only accounting for seconds and milliseconds since requests shouldn't be taking minutes
    if (num >= 1000) {
      num /= 1000;
      format = 's';
    }

    return { format, num };
  }

  render() {
    const { providers } = this.props;

    if(!providers.length){
      return (
        <ConsolePluginError>
          The <code>providers</code> data was empty.
        </ConsolePluginError>
      );
    }

    return (
      <Fragment>
        <div className={`${styles.container}`}>
          <table className={`${styles.table}`}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Request</th>
                <th>Response</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {providers.map((provider, ndx) => {
                const statusClass = (provider.resp.status < 400) ? 'is--good' : 'is--bad';
                const durationClass = (provider.duration <= 500) ? 'is--good' : 'is--bad';
                const duration = this.parseDuration(provider.duration);

                return (
                  <tr key={ndx}>
                    <td className={`${styles.name} ${styles.paddedCell}`}>{provider.name}</td>
                    <td>
                      <button
                        className={`${styles.btn} ${styles.url} ${styles.paddedCell}`}
                        data-ndx={ndx}
                        onClick={this.handleReqClick}
                        title="Click to view request data"
                      >{provider.req.url}</button>
                    </td>
                    <td>
                      <button
                        className={`${styles.btn} ${styles.status} ${styles.paddedCell} ${statusClass}`}
                        data-ndx={ndx}
                        onClick={this.handleRespClick}
                        title="Click to view response data"
                      >{provider.resp.status}</button>
                    </td>
                    <td className={`${styles.duration} ${styles.paddedCell} ${durationClass}`}>
                      {duration.num}{duration.format}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className={`${styles.modal} ${(this.state.modalOpen) ? 'is--open' : ''}`}>
          <button
            className={`${styles.closeRegion}`}
            onClick={this.handleModalClose}
          />
          {this.state.modalData && <DataNode data={this.state.modalData} sort={false} />}
          <div className={`${styles.fakeCloseBtn}`}>
            <i className="material-icons">clear</i>
          </div>
        </div>
      </Fragment>
    );
  }
}

Providers.defaultProps = {
  providers: [],
};
Providers.propTypes = {
  providers: arrayOf(shape({
    duration: oneOfType([ // in milliseconds
      number,
      string,
    ]),
    name: string,
    resp: shape({
      msg: string,
      payload: oneOfType([
        bool,
        number,
        shape({}),
        string,
      ]),
      status: number, // http status code
    }),
    req: shape({
      data: oneOfType([
        bool,
        number,
        shape({}),
        string,
      ]),
      type: string, // GET, POST, etc
      url: string, // The request URL 
    }),
  })),
};

export default Providers;
