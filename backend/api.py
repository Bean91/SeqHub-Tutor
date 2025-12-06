from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai, os
from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.environ['OPENAI_API_KEY']

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Prompt(BaseModel):
    text: str

@app.post("/api/teacher/generate")
async def teacher_generate(input: Prompt):
    input = input.text
    prompt = """
        You will be instructed to make an activity in a certain topic by the user.
        You must choose whether you want it to be a <MultipleChoice /> or a <NumberSlider />.
        Here are the following interfaces and typings for the <MultipleChoice /> prop:

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

        And here are the following interfaces and typings for the <NumberSlider /> prop:
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

        #!!Important!!

        Please respond with the following JSON string format and ONLY this format. No markdown or other formats:
        {
            "0": {
                type: string,
                props: NumberSliderProps | MultipleChoiceProps
            },
            "1": {
                type: string,
                props: NumberSliderProps | MultipleChoiceProps
            },
            "2": {
                type: string,
                props: NumberSliderProps | MultipleChoiceProps
            },
            "3": {
                type: string,
                props: NumberSliderProps | MultipleChoiceProps
            },
        }
    """
    response = openai.responses.create(
        model="gpt-4o",
        input=[{"role":"system", "content": prompt},
                {"role":"user", "content": input}
        ]
    )

    return {"data": response.output_text}
