function createUIDrivenGUMStream() {
  var constraints = {
    'video': document.getElementById('gUMCamera').checked,
    'audio': document.getElementById('gUMMicrophone').checked
  };

  createGUMStream(constraints);
}

function createUIDrivenOpusStream() {
  var root = document.createElement('div');

  var header = document.createElement('h4');
  header.textContent = 'Controls for index ' + mediaRecorderList.length;

  var inputRoot = document.createElement('div');
  var inputSpan = document.createElement('span');
  inputSpan.textContent = 'input';

  var opusAudioInput = document.createElement('audio');
  opusAudioInput.setAttribute('controls', 'controls');

  inputRoot.appendChild(inputSpan);
  inputRoot.appendChild(opusAudioInput);

  var outputRoot = document.createElement('div');
  var outputSpan = document.createElement('span');
  outputSpan.textContent = 'output';

  var opusAudioOutput = document.createElement('audio');
  opusAudioOutput.setAttribute('controls', 'controls');

  outputRoot.appendChild(outputSpan);
  outputRoot.appendChild(opusAudioOutput);

  opusAudioInput.src = document.getElementById('testOpusFile').value;
  opusAudioOutput.mozSrcObject = opusAudioInput.mozCaptureStreamUntilEnded();

  root.appendChild(header);
  root.appendChild(inputRoot);
  root.appendChild(outputRoot);

  document.getElementById('opusMediaControls').appendChild(root);
  setupMediaRecorder(opusAudioOutput.mozSrcObject);
}

function createMediaRecorderControls(index) {
  var root = document.createElement('div');
  var controlsHeader = document.createElement('h4');
  controlsHeader.textContent = 'Controls for index ' + index;

  root.appendChild(controlsHeader);

  var timesliceDiv = document.createElement('div');
  var timesliceSpan = document.createElement('span');
  timesliceSpan.textContent = 'Timeslice';

  var timesliceValue = document.createElement('input');
  timesliceValue.setAttribute('type', 'text');

  var startRecording = document.createElement('input');
  startRecording.setAttribute('type', 'submit');
  startRecording.setAttribute('value', 'Start Recording');

  startRecording.onclick = function() {
    var timeslice;

    if(timesliceValue.value) {
      timeslice = parseInt(timesliceValue.value);
    }

    mediaRecorderList[index].start(timeslice);
    mediaRecorderAttributeDump(mediaRecorderList[index]);
  };

  timesliceDiv.appendChild(timesliceSpan);
  timesliceDiv.appendChild(timesliceValue);
  timesliceDiv.appendChild(startRecording);

  root.appendChild(timesliceDiv);

  var playControlsDiv = document.createElement('div');
  var stopRecording = document.createElement('input');
  stopRecording.setAttribute('type', 'submit');
  stopRecording.setAttribute('value', 'Stop Recording');

  stopRecording.onclick = function() {
    mediaRecorderList[index].stop();
    mediaRecorderAttributeDump(mediaRecorderList[index]);
  };

  var pauseRecording = document.createElement('input');
  pauseRecording.setAttribute('type', 'submit');
  pauseRecording.setAttribute('value', 'Pause Recording');

  pauseRecording.onclick = function() {
    mediaRecorderList[index].pause();
    mediaRecorderAttributeDump(mediaRecorderList[index]);
  };

  var resumeRecording = document.createElement('input');
  resumeRecording.setAttribute('type', 'submit');
  resumeRecording.setAttribute('value', 'Resume Recording');

  resumeRecording.onclick = function() {
    mediaRecorderList[index].resume();
    mediaRecorderAttributeDump(mediaRecorderList[index]);
  };

  var requestData = document.createElement('input');
  requestData.setAttribute('type', 'submit');
  requestData.setAttribute('value', 'Request Data');

  requestData.onclick = function() {
    mediaRecorderList[index].requestData();
    mediaRecorderAttributeDump(mediaRecorderList[index]);
  };

  playControlsDiv.appendChild(stopRecording);
  playControlsDiv.appendChild(pauseRecording);
  playControlsDiv.appendChild(resumeRecording);
  playControlsDiv.appendChild(requestData);

  root.appendChild(playControlsDiv);

  var streamControlsDiv = document.createElement('div');

  var stopMediaStream = document.createElement('input');
  stopMediaStream.setAttribute('type', 'submit');
  stopMediaStream.setAttribute('value', 'Stop Media Stream');
  stopMediaStream.onclick = function() {
    var stream = mediaRecorderList[index].stream;

    if(stream.stop) {
      stream.stop();
    } else {
      console.log('stop function not available for index ' + index);
    }

    mediaRecorderAttributeDump(mediaRecorderList[index]);
  };

  var muteMediaStream = document.createElement('input');
  muteMediaStream.setAttribute('type', 'submit');
  muteMediaStream.setAttribute('value', 'Mute Media Stream');
  muteMediaStream.onclick = function() {
    mediaRecorderList[index].stream.getAudioTracks()[0].enabled = false;
    mediaRecorderAttributeDump(mediaRecorderList[index]);
  };

  var unmuteMediaStream = document.createElement('input');
  unmuteMediaStream.setAttribute('type', 'submit');
  unmuteMediaStream.setAttribute('value', 'Unmute Media Stream');
  unmuteMediaStream.onclick = function() {
    mediaRecorderList[index].stream.getAudioTracks()[0].enabled = true;
    mediaRecorderAttributeDump(mediaRecorderList[index]);
  };

  streamControlsDiv.appendChild(stopMediaStream);
  streamControlsDiv.appendChild(muteMediaStream);
  streamControlsDiv.appendChild(unmuteMediaStream);

  root.appendChild(streamControlsDiv);

  document.getElementById('mediaRecorderControls').appendChild(root);
}

function initialize() {
  document.getElementById('setupGUMStream').onclick = createUIDrivenGUMStream;
  document.getElementById('setupOpusStream').onclick = createUIDrivenOpusStream;

  blobURLUI = document.getElementById('blobDownload');
}

window.addEventListener("DOMContentLoaded", initialize);
