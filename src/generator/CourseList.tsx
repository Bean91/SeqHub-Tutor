import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import '../style.css';
import TeacherRequest from './TeacherRequest';

const CourseList: React.FC = () => {
    const [accessToken, ] = useLocalStorage<string>("/access_token", "");
    const [course, setCourse] = useState<number>(-1);
    const [courses, setCourses] = useState<[{id: number, title: string, course_code: string, teacher_id: number[], students: number[]}]>();
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        fetch("https://ltd.seqhubai.com/curriculum/courses", {
            "method": "GET",
            "headers": {
                "Authorization": `Bearer ${accessToken}`,
                "accept": "application/json"
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error Fetching');
            }
            return response.json();
        })
        .then(data => {
            setError(false);
            setCourses(data);
        })
        .catch(error => {
            console.error("Fetch error:", error);
            setError(true);
        })
    }, []);

    function handleCourseSelection(id: number) {
        setCourse(id);
    }

    return(
        <>
            {error ? (<div className={"max-w-2xl p-6 bg-gray-600 rounded-lg shadow-lg mt-24 mx-auto"}><div className={"mb-6 text-center"}>
                <h2 className={"text-2xl font-bold text-gray-300 mb-2"}>Error Fetching Courses</h2>
                <p className={"text-white"}>Please ensure you are logged in, then try again.</p>
            </div></div>) : (<div className={"max-w-2xl p-6 bg-gray-600 rounded-lg shadow-lg mt-24 mx-auto"}>
                <h2 className={"text-2xl font-bold text-gray-300 mb-2"}>Pick a course to add a module too</h2>
                {courses && courses.map((item, index) => {
                return (
                    <div key={index} className={item.id === course ? "text-l font-bold text-white mb-2 cursor-pointer" : "text-l font-bold text-gray-300 mb-2 cursor-pointer"} onClick={() => handleCourseSelection(item.id)}>
                        <h2>{item.title}</h2>
                    </div>
                )
            })}</div>)}
            <TeacherRequest course={course} />
        </>
    )
}

export default CourseList