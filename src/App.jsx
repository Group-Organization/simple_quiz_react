import { useState } from "react";
import Homepage from "./components/Homepage";
import Quiz from "./components/Quiz";
import Navbar from "./components/Navbar";

export default function App() {
    // App holds round counter & handles switching between Homepage / Game
  const [round, setRound] = useState(0); //TODO set at 0
//   const [numOfQuestions, setNumOfQuestions] = useState(3)

// Homepage can only set round for now, then will add numOfQuestions & setNumOfQuestions to HOMEPAGE on order to have the default and set a new default
//while Quiz will only receive the number of question as a variable, so that the API call & globalScore can be dynamic
  return (
    <div className="App">
        { round == 0 ?
        <Homepage startGame={()=> setRound(1)} />
            :
         <Quiz setRound={setRound}
                round={round}
         /> }
    </div>
  );
}
