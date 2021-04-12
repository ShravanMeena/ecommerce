import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Form, Button, Row, Col, Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listOrders, deleteUser } from "../actions/orderActions";
import Loader from "../component/Loader";

export default function OrderListScreen({ history }) {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //   const userDelete = useSelector((state) => state.userDelete);
  //   const { success: successDelete } = userDelete;

  useEffect(() => {
    window.scrollTo(0, 0);

    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/");
    }
  }, [dispatch, history]);

  return (
    <Container className='mt-5 p-5'>
      <h2>Orders</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders === undefined ? (
              <tbody>
                <Button variant='light' onClick={window.location.reload()}>
                  <Loader />
                </Button>
              </tbody>
            ) : (
              <>
                {orders.map((order) => {
                  return (
                    <tr key={order._id}>
                      <th scope='row'>{order._id}</th>
                      <td>{order.user && order.user.name}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>${order.totalPrice}</td>
                      <td>
                        {order.isPaid ? (
                          <span style={{ color: "green" }}>
                            {order.paidAt.substring(0, 10)}
                          </span>
                        ) : (
                          <i
                            className='fas fa-times'
                            style={{ color: "red" }}></i>
                        )}
                      </td>

                      <td>
                        {order.isDelivered ? (
                          <span style={{ color: "green" }}>
                            {order.deliveredAt.substring(0, 10)}
                          </span>
                        ) : (
                          <i
                            className='fas fa-times'
                            style={{ color: "red" }}></i>
                        )}
                      </td>

                      <td>
                        <LinkContainer to={`order/${order._id}`}>
                          <Button variant='light' className='btn-sm'>
                            <i className='fas fa-edit'></i>
                          </Button>
                        </LinkContainer>

                        <Button
                          //   onClick={() => deleteUserHandler(user._id)}
                          variant='danger'
                          className='btn-sm'>
                          <i className='fas fa-trash'></i>
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
