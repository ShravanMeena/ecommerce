import React, { Component } from "react";
import { Alert } from "react-bootstrap";
export default class Message extends Component {
  render() {
    return (
      <div>
        <Alert variant='info'>
          {this.props.message ? this.props.message : "Error occur"}
        </Alert>
      </div>
    );
  }
}
