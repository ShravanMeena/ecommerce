import React, { Component } from "react";
import { Spinner } from "react-bootstrap";

export default class Loader extends Component {
  render() {
    return (
      <div className='d-flex justify-content-center py-5'>
        <Spinner animation='border' role='status'></Spinner>
      </div>
    );
  }
}
