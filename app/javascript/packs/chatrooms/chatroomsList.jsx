import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CreateChatroomForm from './createChatroomForm'
import JoinChatroomForm from './joinChatroomForm'

import { sendMessage, setCallback } from "../client/chatrooms";

const propTypes = {
  chatrooms: PropTypes.array,
  currentUser: PropTypes.object.isRequired,
};

const defaultProps = {
  chatrooms: []
};

class ChatroomsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatrooms: this.props.chatrooms,
    };

    this.handleCreateNewChatroom = this.handleCreateNewChatroom.bind(this);
  }

  handleCreateNewChatroom(newChatroom) {
    let chatrooms = this.state.chatrooms;
    chatrooms.push(newChatroom);
    this.setState({ chatrooms: chatrooms })
  }

  render() {
    return (
      <div>
        <CreateChatroomForm
          currentUser={this.props.currentUser}
          handleOnCreate={this.handleCreateNewChatroom}
        />
        <JoinChatroomForm
          currentUser={this.props.currentUser}
          handleOnCreate={this.handleCreateNewChatroom}
        />
        <h2>My Chatrooms</h2>
        <ul>
          {this.props.chatrooms.map(chatroom => (
            <li key={chatroom.id}>
              <Button href={`/chatrooms/${chatroom.id}`}>
                {chatroom.name}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

ChatroomsList.propTypes = propTypes;
ChatroomsList.defaultProps = defaultProps;
export default ChatroomsList;
