import { useState, useEffect } from 'react';

const useInitialOfertState = (ofertaData) => {
    const initialState = {
        id_empresa: '',
        publish:'',
        titulo_oferta:'',
        descripcion_oferta:'',
        fechaInicio: '',
        image:"/images/uploadimage2.png",
        salario: '',
        provincia: '',
        codpostal: '',
        calendarioEventos: '',
        politicasInclusivas: null,
        instalacionesAccesibles: null,
        formacionInclusividad: null,
        mentoresApoyo: null,
        ambienteAdaptado: null,
        requisitos: '',
    };

    const [formValues, setFormValues] = useState(initialState);


    useEffect(() => {
        if (ofertaData) {
            setFormValues((prevValues) => ({
                ...prevValues,
                id_empresa:  ofertaData.id_empresa || '',
                publish:  ofertaData.publish || '',
                titulo_oferta:  ofertaData.titulo_oferta || '',
                descripcion_oferta:  ofertaData.descripcion_oferta || '',
                fechaInicio:  new Date(ofertaData.fechaInicio).toISOString().split('T')[0] || '',
                image:  `http://localhost:5000/uploads/${ofertaData.image}` || "/images/uploadimage2.png",
                salario:  ofertaData.salario || '',
                provincia:  ofertaData.provincia || '',
                codpostal:  ofertaData.codpostal || '',
                calendarioEventos:  ofertaData.calendarioEventos || '',
                politicasInclusivas:  ofertaData.politicasInclusivas|| null,
                instalacionesAccesibles:  ofertaData.instalacionesAccesibles|| null,
                formacionInclusividad:  ofertaData.formacionInclusividad|| null,
                mentoresApoyo:  ofertaData.mentoresApoyo|| null,
                ambienteAdaptado:  ofertaData.ambienteAdaptado|| null,
                requisitos:  ofertaData.requisitosSolicitante || '',
               
            }));
        }
    }, [ofertaData]);

    return [formValues, setFormValues];
};

export default useInitialOfertState;
