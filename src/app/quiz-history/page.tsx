'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { fetchQuizHistory } from '@/store/HistorySlice/historySlice';
import HeaderSections from "@/components/HeaderSections/HeaderSections";
import NavbarSide from "@/components/NavbarSide/NavbarSide";
import UserProfile from "@/components/UserProfile/UserProfile";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

export default function QuizHistory() {
    const dispatch = useDispatch();
    const { history, status, error } = useSelector((state: any) => state.quizHistory);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(fetchQuizHistory(token));
        }
    }, [dispatch]);

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0
        }
    };

    return (
        <div className="relative flex mt-4">
            <NavbarSide />
            <main className="w-[86%] mx-auto space-y-4">
                <HeaderSections />
                <UserProfile />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-white rounded-xl shadow-lg p-6"
                >
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Quiz History</h2>

                    {status === 'loading' && (
                        <div className="flex justify-center items-center h-40">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
                        </div>
                    )}

                    {error && (
                        <div className="text-red-500 text-center p-4">
                            {error}
                        </div>
                    )}

                    {history && (
                        <motion.div
                            variants={itemVariants}
                            className="space-y-6"
                        >
                            <div className="bg-gray-50 rounded-lg p-6">
                                <div className="mb-4">
                                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                        {history.QID.question}
                                    </h3>
                                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                                        <FontAwesomeIcon icon={faClock} className="inline" />
                                        <span>Average Time: {history.avgAnswerTime} seconds</span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {history.QID.answers.map((answer) => (
                                        <motion.div
                                            key={answer.key}
                                            variants={itemVariants}
                                            className={`p-4 rounded-lg flex items-center justify-between ${answer.key === history.QID.correct
                                                    ? 'bg-green-100 border border-green-200'
                                                    : answer.key === history.chosenAnswer
                                                        ? 'bg-red-100 border border-red-200'
                                                        : 'bg-white border border-gray-200'
                                                }`}
                                        >
                                            <span className="flex-1">{answer.answer}</span>
                                            {answer.key === history.QID.correct ? (
                                                <FontAwesomeIcon icon={faCheck} className="text-green-500 text-xl" />
                                            ) : answer.key === history.chosenAnswer ? (
                                                <FontAwesomeIcon icon={faTimes} className="text-red-500 text-xl" />
                                            ) : null}
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="mt-4 text-sm text-gray-600">
                                    <p>Submitted: {new Date(history.createdAt).toLocaleDateString()}</p>
                                    <p className={`mt-2 font-semibold ${history.checkAnswer === 'correct' ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                        Result: {history.checkAnswer.charAt(0).toUpperCase() + history.checkAnswer.slice(1)}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </main>
        </div>
    );
}