var mediaRecorderList = [];

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

function createGUMStream(constraints) {
  navigator.mozGetUserMedia(constraints, function(stream) {
    setupMediaRecorder(stream);
  }, function(err) {
    console.log(err);
  });
}
