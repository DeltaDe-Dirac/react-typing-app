import { useState } from "react";
import "./TypeMeNavBar.css";

import { Nav, Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TypeMeNavBar({ hideMe, resetHideMe }) {
  const hist = useHistory();
  const [floatMenu, toggleFloatMenu] = useState(null);
  const [keyEvent, setKeyEvent] = useState(null);
  // console.log(keyEvent);

  const handleSelect = (eventKey, e) => {
    if (e.type === "click" && !isBlockedKey()) {
      floatMenu && eventKey === floatMenu && !hideMe ? toggleFloatMenu(null) : toggleFloatMenu(eventKey);
      resetHideMe();
    }
    setKeyEvent(null);
  };

  const handleHide = (e) => {
    if (e.type === "click") {
      toggleFloatMenu(null);
      resetHideMe();
    }
  };

  const handleGoBack = (e) => {
    if (e.type === "click" && !isBlockedKey()) {
      hist.goBack();
    }
    setKeyEvent(null);
  };

  function isBlockedKey() {
    if (keyEvent === null) {
      return false;
    }
    return keyEvent.keyCode === 13;
  }

  return (
    <div className="c-typemeNavBarWrap">
      <Navbar bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav" onClick={(e) => handleHide(e)}>
          <Nav onKeyDown={(e) => setKeyEvent(e)}>
            <Nav.Link href="#" onClick={(e) => handleGoBack(e)} tabIndex="-1">
              <FontAwesomeIcon icon={["fa", "arrow-alt-circle-left"]} />
            </Nav.Link>

            <Navbar.Brand>Lesson 223: Human Body</Navbar.Brand>
          </Nav>
        </Navbar.Collapse>
        <Nav variant="tabs" onSelect={(eventKey, e) => handleSelect(eventKey, e)} onKeyDown={(e) => setKeyEvent(e)}>
          <Nav.Item>
            <Nav.Link href="#" eventKey="restart" active={false} tabIndex="-1">
              <FontAwesomeIcon icon={["fas", "undo"]} />
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#" eventKey="sound" active={floatMenu === "sound" && !hideMe} tabIndex="-1">
              <FontAwesomeIcon icon={["fas", "volume-up"]} />
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#" eventKey="settings" active={floatMenu === "settings" && !hideMe} tabIndex="-1">
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
            <input className="form-check-input" type="checkbox" id="stats" tabIndex="-1"></input>
          </div>
          <hr />
          <div className="form-check form-switch">
            <label className="form-check-label" htmlFor="errors">
              Block on Error(s)
            </label>
            <input className="form-check-input" type="checkbox" id="errors" tabIndex="-1"></input>
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
            <input className="form-check-input" type="checkbox" id="keyboard" tabIndex="-1"></input>
          </div>
          <hr />
          <div className="form-check form-switch">
            <label className="form-check-label" htmlFor="voice">
              Voice Over
            </label>
            <input className="form-check-input" type="checkbox" id="voice" tabIndex="-1"></input>
          </div>
        </Nav>
      </Navbar>
    </div>
  );
}
