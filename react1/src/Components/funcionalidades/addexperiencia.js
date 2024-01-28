function addExperience () {
    const addButton = document.getElementById("agregarexperiencia");
    const experienciaLaboral = document.getElementById('experiencia_laboral');
    const experiencia = document.querySelector(".experiencia");
    let estalleno = true;

    const anterior_lleno = experiencia.querySelectorAll("input");
    
    anterior_lleno.forEach(function (campo) {
        console.log(campo.value);
        if(campo.value === "") {
            estalleno = false;
            return;
        }
    });
    
    if (estalleno) {
        const linea = document.getElementById('horizontal_line1');
        linea.classList.remove('hidden');
        const newExperiencia = experiencia.cloneNode(true);
        newExperiencia.querySelectorAll("input").forEach(function (campo) {
            campo.value = "";
        });
        experienciaLaboral.insertBefore(newExperiencia, experienciaLaboral.lastElementChild);
    } else {
        alert("Por favor, complete la experiencia laboral anterior antes de añadir la siguiente.")
    }
    }

export default addExperience;