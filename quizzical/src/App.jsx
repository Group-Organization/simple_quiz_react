import { useState, useEffect } from 'react'
import { decodeHtml } from './helper_functions'
import Question from './Question'
import Data from "./fakeAPI"


function App() {
  const [game, setGame] = useState([])
  const [ended, setEnded] = useState(false)

// on game start or gameEnded sends a request to API
// on API response, adds 2 keys to each question Obj : "guessed" and "selected" 
  useEffect(() =>{
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
    .then(res => res.json())
    .then(data => {
        let gameQuestions = data.results.map(quest => ({...quest, guessed: false, selected:false}))
        console.log(gameQuestions)
        return setGame(data.results)})
}, [])


    const items = game.map((item, index) => {
        let answers = [...item.incorrect_answers, item.correct_answer]

        return  <Question key={index} question={decodeHtml(item.question)} choices={answers} />
        }
     )

     let button;
     if(game === false){
        button = <button className="submit" onClick={console.log("submit")}>Submit</button>

    }else{
       button = <button className="new-game" onClick={() => setGame(true)}>Play Again?</button>
     }


     return (
         <div className="App">
        {items}
        {button}
    </div>
  )
}

export default App
