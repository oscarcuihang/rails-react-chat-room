import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { sendMessage } from "../client/messages";

const propTypes = {
  chatroom: PropTypes.object.isRequired,
};

const defaultProps = {};
class MessageInputBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleEnterKeyOnPress = this.handleEnterKeyOnPress.bind(this);
    this.handleSendMessage = this.handleSendMessage.bind(this);
  }


  handleEnterKeyOnPress(ev) {
    if (ev.key === 'Enter') {
      ev.preventDefault();
      this.handleSendMessage();
    }
  }

  handleSendMessage() {
    const inputMessage = document.getElementById('new_message').value;
    console.log(inputMessage);
    document.getElementById('new_message').value = null;

    const chatroomId = this.props.chatroom.id;
    const CSRF_TOKEN = document.querySelector('meta[name=csrf-token]').content;
    const url = `/chatrooms/${chatroomId}/messages`;
    const requestBody = {
      message_content: inputMessage,
      chatroom_id: chatroomId
    };

    sendMessage(requestBody);
    return null;
  }

  render() {
    return (
      <TextField
        id="new_message"
        label="New Message"
        multiline
        rows="4"
        placeholder="Input New Message"
        margin="normal"
        fullWidth={true}
        autoFocus={true}
        onKeyPress={(ev) => { this.handleEnterKeyOnPress(ev) }}
      />
    );
  }
}

MessageInputBox.propTypes = propTypes;
MessageInputBox.defaultProps = defaultProps;
export default MessageInputBox;
