import { useState, createRef, useEffect, useCallback } from "react";
import "./TypingPage.css";

import { Container } from "react-bootstrap";
import TypeMeNavBar from "../../components/TypeMeNavBar/TypeMeNavBar";
import Word from "../../components/Word/Word";
import { isBackSpace, isAlphanumeric } from "../../utils/keycodes";

import useSound from "use-sound";
import rightPress from "./sounds/rightPress.mp3";
import wrongPress from "./sounds/wrongPress.mp3";
import endLesson from "./sounds/endLesson.mp3";

export default function TypingPage({ typeMe }) {
  const [correctType] = useSound(rightPress);
  const [misType] = useSound(wrongPress);
  const [finishLesson] = useSound(endLesson);

  const nodeNames = ["path", "A", "svg", "INPUT", "LABEL", "HR"];
  const [hideMe, setHideMe] = useState(false);
  const [letterIndex, setLetterIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const typingRef = createRef();
  const [letterMarks, setLetterMarks] = useState([]);
  const [settings, setSettings] = useState({
    sound: true,
    voice: false,
    stats: true,
    blockOnError: true,
    error: "error-1",
  });

  const wordsArr = useCallback(() => {
    const typeWords = typeMe ? typeMe.split(/\s+/g).map((word) => word.concat(" ")) : null;

    if (typeWords) {
      typeWords[typeWords.length - 1] = typeWords[typeWords.length - 1].trim();
    }

    return typeWords;
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

  // if local settings exist set to state settings
  useEffect(() => {
    const localSettings = localStorage.getItem("settings");
    // console.log("localSettings", localSettings);

    if (localSettings) {
      console.log("loaded settings from local storage");
      setSettings(JSON.parse(localSettings));
      // setSettings({
      //   sound: false,
      //   voice: false,
      //   stats: false,
      //   blockOnError: false,
      //   error: 1,
      // });
    }
  }, []);

  // save settings to local storage on every update
  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
    // console.log("localSettings updated", localStorage.getItem("settings"));
  }, [settings]);

  function handleTypingKey(e) {
    if (isAlphanumeric(e.keyCode)) {
      if (wordsArr()[wordIndex][letterIndex] === e.key) {
        correctType();
        const letterMark = letterMarks[wordIndex][letterIndex];

        if (!letterMark.isCorrect && !letterMark.isFixed && !letterMark.isError) {
          letterMarks[wordIndex][letterIndex] = {
            isClean: false,
            isCorrect: true,
            isFixed: false,
            isError: false,
          };
        } else if (letterMark.isError || letterMark.isFixed) {
          letterMarks[wordIndex][letterIndex] = {
            isClean: false,
            isCorrect: false,
            isFixed: true,
            isError: false,
          };
        }
      } else {
        misType();
        letterMarks[wordIndex][letterIndex] = {
          isClean: false,
          isCorrect: false,
          isFixed: false,
          isError: true,
        };
      }
      setLetterMarks([...letterMarks]);
      handleIncrement();
    } else if (isBackSpace(e.keyCode)) {
      correctType();
      handleDecrement();
    }
  }

  function handleIncrement() {
    if (letterIndex + 1 === wordsArr()[wordIndex].length) {
      if (wordIndex + 1 === wordsArr().length) {
        // stop the lesson here
        finishLesson();
        setLetterIndex(letterIndex + 1);
      } else {
        setLetterIndex(0);
        setWordIndex(wordIndex + 1);
      }
    } else {
      setLetterIndex(letterIndex + 1);
    }
  }

  function handleDecrement() {
    if (letterIndex === 0) {
      if (wordIndex === 0) {
        // do nothing - reached the beginning
      } else {
        const prevWordLastIndex = wordsArr()[wordIndex - 1].length - 1;
        const curLetterMark = letterMarks[wordIndex - 1][prevWordLastIndex];
        [curLetterMark.isClean, curLetterMark.isCorrect] = [true, false];
        letterMarks[wordIndex - 1][prevWordLastIndex] = curLetterMark;

        setLetterMarks([...letterMarks]);
        setLetterIndex(prevWordLastIndex);
        setWordIndex(wordIndex - 1);
      }
    } else {
      const curLetterMark = letterMarks[wordIndex][letterIndex - 1];
      [curLetterMark.isClean, curLetterMark.isCorrect] = [true, false];
      letterMarks[wordIndex][letterIndex - 1] = curLetterMark;

      setLetterMarks([...letterMarks]);
      setLetterIndex(letterIndex - 1);
    }
  }

  return (
    <div
      className="p-typingPageWrap"
      onClick={(e) => {
        // console.log(e);
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
      <TypeMeNavBar
        hideMe={hideMe}
        resetHideMe={() => setHideMe(false)}
        settings={settings}
        setSettings={setSettings}
      />

      <Container className="typeMeContainer">
        <div className="typeMeDiv">
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
