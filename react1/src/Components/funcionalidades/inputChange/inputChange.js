
function InputChange(inputId, playerId) {
    const input = document.getElementById(inputId);
    const player = document.getElementById(playerId);
    const selectedFile = input.files[0];
    
    if (selectedFile) {
        const url = URL.createObjectURL(selectedFile);
        player.src = url;
        player.style.display = 'block';
        if (player.src != '') {
            const borrarvideo = document.getElementById('borrarvideo');
            borrarvideo.style.display= 'block';
        }
    }
}

export default InputChange;