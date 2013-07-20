function createUIDrivenGUMStream() {
  var constraints = {
    'video': document.getElementById('gUMCamera').checked,
    'audio': document.getElementById('gUMMicrophone').checked
  };

  createGUMStream(constraints);
}

function initialize() {
  document.getElementById('setupGUMStream').onclick = createUIDrivenGUMStream;
}

window.addEventListener("DOMContentLoaded", initialize);
