function createUIDrivenGUMStream() {
  var constraints = {
    'video': document.getElementById('gUMCamera').checked,
    'audio': document.getElementById('gUMMicrophone').checked
  };

  createGUMStream(constraints);
}

function createUIDrivenOpusStream() {
  var opusAudioInput = document.getElementById('opusAudioInput');
  var opusAudioOutput = document.getElementById('opusAudioOutput');

  opusAudioInput.src = document.getElementById('testOpusFile').value;
  opusAudioOutput.mozSrcObject = opusAudioInput.mozCaptureStreamUntilEnded();

  setupMediaRecorder(opusAudioOutput.mozSrcObject);
}

function initialize() {
  document.getElementById('setupGUMStream').onclick = createUIDrivenGUMStream;
  document.getElementById('setupOpusStream').onclick = createUIDrivenOpusStream;

  blobURLUI = document.getElementById('blobDownload');
}

window.addEventListener("DOMContentLoaded", initialize);
