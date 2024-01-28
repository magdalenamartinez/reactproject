const setDetallesById = (ofertaId, setDetalles) => {
    //cierro los detalles
    setDetalles(prevDetalles => {
        const updatedDetalles = Object.keys(prevDetalles).reduce((acumulador, key) => {
            acumulador[key] = false;
            return acumulador;
          }, {});
          //abro los detalles de la oferta en cuestion
          updatedDetalles[ofertaId] =!prevDetalles[ofertaId];
          localStorage.setItem('ofertaDetallesId', ofertaId);
          return updatedDetalles;
    })
};

export default setDetallesById;