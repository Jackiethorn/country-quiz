import React, { useState } from "react";

function QuizCard({ question, onNextQuestion }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleSelectedOption = (index) => {
    if (isCorrect !== null) {
      // If answer is already selected, do nothing
      return;
    }

    setSelectedOption((prev) => (prev === index ? null : index));
    if (index === question.answerIndex) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null); // Reset selected option
    setIsCorrect(null); // Reset isCorrect
    onNextQuestion();
    console.log(question);
  };

  const renderedOptions = question.options.map((option, index) => {
    let optionClassName =
      "option flex items-center px-2 py-1.5 rounded-xl outline outline-2 outline-tertiary";

    let icon = null;

    if (selectedOption === index) {
      if (isCorrect === true) {
        optionClassName += " bg-success";
        icon = (
          <img
            src="/check_circle.svg"
            alt=""
            className="option-mark-check ml-auto"
          />
        );
      } else {
        optionClassName += " bg-danger";
        icon = (
          <img
            src="/cancel.svg"
            alt=""
            className="option-mark-cancel ml-auto"
          />
        );
      }
    } else if (index === question.answerIndex && isCorrect === false) {
      optionClassName += " bg-success";
      icon = (
        <img
          src="/check_circle.svg"
          alt=""
          className="option-mark-check ml-auto"
        />
      );
    }

    return (
      <button
        key={index}
        className={optionClassName}
        onClick={() => handleSelectedOption(index)}
        disabled={isCorrect !== null}
      >
        {" "}
        <span className="option-label">
          {String.fromCharCode(65 + index)}
        </span>{" "}
        <span className="option-text ml-16">{option}</span>
        {icon}
      </button>
    );
  });

  return (
    <div className="card-container font-poppins flex flex-col justify-center items-center relative">
      <h1 className="heading text-primary font-bold text-3xl uppercase leading-15 place-self-start mb-3">
        Country quiz
      </h1>
      <img
        src="/undraw_adventure_4hum.svg"
        alt=""
        className="max-w-fit absolute -top-5 -right-0 w-1/3"
      />
      <div className="card bg-white flex flex-col px-5 py-10 max-w-md rounded-2xl">
        <div className="card-question--body shrink flex-wrap">
          {question.flag && (
            <img src={question.flag} alt="" className="flag w-24" />
          )}
          <h2 className="question-body text-secondary font-bold leading-9 text-2xl">
            {question.question}
          </h2>
        </div>
        <div className="options font-medium flex flex-col text-lg text-tertiary/80 gap-6 mt-8 text-center">
          {renderedOptions}
          <button
            className="next-btn text-white bg-warning w-3/12 self-end px-2 py-2 rounded-xl"
            onClick={handleNextQuestion}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuizCard;
