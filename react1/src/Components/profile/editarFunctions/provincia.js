// change_provincia.js
import { provincias } from "../../funcionalidades/load/load.js";
export default function changeProvincia(setFormValues) {
    const codpostal = document.getElementById("codpostal");
    const valueCod = codpostal.value;
    if (valueCod.length >= 2) {
        let cod = valueCod.slice(0, 2);
        const number = parseInt(cod, 10);
        let selected = provincias[number - 1];
        setFormValues((prevValues) => ({
            ...prevValues,
            provincia: selected,
        }));
    }
}
