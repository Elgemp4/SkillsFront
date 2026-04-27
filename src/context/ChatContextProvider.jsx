import React, {createContext,  useState} from 'react';

export const ChatContext = createContext(null);

const ChatContextProvider = ({children}) => {

    const [chats, setChats] = useState([]);
    const [messages, setMessages] = useState([]);
    const [chatId, setChatId] = useState(undefined);

    return (
        <ChatContext value={{chats, messages, chatId, setChatId, setChats, setMessages}}>
            {children}
        </ChatContext>
    );
};

export default ChatContextProvider;
