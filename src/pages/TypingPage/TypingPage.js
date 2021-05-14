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
    blockOnError: false,
    error: "error-1",
  });
  const [errorCounter, setErrorCounter] = useState(0);

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
              errorChar: null,
              isBlocked: false,
              class: "",
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

    if (localSettings) {
      setSettings(JSON.parse(localSettings));
    }
  }, []);

  // save settings to local storage on every update
  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
    if (!settings.blockOnError) {
      setErrorCounter(0);
    }
  }, [settings]);

  function handleTypingKey(e) {
    let curErrorCounter = errorCounter;
    if (isAlphanumeric(e.keyCode)) {
      if (wordsArr()[wordIndex][letterIndex] === e.key) {
        playSound(correctType);

        if (settings.blockOnError) {
          curErrorCounter = 0;
          setErrorCounter(curErrorCounter);
        }
        handleMarkingAndIncrement(true, curErrorCounter, e.key);
      } else {
        playSound(misType);
        if (settings.blockOnError && curErrorCounter < parseInt(settings.error.split("-")[1])) {
          curErrorCounter += 1;
          setErrorCounter(curErrorCounter);
        }

        handleMarkingAndIncrement(false, curErrorCounter, e.key);
      }
    } else if (isBackSpace(e.keyCode)) {
      playSound(correctType);
      handleMarkingAndDecrement();
      if (settings.blockOnError && curErrorCounter > 0) {
        curErrorCounter -= isBlockOnError(curErrorCounter) && parseInt(settings.error.split("-")[1]) > 1 ? 2 : 1;
        setErrorCounter(curErrorCounter);
      }
    }
  }

  function handleMarkingAndIncrement(isCorrectlyTyped, curErrorCounter, char) {
    if (!isCorrectlyTyped && isBlockOnError(curErrorCounter)) {
      const curLetterMark = letterMarks[wordIndex][letterIndex];
      letterMarks[wordIndex][letterIndex] = {
        isClean: false,
        isCorrect: false,
        isFixed: false,
        isError: true,
        errorChar: char,
        isBlocked: true,
        class: curLetterMark.class === "" || curLetterMark.class === "show2" ? "show1" : "show2",
      };
      setLetterMarks([...letterMarks]);
      return;
    }

    if (isCorrectlyTyped) {
      const letterMark = letterMarks[wordIndex][letterIndex];
      if (!letterMark.isCorrect && !letterMark.isFixed && !letterMark.isError) {
        letterMarks[wordIndex][letterIndex] = {
          isClean: false,
          isCorrect: true,
          isFixed: false,
          isError: false,
          errorChar: null,
          isBlocked: false,
          class: "",
        };
      } else if (letterMark.isError || letterMark.isFixed) {
        letterMarks[wordIndex][letterIndex] = {
          isClean: false,
          isCorrect: false,
          isFixed: true,
          isError: false,
          errorChar: null,
          isBlocked: false,
          class: "",
        };
      }
    } else {
      letterMarks[wordIndex][letterIndex] = {
        isClean: false,
        isCorrect: false,
        isFixed: false,
        isError: true,
        errorChar: char,
        isBlocked: false,
        class: "show1",
      };
    }

    setLetterMarks([...letterMarks]);
    handleIncrement();
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

  function handleMarkingAndDecrement() {
    if (letterIndex === 0) {
      if (wordIndex === 0) {
        // do nothing - reached the beginning
      } else {
        const prevWordLastIndex = wordsArr()[wordIndex - 1].length - 1;
        const curLetterMark = letterMarks[wordIndex - 1][prevWordLastIndex];
        [
          curLetterMark.isClean,
          curLetterMark.isCorrect,
          curLetterMark.errorChar,
          curLetterMark.isBlocked,
          curLetterMark.class,
        ] = [true, false, null, false, ""];
        letterMarks[wordIndex - 1][prevWordLastIndex] = curLetterMark;

        setLetterMarks([...letterMarks]);
        setLetterIndex(prevWordLastIndex);
        setWordIndex(wordIndex - 1);
      }
    } else {
      const curLetterMark = letterMarks[wordIndex][letterIndex - 1];
      [
        curLetterMark.isClean,
        curLetterMark.isCorrect,
        curLetterMark.errorChar,
        curLetterMark.isBlocked,
        curLetterMark.class,
      ] = [true, false, null, false, ""];
      letterMarks[wordIndex][letterIndex - 1] = curLetterMark;

      setLetterMarks([...letterMarks]);
      setLetterIndex(letterIndex - 1);
    }
  }

  // function handleMarkingAndDecrementOnError(curErrorCounter) {
  //   let curLetterIndex = isBlockOnError(curErrorCounter) ? letterIndex : letterIndex - 1;
  //   let curWordIndex = wordIndex;

  //   if (curLetterIndex < 0) {
  //     if (curWordIndex === 0) {
  //       return;
  //     } else {
  //       curWordIndex -= 1;
  //       curLetterIndex = wordsArr()[curWordIndex].length - 1;
  //       setWordIndex(curWordIndex);
  //     }
  //   }

  //   const curLetterMark = letterMarks[curWordIndex][curLetterIndex];
  //   [
  //     curLetterMark.isClean,
  //     curLetterMark.isCorrect,
  //     curLetterMark.errorChar,
  //     curLetterMark.isBlocked,
  //     curLetterMark.class,
  //   ] = [true, false, null, false, ""];
  //   letterMarks[curWordIndex][curLetterIndex] = curLetterMark;

  //   setLetterMarks([...letterMarks]);
  //   setLetterIndex(curLetterIndex);
  // }

  function playSound(play) {
    if (settings.sound) {
      play();
    }
  }

  function isBlockOnError(curErrorCounter) {
    if (!settings.blockOnError) {
      return false;
    }

    const errorLimit = parseInt(settings.error.split("-")[1]);
    return curErrorCounter === errorLimit;
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
        errorCounter={errorCounter}
        setErrorCounter={setErrorCounter}
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
