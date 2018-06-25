import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';

const propTypes = {
  users: PropTypes.array,
  currentUser: PropTypes.object.isRequired,
};

const defaultProps = {
};

class UsersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleJoinChatroom = this.handleJoinChatroom.bind(this);
  }

  handleJoinChatroom(user) {
    event.preventDefault();
    const CSRF_TOKEN = document.querySelector('meta[name=csrf-token]').content;
    const url = `/chatrooms/personal`;

    const requestBody = {
      currentUser: this.props.currentUser,
      reciever: user
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
    .then((json) => { window.location = `/chatrooms/${json.data.id}`; })
    return null;
  }

  render() {
    return (
      <div>
        <h2>Users</h2>
        {this.props.users.map(user => (
          <ListItem key={user.id}>
            <Button variant="outlined" onClick={() => { this.handleJoinChatroom(user) }} >
              {user.name}
            </Button>
          </ListItem>
          ))}
      </div>
    );
  }
}

UsersList.propTypes = propTypes;
UsersList.defaultProps = defaultProps;
export default UsersList;
