import React, { Component } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  Button,
  FormControl,
  Dropdown,
} from "react-bootstrap";
import { connect } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { logout } from "../actions/userActions";
import SearchBox from "./SearchBox";
import { Route } from "react-router-dom";
class Header extends Component {
  logout = () => {
    this.props.dispatch(logout());
    this.props.history.push("/login");
  };

  render() {
    const { userInfo } = this.props.getLoginInfoData;
    return (
      <header style={{ marginBottom: 95 }}>
        <Navbar bg='light' className='px-5' fixed='top' expand='lg'>
          <Navbar.Brand href='/'>
            <i className='fas fa-shopping-bag'></i>{" "}
            <span style={{ color: "red", fontWeight: "700" }}>e</span>Commerce
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Route
              render={({ history, match }) => (
                <SearchBox history={history} match={match} />
              )}
            />
            <Nav className='ml-auto'>
              <Nav.Link>
                <Link to='/cart'>
                  <i className='fas fa-shopping-cart'></i> Cart
                </Link>
              </Nav.Link>

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title={"Dashboard"} id='adminmenu'>
                  <NavDropdown.Item>
                    <Link to='/admin/userlist'>Users</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link to='/admin/productslist'>Products</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link to='/orderslist'>Orders</Link>
                  </NavDropdown.Item>

                  {/* <NavDropdown.Divider /> */}
                </NavDropdown>
              )}

              {userInfo ? (
                <NavDropdown title={userInfo.name} id='basic-nav-dropdown'>
                  <NavDropdown.Item>
                    <Link to='/profile'>Profile</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={this.logout}>
                    Logout
                  </NavDropdown.Item>
                  {/* <NavDropdown.Divider /> */}
                </NavDropdown>
              ) : (
                <Nav.Link>
                  <Link to='/login'>
                    <i className='fas fa-user'></i> Sign In
                  </Link>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getLoginInfoData: state.userLogin,
  };
};

export default connect(mapStateToProps)(Header);
