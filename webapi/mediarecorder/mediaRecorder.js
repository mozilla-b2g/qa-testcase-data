var mediaRecorderList = [];
var stopRandomizer = false;

function mediaRecorderAttributeDump(mediaRecorder) {
  console.log(mediaRecorder.stream);
  console.log('Recording state: ' + mediaRecorder.state);
  console.log('Mime type: ' + mediaRecorder.mimeType);
}

function setupMediaRecorder(stream) {
  var mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.ondataavailable = function(evt) {
    console.log('ondataavailable fired');
    console.log(evt);
    console.log(mediaRecorderAttributeDump(evt.target));
  };

  mediaRecorder.onerror = function(evt) {
    console.log('onerror fired');
    console.log(evt);
    console.log(mediaRecorderAttributeDump(evt.target));
  };

  mediaRecorder.onstop = function(evt) {
    console.log('onstop fired');
    console.log(evt);
    console.log(mediaRecorderAttributeDump(evt.target));
  };

  mediaRecorder.onwarning = function(evt) {
    console.log('onwarning fired');
    console.log(evt);
    console.log(mediaRecorderAttributeDump(evt.target));
  };

  mediaRecorderList.push(mediaRecorder);
}

function createUIDrivenGUMStream() {
  var constraints = {
    'video': document.getElementById('gUMCamera').checked,
    'audio': document.getElementById('gUMMicrophone').checked
  };

  createGUMStream(constraints);
}

function createRandomGUMStream() {
  var constraints = {
    'video': Math.floor(Math.random() * 2),
    'audio': Math.floor(Math.random() * 2)
  };

  console.log('video: ' + constraints['video']);
  console.log('audio: ' + constraints['audio']);

  createGUMStream(constraints);
}

function createGUMStream(constraints) {
  navigator.mozGetUserMedia(constraints, function(stream) {
    setupMediaRecorder(stream);
  }, function(err) {
    console.log(err);
  });
}

function runMediaRecorderOp() {
  mediaRecorderOperations = ['start', 'stop', 'pause', 'resume', 'requestData'];

  var mediaRecorderIndex = Math.floor(Math.random() * mediaRecorderList.length);
  var mediaRecorder = mediaRecorderList[mediaRecorderIndex];

  if(mediaRecorder) {
    var command = mediaRecorderOperations[Math.floor(Math.random() * mediaRecorderOperations.length)];

    if(command === 'start') {
      var useTimeSlice = Math.floor(Math.random() * 2);
      console.log('media recorder index: ' + mediaRecorderIndex);
      console.log('operation: ' + command);

      if(useTimeSlice) {
        var timeSlice = Math.floor(Math.random() * 100000000000000000);
        console.log('timeslice: ' + timeSlice);
        mediaRecorder.start(timeSlice);
      } else {
        mediaRecorder.start();
      }

    } else {
      console.log('media recorder index: ' + mediaRecorderIndex);
      console.log('operation: ' + command);
      mediaRecorder[command]();
    }
  }
}

function runRandomizer() {
  randomCommands = ['createRandomGUMStream', 'runMediaRecorderOp'];

  function runRandomCommand() {
    try {
      var command = randomCommands[Math.floor(Math.random() * randomCommands.length)];
      console.log(command);
      window[command]();
    } catch(err) {
      console.log(err);
    }

    if(!stopRandomizer) {
      runRandomizer();
    }
  }

  var timeout = Math.floor(Math.random() * 1000);
  setTimeout(runRandomCommand, timeout);
}

function initialize() {
  document.getElementById('setupGUMStream').onclick = createUIDrivenGUMStream;
}

window.addEventListener("DOMContentLoaded", initialize);
