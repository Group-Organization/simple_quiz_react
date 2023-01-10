# Simple quiz React app

[live demo](https://dluca22.github.io/simple_quiz_react/)

#### Capstone project for Learn React Tutorial on Scrimba

This is my submission for the final project for this course.

I didn't follow the styling from the course, so I gave it my own spin and made my own design.

Although it was a fun and simple project, it challanged me to adhere to React conventions without leveraging Js DOM manipulation.

<hr>

##### How it works:
The app makes a fetch request to the openTDB API to currently, retrieves 5 Questions, then the response data gets mapped and set in the `quiz` state.

Each *quiz* object has a *question key*, an *array of all possible answers*, and a key for the *correct answer*;
All the data HTML is decoded with a helper function imported from another file, and the answers are shuffled to avoid same pattern for correct answers across questions and rounds.

It handles answer select and de-select, and switching between different answers, avoiding selection of multiple options at the same time.

The game records the score for the current round and if all answers are correct, it will launch `<Confetti /> `!
Then if the user wants to keep on playing, the game will keep track of the global score for all the rounds.
<br
>

The next addition i want to make is to give the user the ability to choose how many question per round to play, and then update the number of question displayed and the globalScore count accordingly.

