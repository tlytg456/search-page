import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Button, Col, Input, Row, Tabs, Icon, Form, DatePicker, Card } from 'antd';
import styles from './IndexPage.less';

const FormItem = Form.Item;
const { Meta } = Card;
const TabPane = Tabs.TabPane;

const customStyles = {
  button: {
    marginTop: 16,
    marginLeft: '2%',
    marginRigth: '2%',
    width: '96%',
  }
}

const defaultDate = '1992/06/16';
const defaultFormat = 'YYYY/MM/DD';


class Timer extends React.Component {


  constructor() {
    super();
    this.state = {
      startDate: moment(defaultDate, defaultFormat),
      days: 0,
      months: 0,
      weeks: 0,
      years: 0,
      hours: 0,
      minutes: 0,
      exectYear: 0,
    };
  }

  componentWillMount() {
    setInterval(this.setTimer, 1000);
  }

  setTimer = () =>{
    const now = new moment();
    this.setState({
      days: now.diff(this.state.startDate, 'days'),
      months: now.diff(this.state.startDate, 'months'),
      weeks: now.diff(this.state.startDate, 'weeks'),
      years: now.diff(this.state.startDate, 'years'),
      hours: now.diff(this.state.startDate, 'hours'),
      minutes: now.diff(this.state.startDate, 'minutes'),
      exectYear: Math.round(now.diff(this.state.startDate, 'years', true) * 100000000000)/100000000000
    });
  }

  handleChangeDate = (date, dateString) => {
    this.setState({ startDate: date });
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.header}>
            <span className={styles.title}>Timer</span>
          </div>
          <div className={styles.desc}>123123123</div>
          <Row>
            <Col xs={2} sm={4} md={6} lg={8} xl={8} />
            <Col xs={20} sm={16} md={12} lg={8} xl={8}>

              <Tabs defaultActiveKey="live">
                <TabPane tab="Live" key="live">
                  <Form layout="inline">
                  <FormItem>
                    <DatePicker
                      defaultValue={moment(defaultDate, defaultFormat)}
                      format={defaultFormat}
                      showToday={false}
                      onChange={this.handleChangeDate}
                    />
                  </FormItem>
                  </Form>
                  <div className={styles.timerDesc}>
                    You are <span style={{color: '#FFCC99'}}>{this.state.exectYear}</span> years old
                  </div>
                  <Col span={8} style={{ marginBottom: '8px' }}>
                    <Card>
                      <Meta
                        title={this.state.years}
                        description="Years"
                      />
                    </Card>
                  </Col>
                  <Col span={8} style={{ marginBottom: '8px' }}>
                    <Card>
                      <Meta
                        title={this.state.months}
                        description="Months"
                      />
                    </Card>
                  </Col>
                  <Col span={8} style={{ marginBottom: '8px' }}>
                    <Card>
                      <Meta
                        title={this.state.weeks}
                        description="Weeks"
                      />
                    </Card>
                  </Col><Col span={8} style={{ marginBottom: '8px' }}>
                  <Card>
                    <Meta
                      title={this.state.days}
                      description="Days"
                    />
                  </Card>
                </Col><Col span={8} style={{ marginBottom: '8px' }}>
                  <Card>
                    <Meta
                      title={this.state.hours}
                      description="Hours"
                    />
                  </Card>
                </Col><Col span={8} style={{ marginBottom: '8px' }}>
                  <Card>
                    <Meta
                      title={this.state.minutes}
                      description="Miniues"
                    />
                  </Card>
                </Col>

                </TabPane>
                <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
                <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
              </Tabs>

              <Row type="flex" justify="space-around">
                <Col xs={20} sm={12} md={12} lg={12} xl={12}>

                </Col>
                <Col xs={20} sm={12} md={12} lg={12} xl={12}>

                </Col>
                <Col xs={20} sm={12} md={12} lg={12} xl={12}>

                </Col>
                <Col xs={20} sm={12} md={12} lg={12} xl={12}>

                </Col>
                <Col xs={20} sm={12} md={12} lg={12} xl={12}>

                </Col>
                <Col xs={20} sm={12} md={12} lg={12} xl={12}>

                </Col>
              </Row>
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
