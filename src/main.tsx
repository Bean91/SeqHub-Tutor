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

let output_string = `{
  "type": "NumberSlider",
  "props": {
    "title": "Electronics: Ohm's Law and basic components",
    "questions": [
      {
        "id": "q1",
        "text": "Calculate the current I through a 3 Ω resistor connected to a 9 V voltage source.",
        "correctAnswer": 3,
        "min": 0,
        "max": 5,
        "step": 0.1,
        "unit": "A"
      },
      {
        "id": "q2",
        "text": "Calculate the voltage V across a 4 Ω resistor with a current of 2 A flowing through it.",
        "correctAnswer": 8,
        "min": 0,
        "max": 20,
        "step": 0.1,
        "unit": "V"
      },
      {
        "id": "q3",
        "text": "Calculate the power P dissipated by a circuit with a 5 V supply and a current of 0.2 A.",
        "correctAnswer": 1,
        "min": 0,
        "max": 5,
        "step": 0.01,
        "unit": "W"
      },
      {
        "id": "q4",
        "text": "For a 1000 Ω resistor in series with a 47 µF capacitor, what is the time constant τ in seconds?",
        "correctAnswer": 0.047,
        "min": 0,
        "max": 0.1,
        "step": 0.001,
        "unit": "s"
      }
    ],
    "tolerance": 0.01
  }
}
`

let parsed_output = JSON.parse(output_string);



// Assuming your interfaces already exist:
// interface Option { id: string; text: string; isCorrect: boolean; }
// interface MultipleChoiceProps { title: string; questions: string[]; options: Option[][]; }
// interface Question { id: string; text: string; correctAnswer: number; min: number; max: number; step?: number; unit?: string; }
// interface NumberSliderProps { title: string; questions: Question[]; tolerance?: number; }

// =====================
// Multiple Choice Quiz
// =====================

const electronicsMultipleChoiceQuiz: MultipleChoiceProps = {
  title: "Fundamentals of Electronics – Multiple Choice",
  questions: [
    "1. What is the SI unit of capacitance?",
    "2. Which equation represents Ohm’s law?",
    "3. Which electronic component primarily allows current to flow in only one direction?",
    "4. Which Boolean expression corresponds to a 2-input AND gate?",
    "5. In an NPN BJT operating in the active region, how are the junctions biased?",
    "6. Which of the following is an ideal property of an operational amplifier (op-amp)?",
    "7. Which type of filter passes low frequencies and attenuates high frequencies?",
    "8. What is the binary representation of the decimal number 13?"
  ],
  options: [
    // Q1
    [
      { id: "q1o1", text: "Henry (H)", isCorrect: false },
      { id: "q1o2", text: "Farad (F)", isCorrect: true },
      { id: "q1o3", text: "Ohm (Ω)", isCorrect: false },
      { id: "q1o4", text: "Volt (V)", isCorrect: false }
    ],
    // Q2
    [
      { id: "q2o1", text: "P = V · I", isCorrect: false },
      { id: "q2o2", text: "V = I · R", isCorrect: true },
      { id: "q2o3", text: "I = R / V", isCorrect: false },
      { id: "q2o4", text: "R = P / I", isCorrect: false }
    ],
    // Q3
    [
      { id: "q3o1", text: "Inductor", isCorrect: false },
      { id: "q3o2", text: "Capacitor", isCorrect: false },
      { id: "q3o3", text: "Diode", isCorrect: true },
      { id: "q3o4", text: "Resistor", isCorrect: false }
    ],
    // Q4
    [
      { id: "q4o1", text: "Y = A + B", isCorrect: false },
      { id: "q4o2", text: "Y = A · B", isCorrect: true },
      { id: "q4o3", text: "Y = A ⊕ B", isCorrect: false },
      { id: "q4o4", text: "Y = ¬A", isCorrect: false }
    ],
    // Q5
    [
      { id: "q5o1", text: "Base–emitter reverse biased, base–collector forward biased", isCorrect: false },
      { id: "q5o2", text: "Both base–emitter and base–collector forward biased", isCorrect: false },
      { id: "q5o3", text: "Base–emitter forward biased, base–collector reverse biased", isCorrect: true },
      { id: "q5o4", text: "Both base–emitter and base–collector reverse biased", isCorrect: false }
    ],
    // Q6
    [
      { id: "q6o1", text: "Zero input impedance", isCorrect: false },
      { id: "q6o2", text: "Infinite input impedance", isCorrect: true },
      { id: "q6o3", text: "Zero open-loop gain", isCorrect: false },
      { id: "q6o4", text: "Infinite output impedance", isCorrect: false }
    ],
    // Q7
    [
      { id: "q7o1", text: "High-pass filter", isCorrect: false },
      { id: "q7o2", text: "Low-pass filter", isCorrect: true },
      { id: "q7o3", text: "Band-stop (notch) filter", isCorrect: false },
      { id: "q7o4", text: "All-pass filter", isCorrect: false }
    ],
    // Q8
    [
      { id: "q8o1", text: "1001", isCorrect: false },
      { id: "q8o2", text: "1100", isCorrect: false },
      { id: "q8o3", text: "1101", isCorrect: true },
      { id: "q8o4", text: "1110", isCorrect: false }
    ]
  ]
};

// =====================
// Number Slider Quiz
// =====================

const electronicsNumberSliderQuiz: NumberSliderProps = {
  title: "Fundamentals of Electronics – Numeric Questions",
  // tolerance is optional and omitted so your component can use a default
  questions: [
    {
      id: "s1",
      text: "A resistor has 10 V across it and 2 A flowing through it. What is its resistance?",
      correctAnswer: 5, // 5 Ω
      min: 0,
      max: 20,
      step: 0.1,
      unit: "Ω"
    },
    {
      id: "s2",
      text: "What is the period, in milliseconds, of a 1 kHz sine wave?",
      correctAnswer: 1, // 1 ms
      min: 0,
      max: 5,
      step: 0.1,
      unit: "ms"
    },
    {
      id: "s3",
      text: "A first-order RC low-pass filter has R = 1 kΩ and C = 0.1 μF. What is its cutoff frequency (−3 dB) in Hz? (Use 2π ≈ 6.28)",
      correctAnswer: 1592, // ≈ 1 / (2πRC)
      min: 0,
      max: 5000,
      step: 1,
      unit: "Hz"
    },
    {
      id: "s4",
      text: "Two equal resistors are connected in series across a 10 V DC supply. What is the voltage at the midpoint relative to ground?",
      correctAnswer: 5, // 5 V
      min: 0,
      max: 10,
      step: 0.1,
      unit: "V"
    },
    {
      id: "s5",
      text: "A silicon diode is forward biased in a typical low-current circuit. What is the approximate forward voltage drop?",
      correctAnswer: 0.7,
      min: 0,
      max: 2,
      step: 0.1,
      unit: "V"
    },
    {
      id: "s6",
      text: "What is the decimal value of the 8-bit binary number 11110000?",
      correctAnswer: 240,
      min: 0,
      max: 255,
      step: 1
    }
  ]
};


const mathQuiz: MultipleChoiceProps = {
  title: "Basic Electronics",
  questions: [
    "What is the unit of electrical resistance?",
    "What does 'LED' stand for?",
    "Which component is primarily used to store electric charge?"
  ],
  options: [
    [
      { id: "1", text: "Volt", isCorrect: false },
      { id: "2", text: "Ohm", isCorrect: true },
      { id: "3", text: "Ampere", isCorrect: false },
      { id: "4", text: "Watt", isCorrect: false }
    ],
    [
      { id: "1", text: "Light Emitting Diode", isCorrect: true },
      { id: "2", text: "Low Energy Device", isCorrect: false },
      { id: "3", text: "Linear Energy Diode", isCorrect: false }
    ],
    [
      { id: "1", text: "Resistor", isCorrect: false },
      { id: "2", text: "Capacitor", isCorrect: true },
      { id: "3", text: "Inductor", isCorrect: false },
      { id: "4", text: "Diode", isCorrect: false }
    ]
  ]
};

const programmingQuiz: MultipleChoiceProps = {
  title: "Digital Electronics",
  questions: [
    "Which logic gate outputs HIGH only when all inputs are HIGH?",
    "What is the binary representation of the decimal number 5?"
  ],
  options: [
    [
      { id: "1", text: "OR gate", isCorrect: false },
      { id: "2", text: "AND gate", isCorrect: true },
      { id: "3", text: "NOR gate", isCorrect: false },
      { id: "4", text: "XOR gate", isCorrect: false }
    ],
    [
      { id: "1", text: "0011", isCorrect: false },
      { id: "2", text: "0101", isCorrect: true },
      { id: "3", text: "1010", isCorrect: false }
    ]
  ]
};

const movieQuiz: MultipleChoiceProps = {
  title: "Electronics History",
  questions: [
    "Which company introduced the first commercially available microprocessor, the 4004?",
    "In which decade did the first practical transistor appear?",
    "What does 'IC' stand for in electronics?"
  ],
  options: [
    [
      { id: "1", text: "Intel", isCorrect: true },
      { id: "2", text: "IBM", isCorrect: false },
      { id: "3", text: "Texas Instruments", isCorrect: false }
    ],
    [
      { id: "1", text: "1920s", isCorrect: false },
      { id: "2", text: "1940s", isCorrect: false },
      { id: "3", text: "1950s", isCorrect: true },
      { id: "4", text: "1970s", isCorrect: false }
    ],
    [
      { id: "1", text: "Integrated Circuit", isCorrect: true },
      { id: "2", text: "Inductive Coil", isCorrect: false },
      { id: "3", text: "Input Connector", isCorrect: false },
      { id: "4", text: "Internal Channel", isCorrect: false }
    ]
  ]
};

const questions: Question[] = [
  {
    id: '1',
    text: 'What is the nominal voltage of a standard USB 2.0 port?',
    correctAnswer: 5,
    min: 0,
    max: 20,
    step: 1,
    unit: ' V'
  },
  {
    id: '2',
    text: 'What is the frequency of household AC power in most of North America?',
    correctAnswer: 60,
    min: 0,
    max: 100,
    step: 1,
    unit: ' Hz'
  },
  {
    id: '3',
    text: 'What is the resistance of a resistor with color bands Brown-Black-Red (±20%)?',
    correctAnswer: 1000,
    min: 0,
    max: 5000,
    step: 100,
    unit: ' Ω'
  }
];

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {parsed_output.type === "MultipleChoice" &&
      <MultipleChoice
        title={parsed_output.props.title}
        questions={parsed_output.props.questions}
        options={parsed_output.props.options}
      />
    }
    {parsed_output.type === "NumberSlider" &&
      <NumberSlider
        title={parsed_output.props.title}
        questions={parsed_output.props.questions}
        tolerance={parsed_output.props.tolerance}
      />
    }
  </StrictMode>,
)
