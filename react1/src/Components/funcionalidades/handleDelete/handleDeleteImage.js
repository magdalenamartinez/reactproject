export const handle_delete_image = () => {
    const deleteBotonImage = document.getElementById('boton_imagen2');
    deleteBotonImage.style.display = 'none';
    const imageShow = document.getElementById('imageShoww');
    imageShow.src = "../images/uploadimage2.png";
}

export const handle_delete_image_notedit = () => {
    const imageInput = document.getElementById('imageInput');
    imageInput.value = ''; 
}