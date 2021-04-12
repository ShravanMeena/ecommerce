import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Card,
  ListGroup,
  Button,
  Form,
} from "react-bootstrap";
import { connect } from "react-redux";
import axios from "axios";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import Loader from "./Loader";
import Message from "./Message";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import Meta from "./Meta";

class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      Product: [],
      qty: 1,
      rating: 1,
      comment: "",
      comment_error: "",
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.dispatch(listProductDetails(this.props.match.params.id));
  }

  addToCartHandler = () => {
    this.props.history.push(
      `/cart/${this.props.match.params.id}?qty=${this.state.qty}`
    );
  };

  submitHandler = (e) => {
    if (!this.state.comment) {
      return;
    }
    this.props.dispatch(
      createProductReview(this.props.match.params.id, {
        rating: this.state.rating,
        comment: this.state.comment,
      })
    );
    setTimeout(() => {
      window.location.reload();
    }, 10);
  };
  render() {
    const { loading, error, product } = this.props.getProductDetailsData;
    const { userInfo } = this.props.getLoginInfoData;

    return (
      <div className='py-5 px-5'>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message />
        ) : (
          <>
            <Meta title={product.name} />
            <Row>
              <Col sm={12} md={6} lg={4} xl={4}>
                <Image style={{ width: "100%" }} src={product.image} rounded />
              </Col>
              <Col sm={12} md={6} lg={4} xl={4}>
                <Card style={{ border: "none" }}>
                  <ListGroup variant='flush'>
                    <ListGroup.Item as='h3'>{product.name}</ListGroup.Item>
                    <ListGroup.Item>
                      {/* {product.rating} rating from {product.numReviews} reviews */}
                      <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                      />
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Price:{" "}
                      <span style={{ fontWeight: 700 }}>${product.price}</span>
                    </ListGroup.Item>
                    <ListGroup.Item>{product.description}</ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
              <Col sm={12} md={6} lg={4} xl={4}>
                <Card>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <Row>
                        <Col>Price: </Col>
                        <Col>${product.price}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          {product.countInStock > 0 ? (
                            <span style={{ color: "green" }}>In Stock</span>
                          ) : (
                            <span style={{ color: "red" }}>Out of stock</span>
                          )}
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Qty:</Col>
                        <Col>
                          {product.countInStock > 0 ? (
                            <Form.Control
                              as='select'
                              value={this.state.qty}
                              onChange={(e) =>
                                this.setState({ qty: e.target.value })
                              }>
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </Form.Control>
                          ) : (
                            0
                          )}
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Button
                        onClick={this.addToCartHandler}
                        disabled={product.countInStock === 0}
                        style={{ width: "100%" }}
                        variant='dark'>
                        Add To Cart
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
            <Row className='py-5'>
              <Col md={6}>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h4>Write a customer review</h4>
                    {userInfo ? (
                      <Form>
                        <Form.Group controllId='rating'>
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as='select'
                            value={this.state.rating}
                            onChange={(e) =>
                              this.setState({ rating: e.target.value })
                            }>
                            <option value=''>Select...</option>
                            <option value='1'>1 - Poor</option>
                            <option value='2'>2 - Fair</option>
                            <option value='3'>3 - Good</option>
                            <option value='4'>4 - Very Good</option>
                            <option value='5'>5 - Excellent</option>
                          </Form.Control>
                        </Form.Group>

                        <Form.Group controllId='comment'>
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as='textarea'
                            row='3'
                            value={this.state.comment}
                            onChange={(e) =>
                              this.setState({ comment: e.target.value })
                            }></Form.Control>
                          <Form.Text
                            className='text-muted'
                            style={{ color: "red" }}>
                            One user is only add one review !!!
                          </Form.Text>
                          <Button
                            disabled={!this.state.comment}
                            type='button'
                            className='my-2'
                            variant='primary'
                            onClick={this.submitHandler}>
                            Submit
                          </Button>
                        </Form.Group>
                      </Form>
                    ) : (
                      <p>
                        Please{" "}
                        <Link to='/login' style={{ color: "red" }}>
                          sign in
                        </Link>{" "}
                        to write a review{" "}
                      </p>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>

              <Col md={6}>
                <ListGroup variant='flush'>
                  <h4>Reviews</h4>
                  {product.reviews.length === 0 && <p>No reviews</p>}

                  {product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <h6>{review.name}</h6>
                      <Rating value={review.rating} text={``} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
            </Row>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getProductDetailsData: state.productDetails,
    getLoginInfoData: state.userLogin,
  };
};

export default connect(mapStateToProps)(ProductDetails);
