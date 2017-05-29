import React from 'react';

import { Collapse, Navbar, NavbarToggler, Nav, NavItem, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class DjelloNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  
  
  logoutButton = () => {
      if (!localStorage.getItem("token")) {
          return null;
      }
      return (
          <Button onClick={() => {
                        localStorage.removeItem('token');
                        window.location = '/login';
            }}>Logout</Button>
        );
  }
  render() {

    return (
      <div>
        <Navbar color="faded" light toggleable>
          <NavbarToggler right onClick={this.toggle} />
          <NavLink style={{fontSize:"1.4em", textDecoration: "none"}} to="/dashboard/boards">Djello</NavLink>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                    {this.logoutButton()}
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}


export default DjelloNavbar;
