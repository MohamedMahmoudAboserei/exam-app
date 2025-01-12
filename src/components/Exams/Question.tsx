'use client';

import React, { useState } from "react";

interface QuestionProps {
    question: string;
    options: string[];
    onSelectOption: (selectedOption: number) => void;
}

const Question: React.FC<QuestionProps> = ({ question, options, onSelectOption }) => {
    const [selectedOption, setSelectedOption] = React.useState<number | null>(null);

    const handleSelectOption = (index: number) => {
        setSelectedOption(index);
        onSelectOption(index);
    };

    return (
        <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">{question}</h2>
            <div className="space-y-4">
                {options.map((option, index) => (
                    <div
                        key={index}
                        className={`block p-4 rounded-lg shadow cursor-pointer transition-colors duration-200 ${selectedOption === index
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 hover:bg-gray-200"
                            }`}
                        onClick={() => handleSelectOption(index)}
                    >
                        {option}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Question;