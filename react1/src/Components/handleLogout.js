
export const HandleLogout = (data) => {
    localStorage.removeItem(data);
    window.location.href = '/';
};


