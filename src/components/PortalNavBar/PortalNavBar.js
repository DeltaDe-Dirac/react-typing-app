import React from "react";
import { Button, Form, FormControl, Nav, Navbar, NavDropdown } from "react-bootstrap";

export default function PortalNavBar({ isLoggedIn, setIsSignOut }) {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#/portal">TypeMe</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#construction">Home</Nav.Link>
            <Nav.Link href="#construction">Link</Nav.Link>
          </Nav>
          <Nav className="mr-left">
            {isLoggedIn ? (
              <>
                <NavDropdown title="User" id="basic-nav-dropdown" drop="left">
                  <NavDropdown.Item href="#construction/3.1">Profile</NavDropdown.Item>
                  <NavDropdown.Item href="#construction/3.2">Change Password</NavDropdown.Item>
                  <NavDropdown.Item href="#construction/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#" onClick={() => setIsSignOut(true)}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link href="#construction">Save Progress</Nav.Link>
                <Nav.Link href="#construction">Login</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
