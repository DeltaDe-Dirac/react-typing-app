import { Container, Nav, Navbar } from "react-bootstrap";
import "./TypingPage.css";
import { useHistory } from "react-router-dom";

export default function TypingPage({ typeMe }) {
  const history = useHistory();
  return (
    <div className="c-typingPageWrap">
      <Navbar collapseOnSelect expand bg="dark" variant="dark">
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <Nav.Link href="#">Features</Nav.Link>
            <Navbar.Brand href="#">Lesson 223: Human Body</Navbar.Brand>
          </Nav>
        </Navbar.Collapse>
        <Nav variant="tabs" defaultActiveKey="/home">
          <Nav.Item>
            <Nav.Link href="#">Active</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-1">Option 2</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="disabled">Disabled</Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>

      <Container>{typeMe}</Container>
    </div>
  );
}
