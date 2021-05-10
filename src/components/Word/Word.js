import React from "react";
import "./Word.css";

export default function Word({ word, wordNum }) {
  const spanLetters = Array(word.length + 1).fill(" ");
  for (let i = 0; i < word.length; ++i) {
    spanLetters[i] = <span key={`w-${wordNum}-letter-${i}`}>{word[i]}</span>;
  }
  return <span>{spanLetters}</span>;
}
