import Choices from "./Choices";
import { decodeHtml } from "../helper_functions";
import { useState } from "react"

export default function Question(props) {
  const [answers, setAnswers] = useState(props.choices)
  

  // for each choice of the array, take raw html and decode before passing values
  let choices = answers.map(raw_choice => {
    // allows decoding 1 time intead of each value
    const choice = decodeHtml(raw_choice)
    return (
      <button
        key={choice}
        className="question-options"
        value={choice}
        onClick={() => setAnswers(choice)} >{choice}</button> );
  });

  return (
    <div className="question">
      <h4>{props.question}</h4>
      <div className="choices">{choices}</div>
    </div>
  );
}
