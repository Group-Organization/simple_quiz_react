
export default function Question(props) {
  function handleChoice(event) {
    // calls selectAnswer() function in App to set the onClick.target.value to `selected` state
    props.handleChoice(props.id, event.target.value);
  }

    // map over array of choices to create button
    let choices = props.choices.map((choice) => {
        // adds selected class to the option saved in `selected` state
        let dynamic_class =
        props.selected != choice
            ? "option" : "option selected";

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
