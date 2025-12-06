import React, { useState, type ChangeEvent } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import '../style.css';

const LoginField: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [, setAccessToken] = useLocalStorage<string>("/access_token", "");
    const [loginError, setLoginError] = useState<boolean>(false)

    function handleUsernameChange(e: ChangeEvent<HTMLInputElement>) {
        setUsername(e.target.value);
    }

    function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value);
    }

    function handleLogin() {
        let data = {"username": username, "password": password}
        fetch("https://ltd.seqhubai.com/auth/login", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            "body": JSON.stringify(data)
        })
        .then(response => {
            if (response.status === 401) {
                throw new Error('Invalid username or password');
            }
            return response.json();
        })
        .then(data => {
            setAccessToken(data.access_token);
            setLoginError(false);
            window.location.href = "/generator.html"
        })
        .catch(error => {
            console.error("Fetch error:", error);
            setLoginError(true);
        })
    }

    return (<div className={"max-w-2xl m-24 mx-auto pt-8 pb-2 px-6 bg-gray-600 rounded-lg shadow-lg"}>
                <div className={"mb-6 text-center"}>
                    <h2 className={"text-2xl font-bold text-gray-300 mb-2"}>Login</h2>
                    <p className={"text-white"}>Login to your SeqHub LTD account</p>
                </div>
                <div className={"grid grid-cols-2 gap-2 mb-8"}>
                    <input className={"col-span-1 border border-gray-800 rounded-md h-8 p-2"} type="text" value={username} onChange={handleUsernameChange} placeholder={"Username"} />
                    <input className={"col-span-1 border border-gray-800 rounded-md h-8 p-2"} type="password" value={password} onChange={handlePasswordChange} placeholder={"Password"} />
                    <button onClick={handleLogin} className={"col-span-2 h-8 bg-blue-500 rounded-sm text-white"} >Login</button>
                </div>
                {loginError && (
                    <h2 className={"text-white text-center test-3xl pb-2"}>Error logging in, please try again (maybe wrong password)</h2>
                )}
            </div>)
}

export default LoginField