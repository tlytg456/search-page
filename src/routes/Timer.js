import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Link } from 'dva/router';
import { Col, Row, Tabs, DatePicker, InputNumber, Select, TimePicker } from 'antd';
import styles from './IndexPage.less';
import LivePage from '../components/livePage';
import WorthPage from '../components/worthPage';
import Cookies from 'js-cookie';

const TabPane = Tabs.TabPane;
const Option = Select.Option;

const defaultDate = '1994/04/06';
const defaultFormat = 'YYYY/MM/DD';

class Timer extends React.Component {


  constructor() {
    super();
    this.state = {
      startDate: moment(defaultDate, defaultFormat),
      salaryNum: 3000,
      padDay: 25,
      startWorkTime: moment('09:00', 'HH:mm'),
      endWorkTime: moment('18:00', 'HH:mm'),
      tabKey: 'live',
    };
  }

  componentWillMount() {
    if (Cookies.get('userBirthDate') !== undefined){
      this.setState({ startDate: moment(Cookies.get('userBirthDate'), defaultFormat) });
    }
    if (Cookies.get('salaryNum') !== undefined){
      this.setState({ salaryNum: parseInt(Cookies.get('salaryNum'), 0)});
    }
    if (Cookies.get('padDay') !== undefined){
      this.setState({ padDay: parseInt(Cookies.get('padDay'), 0)});
    }
    if (Cookies.get('startWorkTime') !== undefined){
      this.setState({ startWorkTime: moment(Cookies.get('startWorkTime'), 'HH:mm')});
    }
    if (Cookies.get('endWorkTime') !== undefined){
      this.setState({ endWorkTime: moment(Cookies.get('endWorkTime'), 'HH:mm')});
    }
    if (Cookies.get('tabKey') !== undefined){
      this.setState({ tabKey: (Cookies.get('tabKey')) });
    }
  }

  handleChangeDate = (date) => {
    this.setState({ startDate: date });
    Cookies.set('userBirthDate', date.format(defaultFormat));
  };

  handleChangeSalary = (value) => {
    this.setState({ salaryNum: value });
    Cookies.set('salaryNum', value);
  }

  handleChangePayday = (value) => {
    this.setState({ padDay: value });
    Cookies.set('padDay', value);
  }

  handleChangeStartTime = (time) => {
    this.setState({ startWorkTime: time });
    Cookies.set('startWorkTime', time.format('HH:mm'));
  }

  handleChangeEndTime = (time) => {
    this.setState({ endWorkTime: time });
    Cookies.set('endWorkTime', time.format('HH:mm'));
  }

  handleChangeTab = (value) => {
    this.setState({ tabKey: value });
    Cookies.set('tabKey', value);
  }

  getPayDay = () => {
    const results=[];
    for(let i = 1; i <= 30; i++){
      results.push(<Option value={i}>{i}</Option>)
    }
    return results;
  };


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
              <Tabs defaultActiveKey={this.state.tabKey} onChange={this.handleChangeTab}>
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
                <TabPane tab="Worth" key="2">
                  <div >
                    <Row>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <div style={{ marginBottom: '8px' }}>
                        <div style={{display: 'inline'}}>
                          <span>薪水数值: </span>
                        </div>
                        <InputNumber
                          style={{ width: 150 }}
                          defaultValue={this.state.salaryNum}
                          min={300}
                          onChange={this.handleChangeSalary}
                        />
                      </div>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <div style={{ marginBottom: '8px' }}>
                        <div style={{display: 'inline'}}>
                          <span>发薪日期: </span>
                        </div>
                        <Select
                          value={this.state.padDay}
                          style={{ width: 150 }}
                          onChange={this.handleChangePayday}
                        >
                          {this.getPayDay()}
                        </Select>
                      </div>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <div style={{ marginBottom: '8px' }}>
                        <div style={{display: 'inline'}}>
                          <span>工作开始: </span>
                        </div>
                        <TimePicker
                          format="HH:mm"
                          style={{ width: 150 }}
                          defaultValue={this.state.startWorkTime}
                          onChange={this.handleChangeStartTime}
                          minuteStep={15}
                        />
                      </div>
                    </Col>

                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <div style={{ marginBottom: '8px' }}>
                        <div style={{display: 'inline'}}>
                          <span>工作结束: </span>
                        </div>
                        <TimePicker
                          format="HH:mm"
                          style={{ width: 150 }}
                          defaultValue={this.state.endWorkTime}
                          onChange={this.handleChangeEndTime}
                          minuteStep={15}
                        />
                      </div>
                    </Col>
                    </Row>
                    <WorthPage
                      salaryNum={this.state.salaryNum}
                      payday={this.state.padDay}
                      startTime={this.state.startWorkTime}
                      endTime={this.state.endWorkTime}
                    />
                  </div>
                </TabPane>
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
