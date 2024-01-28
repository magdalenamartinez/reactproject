import { provincias } from "../load/load.js";

function change_provincia() {
    let selected = document.getElementById("provincia");
    const codpostal = document.getElementById("codpostal");
    const valueCod = codpostal.value;
    console.log(valueCod);
    console.log(selected.value);
    if (valueCod.length < 2) {
        console.log("menor");
        return;
    } else {
        let cod = valueCod.slice(0,2);
        const number = parseInt(cod, 10);
        selected.value = provincias[number - 1];
        console.log(selected.value);

    }
    
}

export default change_provincia;