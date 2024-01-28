import { useState } from 'react';

const useInitialFormEnterprise = (enterpriseData) => {
    const initialState = {
        name: enterpriseData ? enterpriseData.name : '',
        correo: enterpriseData ? enterpriseData.correo : '',
        password: enterpriseData ? enterpriseData.password : '',
        password2: enterpriseData ? enterpriseData.password : '',
        tlf: enterpriseData ? enterpriseData.tlf : '',
        image: enterpriseData.image ? `http://localhost:5000/uploads/${enterpriseData.image}` : "../../images/uploadimage2.png",
        cultura: enterpriseData ? enterpriseData.cultura : '',
        description: enterpriseData ? enterpriseData.descripcion : '',
        tipo_empresa: enterpriseData ? enterpriseData.tipo_empresa : '',
        sector: enterpriseData ? enterpriseData.sector : '',
        provincia: enterpriseData ? enterpriseData.provincia : '',
        codpostal: enterpriseData ? enterpriseData.codpostal : '',
    };

    return useState(initialState);
};

export default useInitialFormEnterprise;
