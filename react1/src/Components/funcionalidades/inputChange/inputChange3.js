
function InputChange3(inputId, downloadId) {
    const input = document.getElementById(inputId);
    const download = document.getElementById(downloadId);
    const borrarCurriculum = document.getElementById('borrarCurriculum');
    borrarCurriculum.style.display = 'block';
    const selectedFile = input.files[0];

    if (selectedFile) {
        const url = URL.createObjectURL(selectedFile);
        download.style.display = 'block';
        download.href = url;
        download.download = selectedFile.name;
    }
}

export default InputChange3;