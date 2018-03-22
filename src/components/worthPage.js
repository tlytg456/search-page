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

class WorthPage extends React.Component {


  constructor() {
    super();
    this.state = {
      totalDays: 0,
      passDay: 0,
      totalSecond: 0,
      workSeconds: 0,
    };
  }

  componentWillMount() {
    this.setWorth();
    setInterval(this.setWorth, 1000);
  }

  setWorth = () =>{
    const now = new moment();

    let days = 0;
    let passDay = 0
    if (now.date() > this.props.payday){
      let nextMonthDay = now.clone().add(1, 'months');
      days = nextMonthDay.diff(now, 'days');

      passDay = now.date() - this.props.payday;

    } else {
      let BeforeMonthDay = now.clone().add(-1, 'months')
      days = now.diff(BeforeMonthDay, 'days');

      passDay = days - (this.props.payday - now.date());
    }

    let workSeconds = this.props.endTime.diff(this.props.startTime, 'seconds');
    const totalSecond = workSeconds;
    let dueSeconds = now.diff(this.props.startTime, 'seconds');

    if(dueSeconds < workSeconds){
      workSeconds = dueSeconds;
    }

    this.setState({
      totalDays: days,
      passDay,
      totalSecond,
      workSeconds,
    });
  }

  render() {
    return (
      <div>
        <div>
          <div className={styles.timerDesc}>
            Today you have earned
            <span style={{color: '#E08031', fontSize: '24px'}}>
              {Math.round((this.state.workSeconds / (this.state.totalDays*this.state.totalSecond)) * this.props.salaryNum * 10000) / 10000}</span> Yuan
          </div>
          {/*<div className={styles.timerDesc}>*/}
            {/*You are <span style={{color: '#E08031', fontSize: '24px'}}>{this.state.exectYear}</span> years old*/}
          {/*</div>*/}
        </div>
      </div>

    );
  }
}

WorthPage.propTypes = {
  salaryNum: PropTypes.number,
  payday: PropTypes.number,
  startTime: PropTypes.object,
  endTime: PropTypes.object,
};

export default connect()(WorthPage);
