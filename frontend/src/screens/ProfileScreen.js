import React, { Component } from "react";
import { Form, Button, Row, Col, Container, Table } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { updateUserProfile } from "../actions/userActions.js";
import { connect } from "react-redux";
import Loader from "../component/Loader";
import axios from "axios";
import Message from "../component/Message";

class ProfileScreen extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
      loading: true,
      myOrders: [],
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);

    const token = this.props.getLoginInfoData.userInfo.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get("/api/users/profile", config)
      .then((response) => {
        this.setState({
          name: response.data.name,
          email: response.data.email,
          loading: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("/api/orders/myorders", config)
      .then((response) => {
        this.setState({
          myOrders: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  submitHandler = (e) => {
    e.preventDefault();
    this.props.dispatch(
      updateUserProfile({
        // id: this.props.getLoginInfoData.userInfo.id,
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      })
    );
  };

  render() {
    if (!this.props.getLoginInfoData.userInfo) {
      return <Redirect to='/login' />;
    }
    const { name, email, password } = this.state;

    return (
      <Container className='py-4'>
        {!this.state.loading ? (
          <Row>
            <Col md={4}>
              <h3>User Profile</h3>
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
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                  />
                </Form.Group>

                <Button
                  variant='primary'
                  type='submit'
                  className='w-100'
                  onClick={this.submitHandler}>
                  Update profile
                </Button>
              </Form>
            </Col>
            <Col md={8}>
              <h4>My Orders</h4>

              <Table striped bordered hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.myOrders ? (
                    <>
                      {this.state.myOrders.reverse().map((order, index) => {
                        return (
                          <tr>
                            <th scope='row'>{order._id}</th>
                            <td>${order.totalPrice}</td>
                            <td>
                              {order.isPaid ? (
                                order.paidAt.substring(0, 10)
                              ) : (
                                <i
                                  style={{ color: "red" }}
                                  className='fa fa-times'></i>
                              )}
                            </td>
                            <td>
                              {order.isDelivered ? (
                                order.deliveredAt.substring(0, 10)
                              ) : (
                                <i
                                  style={{ color: "red" }}
                                  className='fa fa-times'></i>
                              )}
                            </td>

                            <td>
                              <LinkContainer to={`order/${order._id}`}>
                                <Button variant='light'>Details</Button>
                              </LinkContainer>
                            </td>
                          </tr>
                        );
                      })}
                    </>
                  ) : (
                    <h4>No order yet</h4>
                  )}
                </tbody>
              </Table>
            </Col>
          </Row>
        ) : (
          <Loader />
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getLoginInfoData: state.userLogin,
    getUserDetailsData: state.userDetails,
  };
};

export default connect(mapStateToProps)(ProfileScreen);
