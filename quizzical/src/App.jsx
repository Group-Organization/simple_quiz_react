import { useState, useEffect } from "react";
import { decodeHtml } from "./helper_functions";
import Question from "./components/Question";
import Confetti from "react-confetti"

function App() {

    // keep track of round played, starts at 0 in welcome page
  const [round, setRound ] = useState(0)
    // state to hold array of quiz questions
  const [quiz, setQuiz] = useState([]);
  // on submit button set gameEnded = true, check answers and if 5/5 play confetti (maybe set separate state)
  const [gameEnded, setGameEnded] = useState(false);
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

  function sortAnswersOnce(original, copy){

    console.log("original : ", original, "copy", copy)
    // if it is TRUE that the 2 arrays are not equal, execute the shuffling
    if (JSON.stringify(original) != JSON.stringify(copy)){
        return copy.sort(() => Math.random() - 0.5)
    }else{
        console.log("else-copy", copy)
        return copy
    }


  }

  // generate <Question /> components, passing question, answer-options, the `selected` value for this question component and the function to handle setSelected
  const questions = quiz.map((item, index) => {

    // create copy of answers array to use for shuffling
    // then pass the props after checking if it is already shuffled
    let allAnswers = [...item.incorrect_answers, item.correct_answer]

    let answers = [... allAnswers].sort(() => Math.random() - 0.5)
    console.log("1 allAnswers : ", allAnswers, "answers-copy : ", answers)

    return (
        <Question
        key={index}
        id={index}
        question={item.question}
        choices={sortAnswersOnce(allAnswers, answers)}
        selected={selected[index]}
        correct_answer={quiz[index].correct_answer}
        gameEnded={gameEnded}
        handleChoice={selectAnswer}/>
        );
    });

    useEffect(()=>{
        if(gameEnded == true){
            console.log("qui")
            function submitAnswers(){
            // map over quiz array, for each question check if correct_answer == selected[id] value
            quiz.map((question, index) => {
                setResult(()=> {
                    question.correct_answer == selected[index] ? result + 1 : result
                })
            })}
        }
        /* else { MA NON SO se ha senso in quanto non so se vengono azionati ogni volta che viene cliccato il tasto e la condizione è `false`, può essere che non vengano mai azionati
            setSelected({})
            setResult(0)

        } */
    }, [gameEnded])

  return (
      <div className="App">
      {gameEnded && result == 5 && <Confetti />}

    <div className="round-counter"> Round: {round}</div>

    {/* if round == 0 ? welcome screen + btn : game page at round 1+ */}

      {questions}
      {gameEnded ? (<button className="new-game"
                onClick={() => setRound(round => round +1)}
                >Play Again?</button>)

            :  (<button className="submit"
                onClick={()=> setGameEnded(true)}
                >Submit</button>) }

      {gameEnded && <div> correct = {result}/5</div>}
    </div>
  );
}

export default App;
