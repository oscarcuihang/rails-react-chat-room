import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ChatroomsList from './chatroomsList';

const propTypes = {
  chatrooms: PropTypes.array,
  currentUser: PropTypes.object,
};

const defaultProps = {
  chatrooms: [],
  currentUser: null,
};

class Chatroom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderIndex = this.renderIndex.bind(this);
  }

  renderIndex() {
    if (this.props.currentUser) {
      return(
        <ChatroomsList chatrooms={this.props.chatrooms} currentUser={this.props.currentUser} />
      );
    } else {
      return 'Please Login First';
    }
  }

  render() {
    return (
      <div>
        { this.renderIndex() }
      </div>
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

  const currentUser = data.currentUser;

  ReactDOM.render(
    <Chatroom
      name='someName'
      chatrooms={chatrooms}
      currentUser={currentUser}
    />,
    document.getElementById('react-container').appendChild(document.createElement('div')),
  );
});