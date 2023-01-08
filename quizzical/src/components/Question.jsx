
export default function Question(props) {
  function handleChoice(event) {
    // calls selectAnswer() function in App to set the onClick.target.value to `selected` state
    props.handleChoice(props.id, event.target.value);
  }

    // map over array of choices to create button
    let choices = props.choices.map((choice) => {
        // adds selected class to the option saved in `selected` state
        let dynamic_class

        // if game not ended add selected class to the choice stored in `selected` state
        if(props.gameEnded == false){
        dynamic_class = props.selected != choice
            ? "option" : "option selected";
        }
        // else on game ended, add "correct" class to the choice == quiz.correct_answer
        else if(props.gameEnded){
            dynamic_class = choice == props.correct_answer ? "option correct" : "option"
                // but if this choice is the one in `selected` state AND NOT correct, append "wrong"
            if ( props.selected == choice && props.correct_answer != choice){
                dynamic_class += " wrong"
            }
        }

        return ( <button
                        key={choice}
                        className={dynamic_class}
                        value={choice}
                        onClick={handleChoice}
                        >{choice}</button>
                    );
        });


  return (
    <div className="question">
      <h4>{props.question}</h4>
      <div className="choices">{choices}</div>
    </div>
  );
}
