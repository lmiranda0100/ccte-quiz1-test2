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
    question: "O que é o 'efeito estufa'?",
    answers: [
      "Aquecimento da Terra devido a gases como dióxido de carbono",
      "Aquecimento da água nos oceanos",
      "Aquecimento do solo pelo Sol",
      "Aquecimento causado por usinas de energia",
    ],
    correctAnswer:
      "Aquecimento da Terra devido a gases como dióxido de carbono",
  },
  {
    question: "Qual é o objetivo da transição energética?",
    answers: [
      "Aumentar o uso de fontes de energia não renováveis",
      "Reduzir as emissões de gases de efeito estufa e utilizar mais fontes renováveis",
      "Aumentar a produção de energia nuclear",
      "Substituir todas as energias renováveis por energia solar",
    ],
    correctAnswer:
      "Reduzir as emissões de gases de efeito estufa e utilizar mais fontes renováveis",
  },
  {
    question: "Qual destas fontes de energia é considerada não renovável?",
    answers: ["Solar", "Eólica", "Carvão", "Hidráulica"],
    correctAnswer: "Carvão",
  },
  {
    question: "O que é energia hidráulica?",
    answers: [
      "Energia gerada a partir da água em movimento",
      "Energia gerada a partir do vento",
      "Energia proveniente do sol",
      "Energia gerada a partir do calor da Terra",
    ],
    correctAnswer: "Energia gerada a partir da água em movimento",
  },
  {
    question: "Qual é a principal vantagem das lâmpadas LED?",
    answers: [
      "Elas consomem muita energia",
      "Elas têm uma vida útil longa e consomem pouca energia",
      "Elas são caras e não duram muito",
      "Elas funcionam apenas com energia solar",
    ],
    correctAnswer: "Elas têm uma vida útil longa e consomem pouca energia",
  },
  {
    question: "O que significa a expressão 'pegada de carbono'?",
    answers: [
      "A quantidade de carbono em um produto",
      "A quantidade de dióxido de carbono emitida por atividades humanas",
      "A quantidade de carbono em combustíveis fósseis",
      "A quantidade de carbono que os vegetais consomem",
    ],
    correctAnswer:
      "A quantidade de dióxido de carbono emitida por atividades humanas",
  },
  {
    question: "Qual é a melhor forma de economizar energia em casa?",
    answers: [
      "Deixar luzes acesas o tempo todo",
      "Desligar aparelhos eletrônicos quando não estiverem em uso",
      "Usar aparelhos de aquecimento o tempo todo",
      "Deixar portas e janelas abertas durante o inverno",
    ],
    correctAnswer: "Desligar aparelhos eletrônicos quando não estiverem em uso",
  },
  {
    question: "O que é energia geotérmica?",
    answers: [
      "Energia gerada a partir do calor da Terra",
      "Energia gerada pelo sol",
      "Energia gerada a partir do vento",
      "Energia gerada a partir da água",
    ],
    correctAnswer: "Energia gerada a partir do calor da Terra",
  },
  {
    question: "Como a energia solar pode ser usada em casa?",
    answers: [
      "Para aquecer a água",
      "Para gerar eletricidade",
      "Para esfriar a casa",
      "Todas as opções acima",
    ],
    correctAnswer: "Todas as opções acima",
  },
  {
    question: "O que é a biomassa?",
    answers: [
      "Energia proveniente de lixo",
      "Energia proveniente de plantas e resíduos orgânicos",
      "Energia gerada pelo vento",
      "Energia gerada pelo calor da Terra",
    ],
    correctAnswer: "Energia proveniente de plantas e resíduos orgânicos",
  },
  {
    question: "Por que é importante reduzir o consumo de energia?",
    answers: [
      "Para proteger o meio ambiente e reduzir os custos",
      "Para aumentar as emissões de gases de efeito estufa",
      "Para usar mais eletricidade de fontes não renováveis",
      "Para destruir as florestas",
    ],
    correctAnswer: "Para proteger o meio ambiente e reduzir os custos",
  },
  {
    question: "Questão 15?",
    answers: ["A", "B", "C", "D"],
    correctAnswer: "C",
  },
  {
    question: "Questão 16?",
    answers: ["A", "B", "C", "D"],
    correctAnswer: "A",
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
    const csvContent = `Nome,Pontuação\n${name},${score}`;
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

  if (isFinished) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-3xl font-bold mb-4">Resultado Quiz</h1>
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

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Questão {currentQuestion + 1}</h1>
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
        <p className="text-2xl font-bold mb-4 text-green-500">Correcto!</p>
      )}
      {isWrong && (
        <p className="text-2xl font-bold mb-4 text-red-500">Tenta Novamente!</p>
      )}
      <button
        onClick={handleSubmitAnswer}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg mt-4"
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
      {currentQuestion === questions.length - 1 && (
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
