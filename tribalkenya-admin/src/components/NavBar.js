import React, { useState, useContext } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'gatsby';
import { AuthContext } from './admin-login/Auth.context';

const NavBar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);
  const { logOut } = useContext(AuthContext);
  const logout = (ev) => {
    ev.preventDefault();
    logOut();
  };

  return (
    <div>
      <Navbar color="faded" className="white-bg" light>
        <NavbarBrand href="/" className="mr-auto">TribalKenya</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2 no-outline" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar className="text-center">
            <NavItem>
              <Link to="/home" className="navlink">Home</Link>
            </NavItem>
            <NavItem>
              <Link to="/places" className="navlink">Places</Link>
            </NavItem>
            <NavItem>
              <NavLink href="" onClick={logout}>Logout</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
