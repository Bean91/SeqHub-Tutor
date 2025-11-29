import React, { useState } from 'react';
import './style.css';

interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface MultipleChoiceProps {
  title: string;
  questions: string[];
  options: Option[][];
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({ title, questions, options}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [questionNum, setQuestionNum] = useState(0);

  const handleSubmit = () => {
    if (!selectedOption) return;

    const isCorrect = options[questionNum % options.length].find(opt => opt.id === selectedOption)?.isCorrect || false;

    setHasSubmitted(true);
    setTotalAttempts(prev => prev + 1);

    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleReset = () => {
    setSelectedOption(null);
    setHasSubmitted(false);
    setQuestionNum(prev => prev + 1)
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600">{questions[questionNum % questions.length]}</p>
      </div>

      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Score:</span>
          <span className="text-lg font-bold text-blue-600">
            {correctCount} / {totalAttempts}
          </span>
        </div>
      </div>
      <div className="space-y-3 mb-6">
        {options[questionNum % options.length].map((option) => {
          const isSelected = selectedOption === option.id;
          const showCorrect = hasSubmitted && option.isCorrect;
          const showIncorrect = hasSubmitted && isSelected && !option.isCorrect;

          return (
            <button
              key={option.id}
              onClick={() => !hasSubmitted && setSelectedOption(option.id)}
              disabled={hasSubmitted}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                showCorrect
                  ? 'border-green-500 bg-green-50'
                  : showIncorrect
                  ? 'border-red-500 bg-red-50'
                  : isSelected
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-gray-50'
              } ${hasSubmitted ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-900">{option.text}</span>
                {showCorrect && (
                  <span className="text-green-600 font-semibold">✓</span>
                )}
                {showIncorrect && (
                  <span className="text-red-600 font-semibold">✗</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex gap-3">
        {!hasSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedOption}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
              selectedOption
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="flex-1 py-3 px-6 rounded-lg font-semibold bg-gray-600 text-white hover:bg-gray-700 transition-all"
          >
            Next Question
          </button>
        )}
      </div>
    </div>
  );
};

export default MultipleChoice;
