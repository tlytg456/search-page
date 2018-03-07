import React from 'react';
import { connect } from 'dva';
import { Button, Col, Input, Row } from 'antd';
import styles from './IndexPage.less';
import request from '../utils/request';

const Search = Input.Search;

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
      description: 'Do Better'
    };
  }

  componentWillMount() {
    request('https://free-api.heweather.com/s6/weather?location=shanghai&key=1cde689da60f410fb5a18b45dba0cc76')
      .then((content) => {
        this.setDescription(content.data);
      })

  }

  setDescription = (data) => {
    const temp = data.HeWeather6[0].now.tmp;
    const cond = data.HeWeather6[0].now.cond_txt;
    const text = data.HeWeather6[0].lifestyle[0].txt;

    this.setState({
      description: `${temp}℃, ${cond}, ${text}`,
    })
  }

  handleClick = (type) => {
    const { searchValue } = this.state
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
        window.location.href='http://www.goudaitv.com/search.php?searchword=' + searchValue;
        break;
      default:
        window.location.href='https://www.baidu.com/s?wd=' + searchValue;
    }
  }

  handleSearchChange = (e) => {
    this.setState({ searchValue: e.target.value });
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
              <Search
                placeholder="Search"
                onChange={this.handleSearchChange}
                onSearch={() => {this.handleClick('baidu')}}
                size={'large'}
                value={this.state.searchValue}
              />
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
              </Row>
            </Col>
            <Col xs={2} sm={4} md={6} lg={8} xl={9} />
          </Row>
        </div>
      </div>
    );
  }
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
