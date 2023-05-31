import React from 'react'
export default function QuizResult(props) {
    return (
        <div className='score-section'>
            <h1>Quiz Completed</h1>
            <h3>You have scored {props.score}/{props.questionBank.length * 5}</h3>
            <h4>You have answered {props.correctAns} questions out of {props.questionBank.length} correctly</h4>
            <button onClick={() => window.location.reload()}>Play Again!</button>
        </div>
    )
}
