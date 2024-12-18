import React, { useState } from "react";

interface Question {
  question: string;
  answers: string[];
  correctAnswer: string;
}

const questions: Question[] = [
  {
    question: "What is the capital of France?",
    answers: ["Paris", "London", "Berlin", "Rome"],
    correctAnswer: "Paris",
  },
  {
    question: "What is the largest planet in our solar system?",
    answers: ["Earth", "Saturn", "Jupiter", "Uranus"],
    correctAnswer: "Jupiter",
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: ["Ag", "Au", "Hg", "Pb"],
    correctAnswer: "Au",
  },
  {
    question: "Who painted the Mona Lisa?",
    answers: ["Leonardo da Vinci", "Michelangelo", "Raphael", "Caravaggio"],
    correctAnswer: "Leonardo da Vinci",
  },
  {
    question: "What is the smallest country in the world?",
    answers: ["Vatican City", "Monaco", "Nauru", "Tuvalu"],
    correctAnswer: "Vatican City",
  },
  {
    question: "What is the highest mountain in the world?",
    answers: ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"],
    correctAnswer: "Mount Everest",
  },
  {
    question: "What is the deepest ocean?",
    answers: [
      "Pacific Ocean",
      "Atlantic Ocean",
      "Indian Ocean",
      "Arctic Ocean",
    ],
    correctAnswer: "Pacific Ocean",
  },
  {
    question: "What is the largest living species of lizard?",
    answers: [
      "Komodo dragon",
      "Saltwater crocodile",
      "Black mamba",
      "African elephant",
    ],
    correctAnswer: "Komodo dragon",
  },
  {
    question: "What is the fastest land animal?",
    answers: ["Cheetah", "Lion", "Leopard", "Jaguar"],
    correctAnswer: "Cheetah",
  },
  {
    question: "What is the largest mammal?",
    answers: ["Blue whale", "Fin whale", "Humpback whale", "Sperm whale"],
    correctAnswer: "Blue whale",
  },
  {
    question: "What is the driest desert?",
    answers: [
      "Sahara Desert",
      "Gobi Desert",
      "Mojave Desert",
      "Atacama Desert",
    ],
    correctAnswer: "Atacama Desert",
  },
  {
    question: "What is the longest river?",
    answers: [
      "Nile River",
      "Amazon River",
      "Yangtze River",
      "Mississippi River",
    ],
    correctAnswer: "Nile River",
  },
];

const shuffleArray = (array: string[]) => {
  return array.sort(() => Math.random() - 0.5);
};

const App = () => {
  const [name, setName] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleStartQuiz = () => {
    setHasStarted(true);
    setShuffledAnswers(shuffleArray([...questions[currentQuestion].answers]));
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(e.target.value);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
      setIsCorrect(true);
      setIsWrong(false);
    } else {
      setScore(score - 0.5);
      setIsWrong(true);
      setIsCorrect(false);
    }
    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    const nextQuestionIndex = currentQuestion + 1;
    setIsAnswered(false);
    setIsCorrect(false);
    setIsWrong(false);
    setSelectedAnswer("");
    setCurrentQuestion(nextQuestionIndex);
    setShuffledAnswers(shuffleArray([...questions[nextQuestionIndex].answers]));
  };

  const handleFinishQuiz = () => {
    setIsFinished(true);
  };

  const handleRestartQuiz = () => {
    setName("");
    setHasStarted(false);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer("");
    setIsCorrect(false);
    setIsWrong(false);
    setIsFinished(false);
    setIsAnswered(false);
    setShuffledAnswers([]);
  };

  const handleExportResults = () => {
    const csvContent = `Name,Score\n${name},${score}`;
    const encodedUri = encodeURI(`data:text/csv;charset=utf-8,${csvContent}`);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "results.csv");
    link.click();
  };

  if (!hasStarted) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={handleNameChange}
          className="px-4 py-2 border-2 border-gray-200 rounded-lg mb-4"
        />
        <button
          onClick={handleStartQuiz}
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          Start Quiz
        </button>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-3xl font-bold mb-4">Quiz Results</h1>
        <p className="text-2xl font-bold mb-4">Name: {name}</p>
        <p className="text-2xl font-bold mb-4">Score: {score}</p>
        <button
          onClick={handleExportResults}
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          Export Results to CSV
        </button>
        <button
          onClick={handleRestartQuiz}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Start Quiz Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl font-bold mb-4">
        Quiz Question {currentQuestion + 1}
      </h1>
      <div
        className={`p-4 border-2 rounded-lg ${
          isCorrect ? "bg-green-200" : isWrong ? "bg-red-200" : "bg-white"
        }`}
      >
        <p className="text-2xl font-bold mb-4">
          {questions[currentQuestion].question}
        </p>
        {shuffledAnswers.map((answer, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="radio"
              value={answer}
              checked={selectedAnswer === answer}
              onChange={handleAnswerChange}
              className="mr-2"
            />
            <p className="text-lg">{answer}</p>
          </div>
        ))}
      </div>
      {isCorrect && (
        <p className="text-2xl font-bold mb-4 text-green-500">Correct!</p>
      )}
      {isWrong && (
        <p className="text-2xl font-bold mb-4 text-red-500">Try Again!</p>
      )}
      <button
        onClick={handleSubmitAnswer}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Submit Answer
      </button>
      {isAnswered && currentQuestion < questions.length - 1 && (
        <button
          onClick={handleNextQuestion}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg mt-4"
        >
          Next
        </button>
      )}
      {currentQuestion === questions.length - 1 && (
        <button
          onClick={handleFinishQuiz}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg mt-4"
        >
          Finish Quiz
        </button>
      )}
    </div>
  );
};

export default App;
