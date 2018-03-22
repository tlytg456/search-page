import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Link } from 'dva/router';
import { Col, Row, Tabs, DatePicker, InputNumber, Form, Select } from 'antd';
import styles from './IndexPage.less';
import LivePage from '../components/livePage';
import Cookies from 'js-cookie';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;

const defaultDate = '1994/04/06';
const defaultFormat = 'YYYY/MM/DD';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 10 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};


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

  getPayDay = () => {
    const results=[];
    for(let i = 1; i <= 30; i++){
      results.push(<Option value={i}>{i}</Option>)
    }
    return results;
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
                <TabPane tab="Worth" key="2">

                  <div >
                    <Row>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <div style={{ marginBottom: '8px' }}>
                        <span width={'12px'}>SALARY: </span>
                        <InputNumber
                          style={{ width: 194 }}
                          defaultValue={3000}
                          min={300}
                        />
                      </div>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <div style={{ marginBottom: '8px' }}>
                        <span>PAYDAY: </span>
                        <Select defaultValue="25" style={{ width: 194 }} >
                          {this.getPayDay()}
                        </Select>
                      </div>
                    </Col>
                    </Row>
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
