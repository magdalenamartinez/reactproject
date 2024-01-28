// setUserData.js
export const setUserData = (newData) => {
    localStorage.setItem('userData', JSON.stringify(newData));
}

// getUserData.js
export const getUserData = () => {
    const storedData = localStorage.getItem('userData');
    return storedData ? JSON.parse(storedData) : null;
};
