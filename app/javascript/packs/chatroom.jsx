import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const propTypes = {

};

const defaultProps = {};

class Chatroom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
      
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
    <Chatroom name='someName' data={data} />,
    document.getElementById('react-container').appendChild(document.createElement('div')),
  );
});