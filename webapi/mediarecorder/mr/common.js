var mMediaStream;
var mMediaRecorder;
var mBlob;
function gUMAudio() {
  navigator.mozGetUserMedia({audio:true},
                       function(s) {
                         mMediaStream = s;
                       },
                       function(e) {dump(e)});
}

function gUMVideo() {
  navigator.mozGetUserMedia({audio:true, video:true},
                       function(s) {
                         mMediaStream = s;
                  			 document.getElementById("videoelemsrc").mozSrcObject = mMediaStream;
                         document.getElementById("videoelemsrc").play();
                       },
                       function(e) {dump(e)});
}

function SaveBlob() {
  if (mBlob == null) {
    alert("should record first!!");
    return;
  }
  var downloadLink = document.createElement("a");
  var blob = new Blob([mBlob], {type: "application/octet-stream"});
  downloadLink.href = window.URL.createObjectURL(blob);
  if (mBlob.type === 'audio/ogg') {
    downloadLink.download = "data.opus";
  } else if (mBlob.type === 'video/mp4') {
    downloadLink.download = "data.mp4";
  } else if (mBlob.type === 'video/webm') {
    downloadLink.download = "data.webm";
  } else {
    downloadLink.download = "data.bin";
  }
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
    
}

function errorcb(e) {
  alert(e);
}

function stopcb() {
  document.getElementById('status').value  = mMediaRecorder.state;
}

function Stop() {
  try {
    mMediaRecorder.stop();
  } catch (e) {
    alert(e)
  }
  document.getElementById('status').value  = mMediaRecorder.state;
}

function Resume() {
  try {
    mMediaRecorder.resume();
  } catch (e) {
    alert(e)
  }
  document.getElementById('status').value  = mMediaRecorder.state;
}

function Pause() {
  try {
    mMediaRecorder.pause();
  } catch (e) {
    alert(e)
  }
  document.getElementById('status').value  = mMediaRecorder.state;
}

function dataavailablecb(aData) {
  if (mBlob) {
    mBlob = new Blob([mBlob, aData.data], {type: aData.data.type});
  } else {
    mBlob = new Blob([aData.data], {type: aData.data.type});
  }
  document.getElementById('size').value  = mBlob.size;}

function PlaybackAudio() {
  _FReader = new FileReader();
  _FReader.readAsDataURL(mBlob);
  _FReader.onload = function (_FREvent) {
    document.getElementById('audioelem').src = _FREvent.target.result;
    document.getElementById('audioelem').play();
  };
}

function PlaybackVideo() {
  _FReader = new FileReader();
  _FReader.readAsDataURL(mBlob);
  _FReader.onload = function (_FREvent) {
    document.getElementById('videoelem').src = _FREvent.target.result;
    document.getElementById('videoelem').play();
  };
}

function Start(time) {
  mBlob = null;
  if (mMediaStream == null)
    alert("No input from getUserMedia!");
  if (mMediaRecorder == null)
    mMediaRecorder = new MediaRecorder(mMediaStream);
  else if (mMediaRecorder.state != "inactive") {
    alert("mMediaRecorder is not inactive, stop it first");
    return;
  }
  mBlob = null;
  mMediaRecorder.onstop = stopcb;
  mMediaRecorder.ondataavailable = dataavailablecb;
  mMediaRecorder.onerror = errorcb;
  mMediaRecorder.start(time);
  document.getElementById('status').value  = mMediaRecorder.state;
}
