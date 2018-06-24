import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const propTypes = {
  chatrooms: PropTypes.array,
};

const defaultProps = {};

class Chatroom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderChatroomList = this.renderChatroomList.bind(this);
  }

  renderChatroomList() {
    return(
      <ul>
        {this.props.chatrooms.map(chatroom => (
          <li key={chatroom.id}>
            <Button href={`/chatrooms/${chatroom.id}`}>
              {chatroom.name}
            </Button>
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div>
        <Button variant="contained" color="primary">
          Create new chatroom
        </Button>
        <h2>My Chatrooms</h2>
        { this.renderChatroomList() }
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
  ReactDOM.render(
    <Chatroom name='someName' chatrooms={data} />,
    document.getElementById('react-container').appendChild(document.createElement('div')),
  );
});