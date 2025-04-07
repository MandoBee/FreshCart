import React, { createContext, useEffect, useState } from 'react';

export const authContext = createContext();

export default function AuthContextProvider ({children }) {
    const [token, setToken] = useState(null);
     
    useEffect(() => {
        if (localStorage.getItem('userToken')!= null) {
            setToken(localStorage.getItem('userToken'));
        }
    }, []);

    return (
        <authContext.Provider value={{ token, setToken }}>
            {children}
        </authContext.Provider>
    )
}




