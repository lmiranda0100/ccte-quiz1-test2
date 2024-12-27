import React, { useState } from "react";

interface Question {
  question: string;
  answers: string[];
  correctAnswer: string;
}

const questions: Question[] = [
  {
    question: "Qual é a principal fonte de energia renovável em Portugal?",
    answers: ["Solar", "Carvão", "Nuclear", "Gás"],
    correctAnswer: "Solar",
  },
  {
    question: "O que é a eficiência energética?",
    answers: [
      "Usar mais energia do que o necessário",
      "Reduzir o consumo de energia sem perder qualidade",
      "Aumentar a produção de eletricidade",
      "Usar eletricidade de fontes fósseis",
    ],
    correctAnswer: "Reduzir o consumo de energia sem perder qualidade",
  },
  {
    question: "Qual é a energia que vem do vento?",
    answers: ["Eólica", "Solar", "Hidráulica", "Geotérmica"],
    correctAnswer: "Eólica",
  },
  {
    question: "O que é o 'efeito de estufa'?",
    answers: [
      "Aquecimento da Terra devido a gases como dióxido de carbono",
      "Aquecimento da água nos oceanos",
      "Aquecimento do solo pelo Sol",
      "Aquecimento causado por usinas de energia",
    ],
    correctAnswer:
      "Aquecimento da Terra devido a gases como dióxido de carbono",
  },
];

const shuffleArray = (array: string[]) => {
  return array.sort(() => Math.random() - 0.5);
};

const App = () => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false); // New state
  const [incorrectAttempts, setIncorrectAttempts] = useState(0); // New state for tracking incorrect attempts

  const fixedPassword = "yctSwrf2^781u%*6"; // Set your password here

  const handleLogin = () => {
    if (password === fixedPassword) {
      setIsAuthenticated(true);
    } else {
      alert("Senha inválida!");
    }
  };

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
      setIsAnswerSubmitted(true);
      setIncorrectAttempts(0); // Reset incorrect attempts on correct answer
    } else {
      setScore(score - 0.5);
      setIsWrong(true);
      setIsCorrect(false);
      setIsAnswerSubmitted(false);
      setIncorrectAttempts(incorrectAttempts + 1); // Increment incorrect attempts
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
    setIsAnswerSubmitted(false);
    setIncorrectAttempts(0); // Reset incorrect attempts when moving to the next question
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
    setIsAnswerSubmitted(false); // Reset the answer submission state
  };

  const handleExportResults = () => {
    const csvContent = `Nome,Pontuação\n${name},${score}`;
    const encodedUri = encodeURI(`data:text/csv;charset=utf-8,${csvContent}`);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "results.csv");
    link.click();
  };

  // Password Login Form
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h2 className="font-bold mb-4">Digite a Senha para Aceder ao Quiz</h2>
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 border-2 border-gray-200 rounded-lg mb-4"
        />
        <button
          onClick={handleLogin}
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          Aceder
        </button>
      </div>
    );
  }

  // Quiz Start
  if (!hasStarted) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <input
          type="text"
          placeholder="Insira o seu nome"
          value={name}
          onChange={handleNameChange}
          className="px-4 py-2 border-2 border-gray-200 rounded-lg mb-4"
        />
        <button
          onClick={handleStartQuiz}
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          Iniciar Quiz
        </button>
      </div>
    );
  }

  // Quiz Results
  if (isFinished) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-3xl font-bold mb-4">Resultado do Quiz</h1>
        <div className="bg-white p-6 rounded-lg shadow-md mb-4">
          <p className="text-2xl font-bold mb-4">Nome: {name}</p>
          <p className="text-2xl font-bold mb-4">Pontuação: {score}</p>
        </div>
        <button
          onClick={handleExportResults}
          className="px-4 py-2 bg-green-500 text-white rounded-lg mt-4"
        >
          Exportar Resultados para CSV
        </button>
        <button
          onClick={handleRestartQuiz}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg mt-2"
        >
          Reiniciar Quiz
        </button>
      </div>
    );
  }

  // Quiz Questions
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Questão {currentQuestion + 1}</h1>

      {/* Display hearts */}
      <div className="absolute top-4 right-4 flex">
        {Array.from({ length: 2 }, (_, index) => (
          <span
            key={index}
            className={`text-2xl ${
              index < incorrectAttempts ? "text-gray-400" : "text-red-500"
            }`}
          >
            ❤️
          </span>
        ))}
      </div>

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
        <p className="text-2xl font-bold mb-4 text-green-500">Correto!</p>
      )}
      {isWrong && (
        <p className="text-2xl font-bold mb-4 text-red-500">Tente Novamente!</p>
      )}
      {incorrectAttempts >= 2 && (
        <p className="text-2xl font-bold mb-4 text-red-500">
          Sem mais tentativas
        </p>
      )}
      <button
        onClick={handleSubmitAnswer}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg mt-4"
        disabled={isCorrect || incorrectAttempts >= 2} // Disable if correct or if two incorrect attempts
      >
        Confirmar Resposta
      </button>
      {isAnswered && currentQuestion < questions.length - 1 && (
        <button
          onClick={handleNextQuestion}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg mt-4"
        >
          Próximo
        </button>
      )}
      {isAnswered && isCorrect && currentQuestion === questions.length - 1 && (
        <button
          onClick={handleFinishQuiz}
          className="absolute bottom-4 center-4 px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Terminar Quiz
        </button>
      )}
    </div>
  );
};

export default App;
