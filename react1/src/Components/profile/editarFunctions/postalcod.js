// change_postalcod.js
import { provincias } from "../../funcionalidades/load/load.js";
export default function changePostalcod(setFormValues) {
    const provinciasSelected = document.getElementById("provincia");
    let index = provincias.indexOf(provinciasSelected.value) + 1;
    let codpostal = index;
    if (index < 10) {
        codpostal = `0${codpostal}`;
    } else {
        codpostal = index;
    }
    let changecodpostal = document.getElementById("codpostal");
    changecodpostal.value = `${codpostal}000`;
    setFormValues((prevValues) => ({
        ...prevValues,
        codpostal: changecodpostal.value,
    }));
}


