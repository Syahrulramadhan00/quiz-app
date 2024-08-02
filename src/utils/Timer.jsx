import React, { useEffect } from 'react';

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
      <span className="text-lg font-bold">Time Remaining: {timer} seconds</span>
    </div>
  );
};

export default Timer;
