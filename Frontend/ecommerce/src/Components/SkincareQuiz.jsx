import React, { useState } from 'react';
import axios from 'axios';
import './SkincareQuiz.css';

const SkincareQuiz = () => {
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState({
        skinType: '',
        skinConcerns: '',
        preferredProducts: ''
    });
    const [routine, setRoutine] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleAnswer = (question, answer) => {
        setAnswers(prev => ({ ...prev, [question]: answer }));
        setStep(prev => prev + 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setRoutine('');

        try {
            console.log("Sending data:", answers);
            const response = await axios.post("http://localhost:5000/api/ai/get-routine", answers);

            if (response.data.success) {
                setRoutine(response.data.routine);
            } else {
                setError("Sorry, we couldn't generate a routine right now.");
            }
        } catch (err) {
            console.error("Error:", err);
            setError("An error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="quiz-page">
            <div className="quiz-container">
                <h1 className="quiz-title">Find Your Perfect Skincare Routine</h1>
                <p className="quiz-subtitle">Answer a few questions and our AI will create a personalized plan just for you.</p>

                {!routine && (
                    <form onSubmit={handleSubmit}>
                        {step === 1 && (
                            <Question
                                text="What is your skin type?"
                                questionKey="skinType"
                                options={['Oily', 'Dry', 'Combination', 'Sensitive']}
                                onAnswer={handleAnswer}
                            />
                        )}

                        {step === 2 && (
                            <Question
                                text="What are your main skin concerns?"
                                questionKey="skinConcerns"
                                options={['Acne', 'Wrinkles', 'Dullness', 'Dark Spots']}
                                onAnswer={handleAnswer}
                            />
                        )}

                        {step === 3 && (
                            <div className="question-container">
                                <h3>What kind of products do you prefer?</h3>
                                <input
                                    type="text"
                                    className="text-input"
                                    placeholder="e.g., light moisturizers, natural ingredients"
                                    value={answers.preferredProducts}
                                    onChange={(e) =>
                                        setAnswers(prev => ({ ...prev, preferredProducts: e.target.value }))
                                    }
                                />
                                <button type="submit" className="submit-btn" disabled={loading}>
                                    {loading ? 'Generating...' : 'Get My Routine'}
                                </button>
                            </div>
                        )}
                    </form>
                )}

                {error && <p className="error-message">{error}</p>}

                {routine && (
                    <div className="results-container">
                        <h2>Your Personalized Routine</h2>
                        <div
                            className="routine-text"
                            dangerouslySetInnerHTML={{ __html: routine.replace(/\n/g, '<br />') }}
                        />
                        <button
                            onClick={() => {
                                setRoutine('');
                                setStep(1);
                                setAnswers({ skinType: '', skinConcerns: '', preferredProducts: '' });
                            }}
                            className="reset-btn"
                        >
                            Start Over
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

const Question = ({ text, questionKey, options, onAnswer }) => (
    <div className="question-container">
        <h3>{text}</h3>
        <div className="options-grid">
            {options.map(option => (
                <button
                    key={option}
                    type="button"
                    className="option-btn"
                    onClick={() => onAnswer(questionKey, option)}
                >
                    {option}
                </button>
            ))}
        </div>
    </div>
);

export default SkincareQuiz;
