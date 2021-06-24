import {
  Button,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  Collapse,
  NavbarToggler,
} from "reactstrap";
import React from "react";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  const [abierto, setAbierto] = React.useState(false);
  const toggle = () => setAbierto(!abierto);

  React.useEffect(() => {
    props.setUser(props.user);
  }, []);

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand>Laboratorio Firebase</NavbarBrand>
        <NavbarToggler onClick={toggle} className="mr-2" />
        {props.user !== null ? (
          <Collapse isOpen={abierto} navbar>
            <Nav className="mr-auto" navbar></Nav>
            <NavItem
              onClick={() => {
                props.setUser(null);
              }}
            >
              <Link to="/">Log Out</Link>
            </NavItem>
          </Collapse>
        ) : (
          <Collapse isOpen={abierto} navbar>
            <Nav className="mr-auto" navbar></Nav>
            <NavItem>
              <Link to="/">Log In</Link>
            </NavItem>
          </Collapse>
        )}
      </Navbar>
    </div>
  );
};

export default NavBar;
