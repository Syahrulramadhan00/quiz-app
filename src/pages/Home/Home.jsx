import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import ResultsCard from '../../components/Cards/ResultCard';


const Home = () => {
  const [results, setResults] = useState([]);
  const [unfinishedQuiz, setUnfinishedQuiz] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedAnswers = JSON.parse(localStorage.getItem('quizAnswers'));
    const isQuizDone = localStorage.getItem('isQuizDone');

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
    if (unfinishedQuiz) {
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
          <Link to="/quiz">
            <button className='btn-primary'>
              Start Quiz
            </button>
          </Link>
          <button
            className='btn-secondary'
            onClick={handleContinue}
            disabled={!unfinishedQuiz}
          >
            Continue
          </button>
        </div>
        {results.length > 0 && (
          <ResultsCard results={results} />
        )}
      </div>
    </>
  );
};

export default Home;