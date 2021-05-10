import { useState } from "react";
import "./TypingPage.css";

import { Container } from "react-bootstrap";
import TypeMeNavBar from "../../components/TypeMeNavBar/TypeMeNavBar";

export default function TypingPage({ typeMe }) {
  const nodeNames = ["path", "A", "svg", "INPUT", "LABEL", "HR"];
  const [hideMe, setHideMe] = useState(false);

  return (
    <div
      className="p-typingPageWrap"
      onClick={(e) => {
        if (
          !nodeNames.includes(e.target.nodeName) &&
          !(e.target.nodeName === "NAV" && e.target.classList.contains("floatMenu")) &&
          !(e.target.nodeName === "DIV" && e.target.classList.contains("navbar-nav"))
        ) {
          setHideMe(true);
        }
      }}
      tabIndex="0"
      onKeyDown={(e) => console.log(e.key)}
    >
      <TypeMeNavBar hideMe={hideMe} resetHideMe={() => setHideMe(false)} />

      <Container>
        <h3>{typeMe}</h3>
      </Container>
    </div>
  );
}
