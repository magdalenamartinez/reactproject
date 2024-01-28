
function RangoKm() {
    const distanciaBarra = document.getElementById("barra_km");
    const distanciaValor = document.getElementById("distanciaValor");

    distanciaBarra.addEventListener("input", function() {
        distanciaValor.textContent = this.value + "km";
    });
}

export default RangoKm;