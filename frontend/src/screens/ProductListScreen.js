import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Form, Button, Row, Col, Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../actions/productActions";
import Loader from "../component/Loader";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";
export default function UserListScreen({ history }) {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector((state) => state.productDelete);
  const { success: successDelete } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const { success: successCreate, product: createdProduct } = productCreate;

  useEffect(() => {
    window.scrollTo(0, 0);

    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo.isAdmin) {
      history.push("/");
    }
    if (successCreate) {
      history.push(`/admin/product/${createdProduct.createdProduct._id}/edit`);
    } else {
      dispatch(listProducts());
    }
  }, [dispatch, history, userInfo, successDelete, successCreate]);

  const deleteproductHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProduct(id));
    }
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <Container className='mt-5 p-5'>
      <Row className='align-items-center'>
        <Col>
          <h2>Products</h2>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th>In Stock</th>
              <th></th>
            </tr>
          </thead>
          {products === undefined ? (
            <tbody>
              <Button variant='light' onClick={window.location.reload()}>
                <Loader />
              </Button>
            </tbody>
          ) : (
            <tbody>
              {products.map((product) => {
                return (
                  <tr>
                    <th scope='row'>{product._id}</th>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>{product.countInStock}</td>

                    <td>
                      <LinkContainer to={`product/${product._id}/edit`}>
                        <Button variant='light' className='btn-sm'>
                          <i className='fas fa-edit'></i>
                        </Button>
                      </LinkContainer>

                      <Button
                        onClick={() => deleteproductHandler(product._id)}
                        variant='danger'
                        className='btn-sm'>
                        <i className='fas fa-trash'></i>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </Table>
      )}
    </Container>
  );
}
