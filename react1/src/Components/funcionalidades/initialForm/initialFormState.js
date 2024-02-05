import { useState, useEffect } from 'react';

const useInitialFormState = (userData) => {
    const initialState = {
        name:'',
        correo:'',
        password:'',
        password2:'',
        tlf:'',
        image:"/images/uploadimage2.png",
        curriculum:'',
        curriculumName:'',
        calle:'',
        ciudad:'',
        provincia:'',
        codpostal:'',
        posanterior:'',
        empresa:'',
        duracion:'',
        nivel_educacion:'',
        institucion:'',
        titulo:'',
        habilidad:'',
        perfil:'',
        distancia:'0',
        video:'',
    };

const [formValues, setFormValues] = useState(initialState);

useEffect(() => {
    if (userData) {
        setFormValues((prevValues) => ({
            ...prevValues,
            name: userData.name || '',
            correo: userData.correo || '',
            password: userData.password || '',
            password2: userData.password || '',
            tlf: userData.tlf || '',
            image: userData.image? `https://backend-empleoinclusivo.onrender.com/uploads/${userData.image}` : "/images/uploadimage2.png",
            curriculum: userData.curriculum? `https://backend-empleoinclusivo.onrender.com/download/${userData.curriculum}` : '',
            curriculumName: userData.curriculumName || '',
            calle: userData.calle || '',
            ciudad: userData.ciudad || '',
            provincia: userData.provincia || '',
            codpostal: userData.codpostal || '',
            posanterior: userData.posanterior || '',
            empresa: userData.empresa || '',
            duracion: userData.duracion || '',
            nivel_educacion: userData.educacion || '',
            institucion: userData.institucion || '',
            titulo: userData.titulo || '',
            habilidad: userData.habilidad || '',
            perfil: userData.perfil || '',
            distancia: userData.ubi || "0",
            video: userData.video || null,
        }));
    }
}, [userData]);

    return [formValues, setFormValues];
};

export default useInitialFormState;


