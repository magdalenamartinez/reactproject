function AddAcademicTitles() {
    const addButton = document.getElementById("agregartituloacademico");
    const educacion = document.getElementById("clase_educacion");
    const titulos = document.getElementById('titulos_ac');

    const campos = titulos.querySelectorAll("input");
    let estalleno = true;

    campos.forEach(function(campo) {
        if (campo.value === "") {
            estalleno = false;
            return;
        }
    });

    if (estalleno) {
        const linea = document.getElementById('horizontal_line2');
        linea.classList.remove('hidden');
        const newEducation = titulos.cloneNode(true);
        newEducation.querySelectorAll("input").forEach(function(campo){
            campo.value = "";
        });
        educacion.insertBefore(newEducation, educacion.lastElementChild);
    } 
}

export default AddAcademicTitles;
