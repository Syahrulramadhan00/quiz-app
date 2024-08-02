import React, { useEffect } from 'react';

// Function to convert and round up seconds to a readable format
const formatTime = (seconds) => {
  // Round up seconds to the nearest whole number
  const roundedSeconds = Math.ceil(seconds);
  
  if (roundedSeconds <= 60) {
    return `${roundedSeconds} second${roundedSeconds !== 1 ? 's' : ''}`;
  } else {
    const minutes = Math.floor(roundedSeconds / 60);
    const remainingSeconds = roundedSeconds % 60;
    return `${minutes} minute${minutes > 1 ? 's' : ''} ${remainingSeconds} second${remainingSeconds !== 1 ? 's' : ''}`;
  }
};

const Timer = ({ timer, setTimer, isQuizDone, handleFinishQuiz }) => {
  useEffect(() => {
    if (timer > 0 && !isQuizDone) {
      const countdown = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else if (timer === 0) {
      handleFinishQuiz();
    }
  }, [timer, isQuizDone, handleFinishQuiz, setTimer]);

  return (
    <div className="mb-4">
      <span className="text-lg font-bold">Time Remaining: {formatTime(timer)}</span>
    </div>
  );
};

export default Timer;
