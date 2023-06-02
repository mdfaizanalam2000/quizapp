import React, { useEffect, useState } from 'react'
import QuizResult from './QuizResult';

export default function Quiz(props) {
    const [questionBank, setQuestionBank] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setCurrentScore] = useState(0);
    const [correctAns, setCorrectAns] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const shuffle = (array) => {
        return array.sort(() => 0.5 - Math.random());
    };

    const fetchQuestions = async () => {
        const response = await fetch("https://nice-pink-panda-belt.cyclic.app/questions", {
            headers: {
                "Content-Type": "application/json",
                "category": props.category
            }
        })
        let data = await response.json();
        let randomArray = shuffle(data);
        if (randomArray.length > 10) {
            randomArray = randomArray.slice(0, 10)
        }
        setQuestionBank(randomArray);
    }

    useEffect(() => {
        fetchQuestions();
        // eslint-disable-next-line
    }, [])

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
        <>
            {!questionBank[currentQuestion] ? "Hang On, loading questions..." :
                <div className='app'>
                    {showResult ? <QuizResult score={score} correctAns={correctAns} questionBank={questionBank} /> : <>
                        <div className="question-section">
                            <h3>Quiz Category: {props.category.toUpperCase()}</h3>
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
                </div>}
        </>
    )
}
