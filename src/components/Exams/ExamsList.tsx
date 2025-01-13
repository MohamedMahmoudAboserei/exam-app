'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExams } from '@/store/Exams/examsSlice';
import { storeDispatch, storeState } from '@/store/store';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Loader from '@/components/Loader/Loader';
import Questions from '@/app/exams/questions';

interface ExamsListProps {
    subjectId: string;
}

const examIcons: { [key: string]: string } = {
    'HTML Quiz': '/images/html-5.png',
    'CSS Quiz': '/images/css-3.png',
    'JavaScript Quiz': '/images/js.png',
    'Angular': '/images/programing.png',
    'React Quiz': '/images/physics.png',
    'Flutter': '/images/Flutter.png',
};

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

    const groupedExams = exams.reduce((acc: any, exam: any) => {
        const category = exam.category || 'Front-End Quiz';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(exam);
        return acc;
    }, {});

    return (
        <>
            <div className="space-y-8">
                {Object.entries(groupedExams).map(([category, categoryExams]: [string, any]) => (
                    <div key={category} className="space-y-4">
                        {category !== 'Front-End Quiz' && (
                            <h2 className="text-2xl font-semibold">{category}</h2>
                        )}
                        <div className="space-y-4">
                            {categoryExams.map((exam: any) => (
                                <motion.div
                                    key={exam._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-white rounded-lg p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 relative">
                                            <Image
                                                src={examIcons[exam.title]}
                                                alt={exam.title}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg">{exam.title}</h3>
                                            <p className="text-gray-500 text-sm">
                                                {exam.numberOfQuestions} Question
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <span className="text-gray-600">
                                            {exam.duration} Minutes
                                        </span>
                                        <button
                                            onClick={() => handleStartExam(exam)}
                                            className="px-6 py-2 bg-[#4461F2] text-white rounded-md hover:bg-[#3451E2] transition-colors"
                                        >
                                            Start
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {showQuestions && selectedExam && (
                <Questions examId={selectedExam} onClose={() => setShowQuestions(false)} />
            )}
        </>
    );
}