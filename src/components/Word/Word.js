import "./Word.css";

export default function Word({ word, wordNum, letterMarks }) {
  const spanLetters = new Array(word.length);

  for (let i = 0; i < word.length; ++i) {
    spanLetters[i] = (
      <span key={`w-${wordNum}-letter-${i}`}>
        <span
          className={
            !letterMarks
              ? "letterSpan "
              : "letterSpan "
                  .concat(letterMarks[i].isClean ? "_clean " : "")
                  .concat(letterMarks[i].isCorrect ? "_correct " : "")
                  .concat(letterMarks[i].isError && !letterMarks[i].isBlocked ? "_error " : "_blocked ")
                  .concat(letterMarks[i].isFixed ? "_fixed " : "")
          }
        >
          {word[i]}
        </span>
        <span
          className={
            letterMarks && letterMarks.length > 0 && letterMarks[i].errorChar
              ? "errorChar ".concat(letterMarks[i].class)
              : "errorChar"
          }
        >
          {letterMarks && letterMarks.length > 0 && letterMarks[i].errorChar ? letterMarks[i].errorChar : " "}
        </span>
      </span>
    );
  }

  return <span className="wordsSpan">{spanLetters}</span>;
}
