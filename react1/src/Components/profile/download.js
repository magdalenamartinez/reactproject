
function downloadFuncion(url, nameFile) {
    // Obtener la URL del archivo y el nombre deseado
    const linkdoc = document.getElementById('linkdownload');
    var urlArchivo = url;
    var fileName = nameFile;

    // Configurar el enlace con los datos del archivo
    linkdoc.href = urlArchivo;
    linkdoc.download = fileName;

    // Simular un clic en el enlace
    linkdoc.click();
}

export default downloadFuncion;
