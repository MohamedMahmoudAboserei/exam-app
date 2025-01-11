'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions, setAnswer } from '@/store/Questions/questionsSlice';
import { storeDispatch, storeState } from '@/store/store';
import ProgressBar from "@/components/Exams/ProgressBar";
import Timer from "@/components/Exams/Timer";
import Question from "@/components/Exams/Question";
import Results from "@/components/Exams/Results";

interface QuestionsProps {
    examId: string;
    onClose: () => void;
}

export default function Questions({ examId, onClose }: QuestionsProps) {
    const dispatch = useDispatch();
    const { questions, answers, loading, error } = useSelector((state: storeState) => state.exam);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        dispatch(fetchQuestions(examId));
    }, [dispatch, examId]);

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setShowResults(true);
        }
    };

    const handleSelectOption = (questionId: string, answerKey: string) => {
        dispatch(setAnswer({ questionId, answerKey }));
    };

    const handleBack = () => {
        setShowResults(false);
        onClose();
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (showResults) {
        return (
            <Results
                questions={questions}
                answers={answers}
                onBack={handleBack}
            />
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg w-[300px] md:w-[500px] flex justify-center items-center flex-col">
                <div className="flex justify-between items-center mb-4">
                    <p className="text-sm text-gray-600">
                        Question {currentQuestionIndex + 1} of {questions.length}
                    </p>
                    <Timer initialTime={900} onTimeEnd={() => setShowResults(true)} />
                </div>

                <ProgressBar currentStep={currentQuestionIndex + 1} totalSteps={questions.length} />

                <Question
                    question={currentQuestion.question}
                    answers={currentQuestion.answers}
                    selectedAnswer={answers[currentQuestion._id]}
                    onSelectOption={(answerKey) => handleSelectOption(currentQuestion._id, answerKey)}
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
                        {currentQuestionIndex < questions.length - 1 ? "Next" : "Finish"}
                    </button>
                </div>
            </div>
        </div>
    );
}