import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Question {
  fandom: string;
  question: string;
  options: string[];
  correct: number;
}

const questions: Record<string, Question> = {
  dhoni: {
    fandom: 'MS Dhoni',
    question: 'In which year did MS Dhoni lead India to World Cup victory?',
    options: ['2007', '2011', '2015', '2019'],
    correct: 1
  },
  bts: {
    fandom: 'BTS',
    question: 'What year did BTS debut?',
    options: ['2011', '2012', '2013', '2014'],
    correct: 2
  },
  messi: {
    fandom: 'Messi',
    question: 'Which year did Messi win his first FIFA World Cup?',
    options: ['2014', '2018', '2022', 'Never'],
    correct: 2
  },
  taylor: {
    fandom: 'Taylor Swift',
    question: 'What was Taylor Swift\'s first album?',
    options: ['Fearless', 'Taylor Swift', '1989', 'Red'],
    correct: 1
  },
  naruto: {
    fandom: 'Naruto',
    question: 'What is Naruto\'s signature jutsu?',
    options: ['Chidori', 'Rasengan', 'Shadow Clone', 'Sage Mode'],
    correct: 2
  }
};

export default function Quiz() {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isMinting, setIsMinting] = useState(false);
  const navigate = useNavigate();
  
  // For demo, we'll use Dhoni's quiz
  const currentQuiz = questions.dhoni;

  const handleAnswer = async (index: number) => {
    setSelectedAnswer(index);
    const correct = index === currentQuiz.correct;
    setIsCorrect(correct);

    if (correct) {
      setIsMinting(true);
      // TODO: Implement NFT minting logic here
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsMinting(false);
      navigate('/gallery');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto"
    >
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        {currentQuiz.fandom} Quiz
      </h2>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <p className="text-xl mb-6">{currentQuiz.question}</p>

        <div className="space-y-4">
          {currentQuiz.options.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAnswer(index)}
              disabled={selectedAnswer !== null}
              className={`
                w-full p-4 rounded-lg text-left transition-colors
                ${selectedAnswer === index 
                  ? isCorrect 
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
                }
              `}
            >
              {option}
            </motion.button>
          ))}
        </div>

        {isMinting && (
          <p className="text-center mt-6 text-indigo-600">
            Minting your rare moment NFT...
          </p>
        )}

        {selectedAnswer !== null && !isMinting && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-6"
          >
            <p className={isCorrect ? 'text-green-600' : 'text-red-600'}>
              {isCorrect ? 'Correct! You earned a rare NFT!' : 'Sorry, try again!'}
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}