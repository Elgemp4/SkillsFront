import React, {createContext,  useState} from 'react';

export const ChatContext = createContext(null);

const ChatContextProvider = ({children}) => {

    const [chats, setChats] = useState([]);
    const [messages, setMessages] = useState([]);

    return (
        <ChatContext value={{chats, messages, setChats, setMessages}}>
            {children}
        </ChatContext>
    );
};

export default ChatContextProvider;
