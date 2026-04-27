import React, {createContext,  useState} from 'react';

export const LoginContext = createContext(null);

const LoginContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [currentToken, setCurrentToken] = useState(localStorage.getItem("token"));

    return (
        <LoginContext value={{currentUser, setCurrentUser, currentToken, setCurrentToken}}>
            {children}
        </LoginContext>
    );
};

export default LoginContextProvider;
