# Simple quiz React app

#### Capstone project for Learn React Tutorial on Scrimba

This is my submission for the final project for this course.

I didn't follow the styling from the course, since I wanted to give it my own spin and play with different design, instead of copying a standard one.


Right now the project is still in beta release, the graphic is not final, I am currently just implementing extra functionalities and will change it upon completion.
Although it was a fun and simple project, it challanged me to adhere to React conventions without leveraging Js DOM manipulation.

<hr>

##### How it works:
The app makes a fetch request to the openTDB API to currently, retrieve 3 Questions, then the response data gets mapped and set in the `quiz` state.

Each *quiz* object has a *question key*, an *array of all possible answers*, and a key for the *correct answer*;
All the data HTML is decoded with a helper function imported from another file, and the answers are shuffled to avoid same pattern for correct answers across questions and rounds.

The game records the score for the current round and if all answers are correct, it will launch `<Confetti /> `!
Then if the user wants to keep on playing, the game will keep track of the global score for all the rounds.
<br
>

The next addition i want to make is to give the user the ability to choose how many question per round to play, and then update the number of question displayed and the globalScore count accordingly.

After that i'll focus on the redesign.