import { useState } from 'react';

const useInitialOfertState = (ofertaData) => {
    const initialState = {
        id_empresa: ofertaData ? ofertaData.id_empresa : '',
        publish: ofertaData ? ofertaData.publish : '',
        titulo_oferta: ofertaData ? ofertaData.titulo_oferta : '',
        descripcion_oferta: ofertaData ? ofertaData.descripcion_oferta : '',
        fechaInicio: ofertaData ? new Date(ofertaData.fechaInicio).toISOString().split('T')[0] : '',
        image: (ofertaData&&ofertaData.image!=='') ? `https://backend-empleoinclusivo.onrender.com/uploads/${ofertaData.image}` : "/images/uploadimage2.png",
        salario: ofertaData ? ofertaData.salario : '',
        provincia: ofertaData ? ofertaData.provincia : '',
        codpostal: ofertaData ? ofertaData.codpostal : '',
        calendarioEventos: ofertaData ? ofertaData.calendarioEventos : '',
        politicasInclusivas: ofertaData ? ofertaData.politicasInclusivas : null,
        instalacionesAccesibles: ofertaData ? ofertaData.instalacionesAccesibles : null,
        formacionInclusividad: ofertaData ? ofertaData.formacionInclusividad : null,
        mentoresApoyo: ofertaData ? ofertaData.mentoresApoyo : null,
        ambienteAdaptado: ofertaData ? ofertaData.ambienteAdaptado : null,
        requisitos: ofertaData ? ofertaData.requisitosSolicitante : '',
    };

    return useState(initialState);
};

export default useInitialOfertState;
