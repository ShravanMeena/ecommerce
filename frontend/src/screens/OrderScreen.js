import React, { Component } from "react";
import { deliveredOrder, payOrder } from "../actions/orderActions";
import { PayPalButton } from "react-paypal-button-v2";
import { connect } from "react-redux";
import CheckoutSteps from "../component/CheckoutSteps";
import axios from "axios";
import Loader from "../component/Loader";
import {
  Col,
  Container,
  ListGroup,
  Row,
  Image,
  Card,
  Button,
  Alert,
} from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

class OrderScreen extends Component {
  constructor() {
    super();
    this.state = {
      taxPrice: "",
      shippingPrice: "",
      totalPrice: "",
      itemsPrice: "",
      data: [],
      sdkReady: false,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get(`/api/config/paypal`);

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;

      script.onload = () => {
        this.setState({
          sdkReady: true,
        });
      };
      document.body.appendChild(script);
    };

    const token = this.props.getLoginInfoData.userInfo.token;
    const config = {
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(`/api/orders/${this.props.match.params.id}`, config)
      .then((response) => {
        this.setState({
          data: response.data,
        });

        if (!response.data.isPaid) {
          if (!window.paypal) {
            addPaypalScript();
          } else {
            this.setState({
              sdkReady: true,
            });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // order paid or not
    // console.log(this.state.data);
  }

  successPaymentHandler = (details, data) => {
    const paymentResult = {
      id: details.id,
      status: details.status,
      update_time: details.update_time,
      email_address: details.payer.email_address,
    };
    this.props.dispatch(payOrder(this.props.match.params.id, paymentResult));

    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  orderDeliveredHandler = () => {
    this.props.dispatch(deliveredOrder(this.props.match.params.id));
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  render() {
    if (!this.props.getLoginInfoData.userInfo) {
      return <Redirect to='/login' />;
    }

    const order = this.state.data;

    const user = this.props.getLoginInfoData;
    if (!order.shippingAddress && !order.orderItems) {
      return <Loader />;
    }

    return (
      <Container className='py-5'>
        <Row>
          <Col ms={8}>
            <h4>Order {order._id}</h4>

            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h4>Shipping:</h4>
                <p>Name: {user.userInfo.name}</p>
                <p>Email: {user.userInfo.email}</p>
                <p>
                  Address: {order.shippingAddress[0].address}{" "}
                  {order.shippingAddress[0].city}{" "}
                  {order.shippingAddress[0].postalCode}{" "}
                  {order.shippingAddress[0].country}
                </p>

                {order.isDelivered ? (
                  <Alert variant='success'>Delivere at {order.paidAt}</Alert>
                ) : (
                  <Alert variant='danger'>Not Delivered</Alert>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h4>Payment:</h4>
                <p>Method: {order.paymentMethod}</p>
                {order.isPaid ? (
                  <Alert variant='success'>Paid at {order.paidAt}</Alert>
                ) : (
                  <Alert variant='danger'>Not Paid</Alert>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h4>Order Items:</h4>
                {order.orderItems.length === 0 ? (
                  <p>Cart is empty</p>
                ) : (
                  <ListGroup variant='flush'>
                    {order.orderItems.map((item, index) => {
                      return (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={1}>
                              <Image
                                src={item.image}
                                alt={item.name}
                                fluid
                                rounded
                              />
                            </Col>
                            <Col>
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </Col>

                            <Col md={4}>
                              {item.qty} x ${item.price} = $
                              {item.qty * item.price}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      );
                    })}
                  </ListGroup>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={4}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h4>Order Summary</h4>
                </ListGroup.Item>

                <ListGroup.Item variant='flush'>
                  <Row>
                    <Col>Items</Col>
                    <Col>${order.itemsPrice}</Col>
                  </Row>

                  <Row>
                    <Col>Shipping</Col>
                    <Col>${order.shippingPrice}</Col>
                  </Row>

                  <Row>
                    <Col>Tax</Col>
                    <Col>${order.taxPrice}</Col>
                  </Row>
                  <Row>
                    <Col>Total</Col>
                    <Col>${order.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                {!order.isPaid && !user.userInfo.isAdmin && (
                  <ListGroup.Item>
                    {!this.state.sdkReady ? (
                      <Loader />
                    ) : (
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={(details, data) =>
                          this.successPaymentHandler(details, data)
                        }
                      />
                    )}
                  </ListGroup.Item>
                )}

                {user.userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      className='btn btn-block'
                      type='button'
                      onClick={this.orderDeliveredHandler}>
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getLoginInfoData: state.userLogin,
    getCartData: state.cart,
    getOrderDetailsData: state.orderDetails,
    getOrderPaymentData: state.orderPay,
  };
};

export default connect(mapStateToProps)(OrderScreen);
