import React, { useState } from 'react'
import '../App.css';
import QuizResult from './QuizResult';

export default function Quiz() {
    const questionBank = [
        {
            question: "How many months are there in total?",
            answerOptions: [
                { answerText: "15", isCorrect: false },
                { answerText: "12", isCorrect: true },
                { answerText: "17", isCorrect: false },
                { answerText: "9", isCorrect: false }
            ]
        },
        {
            question: "How many days are there in week?",
            answerOptions: [
                { answerText: "15", isCorrect: false },
                { answerText: "12", isCorrect: false },
                { answerText: "7", isCorrect: true },
                { answerText: "9", isCorrect: false }
            ]
        },
        {
            question: "Full form of HTML is?",
            answerOptions: [
                { answerText: "HyperText Markup Language", isCorrect: true },
                { answerText: "HyperText Marking Language", isCorrect: false },
                { answerText: "HyperTile Markup Language", isCorrect: false },
                { answerText: "HyperText Markwood Language", isCorrect: false }
            ]
        },
        {
            question: "JavaScript is case sensitive?",
            answerOptions: [
                { answerText: "No", isCorrect: false },
                { answerText: "Maybe", isCorrect: false },
                { answerText: "Yes", isCorrect: true },
                { answerText: "Not yet known", isCorrect: false }
            ]
        },
        {
            question: "How many t20 world cups India won?",
            answerOptions: [
                { answerText: "3", isCorrect: false },
                { answerText: "2", isCorrect: false },
                { answerText: "1", isCorrect: true },
                { answerText: "0", isCorrect: false }
            ]
        }

    ]

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setCurrentScore] = useState(0);
    const [correctAns, setCorrectAns] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null)

    const reset = () => {
        setCurrentQuestion(0);
        setCurrentScore(0);
        setCorrectAns(0);
        setShowResult(false);
        setSelectedOption(null);
    }

    const checkScore = (selectedOption) => {
        if (questionBank[currentQuestion].answerOptions[selectedOption].isCorrect) {
            setCurrentScore(score + 5);
            setCorrectAns(correctAns + 1);
        }
        setSelectedOption(null)
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questionBank.length)
            setCurrentQuestion(nextQuestion);
        else
            setShowResult(true);
    }
    return (
        <div className='app'>
            {showResult ? <QuizResult score={score} correctAns={correctAns} questionBank={questionBank} /> : <>
                <div className="question-section">
                    <h3>Demo Quiz for Testing</h3>
                    <div className="question-count">
                        <span>Question no {currentQuestion + 1} of {questionBank.length}</span>
                    </div>
                    <div className="question-text">
                        {questionBank[currentQuestion].question}
                    </div>
                </div>
                <div className="answer-section">
                    {questionBank[currentQuestion].answerOptions.map((ans, i) => {
                        return <button className={i === selectedOption ? "selected" : ""} key={i} onClick={() => setSelectedOption(i)}>{ans.answerText}</button>
                    })}
                    <div className="actions">
                        <button onClick={reset}>Quit</button>
                        <button disabled={selectedOption == null ? true : false} onClick={() => checkScore(selectedOption)}>Next</button>
                    </div>
                </div>
            </>}

        </div>
    )
}
