import React, { Component } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import FormContainer from "../component/FormContainer";
import { register } from "../actions/userActions";
import { connect } from "react-redux";
import Loader from "../component/Loader";
import Error from "../component/common/Error";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
      error: false,
    };
  }

  submitHandler = (e) => {
    e.preventDefault();
    const { name, email, password } = this.state;
    if (!email && !password && !name) {
      this.setState({
        error: true,
      });
      return;
    }
    this.props.dispatch(register(name, email, password));
  };

  componentDidMount() {
    if (this.props.getLoginInfoData.userInfo) {
      this.props.history.push("/");
    }
  }
  render() {
    const { loading, error, userInfo } = this.props.getLoginInfoData;
    const redirect = this.props.location.search
      ? this.props.location.search.split("=")
      : "/";

    const { name, email, password } = this.state;

    return (
      <FormContainer>
        <h2>Create account</h2>
        {this.state.error && (
          <Error variant='danger' message='Enter name, email, password ' />
        )}
        <Form>
          <Form.Group controlId='formBasicEmail'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter your name'
              value={name}
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
            <Form.Text className='text-muted'>
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </Form.Group>

          {loading ? (
            <Loader />
          ) : (
            <Button
              variant='primary'
              type='submit'
              onClick={this.submitHandler}>
              Submit
            </Button>
          )}
        </Form>

        <Row className='py-4 justify-content-md-center'>
          <Col>
            Have an account{" "}
            <Link to={redirect ? `/login?redirect=${redirect}` : "/register"}>
              Login
            </Link>
          </Col>
        </Row>
      </FormContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getLoginInfoData: state.userLogin,
  };
};

export default connect(mapStateToProps)(Register);
