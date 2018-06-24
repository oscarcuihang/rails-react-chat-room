import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import Message from './message';
import fetch from 'isomorphic-fetch';

const propTypes = {
  messages: PropTypes.array,
  chatroom: PropTypes.object,
};

const defaultProps = {};

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: this.props.messages,
    };
    this.renderMessagesList = this.renderMessagesList.bind(this);
    this.handleEnterKeyOnPress = this.handleEnterKeyOnPress.bind(this);
  }

  componentDidMount() {
    const element = document.getElementById("messages-area");
    element.scrollTop = element.scrollHeight;
  }

  renderMessagesList() {
    const messagesList = Object.keys(this.state.messages).map(id => (
      <Message key={`message${id}`} message={this.state.messages[id]} />
    ));
    return messagesList;
  }

  handleEnterKeyOnPress() {
    const inputMessage = document.getElementById('new_message').value;
    console.log(inputMessage);
    document.getElementById('new_message').value = null;

    const chatroomId = this.props.chatroom.id;
    const CSRF_TOKEN = document.querySelector('meta[name=csrf-token]').content;
    const url = `/chatrooms/${chatroomId}/messages`;
    console.log(url);
    const requestBody = {
      message_content: inputMessage,
      chatroom_id: chatroomId
    };

    fetch(url, {
      method: 'POST',
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
        if (response.status === 200) {
          this.setState({ submitStatus: 'success' });
        } else {
          this.setState({ submitStatus: 'fail' });
        }
      });

    return null;
  }

  render() {
    return (
      <div>
        <h2>{this.props.chatroom.name}</h2>
        <div id='messages-area' className='messages-area'>{ this.renderMessagesList() }</div>
        <TextField
          id="new_message"
          label="New Message"
          multiline
          rows="4"
          placeholder="Input New Message"
          margin="normal"
          fullWidth={true}
          autoFocus={true}
            onKeyPress={(ev) => {
            if (ev.key === 'Enter') {
              console.log(`Pressed keyCode ${ev.key}`);
              ev.preventDefault();
              this.handleEnterKeyOnPress();
            }
          }}
        />
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