// useInitialFormEnterprise.js
import { useState, useEffect } from 'react';

const useInitialFormEnterprise = (enterpriseData) => {
  const initialState = {
    name: '',
    correo: '',
    password: '',
    password2: '',
    tlf: '',
    image: '/images/uploadimage2.png',
    cultura: '',
    description: '',
    tipo_empresa: '',
    sector: '',
    provincia: '',
    codpostal: '',
  };

  const [formValues, setFormValues] = useState(initialState);

  useEffect(() => {
    if (enterpriseData) {
      setFormValues((prevValues) => ({
        ...prevValues,
        name: enterpriseData.name || '',
        correo: enterpriseData.correo || '',
        password: enterpriseData.password || '',
        password2: enterpriseData.password || '',
        tlf: enterpriseData.tlf || '',
        image: enterpriseData.image
          ? `http://localhost:5000/uploads/${enterpriseData.image}`
          : '/images/uploadimage2.png',
        cultura: enterpriseData.cultura || '',
        description: enterpriseData.descripcion || '',
        tipo_empresa: enterpriseData.tipo_empresa || '',
        sector: enterpriseData.sector || '',
        provincia: enterpriseData.provincia || '',
        codpostal: enterpriseData.codpostal || '',
      }));
    }
  }, [enterpriseData]);

  return [formValues, setFormValues];
};

export default useInitialFormEnterprise;
