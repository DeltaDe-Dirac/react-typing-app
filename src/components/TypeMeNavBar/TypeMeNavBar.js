import { useState } from "react";
import "./TypeMeNavBar.css";
import { Nav, Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TypeMeNavBar({ hideMe, resetHideMe }) {
  const hist = useHistory();
  const [floatMenu, toggleFloatMenu] = useState(null);

  const handleSelect = (eventKey, e) => {
    // e.preventDefault();
    // e.stopPropagation();
    if (e.type === "click") {
      floatMenu && eventKey === floatMenu && !hideMe ? toggleFloatMenu(null) : toggleFloatMenu(eventKey);
      resetHideMe();
    }
    // console.log(e);
    // console.log(eventKey);
  };

  const handleHide = (e) => {
    if (e.type === "click") {
      toggleFloatMenu(null);
      resetHideMe();
    }
    // console.log(e);
  };

  const handleGoBack = (e) => {
    if (e.type === "click") {
      hist.goBack();
    }
    // console.log(e);
  };

  return (
    <div className="c-typemeNavBarWrap">
      <Navbar bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav" onClick={(e) => handleHide(e)}>
          <Nav>
            <Nav.Link href="#" onClick={(e) => handleGoBack(e)}>
              <FontAwesomeIcon icon={["fa", "arrow-alt-circle-left"]} />
            </Nav.Link>

            <Navbar.Brand>Lesson 223: Human Body</Navbar.Brand>
          </Nav>
        </Navbar.Collapse>
        <Nav variant="tabs" defaultActiveKey="/home" onSelect={(eventKey, e) => handleSelect(eventKey, e)}>
          <Nav.Item>
            <Nav.Link href="#" eventKey="restart" active={false}>
              <FontAwesomeIcon icon={["fas", "undo"]} />
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#" eventKey="sound" active={floatMenu === "sound" && !hideMe}>
              <FontAwesomeIcon icon={["fas", "volume-up"]} />
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#" eventKey="settings" active={floatMenu === "settings" && !hideMe}>
              <FontAwesomeIcon icon={["fa", "cog"]} />
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>
      <Navbar
        expand
        bg="dark"
        variant="dark"
        className={floatMenu === "settings" && !hideMe ? `floatMenu ${floatMenu}` : "floatMenu"}
      >
        <Nav defaultActiveKey="/home" className="flex-column">
          <div className="form-check form-switch">
            <label className="form-check-label" htmlFor="stats">
              Show WPM and Accuracy
            </label>
            <input className="form-check-input" type="checkbox" id="stats"></input>
          </div>
          <hr />
          <div className="form-check form-switch">
            <label className="form-check-label" htmlFor="errors">
              Block on Error(s)
            </label>
            <input className="form-check-input" type="checkbox" id="errors"></input>
          </div>
        </Nav>
      </Navbar>
      <Navbar
        expand
        bg="dark"
        variant="dark"
        className={floatMenu === "sound" && !hideMe ? `floatMenu ${floatMenu}` : "floatMenu"}
      >
        <Nav defaultActiveKey="/home" className="flex-column">
          <div className="form-check form-switch">
            <label className="form-check-label" htmlFor="keyboard">
              Keyboard Sound
            </label>
            <input className="form-check-input" type="checkbox" id="keyboard"></input>
          </div>
          <hr />
          <div className="form-check form-switch">
            <label className="form-check-label" htmlFor="voice">
              Voice Over
            </label>
            <input className="form-check-input" type="checkbox" id="voice"></input>
          </div>
        </Nav>
      </Navbar>
    </div>
  );
}
