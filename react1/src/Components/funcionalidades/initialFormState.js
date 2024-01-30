import { useState } from 'react';

const useInitialFormState = (userData) => {
    const initialState = {
        name: userData ? userData.name : '',
        correo: userData ? userData.correo : '',
        password: userData ? userData.password : '',
        password2: userData ? userData.password : '',
        tlf: userData ? userData.tlf : '',
        image: (userData&&userData.image!='') ? `https://backend-empleoinclusivo.onrender.com/uploads/${userData.image}` : "../images/uploadimage2.png",
        curriculum: userData ? `https://backend-empleoinclusivo.onrender.com/download/${userData.curriculum}` : '',
        curriculumName: userData ? userData.curriculumName : '',
        calle: userData ? userData.calle : '',
        ciudad: userData ? userData.ciudad : '',
        provincia: userData ? userData.provincia : '',
        codpostal: userData ? userData.codpostal : '',
        posanterior: userData ? userData.posanterior : '',
        empresa: userData ? userData.empresa : '',
        duracion: userData ? userData.duracion : '',
        nivel_educacion: userData ? userData.educacion : '',
        institucion: userData ? userData.institucion : '',
        titulo: userData ? userData.titulo : '',
        habilidad: userData ? userData.habilidad : '',
        perfil: userData ? userData.perfil : '',
        distancia: userData ? userData.ubi : "0",
        video: userData ? userData.video : null,
    };

    return useState(initialState);
};

export default useInitialFormState;
