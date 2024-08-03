import React, { useState, useEffect } from 'react';
import { fetchQuestions } from '../../api/apiServices';
import Question from '../../components/Question/Question';
import QuestionSelector from '../../components/Navbar/QuestionSelector';
import Navigation from '../../components/Navbar/Navigation';
import Timer from '../../utils/Timer';
import { useLocalStorage } from '../../utils/useLocalStorage';
import { useNavigate } from 'react-router-dom';

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Quiz = () => {
  const [questions, setQuestions] = useLocalStorage('quizQuestions', []);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useLocalStorage('currentQuestionIndex', 0);
  const [selectedOptions, setSelectedOptions] = useLocalStorage('quizAnswers', {});
  const [answeredQuestions, setAnsweredQuestions] = useLocalStorage('answeredQuestions', []);
  const [loading, setLoading] = useState(true);
  const [isQuizDone, setIsQuizDone] = useLocalStorage('isQuizDone', false);
  const [timer, setTimer] = useLocalStorage('quizTimer', 360); 
  const navigate = useNavigate();

  useEffect(() => {
    if (questions.length === 0) {
      loadQuestions();
    } else {
      setLoading(false);
    }
  }, [questions]);

  const loadQuestions = async () => {
    try {
      const data = await fetchQuestions();
      const shuffledQuestions = data.map((question) => ({
        ...question,
        options: shuffleArray([...question.incorrect_answers, question.correct_answer]),
      }));
      setQuestions(shuffledQuestions);
      setAnsweredQuestions(new Array(shuffledQuestions.length).fill(false));
      setLoading(false);
    } catch (error) {
      console.error('Error loading questions', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isQuizDone) {
      const quizResults = questions.map((question, index) => ({
        question: question.question,
        userAnswer: selectedOptions[index] || 'Not Answered',
        correctAnswer: question.correct_answer,
      }));
      setSelectedOptions(quizResults);
      navigate('/dashboard');
    }
  }, [isQuizDone, navigate, questions, selectedOptions, setSelectedOptions]);

  const handleOptionChange = (questionIndex, option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionIndex]: option,
    }));
    markQuestionAsAnswered(questionIndex);
    handleNext();
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

  const markQuestionAsAnswered = (index) => {
    setAnsweredQuestions((prevState) => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });
  };

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (!isQuizDone) {
      localStorage.setItem('answeredQuestions', JSON.stringify(answeredQuestions));
    }
  }, [answeredQuestions, isQuizDone]);

  return (
    <div className="p-6 max-w-xl mx-auto mt-10 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">Quiz</h1>
      {loading ? (
        <p className="text-lg mb-4">Loading questions...</p>
      ) : (
        <div>
          {questions.length > 0 && (
            <>
              <Timer
                timer={timer}
                setTimer={setTimer}
                isQuizDone={isQuizDone}
                handleFinishQuiz={handleFinishQuiz}
              />
              <Question
                question={currentQuestion.question}
                options={currentQuestion.options}
                selectedOption={selectedOptions[currentQuestionIndex]}
                onOptionChange={(option) => handleOptionChange(currentQuestionIndex, option)}
              />
              <Navigation isQuizDone={isQuizDone} onFinishQuiz={handleFinishQuiz} />
              <QuestionSelector
                questions={questions}
                currentQuestionIndex={currentQuestionIndex}
                handleJumpToQuestion={handleJumpToQuestion}
                isQuizDone={isQuizDone}
                answeredQuestions={answeredQuestions}
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