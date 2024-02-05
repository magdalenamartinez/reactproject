// change_provincia.js
import { provincias } from "../../funcionalidades/load/load.js";
export default function changeProvincia(setFormValues) {
    const codpostal = document.getElementById("codpostal");
    const valueCod = codpostal.value;
    if (valueCod.length >= 2 && valueCod.length <= 5) {
        let cod = valueCod.slice(0, 2);
        const number = parseInt(cod, 10);
        let selected;
        if (setFormValues) {
            selected = provincias[number - 1];
        } else {
            selected = document.getElementById("provincia")
            selected.value = provincias[number - 1];
        }
        
        if (setFormValues) {
            setFormValues((prevValues) => ({
                ...prevValues,
                provincia: selected,
            }));
        }
    } else if (valueCod.length > 5 || parseInt(valueCod.slice(0, 2), 10) > 54) {
        let selectedProvince;
        let selectedCodpostal;
        if (setFormValues) {
            selectedProvince = '';
            selectedCodpostal = '';
        } else {
            selectedProvince = document.getElementById("provincia");
            selectedProvince.value = '';
        }
        
        if (setFormValues) {
            setFormValues((prevValues) => ({
                ...prevValues,
                provincia: selectedProvince,
                codpostal: selectedCodpostal,
            }));
        }
    }
}
