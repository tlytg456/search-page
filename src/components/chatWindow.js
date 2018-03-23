import React from 'react';
import { connect } from 'dva';
import { Launcher } from 'react-chat-window';
import fetchJsonp from 'fetch-jsonp';

class ChatWindow extends React.Component {

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
    const url = 'https://api.jisuapi.com/iqa/query?appkey=56369ab23c08ee39&question=' + message.data.text;
    let responseMessage = '';
    fetchJsonp(url)
      .then(response => response.json())
      .then((json) => {
        responseMessage = json.result.content;
        if (responseMessage.length > 0) {
          this.setState({
            messageList: [...this.state.messageList, {
              author: 'them',
              type: 'text',
              data: { text: responseMessage }
            }]
          })
        }
      }).catch((ex) => {
    });
  }

  render() {
    return (
      <Launcher
        agentProfile={{
          teamName: 'Troy Bot',
          imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png',
        }}
        onMessageWasSent={this._onMessageWasSent.bind(this)}
        messageList={this.state.messageList}
      />);
  }

}

ChatWindow.propTypes = {
};

export default connect()(ChatWindow);

