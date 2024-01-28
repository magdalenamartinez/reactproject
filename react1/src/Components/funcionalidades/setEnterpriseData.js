
export const setEnterpriseData = (newData) => {
    localStorage.setItem('enterpriseData', JSON.stringify(newData));
}

export const getEnterpriseData = () => {
    const storedData = localStorage.getItem('enterpriseData');
    return storedData ? JSON.parse(storedData) : null;
  };
