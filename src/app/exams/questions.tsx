import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { storeState, storeDispatch } from '@/store/store';
import { fetchQuestions, answerQuestion } from '@/store/Questions/questionsSlice';
import ProgressBar from '@/components/Exams/ProgressBar';
import Timer from '@/components/Exams/Timer';
import Question from '@/components/Exams/Question';
import Results from '@/components/Exams/Results';

interface QuestionsProps {
    examId: string;
}

const Questions: React.FC<QuestionsProps> = ({ examId }) => {
    const dispatch = useDispatch<storeDispatch>();
    const { questions, userAnswers, status } = useSelector((state: storeState) => state.questions);

    const [error, setError] = useState<string | null>(null);
    const [token, setToken] = useState<string>('');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem('token') ?? '';
        setToken(storedToken);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (!examId) return setError('No exam ID provided');
            if (!token) return setError('No authentication token found');

            try {
                await dispatch(fetchQuestions({ examId, token }));
            } catch (err) {
                setError('Failed to fetch questions');
                console.error('Error fetching questions:', err);
            }
        };

        if (token) fetchData();
    }, [dispatch, examId, token]);

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setShowResults(true);
        }
    };

    const handleSelectOption = (questionId: string, answerKey: string) => {
        dispatch(answerQuestion({ questionId, answer: answerKey }));
    };

    if (error) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-8 rounded-lg">
                    <h3 className="text-red-500 mb-4">Error</h3>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    if (status === 'loading') {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-8 rounded-lg">
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    if (status === 'failed') {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-8 rounded-lg">
                    <p>Error loading questions</p>
                </div>
            </div>
        );
    }

    if (showResults) {
        return (
            <Results
                correctAnswers={Object.values(userAnswers).filter((answer) => answer.correct).length}
                totalQuestions={questions.length}
                onBack={() => setShowResults(false)}
            />
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    if (!currentQuestion) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-8 rounded-lg">
                    <p>No questions available</p>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg w-[300px] md:w-[500px] flex justify-center items-center flex-col">
                <div className="flex justify-between items-center mb-4">
                    <p className="text-sm text-gray-600">
                        Question {currentQuestionIndex + 1} of {questions.length}
                    </p>
                    <Timer initialTime={25 * 60} onTimeEnd={() => setShowResults(true)} />
                </div>

                <ProgressBar currentStep={currentQuestionIndex + 1} totalSteps={questions.length} />

                <Question
                    question={currentQuestion.question}
                    options={currentQuestion.answers.map((answer) => answer.answer || 'No Text')}
                    onSelectOption={(selectedOption) =>
                        handleSelectOption(currentQuestion._id, currentQuestion.answers[selectedOption].key)
                    }
                />

                <div className="flex justify-between mt-6">
                    <button
                        className="px-6 py-2 bg-blue-100 text-blue-500 rounded-lg font-medium hover:bg-blue-200"
                        onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                        disabled={currentQuestionIndex === 0}
                    >
                        Back
                    </button>
                    <button
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600"
                        onClick={handleNextQuestion}
                    >
                        {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Questions;