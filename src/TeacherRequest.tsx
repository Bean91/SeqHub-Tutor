import React, { useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
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

interface response {
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

const TeacherRequest: React.FC = () => {
    const [prompt, setPrompt] = useLocalStorage<string>("prompt", "");
    const [exercises, setExercises] = useLocalStorage<response | string>("exercises", "");
    const [submitted, setSubmitted] = useLocalStorage<boolean>("submitted", false);
    const [openStates, setOpenStates] = useLocalStorage<{ [key: number]: boolean }>("openStates", {});
    const [iframeHtml, setIframeHtml] = useLocalStorage<{ [key: number]: string }>("iframeHtml", {});

    useEffect(() => {
        if (!exercises || exercises === "Failed to generate") return;

        async function loadTemplates() {

            const newIframeHtml: { [key: number]: string } = {};

            Object.values(exercises).forEach(async (item, index) => {
                const template = await fetchTemplate(`/templates/${item.type}Template.html`);
                const filledHtml = fillTemplate(template, item);
                newIframeHtml[index] = filledHtml;
            });

            setIframeHtml(newIframeHtml);
        }

        loadTemplates();
    }, [exercises]);

    function handlePromptChange(e) {
        setPrompt(e.target.value);
    }

    function handleSubmit() {
        setSubmitted(true);
        fetch("http://localhost:8000/api/teacher/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: prompt })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data)
            try {
                data = JSON.parse(data.data);
                console.log(data)
                setExercises(data)
            } catch {
                setExercises("Failed to generate");
            }
            setSubmitted(false);
        })
        .catch(error => {
            console.error("Fetch error:", error);
            setSubmitted(false);
        });
    }

    async function fetchTemplate(templatePath: string) {
        try {
            const response = await fetch(templatePath);
            if (!response.ok) throw new Error("Failed to load template");
            const html = await response.text();
            return html;
        } catch (error) {
            console.error(error);
            return "<!-- Failed to load template -->";
        }
    }

    function fillTemplate(template: string, data: {type: string, props: NumberSliderProps | MultipleChoiceProps}) {
        let html = template;
        html = html.replace("const quizData = {};", `const quizData = ${JSON.stringify(data)};`)
        return html;
    }

    return (
        <div className={"max-w-2xl mx-auto my-16 p-6 bg-gray-600 rounded-lg shadow-lg"}>
            <div className={"mb-6 text-center"}>
                <h2 className={"text-2xl font-bold text-gray-300 mb-2"}>Generate Exercises</h2>
                <p className={"text-white"}>AI will generate you multiple exercises with your prompt</p>
            </div>
            <div className={"grid grid-cols-6 gap-2 mb-8"}>
                <textarea value={prompt} onChange={handlePromptChange} className={"p-2 m-2 col-span-5 h-12 min-h-12 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 text-md"} />
                <button className={"p-2 m-2 col-span-1 h-12 rounded-lg focus:outline-none bg-blue-500 text-white text-md"} onClick={handleSubmit} disabled={submitted}>Submit</button>
            </div>
            {exercises ?
            exercises !== "Failed to generate" ?
            (
            <div>
                <div className={"mb-6 text-center"}>
                    <h2 className={"text-2xl font-bold text-gray-300 mb-2"}>Generated Exercises:</h2>
                </div>
                <div>
                    {Object.values(exercises).map((item, index) => {
                        const isOpen = openStates[index] || false;

                        return (
                            <div key={index} className="grid grid-cols-4 p-4 bg-gray-700 rounded mb-4 shadow">

                                <span className="block text-lg font-bold text-white mb-2 col-span-4 text-center">
                                    {item.props.title ?? "Untitled Exercise"}
                                </span>

                                <span className="text-sm text-gray-300 col-span-2 text-center">
                                    {item.type}
                                </span>

                                <button
                                    onClick={() =>
                                        setOpenStates(prev => ({
                                            ...prev,
                                            [index]: !prev[index]
                                        }))
                                    }
                                    className="h-8 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 col-span-2">
                                    {isOpen ? "Hide Preview" : "Show Preview"}
                                </button>

                                {isOpen && (
                                    <div className="mt-3 border border-gray-600 rounded overflow-scroll col-span-4">
                                        <iframe
                                            srcDoc={iframeHtml[index] || "<!-- Loading template... -->"}
                                            className="w-full h-64 bg-white"/>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>)
            :
                <div>
                    <div className={"mb-6 text-center"}>
                        <h2 className={"text-2xl font-bold text-gray-300 mb-2"}>Failed to Generate</h2>
                        <p className={"text-white"}>Please try again.</p>
                    </div>
                </div>
            : <></>}
        </div>
    );
}

export default TeacherRequest;
