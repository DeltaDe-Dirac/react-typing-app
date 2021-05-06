import { Container, Nav, Navbar } from "react-bootstrap";
import "./TypingPage.css";
import { useHistory } from "react-router-dom";

export default function TypingPage({ typeMe }) {
  const hist = useHistory();
  return (
    <div className="c-typingPageWrap">
      <Navbar bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <Nav.Link href="#" onClick={() => hist.goBack()}>
              Back
            </Nav.Link>
            <Navbar.Brand>Lesson 223: Human Body</Navbar.Brand>
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
      <Navbar expand bg="dark" variant="dark" className="floatMenu">
        <Nav className="justify-content-end" activeKey="/home">
          <Nav.Link href="/home">Active</Nav.Link>

          <Nav.Link eventKey="link-1">Link</Nav.Link>

          <Nav.Link eventKey="link-2">Link</Nav.Link>

          <Nav.Link eventKey="disabled" disabled>
            Disabled
          </Nav.Link>
        </Nav>
        <Nav defaultActiveKey="/home" className="flex-column">
          <Nav.Link href="/home">Active</Nav.Link>
          <Nav.Link eventKey="link-1">Link</Nav.Link>
          <Nav.Link eventKey="link-2">Link</Nav.Link>
          <Nav.Link eventKey="disabled" disabled>
            Disabled
          </Nav.Link>
        </Nav>
      </Navbar>

      <Container>{typeMe}</Container>
    </div>
  );
}
