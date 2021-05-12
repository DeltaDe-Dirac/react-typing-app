import "./Word.css";

export default function Word({ word, wordNum, letterMarks }) {
  const spanLetters = new Array(word.length);

  for (let i = 0; i < word.length; ++i) {
    spanLetters[i] = (
      <span
        key={`w-${wordNum}-letter-${i}`}
        className={
          !letterMarks
            ? "letterSpan "
            : "letterSpan "
                .concat(letterMarks[i].isClean ? "_clean " : "")
                .concat(letterMarks[i].isCorrect ? "_correct " : "")
                .concat(letterMarks[i].isError ? "_error " : "")
                .concat(letterMarks[i].isFixed ? "_fixed " : "")
        }
      >
        {word[i]}
      </span>
    );
  }

  return <span className="wordsSpan">{spanLetters}</span>;
}
