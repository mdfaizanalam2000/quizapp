import React, { useState } from 'react'
import Quiz from './Quiz';

export default function Homepage() {
    const [quizPage, setQuizPage] = useState(false);

    return (
        <>
            {!quizPage ?
                <div className='home'>
                    <h1>Welcome to my quiz app</h1>
                    <div>
                        <label htmlFor="category">Choose quiz category</label>
                        <select name="category" id="category">
                            <option value="random" defaultChecked>Random</option>
                            <option value="sports">Sports</option>
                            <option value="technology">Technology</option>
                            {/* <option value="science">Science</option> */}
                            <option value="space">Space</option>
                        </select>
                    </div>
                    <button type='submit' onClick={() => setQuizPage(true)}>Start Quiz</button>
                </div>
                : <Quiz category={document.getElementById("category").value} />}
        </>
    )
}
