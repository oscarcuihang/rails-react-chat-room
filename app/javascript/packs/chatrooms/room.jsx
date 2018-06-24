import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Message from './message';
import MessageInputBox from './messageInputBox';
import { sendMessage, setCallback } from "../client/chat";

const propTypes = {
  messages: PropTypes.array,
  chatroom: PropTypes.object.isRequired,
};

const defaultProps = {messages: []};

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: this.props.messages,
    };
    this.renderMessagesList = this.renderMessagesList.bind(this);
  }

  componentDidMount() {
    const element = document.getElementById("messages-area");
    element.scrollTop = element.scrollHeight;
  }

  renderMessagesList() {
    setCallback(message => {
      let messages = this.state.messages;
      messages.push(message)
      this.setState({ messages: messages })
    });
    const messagesList = Object.keys(this.state.messages).map(id => (
      <Message key={`message${id}`} message={this.state.messages[id]} />
    ));
    return messagesList;
  }

  render() {
    return (
      <div>
        <h2>{this.props.chatroom.name}</h2>
        <div id='messages-area' className='messages-area'>{ this.renderMessagesList() }</div>
        <MessageInputBox chatroom={this.props.chatroom} />
      </div>
    );
  }
}

Room.propTypes = propTypes;
Room.defaultProps = defaultProps;
export default Room;
document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('react-data');
  const data = JSON.parse(node.getAttribute('data'));
  const messages = data.messages;
  const chatroom = data.chatroom;
  ReactDOM.render(
    <Room messages={messages} chatroom={chatroom} />,
    document.getElementById('react-container').appendChild(document.createElement('div')),
  );
});