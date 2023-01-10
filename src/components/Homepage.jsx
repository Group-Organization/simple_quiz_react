export default function Homepage({startGame}){
    return (
    <div className="homepage">
        <div className="homepage-hero">
            <h1>QuizApp</h1>
        </div>
<div className="game-setting">
            <div className="temp-setting">setting</div>
            <p className="start-button" onClick={startGame}>Start Game</p>
</div>
    </div>
    )
}