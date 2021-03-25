import React, { Component } from "react";
import { Alert, Button } from "react-bootstrap";
export default class Error extends Component {
  render() {
    const { variant, message, description, action } = this.props;
    return (
      <div>
        <Alert variant={variant}>
          {message && message}
          {description && description}
          {action && <Button onClick={action}>click here</Button>}
        </Alert>
      </div>
    );
  }
}
