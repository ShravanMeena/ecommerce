import React, { Component } from "react";
import { Carousel, Row, Col } from "react-bootstrap";
import axios from "axios";
import Loader from "./Loader";
import { Link } from "react-router-dom";

export default class PopularProducts extends Component {
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
      <>
        <h2>Popular Product</h2>

        <Row>
          <Col>
            <img
              src={topProduct[0].image}
              style={{
                width: "100%",
                height: 520,
                objectFit: "cover",
                cursor: "pointer",
              }}
            />
            <Link to={`/product/${topProduct[0]._id}`}>
              <h5 style={{ position: "absolute", right: 30, bottom: 20 }}>
                Shop Now
              </h5>
            </Link>
          </Col>
          <Col>
            <div>
              <img
                src={topProduct[1].image}
                style={{
                  width: "100%",
                  height: 250,
                  objectFit: "cover",
                  marginBottom: 20,
                  cursor: "pointer",
                }}
              />
              <Link to={`/product/${topProduct[1]._id}`}>
                <h5 style={{ position: "absolute", right: 30, bottom: 290 }}>
                  Shop Now
                </h5>
              </Link>
            </div>

            <div>
              <img
                src={topProduct[2].image}
                style={{
                  width: "100%",
                  height: 250,
                  objectFit: "cover",
                  marginBottom: 20,
                  cursor: "pointer",
                }}
              />
              <Link to={`/product/${topProduct[2]._id}`}>
                <h5 style={{ position: "absolute", right: 30, bottom: 20 }}>
                  Shop Now
                </h5>
              </Link>
            </div>
          </Col>
        </Row>
      </>
    );
  }
}
