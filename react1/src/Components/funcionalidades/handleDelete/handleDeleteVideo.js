const DeleteVideo = () => {
    const player = document.getElementById('videoPlayer');
    const deleteBotonVideo = document.getElementById('borrarvideo');
    const videoInput = document.getElementById('inputVideo');
    player.style.display= 'none';
    deleteBotonVideo.style.display= 'none';
    videoInput.value = '';
}

export default DeleteVideo;