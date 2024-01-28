import { useState, useEffect } from 'react';

const useUserState = (editMode, userData) => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');

  useEffect(() => {
    if (editMode && userData) {
      setUsername(userData.user || '');
      setName(userData.name || '');
      // ... actualizar otros campos ...
    }
  }, [editMode, userData]);

  return {
    username,
    setUsername,
    name,
    setName,
    // ... otros campos del formulario ...
  };
};

export default useUserState;