import React from 'react';

import { Collapse, Navbar, NavbarToggler, Nav, NavItem, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import NewBoardForm from './NewBoardForm';
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
  render() {
    return (
      <div>
        <Navbar color="faded" light toggleable>
          <NavbarToggler right onClick={this.toggle} />
          <NavLink to="/dashboard/boards">Djello</NavLink>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Button onClick={() => {
                    console.log("Logout not yet implmented");
                }}>Logout</Button>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default DjelloNavbar;
