import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";

export default class FormContainer extends Component {
  render() {
    return (
      <Container className='py-5'>
        <Row className='justify-content-md-center'>
          <Col xs={12} md={6}>
            {this.props.children}
          </Col>
        </Row>
      </Container>
    );
  }
}
