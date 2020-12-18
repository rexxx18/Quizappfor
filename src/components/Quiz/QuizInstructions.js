import React from 'react'
import { Link } from 'react-router-dom'

export default function QuizInstructions() {
    return (
        <div>
            <h1>Quiz Instructions</h1>
            <div className="intructions-container">
                <h1>How to play the game?</h1>
                <p>Ensure you read the guide from start to finish</p>
                <ul className="list">
                    <li>The game has a duration of 15 mins</li>
                    <li>Each game consist of 15 questions</li>
                    <li>Every Qustion has Four answers</li>
                    <li>Select the option which best suits the question</li>
                    <li>The timer starts as soon as the game loads</li>
                    <Link className='left' to='/'><span>Take me back</span></Link>
                    <Link className='right' to='/play/quiz'><span>Lets do this</span></Link>
                </ul>
            </div>
        </div>
    )
}
