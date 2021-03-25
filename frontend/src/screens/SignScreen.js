import React, { Component } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import FormContainer from "../component/FormContainer";
import { login } from "../actions/userActions";
import { connect } from "react-redux";
import Loader from "../component/Loader";
import Error from "../component/common/Error";

class SignScreen extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: false,
    };
  }

  submitHandler = (e) => {
    const { email, password } = this.state;
    if (!email && !password) {
      this.setState({
        error: true,
      });
      return;
    }
    e.preventDefault();
    this.props.dispatch(login(email, password));
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
    return (
      <FormContainer>
        <h2>Login</h2>
        {this.state.error && (
          <Error variant='danger' message='Email Or Password Wrong!' />
        )}
        <Form>
          <Form.Group controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={this.state.email}
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
              value={this.state.password}
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
            New customer{" "}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}>
              Regiser
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

export default connect(mapStateToProps)(SignScreen);
