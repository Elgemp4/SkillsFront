import React, {useContext, useEffect} from 'react';
import {Link, useNavigate} from "react-router";
import {LoginContext} from "../context/LoginContextProvider.jsx";
import {getApi} from "../api.js";
import {ChatContext} from "../context/ChatContextProvider.jsx";

const HomeView = () => {
    const {currentUser, setCurrentUser, setCurrentToken} = useContext(LoginContext);
    const {chats, setChats, messages, setMessages} = useContext(ChatContext);

    const nav = useNavigate();

    const logout = async (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setCurrentUser(null);
        setCurrentToken(null);
        nav("/login");

        await api.delete("/logout");
    }

    useEffect(() => {
        const load = async () => {
            const result = await getApi().get("/chat");
            const data = result.data;

            setChats(data);
        }
        load();
    }, []);

    const loadChat = async (e, chat) => {
        e.preventDefault();

        const result =  await getApi().get(`/chat/${chat.id}`);

        const data = result.data;
        setMessages(data.data.messages);
    }
    console.log(messages);

    return (
        <div className="min-h-screen flex flex-col">
        <header className="flex justify-between px-16 bg-bg-dark items-center py-4">
            <h1 className="text-2xl">Skills Chat</h1>
            <div className="flex gap-8 items-center">
                <p>Connected as <span>{currentUser.firstname + " " + currentUser.lastname}</span></p>
                <button className="button button-primary" onClick={(e) => {logout(e)}}>Logout</button>
            </div>
        </header>
        <main className="flex flex-1">
            <aside className="flex flex-col bg-bg gap-4 p-4">
                {chats.map((chat, index) => (<button key={chat.id} onClick={(e) => loadChat(e, chat)} className="p-4 cursor-pointer border-border border rounded-md">
                    <h2>Chat n°{index}</h2>
                </button>))}
            </aside>
            <div className="flex flex-col flex-1 gap-4 p-8">
                {messages.map((message) => (
                    <div key={message.id} className={`border-border border rounded-sm p-4 ${message.role == "user" ? "self-end" : "self-start"}`}>
                        <h3>{message.role}</h3>
                        <p>{message.content}</p>
                    </div>
                ))}
            </div>
        </main>
        </div>
    );
};

export default HomeView;