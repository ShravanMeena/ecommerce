import React, { Component } from "react";
import { Card, Container, Col, Row, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { listProducts } from "../actions/productActions";
import { connect } from "react-redux";
import Loader from "../component/Loader";
import Message from "../component/Message";
import Rating from "../component/Rating";
import Paginate from "../component/Paginate";
import { withRouter } from "react-router";
import ProductCarousel from "../component/ProductCarousel";
import Meta from "../component/Meta";
import Shipped from "../assets/shipped.png";
import Time from "../assets/back-in-time.png";
import Pay from "../assets/credit-card.png";
import PopularProducts from "../component/PopularProducts";

const data = [
  {
    id: 1,
    img: Shipped,
    title: "FREE SHIPPING",
    description: "For all order over 99$",
  },
  {
    id: 2,
    img: Time,
    title: "DELIVERY ON TIME",
    description: "If good have prolems",
  },
  {
    id: 3,
    img: Pay,
    title: "SECURE PAYMENT",
    description: "100% secure payment",
  },
];

class Product extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      pageNumber: 1,
      page: undefined,
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);

    const { keyword } = this.props.match.params;
    const pageNumber = this.props.match.params.pageNumber || 1;
    this.props.dispatch(listProducts(keyword, pageNumber));
  }

  render() {
    const {
      loading,
      error,
      products,
      pages,
      page,
    } = this.props.getProductListData;
    const { keyword } = this.props.match.params;
    return (
      <>
        <Meta />
        {!keyword && <ProductCarousel />}
        <Container>
          {!keyword && <h2>Latest products</h2>}
          {keyword && (
            <>
              {" "}
              <Link to='/'>
                <h6 style={{ marginTop: 140, marginBottom: 10, color: "blue" }}>
                  Go Back And Search Again
                </h6>
              </Link>
              <p style={{ opacity: 0.6, fontSize: 10 }}>
                Search keyword is not working here
              </p>
            </>
          )}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message />
          ) : (
            <>
              <Row className='pb-5 mb-5'>
                {!(products === undefined) && (
                  <>
                    {products.map((i, index) => {
                      return (
                        <>
                          {!(i.image === "/images/sample.jpeg") && (
                            <Col key={index} sm={12} md={6} lg={3} xl={3}>
                              <Card className='my-3' style={{ border: "none" }}>
                                <Card.Img
                                  fluid={true}
                                  alt='Card image'
                                  as={Image}
                                  variant='top'
                                  src={i.image}
                                />

                                <Card.Body>
                                  <Link to={`/product/${i._id}`}>
                                    <Card.Title as='div'>
                                      <strong
                                        style={{
                                          fontSize: 14,
                                          fontWeight: 500,
                                        }}>
                                        {i.image}
                                      </strong>
                                    </Card.Title>
                                  </Link>
                                  <Rating
                                    value={i.rating}
                                    text={`${i.numReviews} reviews`}
                                  />
                                  <Card.Text as='h5'>${i.price}</Card.Text>
                                </Card.Body>
                              </Card>
                            </Col>
                          )}
                        </>
                      );
                    })}
                  </>
                )}
              </Row>
              <Paginate
                pages={pages}
                page={page}
                keyword={keyword ? keyword : ""}
              />

              {/* something new */}

              <div className='shipmentContainer'>
                {data.map((item, index) => (
                  <div key={index} className='innerShipmentContainer'>
                    <img src={item.img} alt='Logo' />
                    <div style={{ marginLeft: 30 }}>
                      <h1 style={{ fontSize: 18, fontWeight: "bold" }}>
                        {item.title}
                      </h1>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <PopularProducts />
            </>
          )}
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getProductListData: state.productList,
  };
};

export default withRouter(connect(mapStateToProps)(Product));
