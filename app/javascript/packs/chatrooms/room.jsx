import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Message from './message';
import MessageInputBox from './messageInputBox';
import { setCallback } from "../client/messages";

const propTypes = {
  messages: PropTypes.array,
  chatroom: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  viewPermission: PropTypes.bool.isRequired,
};

const defaultProps = {messages: []};

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: this.props.messages,
    };
    this.renderMessagesList = this.renderMessagesList.bind(this);
    this.setMessageAreaBottom = this.setMessageAreaBottom.bind(this);
  }

  componentDidMount() {
    this.setMessageAreaBottom();
  }

  componentDidUpdate() {
    this.setMessageAreaBottom();
  }

  setMessageAreaBottom() {
    const element = document.getElementById("messages-area");
    element.scrollTop = element.scrollHeight;
  }

  renderMessagesList() {
    if (!this.props.viewPermission) {
      return(<div>You don't have permission for this chatroom, please join the room first</div>);
    }
    setCallback(message => {
      let messages = this.state.messages;
      messages.push(message)
      this.setState({ messages: messages })
    });
    const messagesList = Object.keys(this.state.messages).map(id => (
      <Message key={`message${id}`} message={this.state.messages[id]} currentUser={this.props.currentUser} />
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
  const currentUser = data.currentUser;
  const viewPermission = data.viewPermission;
  ReactDOM.render(
    <Room
      messages={messages}
      chatroom={chatroom}
      currentUser={currentUser}
      viewPermission={viewPermission}
    />,
    document.getElementById('react-container').appendChild(document.createElement('div')),
  );
});