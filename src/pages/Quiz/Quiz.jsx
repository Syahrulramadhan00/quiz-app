import React, { useState, useEffect } from 'react';
import { fetchQuestions } from '../../api/apiServices';
import Question from '../../components/Question/Question';
import QuestionSelector from '../../components/Navbar/QuestionSelector';
import Navigation from '../../components/Navbar/Navigation';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [correctScore, setCorrectScore] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isQuizDone, setIsQuizDone] = useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
      const loadQuestions = async () => {
        try {
          const data = await fetchQuestions();
          setQuestions(data);
          setLoading(false);
        } catch (error) {
          console.error('Error loading questions', error);
          setLoading(false);
        }
      };
  
      loadQuestions();
    }, []);
  
    useEffect(() => {
      if (isQuizDone) {
        const quizResults = questions.map((question, index) => ({
          question: question.question,
          userAnswer: selectedOptions[index] || 'Not Answered',
          correctAnswer: question.correct_answer,
        }));
        localStorage.setItem('quizAnswers', JSON.stringify(quizResults));
        localStorage.setItem('isQuizDone', 'true');
        navigate('/dashboard'); // Navigate to dashboard after finishing the quiz
      }
    }, [isQuizDone]);
  
    const handleOptionChange = (questionIndex, option) => {
      setSelectedOptions(prev => ({
        ...prev,
        [questionIndex]: option
      }));
    };
  
    const handleNext = () => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    };
  
    const handlePrev = () => {
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
      }
    };
  
    const handleJumpToQuestion = (index) => {
      setCurrentQuestionIndex(index);
    };
  
    const handleFinishQuiz = () => {
      setIsQuizDone(true);
    };
  
    const currentQuestion = questions[currentQuestionIndex];
    const options = currentQuestion ? 
      [...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort(() => Math.random() - 0.5) 
      : [];
  
    return (
      <div className="p-6 max-w-xl mx-auto mt-10 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Quiz</h1>
        {loading ? (
          <p className="text-lg mb-4">Loading questions...</p>
        ) : (
          <div>
            {questions.length > 0 && (
              <>
                <Question
                  question={currentQuestion.question}
                  options={options}
                  selectedOption={selectedOptions[currentQuestionIndex]}
                  onOptionChange={(option) => handleOptionChange(currentQuestionIndex, option)}
                />
                <Navigation
                  handlePrev={handlePrev}
                  handleNext={handleNext}
                  isFirstQuestion={currentQuestionIndex === 0}
                  isLastQuestion={currentQuestionIndex === questions.length - 1}
                  isQuizDone={isQuizDone}
                  onFinishQuiz={handleFinishQuiz}
                />
                <QuestionSelector
                  questions={questions}
                  currentQuestionIndex={currentQuestionIndex}
                  handleJumpToQuestion={handleJumpToQuestion}
                  isQuizDone={isQuizDone}
                />
                {!isQuizDone && (
                  <button
                    onClick={handleFinishQuiz}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-4"
                  >
                    Finish Quiz
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </div>
    );
  };
  
  export default Quiz;