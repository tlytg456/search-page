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
    marginLeft: 8,
    marginRigth: 8,
  }
}


class IndexPage extends React.Component {


  constructor() {
    super();
    this.state = {
      messageList: [],
    };
  }


  _onMessageWasSent(message) {
    this.setState({
      messageList: [...this.state.messageList, message]
    }, () => {
      this._sendMessage(message)
    })
  }

  _sendMessage = (message) => {
    const myHeaders = new Headers({
      // 'Access-Control-Allow-Origin': '*',
      // 'Content-Type': 'application/json; charset=utf-8'
      "Content-Type": "application/xhtml+xml; charset=GB2312"
    });
    window.console.log(message)
    const url = 'http://openapi.tuling123.com/openapi/api/v2';
    request(url,
      {
        // headers: HTTP_JSON_HEADER,
        method: 'POST',
        mode: "no-cors",
        headers: myHeaders,
        // headers: new Headers({
        //   "Content-Type": "application/xhtml+xml; charset=utf-8"
        // }),
        body: JSON.stringify({
          "reqType":0,
          "perception": {
            "inputText": {
              "text": message
            },
            "selfInfo": {
              "location": {
                "city": "上海",
                "province": "上海",
              }
            }
          },
          "userInfo": {
            "apiKey": "fffc4ffbfcaf4b0b953c348ea925059a",
            "userId": "123",
          }
        }),
      }).then(data => {
        window.console.log(data)
    });
    if (message.length > 0) {
      this.setState({
        messageList: [...this.state.messageList, {
          author: 'them',
          type: 'text',
          data: { message }
        }]
      })
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.header}>
            <span className={styles.title}>Ant Design</span>
          </div>
          <div className={styles.desc}>Ant Design 是西湖区最具影响力的 Web 设计规范</div>
          <Row>
            <Col xs={2} sm={4} md={6} lg={8} xl={9} />
            <Col xs={20} sm={16} md={12} lg={8} xl={6}>
              <Search
                placeholder="input search text"
                onSearch={value => console.log(value)}
                size={'large'}
              />
              <Button
                size={'large'}
                icon={'search'}
                type={'primary'}
                style={customStyles.button}
              >
                百度
              </Button>
              <Button
                size={'large'}
                icon={'google'}
                type={'primary'}
                style={customStyles.button}
              >
                Google
              </Button>
              <Button
                size={'large'}
                icon={'taobao'}
                type={'primary'}
                style={customStyles.button}
              >
                淘宝
              </Button>
              <Button
                size={'large'}
                icon={'zhihu'}
                type={'primary'}
                style={customStyles.button}
              >
                知乎
              </Button>
              <Button
                size={'large'}
                icon={'zhihu'}
                type={'primary'}
                style={customStyles.button}
              >
                Bilibili
              </Button>
            </Col>
            <Col xs={2} sm={4} md={6} lg={8} xl={9} />
          </Row>
          <Launcher
            agentProfile={{
              teamName: 'Troy Bot',
              imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
            }}
            onMessageWasSent={this._onMessageWasSent.bind(this)}
            messageList={this.state.messageList}
          />
        </div>
      </div>
    );
  }
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
