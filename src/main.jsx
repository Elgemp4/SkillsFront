import { createRoot } from 'react-dom/client'
import './index.css'
import AppRouter from "./AppRouter.jsx";
import LoginContextProvider from "./context/LoginContextProvider.jsx";
import ChatContextProvider from "./context/ChatContextProvider.jsx";

createRoot(document.getElementById('root')).render(
    <LoginContextProvider>
        <ChatContextProvider>
            <AppRouter/>
        </ChatContextProvider>
    </LoginContextProvider>
)
