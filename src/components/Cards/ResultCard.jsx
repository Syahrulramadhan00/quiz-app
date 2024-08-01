import React from 'react';

const ResultsCard = ({ results }) => {
  const totalQuestions = results.length;
  const correctAnswersCount = results.filter(result => result.userAnswer === result.correctAnswer).length;
  const incorrectAnswersCount = totalQuestions - correctAnswersCount;

  return (
    <div className='mt-10 w-3/4 p-4 border rounded shadow-md'>
      <h2 className='text-2xl font-bold'>Quiz Results</h2>
      <div className='mt-4'>
        <p className='text-lg mb-2'><span className='font-semibold'>Total Questions:</span> {totalQuestions}</p>
        <p className='text-lg mb-2'><span className='font-semibold'>Correct Answers:</span> {correctAnswersCount}</p>
        <p className='text-lg mb-2'><span className='font-semibold'>Incorrect Answers:</span> {incorrectAnswersCount}</p>
        <p className='text-lg mb-2'><span className='font-semibold'>Score:</span> {correctAnswersCount} / {totalQuestions}</p>
      </div>
    </div>
  );
}

export default ResultsCard;
