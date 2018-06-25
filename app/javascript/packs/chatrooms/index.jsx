import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MyChatroomsList from './myChatroomsList';
import ChatroomsList from './chatroomsList';
import UsersList from './usersList';
import Grid from '@material-ui/core/Grid';

const propTypes = {
  chatrooms: PropTypes.array,
  currentUser: PropTypes.object,
  allChatrooms: PropTypes.array,
  users: PropTypes.array,
};

const defaultProps = {
  chatrooms: [],
  currentUser: null,
};

class Chatroom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderMyChatrooms = this.renderMyChatrooms.bind(this);
    this.renderAllChatrooms = this.renderAllChatrooms.bind(this);
    this.renderUsers = this.renderUsers.bind(this);
  }

  renderMyChatrooms() {
    if (this.props.currentUser) {
      return(
        <MyChatroomsList chatrooms={this.props.chatrooms} currentUser={this.props.currentUser} />
      );
    } else {
      return 'Please Login First';
    }
  }

  renderAllChatrooms () {
    if (this.props.currentUser) {
      return(
        <ChatroomsList chatrooms={this.props.allChatrooms} currentUser={this.props.currentUser} />
      );
    }
    return null;
  }

  renderUsers () {
    if (this.props.currentUser) {
      return(
        <UsersList users={this.props.users} currentUser={this.props.currentUser} />
      );
    }
    return null;
  }

  render() {
    return (
      <Grid container spacing={24}>
        <Grid item xs={4}> { this.renderMyChatrooms() } </Grid>
        <Grid item xs={4}> { this.renderAllChatrooms() } </Grid>
        <Grid item xs={4}> { this.renderUsers() } </Grid>
      </Grid>
    );
  }
}

Chatroom.propTypes = propTypes;
Chatroom.defaultProps = defaultProps;
export default Chatroom;

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('react-data');
  const data = JSON.parse(node.getAttribute('data'));
  const chatrooms = data.chatrooms;
  const allChatrooms = data.allChatrooms;
  const currentUser = data.currentUser;
  const users = data.users;
  ReactDOM.render(
    <Chatroom
      name='someName'
      chatrooms={chatrooms}
      allChatrooms={allChatrooms}
      currentUser={currentUser}
      users={users}
    />,
    document.getElementById('react-container').appendChild(document.createElement('div')),
  );
});