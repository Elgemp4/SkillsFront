import React, {useContext, useEffect, useRef, useState} from 'react';
import {Link, useNavigate} from "react-router";
import {LoginContext} from "../context/LoginContextProvider.jsx";
import {getApi} from "../api.js";
import {ChatContext} from "../context/ChatContextProvider.jsx";

const HomeView = () => {
    const {currentUser, setCurrentUser, setCurrentToken} = useContext(LoginContext);
    const {chats, setChats, messages, setMessages, chatId, setChatId} = useContext(ChatContext);

    const nav = useNavigate();

    const containerRef = useRef(null);
    const popoverRef = useRef(null);

    const [prompt, setPrompt] = useState("");
    const [systemP, setSystemP] = useState("");
    const [isLoading, setLoading] = useState(false);

    const [nbDots, setNbDots] = useState(0);


    const logout = async (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setCurrentUser(null);
        setCurrentToken(null);
        nav("/login");

        await getApi().delete("/logout");
    }

    useEffect(() => {
        const load = async () => {
            const result = await getApi().get("/chat");
            const data = result.data;

            setChats(data);

        }
        load();
    }, []);

    useEffect(() => {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }, [messages])


    const loadChat = async (e, chat) => {
        e.preventDefault();

        const result =  await getApi().get(`/chat/${chat.id}`);

        const data = result.data;
        setMessages(data.data.messages);
        setChatId(chat.id);
    }

    useEffect(() => {
        const id = setInterval(() => {

            setNbDots((dot) => (dot+1)%4)
        }, 500);


        return () => clearInterval(id);
    }, [])

    const sendPrompt = async (e) => {
        e.preventDefault();

        setMessages((curr) => {
            return [...curr, ...[{
                'role': "user",
                'content': prompt
            }]]
        });

        setPrompt("");
        setLoading(true);
        const result = await getApi().put(`/chat/${chatId}`, {
            "content": prompt
        });
        setLoading(false);
        setMessages((curr) => {
            return [...curr, ...[{
                "role": result.data.response.role,
                "content": result.data.response.content
            }]];
        });
    }

    const createChat = async (e) => {
        e.preventDefault();

        const result = await getApi().post("/chat", {
            "system_prompt": systemP
        });

        const data = result.data.data;
        setChats((curr) => [...curr, ...[data]]);

        popoverRef.current.hidePopover();
    }

    return (
        <div className="h-screen flex flex-col">
        <header className="flex justify-between px-16 bg-bg-dark items-center py-4">
            <h1 className="text-2xl">Skills Chat</h1>
            <div className="flex gap-8 items-center">
                <p>Connected as <span>{currentUser.firstname + " " + currentUser.lastname}</span></p>
                <button className="button button-primary" onClick={(e) => {logout(e)}}>Logout</button>
            </div>
        </header>
        <main className="flex flex-1 min-h-0 ">
            <aside className="flex flex-col bg-bg gap-4 p-4 overflow-y-auto">
                <button popoverTarget="newChat" popoverTargetAction="toggle"  className="button button-primary">+ New Chat</button>
                {chats.map((chat, index) => (<button key={chat.id} onClick={(e) => loadChat(e, chat)} className="p-4 cursor-pointer border-border border rounded-md">
                    <h2>Chat n°{index}</h2>
                </button>))}
            </aside>
            <div ref={containerRef} className="flex flex-col flex-1 gap-4 p-8 h-full overflow-y-auto">
                {chatId == undefined ?
                    <div className="flex items-center justify-center">Select a chat on left pane to start chatting !</div> : <>

                    {messages.map((message) => (
                        <div key={message.id} className={`border-border border rounded-sm p-4 ${message.role == "user" ? "self-end" : "self-start"}`}>
                            <h3>{message.role}</h3>
                            <p dangerouslySetInnerHTML={{__html: message.content.replaceAll("\n", "<br>")}}></p>
                        </div>
                    ))}
                    {isLoading ? <div  className={`border-border border rounded-sm p-4  self-start`}>
                        <h3>assistant</h3>
                        <p>Loading{".".repeat(nbDots)}</p>
                    </div> : <></>}
                    <form onSubmit={(e) => sendPrompt(e)} className="sticky bottom-0 left-0 right-0 flex gap-16 bg-bg-dark p-8 rounded-lg">
                        <input disabled={isLoading} value={prompt} onChange={(e) => setPrompt(e.target.value)} className="disabled:opacity-50 border-border border rounded-md h-full px-4 py-2 flex-1 bg-white" type="text" placeholder="Prompt here .." />
                        <button className="button button-primary">📨</button>
                    </form>
                </>}



            </div>
        </main>
            <div ref={popoverRef} popover="auto" id="newChat" className="w-screen h-screen bg-transparent backdrop:bg-text-muted backdrop:opacity-45">
                <div className="flex items-center justify-center h-full">
                    <form onSubmit={(e) => createChat(e)} className="flex-col flex gap-4 bg-bg-dark p-8 rounded-lg">
                        <textarea disabled={isLoading} value={systemP} onChange={(e) => setSystemP(e.target.value)} className="disabled:opacity-50 h-64 border-border border rounded-md h-full px-4 py-2 flex-1 bg-white" type="text" placeholder="Prompt here .." />
                        <button popoverTarget="newchat" popoverTargetAction="hide" className="button button-primary">Create new chat</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default HomeView;