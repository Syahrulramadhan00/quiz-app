import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import ResultsCard from '../../components/Cards/ResultCard';


const Home = () => {
  const [results, setResults] = useState([]);
  const [unfinishedQuiz, setUnfinishedQuiz] = useState(false);
  const [quizOngoing, setQuizOngoing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedAnswers = JSON.parse(localStorage.getItem('quizAnswers'));
    const isQuizDone = localStorage.getItem('isQuizDone');
    const quizEndTime = JSON.parse(localStorage.getItem('quizEndTime'));

    // Check if there's an ongoing quiz
    if (savedAnswers && quizEndTime) {
      const currentTime = new Date().getTime();
      const remainingTime = quizEndTime - currentTime;
      if (remainingTime > 0) {
        setQuizOngoing(true); // Quiz is still ongoing
      } else {
        localStorage.removeItem('quizEndTime'); // Clean up expired quiz end time
      }
    }

    if (isQuizDone === 'true') {
      if (Array.isArray(savedAnswers)) {
        setResults(savedAnswers);
      } else {
        setResults([]);
      }
    } else if (savedAnswers) {
      setUnfinishedQuiz(true);
    }
  }, []);

  const handleContinue = () => {
    const savedAnswers = JSON.parse(localStorage.getItem('quizAnswers'));
    const isQuizDone = localStorage.getItem('isQuizDone');

    if (isQuizDone === 'true') {
      navigate('/quiz');
    } else if (savedAnswers) {
      navigate('/quiz');
    } else {
      alert('No unfinished quiz found.');
    }
  };

  return (
    <>
      <Navbar />
      <div className='flex flex-col items-center justify-center mt-28 space-y-4'>
        <div className='space-x-4'>
          {!unfinishedQuiz && !quizOngoing && (
            <Link to="/quiz">
              <button className='btn-primary'>
                Start Quiz
              </button>
            </Link>
          )}
          {(unfinishedQuiz || quizOngoing) && (
            <button
              className='btn-primary'
              onClick={handleContinue}
            >
              Continue
            </button>
          )}
        </div>
        {results.length > 0 && (
          <ResultsCard results={results} />
        )}
      </div>
    </>
  );
};

export default Home;