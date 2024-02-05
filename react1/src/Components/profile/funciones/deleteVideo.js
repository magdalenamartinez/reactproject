const deleteVideoFunction = (setDeleteVideo) => {
    const player = document.getElementById('videoPlayer');
    const deleteBotonVideo = document.getElementById('borrarvideo');
    player.style.display= 'none';
    deleteBotonVideo.style.display= 'none';
    setDeleteVideo(true);
}

export default deleteVideoFunction;