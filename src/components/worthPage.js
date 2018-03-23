import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import moment from 'moment';
import styles from '../routes/IndexPage.less';

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
      let lastPayDay = now.clone().date(this.props.payday);
      let nextPayDay = lastPayDay.clone().add(1, 'months');
      let date = lastPayDay;
      while(date.dayOfYear() !== nextPayDay.dayOfYear()) {
        if (date.isoWeekday() !== 6 && date.isoWeekday() !== 7){
          days++;
        }
        if (date.isoWeekday() !== 6 && date.isoWeekday() !== 7
          && date.dayOfYear() < now.dayOfYear()){
          passDay++;
        }
        date = date.add(1, 'days');
      }

    } else {
      let lastPayDay = now.clone().date(this.props.payday).add(-1, 'months');
      let nextPayDay = lastPayDay.clone().add(1, 'months');
      let date = lastPayDay;
      while(date.dayOfYear() !== nextPayDay.dayOfYear()) {
        if (date.isoWeekday() !== 6 && date.isoWeekday() !== 7){
          days++;
        }
        if (date.isoWeekday() !== 6 && date.isoWeekday() !== 7
          && date.dayOfYear() < now.dayOfYear()){
          passDay++;
        }
        date = date.add(1, 'days');
      }
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
          <div className={styles.timerDesc} style={{marginBottom: '12px'}}>
            今天, 你赚了
             <span style={{color: '#E08031', fontSize: '24px'}}>
              {Math.round((this.state.workSeconds / (this.state.totalDays*this.state.totalSecond)) * this.props.salaryNum * 10000) / 10000}</span> Yuan
          </div>
          <div className={styles.timerDesc}>
            这个月, 你赚了
             <span style={{color: '#E08031', fontSize: '24px'}}>
               {Math.round(((this.state.workSeconds + (this.state.passDay*this.state.totalSecond))  / (this.state.totalDays*this.state.totalSecond)) * this.props.salaryNum * 10000) / 10000}</span> yuan
          </div>
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
