import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the UserContext
const UserLoginStateContext = createContext();  

// Custom hook to use the UserContext
export const useUser = () => useContext(UserLoginStateContext);

// UserProvider component that provides user state to the application
export const UserProvider = ({ children }) => {
  const token = localStorage.getItem('token');
  const userEmail = localStorage.getItem('userEmail');
  const userName = localStorage.getItem('userName');

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userNameSet, setUserNameSet] = useState('');

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      setUserNameSet(userName);
    } else {
      setIsLoggedIn(false);
      setUserNameSet('');
    }
  }, [token, userName]); // Run the effect when token or userName changes

  const login = (name) => {
    setIsLoggedIn(true);
    setUserNameSet(name);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserNameSet('');
  };

  return (
    <UserLoginStateContext.Provider value={{ isLoggedIn, userName: userNameSet, login, logout }}>
      {children}
    </UserLoginStateContext.Provider>
  );
};



