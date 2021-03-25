import React, { Component } from "react";
import { Card, Container, Col, Row, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { listProducts } from "../actions/productActions";
import { connect } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";
import Rating from "./Rating";

class Product extends Component {
  constructor() {
    super();
    this.state = {
      Products: [],
    };
  }
  componentDidMount() {
    console.log("====================================");
    console.log(this.props.match);
    console.log("====================================");
    this.props.dispatch(listProducts());
  }

  render() {
    const { loading, error, products } = this.props.getProductListData;
    return (
      <div className='py-4'>
        <Container>
          <h2>Latest products</h2>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message />
          ) : (
            <Row>
              {!(products === undefined) && (
                <>
                  {products.map((i) => {
                    return (
                      <Col sm={12} md={6} lg={3} xl={3}>
                        <Card className='my-3 p-3 rounded'>
                          <Card.Img
                            fluid={true}
                            alt='Card image'
                            as={Image}
                            variant='top'
                            src={i.image}
                          />
                          {/* http://192.168.43.184:5000${i.image} */}
                          <Card.Body>
                            <Link to={`/product/${i._id}`}>
                              <Card.Title as='div'>
                                <strong
                                  style={{ fontSize: 14, fontWeight: 600 }}>
                                  {i.name}
                                </strong>
                              </Card.Title>
                            </Link>
                            <Rating
                              value={i.rating}
                              text={`${i.numReviews} reviews`}
                            />
                            <Card.Text as='h4'>${i.price}</Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                  })}
                </>
              )}
            </Row>
          )}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getProductListData: state.productList,
  };
};

export default connect(mapStateToProps)(Product);
