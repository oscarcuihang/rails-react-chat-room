import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { sendMessage, setCallback } from "../client/chatrooms";
import fetch from 'isomorphic-fetch';

const propTypes = {
  currentUser: PropTypes.object.isRequired,
  handleOnCreate: PropTypes.func.isRequired,
};

const defaultProps = {};
class CreateChatroomForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      submitStatus: 'fail'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const CSRF_TOKEN = document.querySelector('meta[name=csrf-token]').content;
    const url = `/chatrooms`;

    const requestBody = {
      currentUser: this.props.currentUser,
      chatroomName: this.state.value
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
        if (response.status>= 400) {
          throw new Error('Bad response from server');
          this.setState({ submitStatus: 'fail' });
        }
        return response.json();
    })
    .then((json) => { this.props.handleOnCreate(json.data) })
    return null;
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          required
          id="required"
          label="Chatroom Name"
          placeholder='Chatroom Name'
          margin="normal"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <Button type="submit" variant="contained" color="primary" >
          Create New Chatroom
        </Button>
      </form>
    );
  }
}

CreateChatroomForm.propTypes = propTypes;
CreateChatroomForm.defaultProps = defaultProps;
export default CreateChatroomForm;
