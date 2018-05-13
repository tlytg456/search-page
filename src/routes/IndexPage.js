import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Button, Col, Input, Row, AutoComplete, Icon, Alert } from 'antd';
import moment from 'moment';
import styles from './IndexPage.less';
import request from '../utils/request';
import fetchJsonp from 'fetch-jsonp';
import ChatWindow from '../components/chatWindow';

const customStyles = {
  button: {
    marginTop: 16,
    marginLeft: '2%',
    marginRigth: '2%',
    width: '96%',
  }
}


class IndexPage extends React.Component {


  constructor() {
    super();
    this.state = {
      messageList: [],
      searchValue: '',
      description: 'Hello, 今天请加油哦!!',
      dataSource: [],
      nextEnterToSearch: false,
    };
  }

  componentWillMount() {
    this.getLocation();
  }

  getLocation = () => {
    const url = 'https://api.map.baidu.com/location/ip?ak=MHaZmrvRxBwYFKD0G9ADTUsG7GDgSE3Y';
    fetchJsonp(url)
      .then(response => response.json())
      .then((json) => {
        this.getWeather(json.content.address);
      }).catch((ex) => {
      });
  }

  getWeather = (cityName) => {
    request('https://free-api.heweather.com/s6/weather?key=1cde689da60f410fb5a18b45dba0cc76&location=' + cityName)
      .then((content) => {
        this.setDescription(content.data, cityName);
      })
  }

  setDescription = (data, cityName) => {
    const minTemp = data.HeWeather6[0].daily_forecast[0].tmp_min;
    const maxTemp = data.HeWeather6[0].daily_forecast[0].tmp_max;
    const cond = data.HeWeather6[0].now.cond_txt;
    let text = '';

    const weekDay = new moment().day();
    switch(weekDay)
    {
      case 0:
        text = '这是最后的周末时光，明天上班了233333~';
        break;
      case 1:
        text = '新的一周，加油哦~';
        break;
      case 2:
        text = '周二周二周二，累不累~';
        break;
      case 3:
        text = '周中了，不好意思，你还要工作3天~';
        break;
      case 4:
        text = '距离周末倒计时.....2天~';
        break;
      case 5:
        text = '坚持一下，马上放假了呢~';
        break;
      case 6:
        text = '哇，放假了，周末愉快~';
        break;
      default:
        text = '今天请加油嘿嘿~';
    }


    this.setState({
      description: `Hello, ${cityName}今天${cond}, ${minTemp}℃ - ${maxTemp}℃, ${text}`,
    })
  }

  handleClick = (type) => {
    const { searchValue } = this.state;
    if (searchValue === ''){
      switch(type)
      {
        case 'baidu':
          window.location.href='https://www.baidu.com';
          break;
        case 'google':
          window.location.href='https://www.google.com';
          break;
        case 'taobao':
          window.location.href='https://www.taobao.com';
          break;
        case 'zhihu':
          window.location.href='https://www.zhihu.com';
          break;
        case 'bilibili':
          window.location.href='https://www.bilibili.com';
          break;
        case 'goudai':
          window.location.href='http://www.goudaitv.com';
          break;
        default:
          window.location.href='https://www.baidu.com';
      }
    } else {
      switch(type)
      {
        case 'baidu':
          window.location.href='https://www.baidu.com/s?wd=' + searchValue;
          break;
        case 'google':
          window.location.href='https://www.google.com/search?q=' + searchValue;
          break;
        case 'taobao':
          window.location.href='https://s.taobao.com/search?q=' + searchValue;
          break;
        case 'zhihu':
          window.location.href='https://www.zhihu.com/search?type=content&q=' + searchValue;
          break;
        case 'bilibili':
          window.location.href='https://search.bilibili.com/all?from_source=banner_search&keyword=' + searchValue;
          break;
        case 'goudai':
          window.location.href='http://www.goudaitv.com/index.php?m=vod-search&wd=' + searchValue;
          break;
        default:
          window.location.href='https://www.baidu.com/s?wd=' + searchValue;
      }
    }
  }

  handleSearchChange = (value, ifGetWords) => {
    if (ifGetWords && value !== '') {
      fetchJsonp('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?' +
        'cb=jQuery1102039187157806009054_1457413554466&wd=' + value,
        {
          jsonpCallbackFunction: 'jQuery1102039187157806009054_1457413554466',
        })
        .then(response => response.json())
        .then((json) => {
          const dataSource = [];
          dataSource.push({value, text: value});
          json.s.forEach((item) => {
            dataSource.push({value: item, text: item});
          })
          this.setState({ dataSource });
        }).catch((ex) => {
        });
    } else {
      this.setState({ dataSource: [] });
    }
    this.setState({ searchValue: value, nextEnterToSearch: !ifGetWords });
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.header}>
            <span className={styles.title}>Search</span>
          </div>
          <Row>
            <Col xs={2} sm={4} md={6} lg={8} xl={9} />
            <Col xs={20} sm={16} md={12} lg={8} xl={6}>
              <div className={styles.desc}>{this.state.description}</div>
              <AutoComplete
                dataSource={this.state.dataSource}
                onSearch={(value) => {this.handleSearchChange(value, true)}}
                allowClear
                autoFocus
                backfill
                style={{ width: '100%' }}
                value={this.state.searchValue}
                onSelect={(value) => {
                  this.handleSearchChange(value, false);
                }}
              >
                <Input
                  placeholder="Search"
                  style={{ height: 40, backgroundColor: 'white', zIndex: 0 }}
                  prefix={<Icon type="search"/>}
                  onKeyDown={(event) => {
                    if (event.keyCode === 13 && this.state.nextEnterToSearch){
                      this.handleClick('baidu')
                    }
                  }}
                />
              </AutoComplete>
              <Row type="flex" justify="space-around">
                <Col xs={20} sm={12} md={12} lg={12} xl={12}>
                  <Button
                    size={'large'}
                    icon={'search'}
                    style={{ color: '#3385ff', ...customStyles.button}}
                    onClick={() => {this.handleClick('baidu')}}
                  >
                    百度
                  </Button>
                </Col>
                <Col xs={20} sm={12} md={12} lg={12} xl={12}>
                  <Button
                    size={'large'}
                    icon={'google'}
                    style={customStyles.button}
                    onClick={() => {this.handleClick('google')}}
                  >
                    Google
                  </Button>
                </Col>
                <Col xs={20} sm={12} md={12} lg={12} xl={12}>
                  <Button
                    size={'large'}
                    icon={'taobao'}
                    style={{ color: 'rgb(255, 80, 0)', ...customStyles.button}}
                    onClick={() => {this.handleClick('taobao')}}
                  >
                    淘宝
                  </Button>
                </Col>
                <Col xs={20} sm={12} md={12} lg={12} xl={12}>
                  <Button
                    size={'large'}
                    icon={'zhihu'}
                    style={{ color: '#0084ff', ...customStyles.button}}
                    onClick={() => {this.handleClick('zhihu')}}
                  >
                    知乎
                  </Button>
                </Col>
                <Col xs={20} sm={12} md={12} lg={12} xl={12}>
                  <Button
                    size={'large'}
                    icon={'search'}
                    style={{ color: '#f25d8e', ...customStyles.button}}
                    onClick={() => {this.handleClick('bilibili')}}
                  >
                    Bilibili
                  </Button>
                </Col>
                <Col xs={20} sm={12} md={12} lg={12} xl={12}>
                  <Button
                    size={'large'}
                    icon={'search'}
                    style={{ color: '#00a650', ...customStyles.button}}
                    onClick={() => {this.handleClick('goudai')}}
                  >
                    狗带
                  </Button>
                </Col>
                <Col xs={20} sm={24} md={24} lg={24} xl={24}>
                  <div style={{ marginTop: '24px' }}>
                    <Alert
                      message={<span>
                          New function has released <Link to="/timer">Click Me</Link>
                        </span>}
                      type="info"
                      closable
                    />

                  </div>
                </Col>
              </Row>
            </Col>
            <Col xs={2} sm={4} md={6} lg={8} xl={9} />
          </Row>
        </div>
        <ChatWindow />
      </div>
    );
  }
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
