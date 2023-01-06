
import React from "react"


export default function Question(props){

    let choices = props.choices.map(choice =>  (<button
                                            key={choice}
                                            className="question-options"
                                            value={choice}>{choice}</button>))


    return (
        <div className="question">
            <h4>{props.question}</h4>
            <div className="choices">
                {choices}
            </div>
        </div>)
}