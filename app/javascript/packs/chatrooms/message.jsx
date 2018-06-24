import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';

const propTypes = {
  message: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
};

const defaultProps = {};
class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderMessage = this.renderMessage.bind(this);
    this.renderSender = this.renderSender.bind(this);
    this.renderReciever = this.renderReciever.bind(this);
  }

  renderMessage() {
    if (this.props.message.user.id === this.props.currentUser.id) {
      return this.renderSender();
    } else {
      return this.renderReciever();
    }
  }

  renderSender() {
    return (
      <ListItem>
        <ListItemText
          className='message-sender'
          primary={this.props.message.message.content}
          secondary={this.props.message.message.created_at}
        />
        <ListItemAvatar>
          <Avatar>{this.props.message.user.name}</Avatar>
        </ListItemAvatar>
      </ListItem>
    );
  }

  renderReciever() {
    return (
      <ListItem>
        <ListItemAvatar>
          <Avatar>{this.props.message.user.name}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={this.props.message.message.content}
          secondary={this.props.message.message.created_at}
        />
      </ListItem>
    );
  }

  render() {
    return (
      <div>
        {this.renderMessage()}
      </div>
    );
  }
}

Message.propTypes = propTypes;
Message.defaultProps = defaultProps;
export default Message;
