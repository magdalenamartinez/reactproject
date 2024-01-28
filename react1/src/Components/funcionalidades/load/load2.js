const url ='https://raw.githubusercontent.com/magdalenamartinez/tfg/main/provincias.json';
let provincias = fetch(url)
    .then (response => {
        return response.json();
    })
    .then (data => {
        provincias = data.provincias;
    });

export default provincias;