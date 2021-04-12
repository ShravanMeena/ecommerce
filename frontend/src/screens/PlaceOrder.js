import React, { Component } from "react";
import { createOrder } from "../actions/orderActions";
import { connect } from "react-redux";
import CheckoutSteps from "../component/CheckoutSteps";
import {
  Col,
  Container,
  ListGroup,
  Row,
  Image,
  Card,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../component/Loader";

class PlaceOrder extends Component {
  constructor() {
    super();
    this.state = {
      taxPrice: "",
      shippingPrice: "",
      totalPrice: "",
      itemsPrice: "",
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  placeOrderHandler = () => {
    const cart = this.props.getCartData;
    const { taxPrice, shippingPrice, totalPrice, itemsPrice } = this.state;

    const token = this.props.getLoginInfoData.userInfo.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(
        `/api/orders`,
        {
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentAddress.paymentMethod,
          taxPrice,
          shippingPrice,
          totalPrice,
          itemsPrice,
        },
        config
      )
      .then((response) => {
        localStorage.removeItem("cartItems", []);

        this.props.history.push(`/order/${response.data._id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    const cart = this.props.getCartData;
    const itemsPrice = cart.cartItems
      .reduce((acc, item) => acc + item.qty * item.price, 0)
      .toFixed(2);

    const shippingPrice = itemsPrice > 100 ? 0 : 100;
    const taxPrice = this.addDecimals(Number((0.05 * itemsPrice).toFixed(2)));
    const totalPrice = (
      Number(itemsPrice) +
      Number(shippingPrice) +
      Number(taxPrice)
    ).toFixed(2);

    this.setState({
      taxPrice,
      shippingPrice,
      totalPrice,
      itemsPrice,
    });
  }

  addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  render() {
    const cart = this.props.getCartData;
    const { itemsPrice, shippingPrice, taxPrice, totalPrice } = this.state;
    if (!cart.cartItems) {
      return <Loader />;
    }

    return (
      <Container className='py-5'>
        <CheckoutSteps step1 step2 step3 step4 />
        <Row>
          <Col ms={8}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h4>Shipping:</h4>
                <p>
                  {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                  {cart.shippingAddress.postalCode},{" "}
                  {cart.shippingAddress.country}
                </p>
              </ListGroup.Item>

              <ListGroup.Item>
                <h4>Payment:</h4>
                <p>Method: {cart.paymentAddress.paymentMethod}</p>
              </ListGroup.Item>

              <ListGroup.Item>
                <h4>Order Items:</h4>
                {cart.cartItems.length === 0 ? (
                  <p>Cart is empty</p>
                ) : (
                  <ListGroup variant='flush'>
                    {cart.cartItems.map((item, index) => {
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
                    <Col>${itemsPrice}</Col>
                  </Row>

                  <Row>
                    <Col>Shipping</Col>
                    <Col>${shippingPrice}</Col>
                  </Row>

                  <Row>
                    <Col>Tax</Col>
                    <Col>${taxPrice}</Col>
                  </Row>
                  <Row>
                    <Col>Total</Col>
                    <Col>${totalPrice}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Button
                    disabled={this.props.getLoginInfoData.userInfo.isAdmin}
                    type='button'
                    className='btn-block'
                    disabled={cart.cartItems.length === 0}
                    onClick={() => this.placeOrderHandler()}>
                    Place Order
                  </Button>
                  {this.props.getLoginInfoData.userInfo.isAdmin && (
                    <label style={{ opacity: 0.8, fontSize: 12 }}>
                      You are not able to buy your own product
                    </label>
                  )}
                </ListGroup.Item>
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
    getOrderData: state.createOrder,
  };
};

export default connect(mapStateToProps)(PlaceOrder);
