import React, { useEffect, useState } from "react";

interface TimerProps {
    initialTime: number;
    onTimeEnd: () => void;
}

const Timer: React.FC<TimerProps> = ({ initialTime, onTimeEnd }) => {
    const [timeRemaining, setTimeRemaining] = useState(initialTime);

    useEffect(() => {
        if (timeRemaining > 0) {
            const timer = setInterval(() => {
                setTimeRemaining((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else {
            onTimeEnd();
        }
    }, [timeRemaining, onTimeEnd]);

    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    return (
        <p className="text-sm text-green-600 font-semibold">
            {`${minutes}:${seconds.toString().padStart(2, "0")}`}
        </p>
    );
};

export default Timer;
