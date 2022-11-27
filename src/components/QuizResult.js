import React from 'react'
export default function QuizResult(props) {
    return (
        <div className='score-section'>
            <h1>Quiz Completed</h1>
            <h3>You have scored {props.score}/25</h3>
            <h4>You have answered {props.correctAns} questions out of {props.questionBank.length} correctly</h4>
        </div>
    )
}
