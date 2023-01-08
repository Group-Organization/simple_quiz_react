import { useState, useEffect } from "react";
import { decodeHtml } from "./helper_functions";
import Question from "./components/Question";
import Confetti from "react-confetti"

function App() {

    // keep track of round played, starts at 0 in welcome page
  const [round, setRound ] = useState(0)
    // state to hold array of quiz questions
  const [quiz, setQuiz] = useState([]);
  // on submit button set ended = true, check answers and if 5/5 play confetti (maybe set separate state)
  const [ended, setEnded] = useState(false);
  // new state for tracking selected answers, object with {id(key):userChoice(value)}
  const [selected, setSelected] = useState({})
  // keep track of result
  const [result, setResult]= useState(0)

  // on round update sends a request to API
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=3&type=multiple")
      .then((res) => res.json())
      .then((data) => {

        // create dynamic object based on num of questions to store user answers
        const userAnswers = data.results.reduce((acc, item, index) => {
            acc[index] = "";
            return acc;
        }, {});
        setSelected(userAnswers)


        // map the received object to just store relevant informations and decode all html via helper function
        let quizData = data.results.map((quest) => ({
            question: `${decodeHtml(quest.question)}`,
            incorrect_answers:quest.incorrect_answers.map(val => decodeHtml(val)),
            correct_answer: decodeHtml(quest.correct_answer),
        }));
        return setQuiz(quizData);
      });
  }, [round]);

  // updates the `selected` state object to store userChoice for the corresponding question id
  function selectAnswer(id, userChoice) {
        // ternary operator allows to chose between values, or de-select it to revert to default empty value
    setSelected(prevState =>({...prevState, [id] :  prevState[id]== userChoice? "" : userChoice }))
  }


  // generate <Question /> components, passing question, answer-options, the `selected` value for this question component and the function to handle setSelected
  const questions = quiz.map((item, index) => {

    // shuffle answer options before passing prop
    let answers = [...item.incorrect_answers, item.correct_answer].sort(() => Math.random() - 0.5);

    return (
        <Question
        key={index}
        id={index}
        question={item.question}
        choices={answers}
        selected={selected[index]}
        handleChoice={selectAnswer}/>
        );
    });

    function submitMatch(){

    }

  return (
      <div className="App">
      {ended && result == 5 && <Confetti />}

    <div className="round-counter"> Round: {round}</div>

    {/* if round == 0 ? welcome screen + btn : game page at round 1+ */}

      {questions}
      {ended ? (<button className="new-game"
                onClick={() => setRound(round => round +1)}
                >Play Again?</button>)

            :  (<button className="submit"
                onClick={()=> submitMatch()}
                >Submit</button>) }

      {ended && <div> correct = {result}/5</div>}
    </div>
  );
}

export default App;
