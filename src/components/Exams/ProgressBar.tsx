import React from "react";

interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
    return (
        <div className="flex gap-1 mb-6">
            {Array.from({ length: totalSteps }, (_, index) => (
                <span
                    key={index}
                    className={`w-3 h-3 rounded-full ${index < currentStep ? "bg-blue-500" : "bg-gray-300"}`}
                ></span>
            ))}
        </div>
    );
};

export default ProgressBar;
