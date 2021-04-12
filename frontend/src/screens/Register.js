import React, { Component } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import FormContainer from "../component/FormContainer";
// import { register } from "../actions/userActions";
import { connect } from "react-redux";
import Loader from "../component/Loader";
import Error from "../component/common/Error";
import axios from "axios";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
      error: false,
      confirm_register: false,
      loader: false,
    };
  }

  submitHandler = async (e) => {
    this.setState({
      loader: true,
    });
    e.preventDefault();
    const { name, email, password } = this.state;
    if (!email || !(password.length > 5) || !name.length > 3) {
      this.setState({
        error: true,
        loader: false,
      });
      return;
    }
    // this.props.dispatch(register(name, email, password))

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios
      .post("/api/users", { name, email, password }, config)
      .then((data) => {
        this.setState({
          confirm_register: true,
          error: false,
          loader: false,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loader: false,
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
    const { name, email, password, confirm_register, loader } = this.state;

    return (
      <FormContainer>
        <h2>Create account</h2>
        {confirm_register && (
          <Error
            variant='success'
            message={
              <p>
                You have registered succesfully. Please{" "}
                <Link to='login'>
                  <span style={{ color: "red" }}>signin</span>
                </Link>
              </p>
            }
          />
        )}
        {this.state.error && (
          <Error
            variant='danger'
            message={
              <div>
                <p>Password must be 6 chars long</p>{" "}
                <p>Must be a valid email address</p>{" "}
                <p>Name is required min 3 chars</p>
              </div>
            }
          />
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

          {loader ? (
            <Loader />
          ) : (
            <Button
              disabled={!name || !password || !email}
              variant='primary'
              type='submit'
              onClick={this.submitHandler}>
              Submit
            </Button>
          )}
        </Form>

        <Row className='py-4 justify-content-md-center'>
          <Col>
            Have an account <Link to='/login'>Login</Link>
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
