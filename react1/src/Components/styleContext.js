// StyleContext.js
import React, { createContext, useContext, useState } from 'react';

const StyleContext = createContext();

const StyleProvider = ({ children }) => {
  const [style, setStyle] = useState({
    highContrast: false,
    fontSize: 15,
    font: false,
    darkMode: false,
    back: false,
  });

  const updateStyle = (newStyle) => {
    setStyle((prevStyle) => ({ ...prevStyle, ...newStyle }));
  };

  return (
    <StyleContext.Provider value={{ style, updateStyle }}>
      {children}
    </StyleContext.Provider>
  );
};

const useStyle = () => {
  const context = useContext(StyleContext);
  if (!context) {
    throw new Error('useStyle must be used within a StyleProvider');
  }
  return context;
};

export { StyleProvider, useStyle };
