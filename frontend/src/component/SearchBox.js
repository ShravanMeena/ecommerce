import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

class SearchBox extends Component {
  constructor() {
    super();
    this.state = {
      keyword: "",
    };
  }
  submitHandler = (e) => {
    const { keyword } = this.state;
    e.preventDefault();
    if (keyword.trim()) {
      this.props.history.push(`/search/${keyword}`);
    } else {
      this.props.history.push("/");
    }
  };
  render() {
    return (
      <Form onSubmit={this.submitHandler} inline>
        <Form.Group controllId='keyword'>
          <Form.Control
            type='text'
            name='q'
            placeholder='Search products...'
            className='mr-sm-2 ml-sm-5'
            value={this.state.keyword}
            onChange={(e) =>
              this.setState({ keyword: e.target.value })
            }></Form.Control>
          <Button type='submit' variant='outline-dark' className='p-2'>
            Search
          </Button>
        </Form.Group>
      </Form>
    );
  }
}

export default withRouter(SearchBox);
