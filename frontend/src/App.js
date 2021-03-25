import React, { Component } from "react";
import Home from "./screens/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProductDetails from "./component/ProductDetails";
import Header from "./component/Header";
import Footer from "./component/Footer";
import Cart from "./screens/Cart";
import SignScreen from "./screens/SignScreen";
import Register from "./screens/Register";
import ProfileScreen from "./screens/ProfileScreen";
import ShipingAddress from "./screens/ShipingAddress";
import PaymentAddress from "./screens/PaymentAddress";
import PlaceOrder from "./screens/PlaceOrder";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
export default class App extends Component {
  render() {
    return (
      <Router>
        <Route
          render={({ history, match }) => (
            <Header history={history} match={match} />
          )}
        />
        <div style={{ minHeight: "80vh" }}>
          <Route path='/login' component={SignScreen} />
          <Route path='/register' component={Register} />
          <Route path='/shipping' component={ShipingAddress} />
          <Route path='/payment' component={PaymentAddress} />
          <Route path='/placeorder' component={PlaceOrder} />
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/productslist' component={ProductListScreen} />
          <Route path='/orderslist' component={OrderListScreen} />

          <Route path='/search/:keyword' component={Home} exact />
          <Route path='/page/:pageNumber' component={Home} exact />
          <Route
            path='/search/:keyword/page/:pageNumber'
            component={Home}
            exact
          />
          <Route path='/' component={Home} exact />

          <Route path='/product/:id' component={ProductDetails} exact />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} exact />
          <Route
            path='/admin/product/:id/edit'
            component={ProductEditScreen}
            exact
          />
          <Route path='/cart/:id?' component={Cart} />
        </div>
        <Footer />
      </Router>
    );
  }
}
