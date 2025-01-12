'use client';

interface ResultsProps {
    correctAnswers: number;
    totalQuestions: number;
    onBack: () => void;
}

const Results: React.FC<ResultsProps> = ({ correctAnswers, totalQuestions, onBack }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg w-[300px] md:w-[500px] flex justify-center items-center flex-col">
                <h2 className="text-2xl font-bold text-blue-600 mb-4">Your Score</h2>
                <p className="text-lg text-gray-800 mb-4">Correct: {correctAnswers}</p>
                <p className="text-lg text-gray-800 mb-4">Incorrect: {totalQuestions - correctAnswers}</p>
                <button
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600"
                    onClick={onBack}
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default Results;