import { createContext, useContext, useState, useEffect } from 'react';

const SessionContext = createContext();

export const useSession = () => useContext(SessionContext);

// eslint-disable-next-line react/prop-types
export const SessionProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(sessionStorage.getItem('user'));
        console.log('The useEffect runs: ', storedUser);
        if(storedUser){
            setUser(storedUser);
            setIsLoggedIn(true);
        }
        setLoading(false);
    }, []);

    const login = (userData) => {
        setIsLoggedIn(true);
        setUser(userData);
        sessionStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = (data) => {
        if(data){
            console.log('Logout --The data is: ', data);
            setIsLoggedIn(false);
            setUser(null);
            sessionStorage.removeItem('user');
        }
    };

    return (
        <SessionContext.Provider value={{ isLoggedIn, loading, user, login, logout }}>
            {children}
        </SessionContext.Provider>
    );


};

