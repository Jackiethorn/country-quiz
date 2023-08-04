import { useState, useEffect, useMemo } from "react";

function useFetchQuestions() {
  const [questions, setQuestions] = useState([]);
  const [randomQuestion, setRandomQuestion] = useState({
    question: "heyyo",
    options: ["a", "b", "c", "d"],
  });
  const [status, setStatus] = useState("idle"); // idle, loading, success, error

  const isLoading = status === "loading" || status === "idle";
  const isSuccess = status === "success";
  const isError = status === "error";

  const memoizedData = useMemo(async () => {
    const response = await fetch(`https://restcountries.com/v3.1/all`);
    const data = await response.json();
    return data;
  }, []);

  useEffect(() => {
    setStatus("loading");
    try {
      memoizedData
        .then((data) => {
          setQuestions(data);
          setStatus("success");
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setStatus("error");
        });
    } catch (error) {
      console.error("Error fetching data:", error);
      setStatus("error");
    }
  }, [memoizedData]);

  const generateRandomOptions = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    const randomCountry = questions[randomIndex];
    if (randomCountry.flag === undefined) return generateRandomOptions();
    if (
      randomCountry.capital === undefined ||
      randomCountry.currencies === undefined
    ) {
      return generateRandomOptions();
    }
    return randomCountry;
  };

  function generateRandomQuestion() {
    if (questions.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * questions.length);
    const randomNumToThree = Math.floor(Math.random() * 3);
    const randomCountry = questions[randomIndex];
    console.log(randomCountry);
    if (randomNumToThree === 1) {
      const options = [
        generateRandomOptions()?.capital,
        generateRandomOptions()?.capital,
        generateRandomOptions()?.capital,
        randomCountry.capital,
      ];
      const shuffledOptions = options.sort(() => Math.random() - 0.5);
      const answerIndex = shuffledOptions.findIndex(
        (option) => option === randomCountry.capital
      );

      return {
        question: `What is the capital of ${randomCountry.name.common}?`,
        questionType: "capital",
        answerIndex: answerIndex,
        options: options,
      };
    } else if (randomNumToThree === 2) {
      // const currencyName =
      //   randomCountry.currencies[Object.keys(randomCountry.currencies)[0]].name;
      const answerCurrencyCode = Object.keys(randomCountry.currencies)[0];
      const optionOneCurrencyCode = Object.keys(
        generateRandomOptions().currencies
      )[0];
      const optionTwoCurrencyCode = Object.keys(
        generateRandomOptions().currencies
      )[0];
      const optionThreeCurrencyCode = Object.keys(
        generateRandomOptions().currencies
      )[0];

      const options = [
        `${optionOneCurrencyCode}`,
        `${optionTwoCurrencyCode}`,
        `${optionThreeCurrencyCode}`,
        `${answerCurrencyCode}`,
      ];
      const shuffledOptions = options.sort(() => Math.random() - 0.5); // Shuffle the options
      const answerIndex = shuffledOptions.findIndex(
        (option) => option === answerCurrencyCode
      );

      return {
        question: `What is the currency of ${randomCountry.name.common}?`,
        questionType: "currency",
        answerIndex: answerIndex,
        options: options,
      };
    } else {
      const options = [
        generateRandomOptions().name.common,
        generateRandomOptions().name.common,
        generateRandomOptions().name.common,
        randomCountry.name.common,
      ];
      const shuffledOptions = options.sort(() => Math.random() - 0.5); // Shuffle the options
      const answerIndex = shuffledOptions.findIndex(
        (option) => option === randomCountry.name.common
      );
      return {
        flag: randomCountry.flags.svg,
        question: "Which country does this flag belong to?",
        questionType: "flag",
        answerIndex: answerIndex,
        options: options,
      };
    }
  }

  function OnNextQuestion() {
    setRandomQuestion(() => generateRandomQuestion());
  }

  return {
    questions,
    isLoading,
    isError,
    isSuccess,
    OnNextQuestion,
    randomQuestion,
  };
}

export default useFetchQuestions;

// if(!response.ok) {
//     throw new Error(`${data.message} (${response.status})`);
