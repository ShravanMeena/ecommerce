import React, { Component } from "react";
import { addToCart, removeCartItem } from "../actions/cartActions";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Container,
  ListGroup,
  Form,
  Image,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../component/Message";
import { Link } from "react-router-dom";

class Cart extends Component {
  // constructor(){
  //   super()

  // }
  componentDidMount() {
    window.scrollTo(0, 0);

    const productId = this.props.match.params.id;
    const qty = this.props.location.search
      ? Number(this.props.location.search.split("=")[1])
      : 1;

    if (productId) {
      this.props.dispatch(addToCart(productId, qty));
    }
  }

  removeFromCartHandler = (id) => {
    this.props.dispatch(removeCartItem(id));
  };

  checkoutHandler = () => {
    if (!this.props.getUserLoginData.userInfo) {
      return this.props.history.push("/login");
    } else {
      return this.props.history.push("/shipping");
    }
  };
  render() {
    const { cartItems } = this.props.getcartData;
    return (
      <Container className='py-4'>
        <Row>
          <Col md={8}>
            <h3>Shopping cart</h3>
            {cartItems.length === 0 ? (
              <Message message={`Your cart is empty`} />
            ) : (
              <ListGroup variant='flush'>
                {cartItems.map((item) => {
                  return (
                    <ListGroup.Item key={item.product}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col md={3}>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={2}>${item.price}</Col>

                        <Col md={2}>
                          <Form.Control
                            as='select'
                            value={item.qty}
                            onChange={(e) =>
                              this.props.dispatch(
                                addToCart(item.product, Number(e.target.value))
                              )
                            }>
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>

                        <Col md={2}>
                          <Button
                            type='button'
                            variant='light'
                            onClick={() =>
                              this.removeFromCartHandler(item.product)
                            }>
                            <i className='fas fa-trash'></i>
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            )}
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup>
                <ListGroup.Item>
                  <h5>
                    Subtotal{" "}
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)} items $
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </h5>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type='button'
                    className='d-block w-100'
                    disabled={cartItems.length === 0}
                    onClick={() => this.checkoutHandler()}>
                    Proceed to checkout
                  </Button>
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
    getcartData: state.cart,
    getUserLoginData: state.userLogin,
  };
};

export default connect(mapStateToProps)(Cart);
