function createUIDrivenGUMStream() {
  var constraints = {
    'video': document.getElementById('gUMCamera').checked,
    'audio': document.getElementById('gUMMicrophone').checked
  };

  createGUMStream(constraints);
}

function createUIDrivenOpusStream() {
  var opusAudio = document.getElementById('opusAudio');
  var stream = opusAudio.mozCaptureStream();
  setupMediaRecorder(stream);
}

function initialize() {
  document.getElementById('setupGUMStream').onclick = createUIDrivenGUMStream;
  document.getElementById('setupOpusStream').onclick = createUIDrivenOpusStream;

  blobURLUI = document.getElementById('blobDownload');
}

window.addEventListener("DOMContentLoaded", initialize);
