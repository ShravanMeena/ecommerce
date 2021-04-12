import React, { Component } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import FormContainer from "../component/FormContainer";
import { login } from "../actions/userActions";
import { connect } from "react-redux";
import Loader from "../component/Loader";
import { savePaymentMethodAddress } from "../actions/cartActions";
import CheckoutSteps from "../component/CheckoutSteps";

class PaymentAddress extends Component {
  constructor() {
    super();
    this.state = {
      paymentMethod: "PayPal",
    };
  }
  submitHandler = (e) => {
    const { paymentMethod } = this.state;
    e.preventDefault();
    this.props.dispatch(savePaymentMethodAddress({ paymentMethod }));
    this.props.history.push("/placeorder");
  };

  componentDidMount() {
    window.scrollTo(0, 0);

    // const paymentAddress = this.props.getcartData;
    // if (paymentAddress) {
    //   this.setState({
    //     paymentMethod: paymentAddress.paymentMethod,
    //   });
    // } else {
    //   return;
    // }
  }
  render() {
    return (
      <FormContainer>
        <CheckoutSteps step1 step2 step3 />

        <h2>Payment Method</h2>
        <Form>
          <Form.Check
            type='radio'
            label='Paypal or Credit Card'
            id='PayPal'
            name='paymentMethod'
            value='PayPal'
            checked
            onChange={(e) => this.setState({ paymentMethod: e.target.value })}
            className='py-2'
          />

          {/* <Form.Check
            type='radio'
            label='Stripe'
            id='Stripe'
            name='paymentMethod'
            value='Stripe'
            checked
            onChange={(e) => this.setState({ paymentMethod: e.target.value })}
            className='py-2'
          /> */}
          <br />
          <Button variant='primary' type='submit' onClick={this.submitHandler}>
            Continue
          </Button>
        </Form>
      </FormContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getLoginInfoData: state.userLogin,
  };
};

export default connect(mapStateToProps)(PaymentAddress);
