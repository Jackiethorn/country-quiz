import QuizCard from "../components/QuizCard";
import useFetchQuestions from "../../hooks/useFetchQuestions";
import { useEffect } from "react";

function QuizPage() {
  const { isLoading, isSuccess, isError, OnNextQuestion, randomQuestion } =
    useFetchQuestions();

  useEffect(() => {
    if (isLoading) return;
    if (isError) return;
    if (isSuccess) {
      // onNextQuestion().then((randomQuestion) => {
      //   setRandomQuestion(randomQuestion || 'no question found');
      //   console.log(randomQuestion);
      // }
    }
  }, [isError]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div> An error occured, try again. </div>;
  }

  return (
    <div className="bg-main min-h-screen flex justify-center items-center">
      {isSuccess && (
        <QuizCard question={randomQuestion} onNextQuestion={OnNextQuestion} />
      )}
    </div>
  );
}

export default QuizPage;
