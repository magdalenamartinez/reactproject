
export const indicesCalculados = (currentPagina, ofertasPorPagina, ofertas) => {
    const indexLastOferta = currentPagina * ofertasPorPagina;
    const indexFirstOferta = indexLastOferta - ofertasPorPagina;
    const currentOfertas = ofertas.slice(indexFirstOferta, indexLastOferta);
    return currentOfertas;
};

export const nextPage = (currentPagina, setCurrentPagina, ofertasPorPagina, ofertas) => {
    if (currentPagina < Math.ceil(ofertas.length / ofertasPorPagina)) {
        setCurrentPagina(currentPagina + 1);
    }
};

export const prevPage = (currentPagina, setCurrentPagina) => {
    if (currentPagina > 1) {
        setCurrentPagina(currentPagina - 1);
    }
};
