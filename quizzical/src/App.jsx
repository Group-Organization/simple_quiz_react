import { useState, useEffect } from "react";
import { decodeHtml } from "./helper_functions";
import Question from "./components/Question";
import Data from "./fakeAPI";

function App() {
  const [game, setGame] = useState([]);
  const [ended, setEnded] = useState(false);

  // on game start or gameEnded sends a request to API
  // on API response, adds 2 keys to each question Obj : "guessed" and "selected"
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=1&type=multiple")
      .then((res) => res.json())
      .then((data) => {
        //   console.log("data", data.results[0])
        let gameQuestions = data.results.map((quest) => ({
            question: `${decodeHtml(quest.question)}`,
            incorrect_answers:quest.incorrect_answers,
            correct_answer: quest.correct_answer,
            guessed: false,
            selected: "",
        }));
        // console.log("gameQ", gameQuestions)
        console.log("ora")
        return setGame(gameQuestions);
      });


  }, []);

  function selectChoice() {
    console.log(this || "non va");
  }

  const items = game.map((item, index) => {
    let answers = [...item.incorrect_answers, item.correct_answer];

    return (
      <Question
        key={index}
        id={index}
        question={decodeHtml(item.question)}
        choices={answers}
        setGame={setGame}
      />
    );
});

console.log("items", items)

  let button;
  if (game === false) {
    button = (
      <button className="submit" onClick={console.log("submit")}>
        Submit
      </button>
    );
  } else {
    button = (
      <button className="new-game" onClick={() => setGame(true)}>
        Play Again?
      </button>
    );
  }

  return (
    <div className="App">
      {items}
      {button}
    </div>
  );
}

export default App;
