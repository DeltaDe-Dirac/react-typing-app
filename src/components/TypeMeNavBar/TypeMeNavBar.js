import { useState } from "react";
import "./TypeMeNavBar.css";

import { Nav, Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TypeMeNavBar({ hideMe, resetHideMe, settings, setSettings }) {
  const hist = useHistory();
  const keepActive = ["error-1", "error-2", "error-3"];
  const [floatMenu, toggleFloatMenu] = useState(null);
  const [keyEvent, setKeyEvent] = useState(null);

  const handleSelect = (eventKey, e) => {
    // e.preventDefault();
    // console.log(e);
    if (e.type === "click" && !isBlockedKey()) {
      floatMenu && eventKey === floatMenu && !hideMe && !keepActive.includes(eventKey)
        ? toggleFloatMenu(null)
        : toggleFloatMenu(keepActive.includes(eventKey) ? "settings" : eventKey);

      if (eventKey === "restart") {
        hist.go(0);
      }

      if (keepActive.includes(eventKey)) {
        setSettings({ ...settings, error: eventKey.split("-")[1] });
      }
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
      <Navbar bg="dark" variant="dark" className="fixedMenu">
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
        <Nav className="flex-column">
          <div className="form-check form-switch">
            <label className="form-check-label" htmlFor="stats">
              Show WPM and Accuracy
            </label>
            <input
              className="form-check-input"
              type="checkbox"
              id="stats"
              tabIndex="-1"
              onChange={(e) => setSettings({ ...settings, stats: e.target.checked })}
              defaultChecked={settings.stats}
            ></input>
          </div>
          <hr />
          <div className="form-check form-switch">
            <label className="form-check-label" htmlFor="errors">
              Block on Error(s)
            </label>
            <input
              className="form-check-input"
              type="checkbox"
              id="errors"
              tabIndex="-1"
              onChange={(e) => setSettings({ ...settings, blockOnError: e.target.checked })}
              defaultChecked={settings.blockOnError}
            ></input>
          </div>
          <Nav
            fill
            variant="tabs"
            defaultActiveKey={"error-".concat(settings.error)}
            className={"blockOnError ".concat(settings.blockOnError ? "" : "hide")}
            onSelect={(eventKey, e) => handleSelect(eventKey, e)}
            tabIndex="-1"
          >
            <Nav.Item>
              <Nav.Link eventKey="error-1" tabIndex="-1">
                1st
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="error-2" tabIndex="-1">
                2nd
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="error-3" tabIndex="-1">
                3rd
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Nav>
      </Navbar>
      <Navbar
        expand
        bg="dark"
        variant="dark"
        className={floatMenu === "sound" && !hideMe ? `floatMenu ${floatMenu}` : "floatMenu"}
      >
        <Nav className="flex-column">
          <div className="form-check form-switch">
            <label className="form-check-label" htmlFor="keyboard">
              Keyboard Sound
            </label>
            <input
              className="form-check-input"
              type="checkbox"
              id="keyboard"
              tabIndex="-1"
              onChange={(e) => setSettings({ ...settings, sound: e.target.checked })}
              defaultChecked={settings.sound}
            ></input>
          </div>
          <hr />
          <div className="form-check form-switch">
            <label className="form-check-label" htmlFor="voice">
              Voice Over
            </label>
            <input
              className="form-check-input"
              type="checkbox"
              id="voice"
              tabIndex="-1"
              onChange={(e) => setSettings({ ...settings, voice: e.target.checked })}
              defaultChecked={settings.voice}
            ></input>
          </div>
        </Nav>
      </Navbar>
    </div>
  );
}
