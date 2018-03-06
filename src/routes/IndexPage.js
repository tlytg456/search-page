import React from 'react';
import { connect } from 'dva';
import { Button, Col, Input, Row } from 'antd';
import styles from './IndexPage.less';
import { Launcher } from 'react-chat-window'
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
    };
  }


  // _onMessageWasSent(message) {
  //   this.setState({
  //     messageList: [...this.state.messageList, message]
  //   }, () => {
  //     this._sendMessage(message)
  //   })
  // }
  //
  // _sendMessage = (message) => {
  //   const myHeaders = new Headers({
  //     // 'Access-Control-Allow-Origin': '*',
  //     // 'Content-Type': 'application/json; charset=utf-8'
  //     "Content-Type": "application/xhtml+xml; charset=GB2312"
  //   });
  //   window.console.log(message)
  //   const url = 'http://openapi.tuling123.com/openapi/api/v2';
  //   request(url,
  //     {
  //       // headers: HTTP_JSON_HEADER,
  //       method: 'POST',
  //       mode: "no-cors",
  //       headers: myHeaders,
  //       // headers: new Headers({
  //       //   "Content-Type": "application/xhtml+xml; charset=utf-8"
  //       // }),
  //       body: JSON.stringify({
  //         "reqType":0,
  //         "perception": {
  //           "inputText": {
  //             "text": message
  //           },
  //           "selfInfo": {
  //             "location": {
  //               "city": "上海",
  //               "province": "上海",
  //             }
  //           }
  //         },
  //         "userInfo": {
  //           "apiKey": "fffc4ffbfcaf4b0b953c348ea925059a",
  //           "userId": "123",
  //         }
  //       }),
  //     }).then(data => {
  //       window.console.log(data)
  //   });
  //   if (message.length > 0) {
  //     this.setState({
  //       messageList: [...this.state.messageList, {
  //         author: 'them',
  //         type: 'text',
  //         data: { message }
  //       }]
  //     })
  //   }
  // }

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
          <div className={styles.desc}>Do Better</div>
          <Row>
            <Col xs={2} sm={4} md={6} lg={8} xl={9} />
            <Col xs={20} sm={16} md={12} lg={8} xl={6}>
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
          {/*<Launcher*/}
            {/*agentProfile={{*/}
              {/*teamName: 'Troy Bot',*/}
              {/*imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'*/}
            {/*}}*/}
            {/*onMessageWasSent={this._onMessageWasSent.bind(this)}*/}
            {/*messageList={this.state.messageList}*/}
          {/*/>*/}
        </div>
      </div>
    );
  }
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
