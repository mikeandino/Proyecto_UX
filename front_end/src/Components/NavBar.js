import { Button } from "reactstrap";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

const NavBar = (props) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <div>
      {user ? (
        <>
          <Navbar color="dark" dark expand="md">
            <Nav className="mr-auto" navbar>
              <NavItem>
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </NavItem>
              <NavItem>
                <Button
                  onClick={() => {
                    localStorage.removeItem("user");
                    window.location.reload();
                  }}
                >
                  <Link to="/" className="nav-link">
                    Log Out
                  </Link>
                </Button>
              </NavItem>
            </Nav>
          </Navbar>
        </>
      ) : null}
    </div>
  );
};

export default NavBar;
