import React, { Component } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import FormContainer from "../component/FormContainer";
import { getUserDetails } from "../actions/userActions";
import { connect } from "react-redux";
import Loader from "../component/Loader";
import axios from "axios";
class UserEditScreen extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      isAdmin: false,
      loading: true,
    };
  }

  submitHandler = (e) => {
    this.setState({
      loading: true,
    });
    // e.preventDefault();
    const { name, email, isAdmin } = this.state;
    const data = {
      name,
      email,
      isAdmin,
    };
    const token = this.props.getLoginInfoData.userInfo.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .put(`/api/users/${this.props.match.params.id}`, data, config)
      .then((response) => {
        this.props.history.push("/admin/userlist");

        this.setState({
          name: response.data.user.name,
          email: response.data.user.email,
          isAdmin: response.data.user.isAdmin,
          loading: false,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          loading: false,
        });
      });
  };

  componentDidMount() {
    window.scrollTo(0, 0);

    this.setState({
      loading: true,
    });
    const token = this.props.getLoginInfoData.userInfo.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(`/api/users/${this.props.match.params.id}`, config)
      .then((response) => {
        this.setState({
          name: response.data.user.name,
          email: response.data.user.email,
          isAdmin: response.data.user.isAdmin,
          loading: false,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          loading: false,
        });
      });
  }

  render() {
    const { name, email, isAdmin } = this.state;
    return (
      <>
        <Link to='/admin/userlist' className='btn btn-light mt-5 ml-5'>
          <i className='fa fa-arrow-left'></i> Go back
        </Link>

        <FormContainer>
          <h2>Edit User Details</h2>
          {this.state.loading ? (
            <Loader />
          ) : (
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

              <Form.Group controlId='isAdmin'>
                <Form.Check
                  type='Checkbox'
                  label='Is Admin'
                  checked={isAdmin}
                  onChange={(e) => this.setState({ isAdmin: e.target.checked })}
                />
              </Form.Group>

              {false ? (
                <Loader />
              ) : (
                <Button
                  variant='primary'
                  type='submit'
                  onClick={this.submitHandler}>
                  Update
                </Button>
              )}
            </Form>
          )}
        </FormContainer>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getLoginInfoData: state.userLogin,
    getUserDetailsData: state.getUserDetails,
  };
};

export default connect(mapStateToProps)(UserEditScreen);
