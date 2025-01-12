'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExams } from '@/store/Exams/examsSlice';
import { storeDispatch, storeState } from '@/store/store';
import { motion } from 'framer-motion';
import Loader from '@/components/Loader/Loader';
import Questions from '@/app/exams/questions';

interface ExamsListProps {
    subjectId: string;
}

export default function ExamsList({ subjectId }: ExamsListProps) {
    const dispatch = useDispatch<storeDispatch>();
    const { exams, loading, error } = useSelector((state: storeState) => state.exams);
    const [showQuestions, setShowQuestions] = useState(false);
    const [selectedExam, setSelectedExam] = useState<string | null>(null);

    const token = localStorage.getItem("token") ?? "";

    useEffect(() => {
        if (subjectId) {
            dispatch(fetchExams({ subjectId, token }));
        }
    }, [dispatch, subjectId, token]);

    const handleStartExam = (exam: any) => {
        setSelectedExam(exam._id);
        setShowQuestions(true);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[200px]">
                <Loader />
            </div>
        );
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {exams.map((exam) => (
                    <motion.div
                        key={exam._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-4 bg-white shadow-lg rounded-lg transform hover:scale-105 transition-transform duration-300"
                    >
                        <h2 className="text-lg font-bold text-blue-600">{exam.title}</h2>
                        <p className="text-sm text-gray-600">Duration: {exam.duration} minutes</p>
                        <p className="text-sm text-gray-600">Questions: {exam.numberOfQuestions}</p>
                        <button
                            className="py-2 px-4 bg-[#4461F2] rounded-md text-white mt-2"
                            onClick={() => handleStartExam(exam)}
                        >
                            Start
                        </button>
                    </motion.div>
                ))}
            </div>

            {showQuestions && selectedExam && (
                <Questions examId={selectedExam} onClose={() => setShowQuestions(false)} />
            )}
        </>
    );
}