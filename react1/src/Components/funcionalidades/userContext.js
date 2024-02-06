import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const login = (user) => {
    setUserData(user);
    Cookies.set('userData', JSON.stringify(user), { secure: true, sameSite: 'strict', expires: 1});
  };

  const logout = () => {
    setUserData(null);
    Cookies.remove('userData');
    
  };
  
  const updateUser = (newUserData) => {
    setUserData(newUserData);
    Cookies.set('userData', JSON.stringify(newUserData), { secure: true, sameSite: 'strict', expires: 1});
  };


  useEffect(() => {
    const storedUserData = Cookies.get('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  return (
    <UserContext.Provider value={{ userData, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
