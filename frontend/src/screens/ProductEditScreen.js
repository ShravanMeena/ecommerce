import React, { Component } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import FormContainer from "../component/FormContainer";
import { getUserDetails } from "../actions/userActions";
import { connect } from "react-redux";
import Loader from "../component/Loader";
import axios from "axios";

class ProductEditScreen extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      price: "",
      image: "",
      brand: "",
      category: "",
      countInStock: "",
      numReviews: 0,
      imageUrl: "https://placeimg.com/320/320/animals",

      description: "",
      loading: true,
      uploading: false,
    };
  }

  submitHandler = (e) => {
    this.setState({
      loading: true,
    });
    // e.preventDefault();
    const {
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      numReviews,
      description,
    } = this.state;
    const data = {
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      numReviews,
      description,
    };
    const token = this.props.getLoginInfoData.userInfo.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .put(`/api/products/${this.props.match.params.id}`, data, config)
      .then((response) => {
        this.props.history.push(`/admin/productslist`);
        this.setState({
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
      .get(`/api/products/${this.props.match.params.id}`, config)
      .then((response) => {
        console.log(response.data);
        this.setState({
          name: response.data.name,
          price: response.data.price,
          image: response.data.image,
          brand: response.data.brand,
          category: response.data.category,
          countInStock: response.data.countInStock,
          numReviews: response.data.numReviews,
          description: response.data.description,
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

  onFileChange = (event) => {
    this.setState({
      uploading: true,
    });
    var formdata = new FormData();
    formdata.append("image", event.target.files[0]);
    formdata.append("filetype", "IMG");
    axios({
      method: "post",
      url: `/api/upload`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formdata,
    })
      .then((res) => {
        this.setState({
          image: res.data,
          uploading: false,
        });
      })
      .catch((err) => {
        this.setState({
          uploading: false,
        });
        console.log("Error : " + err);
      });
  };

  render() {
    const {
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      numReviews,
      description,
    } = this.state;
    return (
      <>
        <Link to='/admin/productslist' className='btn btn-light mt-5 ml-5'>
          <i className='fa fa-arrow-left'></i> Go back
        </Link>

        <FormContainer>
          <h2>Edit Product Details</h2>
          {this.state.loading ? (
            <Loader />
          ) : (
            <Form>
              {/* <img
                width='320'
                src={`//uploads/image - 1615302608565.png`}
              /> */}

              <Form.Group controlId='formBasicEmail'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter product name'
                  value={name}
                  onChange={(e) => this.setState({ name: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId='price'>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Product Price'
                  value={price}
                  onChange={(e) => this.setState({ price: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId='category'>
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter category'
                  value={category}
                  onChange={(e) => this.setState({ category: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId='category'>
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter category'
                  value={brand}
                  onChange={(e) => this.setState({ brand: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId='countInStock'>
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter stock limit'
                  value={countInStock}
                  onChange={(e) =>
                    this.setState({ countInStock: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group controlId='description'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter description'
                  value={description}
                  onChange={(e) =>
                    this.setState({ description: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group controlId='image'>
                <Form.Label> Image </Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter image url'
                  value={image}
                  onChange={(e) => this.setState({ image: e.target.value })}
                />
                <Form.File
                  id='img-upload'
                  label='Choose File'
                  custom
                  onChange={this.onFileChange}
                />

                {this.state.uploading && <Loader />}
              </Form.Group>

              {/* <Form.Group controlId='isAdmin'>
                <Form.Check
                  type='Checkbox'
                  label='Is Admin'
                  checked={isAdmin}
                  onChange={(e) => this.setState({ isAdmin: e.target.checked })}
                />
              </Form.Group> */}

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

export default connect(mapStateToProps)(ProductEditScreen);
