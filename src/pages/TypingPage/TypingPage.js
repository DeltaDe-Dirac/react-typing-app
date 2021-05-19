import { useState, createRef, useEffect, useCallback, useRef } from "react";
import "./TypingPage.css";

import { Container, Overlay, Tooltip } from "react-bootstrap";
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
    last: null,
  });
  const [typeState, setTypeState] = useState({
    isStarted: false,
    isPaused: false,
    isFinished: false,
  });
  const [stats, setStats] = useState({
    charCount: 0,
    correct: 0,
    fixed: 0,
    wrong: 0,
    timeSpent: 0,
    timeSpentTyping: 0,
    pauseAfter: 10,
  });

  const onResize = useCallback(() => onWindowResize());
  const { width, height, ref } = useResizeDetector({ onResize });

  const wordsArr = useCallback(() => {
    const typeWords = typeMe ? typeMe.text.split(/\s+/g).map((word) => word.concat(" ")) : null;

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

  useEffect(() => {
    let perfomance = null;

    if (!typeState.isFinished && typeState.isStarted) {
      perfomance = setInterval(function () {
        if (!typeState.isPaused) {
          setStats((s) => ({ ...s, timeSpent: s.timeSpent + 1 }));
        }
        // else {
        //   console.log("counter paused");
        // }
      }, 1000);
    }

    return () => {
      if (perfomance !== null) {
        clearInterval(perfomance);
        // console.log("cleared timeout");
      }
    };
  }, [typeState]);

  useEffect(() => {
    if (stats.timeSpent - stats.timeSpentTyping > stats.pauseAfter) {
      setTypeState((state) => ({ ...state, isPaused: true }));
    }
  }, [stats]);
  // ---------------------------------------------------------------------------------------

  function collectPerfomance(keyTyped) {
    if (keyTyped === "correct") {
      stats.correct += 1;
      stats.charCount += 1;
    } else if (keyTyped === "fixed") {
      stats.fixed += 1;
      stats.charCount += 1;
    } else if (keyTyped === "wrong") {
      stats.wrong += 1;
      stats.charCount += 1;
    } else if (keyTyped === "d-correct") {
      stats.charCount -= 1;
      stats.correct -= 1;
    } else if (keyTyped === "d-fixed") {
      stats.charCount -= 1;
      stats.fixed -= 1;
    } else if (keyTyped === "d-wrong") {
      stats.charCount -= 1;
      stats.wrong -= 1;
    }

    stats.timeSpentTyping = stats.timeSpent;

    if (typeState.isPaused) {
      setTypeState({ ...typeState, isPaused: false });
    }

    setStats({ ...stats });
    // console.log(stats);
  }

  function handleTypingKey(e) {
    if (typeState.isFinished) {
      return;
    }

    if (!typeState.isStarted) {
      setTypeState({ ...typeState, isStarted: true, isPaused: false });
    }

    let curErrorCounter = errorCounter;
    if (isAlphanumeric(e.keyCode)) {
      clearCurOrPrevErrorChar(false);
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
        collectPerfomance("correct");

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
        collectPerfomance("fixed");

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
      collectPerfomance("wrong");

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
    const nextPosition = getNextPosition();
    if (nextPosition === null) {
      // stop the lesson here
      setTypeState({ ...typeState, isFinished: true });
      playSound(finishLesson);
      setLetterIndex(letterIndex + 1);
      return;
    }

    setWordIndex(nextPosition.wordIdx);
    setLetterIndex(nextPosition.letterIdx);
  }

  function handleMarkingAndDecrement() {
    const prevPosition = getPrevPosition();
    if (prevPosition === null) {
      // do nothing - reached the beginning
      return;
    }
    const curLetterMark = letterMarks[prevPosition.wordIdx][prevPosition.letterIdx];

    if (curLetterMark.isCorrect) {
      collectPerfomance("d-correct");
    } else if (curLetterMark.isFixed) {
      collectPerfomance("d-fixed");
    } else if (curLetterMark.isError) {
      collectPerfomance("d-wrong");
    }

    [
      curLetterMark.isClean,
      curLetterMark.isCorrect,
      curLetterMark.errorChar,
      curLetterMark.isBlocked,
      curLetterMark.class,
    ] = [true, false, null, false, ""];
    letterMarks[prevPosition.wordIdx][prevPosition.letterIdx] = curLetterMark;

    setLetterMarks([...letterMarks]);
    setWordIndex(prevPosition.wordIdx);
    setLetterIndex(prevPosition.letterIdx);
  }

  function clearCurOrPrevErrorChar(isClearCurrentChar) {
    if (isClearCurrentChar) {
      if (letterMarks[wordIndex][letterIndex]) {
        letterMarks[wordIndex][letterIndex].errorChar = null;
      }
    }

    const prevPosition = getPrevPosition();
    if (prevPosition) {
      letterMarks[prevPosition.wordIdx][prevPosition.letterIdx].errorChar = null;
    }
  }

  function getNextPosition() {
    let nextLetterIndex, nextWordIndex;

    if (letterIndex === wordsArr()[wordIndex].length - 1) {
      if (wordIndex === wordsArr().length - 1) {
        return null;
      } else {
        nextWordIndex = wordIndex + 1;
        nextLetterIndex = 0;
      }
    } else {
      nextWordIndex = wordIndex;
      nextLetterIndex = letterIndex + 1;
    }
    return { wordIdx: nextWordIndex, letterIdx: nextLetterIndex };
  }

  function getPrevPosition() {
    let prevLetterIndex, prevWordIndex;
    if (letterIndex === 0) {
      if (wordIndex === 0) {
        return null;
      }
      prevWordIndex = wordIndex - 1;
      prevLetterIndex = wordsArr()[prevWordIndex].length - 1;
    } else {
      prevLetterIndex = letterIndex - 1;
      prevWordIndex = wordIndex;
    }
    return { wordIdx: prevWordIndex, letterIdx: prevLetterIndex };
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
    const letterSpanWidth = 30;
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
    if (spanRectangles.length === 0) {
      console.warn("cannot determine span rectangles");
    }
    // console.log(spanRectangles);

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
      setScroll((s) => ({ ...s, last: wordsPerLine.length - 1 }));
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
    if (lines === null || lines.length === 0) {
      // console.info("default lines rendering");
      linesOfWords = arrOfWords.map((word, index) => (
        <span key={`wordSpan-${index}`} className="lineSpan">
          <Word word={word} wordNum={index} letterMarks={letterMarks[index]} />
        </span>
      ));
    } else {
      // console.log("words per line rendering");
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
    // console.log(scroll.lineNum, lineNum, scroll);
    if (scroll.lineNum < 4 && lineNum < 4) {
      scroll.from = 0;
      scroll.to = 0;
      return;
    }

    if (lineNum === scroll.last) {
      return;
    }

    if (Math.abs(lineNum - scroll.lineNum) >= 2) {
      const direction = lineNum - scroll.lineNum;
      // console.log("line dif = 2", lineNum);
      scroll.from = scroll.to;
      scroll.to = -(lineNum - scroll.lineNum) * scroll.step + scroll.to;
      scroll.lineNum = lineNum;
      scroll.animName = scroll.animName === "lineUp1" ? "lineUp2" : "lineUp1";
      scroll.isUp = direction ? false : true;
      setScroll({ ...scroll });
      // console.log("hs scrolling down", scroll);
    }
  }

  useEffect(() => {
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
  }, [scroll]);

  function onWindowResize() {
    if (letterMarks && letterMarks.length) {
      clearCurOrPrevErrorChar(true);
    }
    // console.log("resizing...");
  }

  const targetTooltip = useRef(null);
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
        header={typeMe ? typeMe.header : {}}
      />

      <Container className="typeMeContainer" fluid="xl" ref={ref}>
        <div
          style={
            !typeState.isFinished && scroll.lineNum >= 3
              ? { animation: `${scroll.animName} 1s`, marginTop: `${scroll.to}px` }
              : { animation: "top 1s", marginTop: 0 }
          }
          className={"typeMeDiv"}
          id="typeMeDiv"
        >
          {createLinesOfWords()}
        </div>
      </Container>
      <Container className="statsContainer" fluid="xl">
        <div className="progress">
          <div
            style={{ width: `${wordsArr() ? Math.round((wordIndex / (wordsArr().length - 1)) * 100) : 0}%` }}
            className="progress-bar "
            role="progressbar"
            aria-valuenow="75"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <div className={settings.stats ? "stats" : "stats hide"}>
          <div className="speed" ref={targetTooltip}>
            <h6>Speed</h6>
            <h1>
              {stats.timeSpent > 0 ? Math.floor(((stats.correct + stats.fixed) / 5 / stats.timeSpent) * 60) : 0}{" "}
              <span>WPM</span>
            </h1>
          </div>
          <Overlay
            target={targetTooltip.current}
            show={(typeState.isPaused && settings.stats) || !typeState.isStarted}
            placement="top"
          >
            {(props) => (
              <Tooltip id="pause-overlay" {...props}>
                {typeState.isPaused && settings.stats ? "PAUSED" : "START TYPING"}
              </Tooltip>
            )}
          </Overlay>
          <div className="accuracy">
            <h6>Accuracy</h6>
            <h1>
              {stats.charCount > 0 ? Math.floor(((stats.correct + stats.fixed) / stats.charCount) * 100) : 100}{" "}
              <span>%</span>
            </h1>
          </div>
        </div>
      </Container>
    </div>
  );
}
