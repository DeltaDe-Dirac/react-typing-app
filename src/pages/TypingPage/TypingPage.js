import { useState, createRef, useEffect, useCallback } from "react";
import "./TypingPage.css";

import { Container } from "react-bootstrap";
import TypeMeNavBar from "../../components/TypeMeNavBar/TypeMeNavBar";
import Word from "../../components/Word/Word";
import { isBackSpace, isAlphanumeric } from "../../utils/keycodes";
import { useResizeDetector } from "react-resize-detector";

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
  const [lines, setLines] = useState(null);
  const [scroll, setScroll] = useState({
    lineNum: 3,
    from: 0,
    to: 0,
    step: 56,
    animName: "lineUp1",
    isUp: false,
  });
  const { width, height, ref } = useResizeDetector();

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

  // ---------------------------------------------------------------------------------------
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
  // ---------------------------------------------------------------------------------------

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
        playSound(finishLesson);
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
  // ---------------------------------------------------------------------------------------

  const handleLines = useCallback(() => {
    const letterSpanWidth = 36;
    // ----------------------------
    if (wordsArr() === null) {
      return null;
    }

    // GET ALL SPAN RECTANGLES
    const example = document.getElementById("typeMeDiv");
    const range = document.createRange();
    range.setStart(example, 0);
    range.setEnd(example, range.commonAncestorContainer.childNodes.length);
    const rects = range.getClientRects();

    // FILTER BY WIDTH ONLY RELEVANT ONES
    const spanRectangles = [];
    for (const rect of rects) {
      if (rect.width === letterSpanWidth) {
        spanRectangles.push(rect);
      }
    }

    let curLinePos = 0;
    const breakingLineIndex = [];

    // DETERMINE INDICES OF BREAKING LINES
    for (let i = 0; i < spanRectangles.length; i++) {
      if (curLinePos !== spanRectangles[i].top) {
        curLinePos = spanRectangles[i].top;
        breakingLineIndex.push(i);
      }
    }
    breakingLineIndex.push(spanRectangles.length);

    // CALCULATE WORDS LENGTH AND PREFIX SUMS
    const wordsLengthArr = wordsArr().map((word) => word.length);
    const wordsLenPrefixSum = [0];
    wordsLengthArr.forEach((element, index) => {
      wordsLenPrefixSum.push(wordsLenPrefixSum[index] + element);
    });

    // ARRAY OF WORDS PER LINE
    const wordsPerLine = [];
    let k = 1;
    for (let i = 1; i < breakingLineIndex.length; ++i) {
      for (let j = k; j < wordsLenPrefixSum.length; ++j) {
        if (breakingLineIndex[i] === wordsLenPrefixSum[j]) {
          wordsPerLine.push(j - k + 1);
          k = j + 1;
          break;
        }
      }
    }

    if (width || height) {
      //do nothing
    }

    if (wordsPerLine) {
      setLines(wordsPerLine);
    }
  }, [width, height, wordsArr]);

  useEffect(() => {
    handleLines();
  }, [handleLines]);

  // ---------------------------------------------------------------------------------------

  function createLinesOfWords() {
    const arrOfWords = wordsArr();
    if (arrOfWords === null) {
      return null;
    }

    let linesOfWords = [];
    if (lines === null) {
      // console.log("def lines");
      linesOfWords = arrOfWords.map((word, index) => (
        <span key={`wordSpan-${index}`} className="lineSpan">
          <Word word={word} wordNum={index} letterMarks={letterMarks[index]} />
        </span>
      ));
    } else {
      // console.log("real lines");
      linesOfWords = [];
      let k = 0;
      for (let i = 0; i < lines.length; ++i) {
        let groupOfWords = [];
        for (let j = k; j < lines[i] + k; ++j) {
          groupOfWords.push(
            <Word key={`wordSpan-${j + k}`} word={arrOfWords[j]} wordNum={j} letterMarks={letterMarks[j]} />
          );
        }
        if (wordIndex >= k && wordIndex < lines[i] + k) {
          handleScrolling(i);
        }

        linesOfWords.push(
          <span
            key={`lineSpan-${i}`}
            className={"lineSpan ".concat(wordIndex >= k && wordIndex < lines[i] + k ? "_focus" : "")}
          >
            {groupOfWords}
          </span>
        );
        k += lines[i];
      }
    }

    return linesOfWords;
  }

  function handleScrolling(lineNum) {
    if (
      (!scroll.isUp && lineNum - scroll.lineNum === -1 && scroll.lineNum > 4) ||
      (scroll.isUp && lineNum - scroll.lineNum === 1 && lineNum > 3)
    ) {
      // console.log("line dif = +1/-1", lineNum, scroll.lineNum, scroll.isUp);
      [scroll.from, scroll.to] = [scroll.to, scroll.from];
      scroll.lineNum = lineNum;
      scroll.animName = scroll.animName === "lineUp1" ? "lineUp2" : "lineUp1";
      scroll.isUp = !scroll.isUp;
      setScroll({ ...scroll });
    } else if (lineNum - scroll.lineNum === 2 && lineNum > 3) {
      // console.log("line dif = 2", lineNum);
      scroll.from = scroll.to;
      scroll.to = -2 * scroll.step + scroll.to;
      scroll.lineNum = lineNum;
      scroll.animName = scroll.animName === "lineUp1" ? "lineUp2" : "lineUp1";
      scroll.isUp = false;
      setScroll({ ...scroll });
    } else if (lineNum - scroll.lineNum === -2 && scroll.lineNum > 4) {
      console.log("line dif = -1", lineNum);
      scroll.from = scroll.to;
      scroll.to = scroll.to + 2 * scroll.step;
      scroll.lineNum = lineNum;
      scroll.animName = scroll.animName === "lineUp1" ? "lineUp2" : "lineUp1";
      scroll.isUp = true;
      setScroll({ ...scroll });
    }
  }

  useEffect(() => {
    if (scroll.lineNum > 3) {
      console.log("scrolling down", scroll);
      let styleSheet = document.styleSheets[0];
      const from = scroll.from + "px";
      const to = scroll.to + "px";

      let keyframes = `@keyframes ${scroll.animName} {
      from {
        margin-top: ${from};
      }
      to {
        margin-top: ${to};
      }
    }`;

      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    }
  }, [scroll]);

  // const style = { animation: `${animName} 2s`, marginTop: `${scroll.to}px` };

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

      <Container className="typeMeContainer" fluid="xl" ref={ref}>
        <div
          style={
            scroll.lineNum > 3 ? { animation: `${scroll.animName} 2s`, marginTop: `${scroll.to}px` } : { marginTop: 0 }
          }
          className={"typeMeDiv"}
          id="typeMeDiv"
        >
          {createLinesOfWords()}
        </div>
      </Container>
    </div>
  );
}
