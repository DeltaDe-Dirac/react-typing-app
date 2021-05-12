import { useState, createRef, useEffect, useCallback } from "react";
import "./TypingPage.css";

import { Container } from "react-bootstrap";
import TypeMeNavBar from "../../components/TypeMeNavBar/TypeMeNavBar";
import Word from "../../components/Word/Word";

export default function TypingPage({ typeMe }) {
  const nodeNames = ["path", "A", "svg", "INPUT", "LABEL", "HR"];
  const [hideMe, setHideMe] = useState(false);
  const [letterIndex, setLetterIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const typingRef = createRef();
  const [letterMarks, setLetterMarks] = useState([]);

  const wordsArr = useCallback(() => {
    return typeMe ? typeMe.split(/\s+/g).map((word) => word.concat(" ")) : null;
  }, [typeMe]);

  useEffect(() => {
    setLetterMarks(
      wordsArr()
        ? wordsArr().map((word) =>
            new Array(word.length).fill({
              isClean: true,
              isCorrect: false,
              isFixed: false,
              isError: false,
            })
          )
        : []
    );
  }, [wordsArr]);

  useEffect(() => {
    typingRef.current.focus();
  }, [typingRef]);

  function handleTypingKey(e) {
    // console.log(letterMarks);
    // console.log(wordsArr[wordIndex][letterIndex], letterIndex, e.key, e.key.charCodeAt(0));
    if (e.key.charCodeAt(0) > 31 && e.key.charCodeAt(0) < 127) {
      if (wordsArr()[wordIndex][letterIndex] === e.key) {
        // console.log("correct");
        letterMarks[wordIndex][letterIndex] = {
          isClean: false,
          isCorrect: true,
          isFixed: false,
          isError: false,
        };
        setLetterMarks([...letterMarks]);
      } else {
        // console.log("incorrect");
        letterMarks[wordIndex][letterIndex] = {
          isClean: false,
          isCorrect: false,
          isFixed: false,
          isError: true,
        };
        setLetterMarks([...letterMarks]);
      }

      setLetterIndex(letterIndex + 1);

      if (letterIndex + 1 === wordsArr()[wordIndex].length) {
        setLetterIndex(0);
        setWordIndex(wordIndex + 1);
      }
    }
  }

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
      onKeyDown={(e) => handleTypingKey(e)}
      tabIndex="0"
      ref={typingRef}
    >
      <TypeMeNavBar hideMe={hideMe} resetHideMe={() => setHideMe(false)} />

      <Container>
        <div>
          {wordsArr()
            ? wordsArr().map((word, index) => (
                <Word key={`wordSpan-${index}`} word={word} wordNum={index} letterMarks={letterMarks[index]} />
              ))
            : null}
        </div>
      </Container>
    </div>
  );
}
