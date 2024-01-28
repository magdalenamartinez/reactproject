
function InputChange2(inputId, imageShowId) {
    const input = document.getElementById(inputId);
    const imageShow = document.getElementById(imageShowId);
    
    const deleteBotonImage = document.getElementById('boton_imagen2');
    deleteBotonImage.style.display = 'block';

    const selectedFile = input.files[0];

    if (selectedFile) {
        const url = URL.createObjectURL(selectedFile);
        imageShow.src = url;
    }
}

export default InputChange2;
