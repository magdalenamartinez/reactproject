const DeleteCurriculum = () => {
    const deleteBotonCurriculum = document.getElementById('borrarCurriculum');
    const downloadLink = document.getElementById('linkDownload');
    const curriculumInput = document.getElementById('curriculumInput');
    deleteBotonCurriculum.style.display = 'none';
    downloadLink.style.display = 'none';
    curriculumInput.value = '';
}

export default DeleteCurriculum;