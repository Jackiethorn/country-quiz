import { createContext, useState } from "react";

const quizContext = createContext();

const Provider = ({ children }) => {
  const [gameOver, setGameOver] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleGameOver = () => {
    console.log("handling game over");
    console.log("your score:" + currentQuestion);
  };

  const handleNextQuestion = () => {
    console.log("handling next question");
  };

  const handleResult = () => {
    console.log("handling result");
  };

  const valueToShare = {
    gameOver,
    setGameOver,
    currentQuestion,
    setCurrentQuestion,
    isAnswered,
    setIsAnswered,
    isCorrect,
    setIsCorrect,
    handleGameOver,
    handleNextQuestion,
    handleResult,
  };

  return (
    <quizContext.Provider value={valueToShare}>{children}</quizContext.Provider>
  );
};

export default quizContext;
export { Provider };
