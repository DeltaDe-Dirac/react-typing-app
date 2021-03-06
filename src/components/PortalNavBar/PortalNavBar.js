import "./PortalNavBar.css";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

export default function PortalNavBar({ isLoggedIn, setIsSignOut, setShowAuth }) {
  function logOut(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsSignOut(true);
  }

  function logIn(e) {
    e.preventDefault();
    e.stopPropagation();
    setShowAuth(true);
  }

  return (
    <div className="c-portalNavBarWrapper">
      <Navbar collapseOnSelect bg="dark" variant="dark" expand="lg" className="c-portalNavBar">
        <Container fluid="lg">
          <Navbar.Brand href="#/">TypeMe</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#/portal/plans" active={false}>
                Home
              </Nav.Link>
              <Nav.Link href="#construction">Stats</Nav.Link>
            </Nav>
            <Nav className="mr-left">
              {isLoggedIn ? (
                <>
                  <NavDropdown title="User" id="basic-nav-dropdown" drop="left">
                    <NavDropdown.Item href="#construction/3.1">Profile</NavDropdown.Item>
                    <NavDropdown.Item href="#construction/3.2">Change Password</NavDropdown.Item>
                    {/* <NavDropdown.Item href="#construction/3.3">Something</NavDropdown.Item> */}
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#" onClick={(e) => logOut(e)} active={false}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <Nav.Link href="#construction">Save Progress</Nav.Link>
                  <Nav.Link href="#" onClick={(e) => logIn(e)}>
                    Login
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
