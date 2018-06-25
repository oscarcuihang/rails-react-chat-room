import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CreateChatroomForm from './createChatroomForm'
import JoinChatroomForm from './joinChatroomForm'
import ListItem from '@material-ui/core/ListItem';

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
    this.handleLeaveChatroom = this.handleLeaveChatroom.bind(this);
  }

  handleCreateNewChatroom(newChatroom) {
    let chatrooms = this.state.chatrooms;
    chatrooms.push(newChatroom);
    this.setState({ chatrooms: chatrooms })
  }

  handleLeaveChatroom(chatroom) {
    event.preventDefault();
    const CSRF_TOKEN = document.querySelector('meta[name=csrf-token]').content;
    const url = `/chatrooms/leave`;

    const requestBody = {
      currentUser: this.props.currentUser,
      chatroomId: chatroom.id
    };

    fetch(url, {
      method: 'DELETE',
      credentials: 'same-origin',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Transaction': 'POST claimed',
        'X-CSRF-Token': CSRF_TOKEN,
      },
    })
    .then((response) => {
        if (response.status>= 400) {
          this.setState({ submitStatus: 'fail' });
          throw new Error('Bad response from server');
        }
        return response.json();
    })
    .then((json) => { location.reload() })
    return null;
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
        {this.props.chatrooms.map(chatroom => (
          <ListItem key={chatroom.id}>
            <Button href={`/chatrooms/${chatroom.id}`}>
              {chatroom.name}
            </Button>

            <Button onClick={() => { this.handleLeaveChatroom(chatroom) }}>
              Leave
            </Button>
          </ListItem>
          ))}
      </div>
    );
  }
}

ChatroomsList.propTypes = propTypes;
ChatroomsList.defaultProps = defaultProps;
export default ChatroomsList;
