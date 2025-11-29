import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import MultipleChoice from './MultipleChoice.tsx'
import NumberSlider from './NumberSlider.tsx';

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

const mathQuiz: MultipleChoiceProps = {
  title: "Math Challenge",
  questions: [
    "What is 7 × 8?",
    "What is the square root of 144?",
    "What is 15% of 200?"
  ],
  options: [
    [
      { id: "1", text: "54", isCorrect: false },
      { id: "2", text: "56", isCorrect: true },
      { id: "3", text: "63", isCorrect: false },
      { id: "4", text: "64", isCorrect: false }
    ],
    [
      { id: "1", text: "10", isCorrect: false },
      { id: "2", text: "12", isCorrect: true },
      { id: "3", text: "14", isCorrect: false }
    ],
    [
      { id: "1", text: "25", isCorrect: false },
      { id: "2", text: "30", isCorrect: true },
      { id: "3", text: "35", isCorrect: false },
      { id: "4", text: "40", isCorrect: false }
    ]
  ]
};

const programmingQuiz: MultipleChoiceProps = {
  title: "JavaScript Basics",
  questions: [
    "Which keyword is used to declare a constant in JavaScript?",
    "What does 'DOM' stand for?"
  ],
  options: [
    [
      { id: "1", text: "var", isCorrect: false },
      { id: "2", text: "let", isCorrect: false },
      { id: "3", text: "const", isCorrect: true },
      { id: "4", text: "static", isCorrect: false }
    ],
    [
      { id: "1", text: "Document Object Model", isCorrect: true },
      { id: "2", text: "Data Object Model", isCorrect: false },
      { id: "3", text: "Digital Oriented Model", isCorrect: false }
    ]
  ]
};

const movieQuiz: MultipleChoiceProps = {
  title: "Movie Trivia",
  questions: [
    "Who directed 'Inception'?",
    "Which movie won Best Picture at the 2020 Oscars?",
    "What year was 'The Matrix' released?"
  ],
  options: [
    [
      { id: "1", text: "Steven Spielberg", isCorrect: false },
      { id: "2", text: "Christopher Nolan", isCorrect: true },
      { id: "3", text: "James Cameron", isCorrect: false }
    ],
    [
      { id: "1", text: "1917", isCorrect: false },
      { id: "2", text: "Joker", isCorrect: false },
      { id: "3", text: "Parasite", isCorrect: true },
      { id: "4", text: "Once Upon a Time in Hollywood", isCorrect: false }
    ],
    [
      { id: "1", text: "1997", isCorrect: false },
      { id: "2", text: "1999", isCorrect: true },
      { id: "3", text: "2001", isCorrect: false },
      { id: "4", text: "2003", isCorrect: false }
    ]
  ]
};

const questions: Question[] = [
    {
      id: '1',
      text: 'What is the boiling point of water at sea level?',
      correctAnswer: 100,
      min: 0,
      max: 200,
      step: 1,
      unit: '°C'
    },
    {
      id: '2',
      text: 'How many days are in a year?',
      correctAnswer: 365,
      min: 300,
      max: 400,
      step: 1,
      unit: ' days'
    },
    {
      id: '3',
      text: 'What percentage of Earth is covered by water?',
      correctAnswer: 71,
      min: 0,
      max: 100,
      step: 1,
      unit: '%'
    }
  ];

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MultipleChoice title={mathQuiz.title} questions={mathQuiz.questions} options={mathQuiz.options} />
    <NumberSlider title="Number Slider" questions={questions} tolerance={2} />
  </StrictMode>,
)
