
import { provincias } from "../load/load.js";

function change_postalcod() {
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
}

export default change_postalcod;