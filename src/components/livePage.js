import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Col, Card } from 'antd';
import styles from '../routes/IndexPage.less';

const { Meta } = Card;

const cardStyles = {
  margin: '4px',
};

class LivePage extends React.Component {


  constructor() {
    super();
    this.state = {
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
    this.setTimer();
    setInterval(this.setTimer, 1000);
  }

  setTimer = () =>{
    const now = new moment();
    const { startDate } = this.props;
    if (startDate !== undefined){
      this.setState({
        days: now.diff(startDate, 'days'),
        months: now.diff(startDate, 'months'),
        weeks: now.diff(startDate, 'weeks'),
        years: now.diff(startDate, 'years'),
        hours: now.diff(startDate, 'hours'),
        minutes: now.diff(startDate, 'minutes'),
        exectYear: Math.round(now.diff(startDate, 'years', true) * 100000000000)/100000000000
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.years !== 0 &&
        <div>
          <div className={styles.timerDesc}>
            You are <span style={{color: '#E08031', fontSize: '24px'}}>{this.state.exectYear}</span> years old
          </div>
          <Col xs={12} sm={12} md={12} lg={8} xl={8}>
            <Card
              style={cardStyles}
            >
              <Meta
                title={this.state.years}
                description="Years"
              />
            </Card>
          </Col>
          <Col xs={12} sm={12} md={12} lg={8} xl={8}>
            <Card
              style={cardStyles}
            >
              <Meta
                title={this.state.months}
                description="Months"
              />
            </Card>
          </Col>
          <Col xs={12} sm={12} md={12} lg={8} xl={8}>
            <Card
              style={cardStyles}
            >
              <Meta
                title={this.state.weeks}
                description="Weeks"
              />
            </Card>
          </Col><Col xs={12} sm={12} md={12} lg={8} xl={8}>
          <Card
            style={cardStyles}
          >
            <Meta
              title={this.state.days}
              description="Days"
            />
          </Card>
        </Col><Col xs={12} sm={12} md={12} lg={8} xl={8}>
          <Card
            style={cardStyles}
          >
            <Meta
              title={this.state.hours}
              description="Hours"
            />
          </Card>
        </Col><Col xs={12} sm={12} md={12} lg={8} xl={8}>
          <Card
            style={cardStyles}
          >
            <Meta
              title={this.state.minutes}
              description="Miniues"
            />
          </Card>
        </Col>
        </div>
        }
      </div>

    );
  }
}

LivePage.propTypes = {
  startDate: PropTypes.object,
};

export default connect()(LivePage);
