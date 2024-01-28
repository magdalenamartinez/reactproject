function limitartexto(elementoId) {
    const elemento = document.getElementById(elementoId);
    const maxLongitud = 230;
    if (elemento.value.length > maxLongitud) {
        elemento.value = elemento.value.substring(0, maxLongitud);
    }
}

export default limitartexto;