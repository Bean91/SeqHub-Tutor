import React, { useState } from 'react';
import './style.css'

interface Question {
  id: string;
  text: string;
  correctAnswer: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
}

interface NumberSliderProps {
  title: string;
  questions: Question[];
  tolerance?: number;
}

const NumberSlider: React.FC<NumberSliderProps> = ({ title, questions, tolerance = 0 }) => {
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [questionNum, setQuestionNum] = useState(0);

  const currentQuestion = questions[questionNum % questions.length];

  React.useEffect(() => {
    const midpoint = (currentQuestion.min + currentQuestion.max) / 2;
    setSliderValue(midpoint);
  }, [questionNum, currentQuestion.min, currentQuestion.max]);

  const handleSubmit = () => {
    const isCorrect = Math.abs(sliderValue - currentQuestion.correctAnswer) <= tolerance;

    setHasSubmitted(true);
    setTotalAttempts(prev => prev + 1);

    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleReset = () => {
    const midpoint = (currentQuestion.min + currentQuestion.max) / 2;
    setSliderValue(midpoint);
    setHasSubmitted(false);
    setQuestionNum(prev => prev + 1);
  };

  const isCorrect = hasSubmitted && Math.abs(sliderValue - currentQuestion.correctAnswer) <= tolerance;
  const isIncorrect = hasSubmitted && !isCorrect;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600">{currentQuestion.text}</p>
      </div>

      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Score:</span>
          <span className="text-lg font-bold text-blue-600">
            {correctCount} / {totalAttempts}
          </span>
        </div>
      </div>

      <div className="mb-8">
        <div className="mb-4 p-6 bg-gray-50 rounded-lg border-2 border-gray-200">
          <div className="text-center">
            <span className="text-4xl font-bold text-gray-900">
              {sliderValue}
            </span>
            {currentQuestion.unit && (
              <span className="text-2xl text-gray-600 ml-2">
                {currentQuestion.unit}
              </span>
            )}
          </div>
        </div>

        <div className="relative">
          <input
            type="range"
            min={currentQuestion.min}
            max={currentQuestion.max}
            step={currentQuestion.step || 1}
            value={sliderValue}
            onChange={(e) => !hasSubmitted && setSliderValue(Number(e.target.value))}
            disabled={hasSubmitted}
            className={`w-full h-3 rounded-lg appearance-none cursor-pointer ${
              hasSubmitted ? 'cursor-not-allowed opacity-60' : ''
            }`}
            style={{
              background: hasSubmitted 
                ? (isCorrect ? '#10b981' : '#ef4444')
                : `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((sliderValue - currentQuestion.min) / (currentQuestion.max - currentQuestion.min)) * 100}%, #e5e7eb ${((sliderValue - currentQuestion.min) / (currentQuestion.max - currentQuestion.min)) * 100}%, #e5e7eb 100%)`
            }}
          />
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>{currentQuestion.min}{currentQuestion.unit}</span>
            <span>{currentQuestion.max}{currentQuestion.unit}</span>
          </div>
        </div>
      </div>

      {hasSubmitted && (
        <div className={`mb-6 p-4 rounded-lg ${
          isCorrect ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'
        }`}>
          <div className="flex items-start gap-3">
            <span className={`text-2xl ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
              {isCorrect ? '✓' : '✗'}
            </span>
            <div className="flex-1">
              <p className={`font-semibold ${isCorrect ? 'text-green-900' : 'text-red-900'}`}>
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </p>
              <p className={`text-sm ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                The correct answer is {currentQuestion.correctAnswer}{currentQuestion.unit}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-3">
        {!hasSubmitted ? (
          <button
            onClick={handleSubmit}
            className="flex-1 py-3 px-6 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all"
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

export default NumberSlider;