import React, { Component } from "react";
import { Carousel, Row, Col } from "react-bootstrap";
import axios from "axios";
import Loader from "./Loader";
import { Link } from "react-router-dom";
export default class ProductCarousel extends Component {
  constructor() {
    super();
    this.state = {
      topProduct: null,
    };
  }
  componentDidMount() {
    axios
      .get(`/api/products/top/product`)
      .then((res) => {
        console.log(res.data);
        this.setState({
          topProduct: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { topProduct } = this.state;
    if (topProduct === null) {
      return <Loader />;
    }
    return (
      <Carousel
        pause='hover'
        className='bg-light '
        style={{ height: 500, marginBottom: 50 }}>
        {topProduct.map((p) => {
          return (
            <Carousel.Item style={{ width: "100%", height: "100%" }}>
              <Row>
                <Col sm={12} md={6}>
                  <img
                    className='d-block w-100'
                    src={p.image}
                    alt={p.name}
                    style={{ objectFit: "cover", height: 500 }}
                  />
                </Col>
                <Col sm={12} md={6}>
                  <Link to={`/product/${p._id}`}>
                    <div>
                      <h3
                        style={{
                          fontWeight: "bold",
                          fontSize: 40,
                          textAlign: "center",
                          marginTop: 180,
                        }}>
                        {p.name}
                      </h3>
                    </div>
                  </Link>
                </Col>
              </Row>
            </Carousel.Item>
          );
        })}
      </Carousel>
    );
  }
}
