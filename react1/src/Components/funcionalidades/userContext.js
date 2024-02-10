import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  const login = (user) => {
    setUserData(user);
    setSessionTimeout();
    Cookies.set('userData', JSON.stringify(user), { secure: true, sameSite: 'strict', expires: 1});
  };

  const logout = () => {
    setUserData(null);
    clearTimeout(timeoutId);
    Cookies.remove('userData');
  };

  const setSessionTimeout = () => {
    const id = setTimeout(logout, 7200000);
    setTimeoutId(id);
  };

  const updateUser = (newUserData) => {
    setUserData(newUserData);
    Cookies.set('userData', JSON.stringify(newUserData), { secure: true, sameSite: 'strict', expires: 1});
    clearTimeout(timeoutId);
    setSessionTimeout();
    if (!newUserData) {
      logout();
    }
  };

  const handleInteraction = () => {
    clearTimeout(timeoutId);
    setSessionTimeout();
  };

  useEffect(() => {
    const storedUserData = Cookies.get('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
      setSessionTimeout();
    }

    document.addEventListener('mousemove', handleInteraction);
    document.addEventListener('keypress', handleInteraction);

    return () => {
      document.removeEventListener('mousemove', handleInteraction);
      document.removeEventListener('keypress', handleInteraction);
    };
  }, []);

  return (
    <UserContext.Provider value={{ userData, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
