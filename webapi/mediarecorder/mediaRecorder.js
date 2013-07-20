function createUIDrivenGUMStream() {
  var constraints = {
    'video': document.getElementById('gUMCamera').checked,
    'audio': document.getElementById('gUMMicrophone').checked
  };

  createGUMStream(constraints);
}

function initialize() {
  document.getElementById('setupGUMStream').onclick = createUIDrivenGUMStream;

	blobURLUI = document.getElementById('blobDownload');
}

window.addEventListener("DOMContentLoaded", initialize);
