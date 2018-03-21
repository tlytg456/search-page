import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Link } from 'dva/router';
import { Col, Row, Tabs, DatePicker, Alert } from 'antd';
import styles from './IndexPage.less';
import LivePage from '../components/livePage';
import Cookies from 'js-cookie';

const TabPane = Tabs.TabPane;

const defaultDate = '1994/04/06';
const defaultFormat = 'YYYY/MM/DD';


class Timer extends React.Component {


  constructor() {
    super();
    this.state = {
      startDate: moment(defaultDate, defaultFormat),
    };
  }

  componentWillMount() {
    if (Cookies.get('userBirthDate') !== undefined){
      this.setState({ startDate: moment(Cookies.get('userBirthDate'), defaultFormat) })
    }
  }

  handleChangeDate = (date) => {
    this.setState({ startDate: date });
    Cookies.set('userBirthDate', date.format(defaultFormat));
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.header}>
            <span className={styles.title}>Timer</span>
          </div>
          <div className={styles.desc}>Measure Your Life</div>
          <Row>
            <Col xs={2} sm={4} md={6} lg={8} xl={8} />
            <Col xs={20} sm={16} md={12} lg={8} xl={8}>

              <Tabs defaultActiveKey="live">
                <TabPane tab="Live" key="live">
                  <span>Your Birth: </span>
                  <DatePicker
                    placeholder={'Your Birth'}
                    defaultValue={this.state.startDate}
                    format={defaultFormat}
                    showToday={false}
                    allowClear={false}
                    onChange={this.handleChangeDate}
                    popupStyle={{ align: 'center' }}
                  />
                  <LivePage
                    startDate={this.state.startDate}
                  />
                </TabPane>
                <TabPane tab="Worth" key="2">To be continue</TabPane>
                {/*<TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>*/}
              </Tabs>

              <div style={{ marginTop: '24px' }}>
                <span>
                  Return to <Link to="/">Search Page</Link>
                </span>
              </div>
            </Col>
            <Col xs={2} sm={4} md={6} lg={8} xl={8} />
          </Row>
        </div>
      </div>
    );
  }
}

Timer.propTypes = {
};

export default connect()(Timer);
