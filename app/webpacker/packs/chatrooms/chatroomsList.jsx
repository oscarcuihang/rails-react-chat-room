import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CreateChatroomForm from './createChatroomForm'
import JoinChatroomForm from './joinChatroomForm'
import ListItem from '@material-ui/core/ListItem';

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
    this.handleJoinChatroom = this.handleJoinChatroom.bind(this);
  }

  handleCreateNewChatroom(newChatroom) {
    let chatrooms = this.state.chatrooms;
    chatrooms.push(newChatroom);
    this.setState({ chatrooms: chatrooms })
  }

  handleJoinChatroom(chatroom) {
    event.preventDefault();
    const CSRF_TOKEN = document.querySelector('meta[name=csrf-token]').content;
    const url = `/chatrooms/join`;

    const requestBody = {
      currentUser: this.props.currentUser,
      chatroomName: chatroom.name
    };

    fetch(url, {
      method: 'PATCH',
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
        <h2>Chatrooms</h2>
        <div className='gird-area'>
          {this.props.chatrooms.map(chatroom => (
            <ListItem key={chatroom.id}>
              <Button variant="outlined" href={`/chatrooms/${chatroom.id}`}>
                {chatroom.name}
              </Button>
              <Button variant="outlined" onClick={() => { this.handleJoinChatroom(chatroom) }} >
                Join
              </Button>
            </ListItem>
            ))}
        </div>
      </div>
    );
  }
}

ChatroomsList.propTypes = propTypes;
ChatroomsList.defaultProps = defaultProps;
export default ChatroomsList;
