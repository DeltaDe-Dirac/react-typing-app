import { Container } from "react-bootstrap";
import "./TypingPage.css";

import TypeMeNavBar from "../../components/TypeMeNavBar/TypeMeNavBar";

export default function TypingPage({ typeMe }) {
  return (
    <div className="p-typingPageWrap">
      <TypeMeNavBar />

      <Container>
        <h3>{typeMe}</h3>
      </Container>
    </div>
  );
}
