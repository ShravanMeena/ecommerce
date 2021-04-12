import React, { Component } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import FormContainer from "../component/FormContainer";
// import { login } from "../actions/userActions";
import { connect } from "react-redux";
import Loader from "../component/Loader";
import Error from "../component/common/Error";
import axios from "axios";

class SignScreen extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: false,
      loader: false,
    };
  }

  submitHandler = async (e) => {
    this.setState({
      loader: true,
    });
    e.preventDefault();
    const { email, password } = this.state;
    if (!email && !password) {
      this.setState({
        error: true,
        loader: false,
      });
      return;
    }
    // this.props.dispatch(login(email, password));

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios
      .post("/api/users/login", { email, password }, config)
      .then((data) => {
        this.setState({
          error: false,
          loader: false,
        });

        localStorage.setItem("userInfo", JSON.stringify(data.data));

        setTimeout(() => {
          window.location.reload();
        }, 1);
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loader: false,
          error: true,
        });
      });
  };

  componentDidMount() {
    window.scrollTo(0, 0);

    if (this.props.getLoginInfoData.userInfo) {
      this.props.history.push("/");
    }
  }
  render() {
    return (
      <FormContainer>
        <h2>Login</h2>
        {this.state.error && (
          <Error variant='danger' message='Email or password wrong!' />
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

          {this.state.loader ? (
            <Loader />
          ) : (
            <Button
              disabled={!this.state.password || !this.state.email}
              variant='primary'
              type='submit'
              onClick={this.submitHandler}>
              Submit
            </Button>
          )}
        </Form>

        <Row className='py-4 justify-content-md-center'>
          <Col>
            New customer <Link to='/register'>Register</Link>
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
