import React, {useContext, useState} from 'react';
import {LoginContext} from "../context/LoginContextProvider.jsx";
import {useNavigate} from "react-router";
import {getApi} from "../api.js";
import ChatContextProvider, {ChatContext} from "../context/ChatContextProvider.jsx";


const LoginView = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const nav = useNavigate();

    const { setCurrentUser, setCurrentToken } = useContext(LoginContext);
    const { setMessages, setChats, setChatId } = useContext(ChatContext);

    const submit = async (e) => {
        e.preventDefault();

        const result =  await getApi().post("/login", {
            email,
            password,
        });

        const data = result.data;


        setCurrentUser(data.user);
        setCurrentToken(data.token);
        setMessages([]);
        setChats([]);
        setChatId(null);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);

        nav("/home");
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <form className="bg-bg border border-border rounded-lg p-4 flex flex-col gap-6" onSubmit={submit}>
                <h1 className="text-4xl text-center mb-8">Login form</h1>
                <div className="flex flex-col gap-2">
                    <label className="text-text-muted" htmlFor="email">
                        Email
                    </label>
                    <input className="bg-bg-dark border border-border rounded-md px-7 py-2" id="email" type="email"
                           value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-text-muted" htmlFor="password">
                        Password
                    </label>
                    <input className="bg-bg-dark border border-border rounded-md px-7 py-2" id="password"
                           type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button className="button button-primary" type="submit">Login</button>
            </form>
        </div>
);
};

export default LoginView;