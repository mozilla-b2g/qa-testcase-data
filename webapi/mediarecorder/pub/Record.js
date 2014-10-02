var mMediaStream;
var mMediaStream2;
var mMediaRecorder;
var mMediaRecorder2;
var mBlob;
var mBlob2;
var audioReplay = document.createElement('audio');
var audioout = document.createElement('audio');
var videoReplay;
function gUM() {
  navigator.mozGetUserMedia({audio:true},
                       function(s) {
                         mMediaStream = s;
                         document.getElementById('mediastream').value  = mMediaStream;
                       },
                       function(e) {dump(e)});
}

function gFakeGUM() {
  navigator.mozGetUserMedia({audio:true, fake:true},
                       function(s) {
                         mMediaStream = s;
                         document.getElementById('mediastream').value  = mMediaStream;
                       },
                       function(e) {dump(e)});
}

function gUM2() {
  navigator.mozGetUserMedia({audio:true},
                       function(s) {
                         mMediaStream2 = s;
                         document.getElementById('mediastream').value  = mMediaStream2;
                       },
                       function(e) {dump(e)});
}


function gAVUM() {
  navigator.mozGetUserMedia({audio:true, video:true},
                       function(s) {
                         mMediaStream = s;
                         document.getElementById('mediastream').value  = mMediaStream;
			 document.getElementById("videoelemsrc").mozSrcObject = mMediaStream;
                         document.getElementById("videoelemsrc").play();
                       },
                       function(e) {dump(e)});
}

function gFakeAVUM() {
  navigator.mozGetUserMedia({audio:true, video:true, fake:true},
                       function(s) {
                         mMediaStream = s;
                         document.getElementById('mediastream').value  = mMediaStream;
			 document.getElementById("videoelemsrc").mozSrcObject = mMediaStream;
                         document.getElementById("videoelemsrc").play();
                       },
                       function(e) {dump(e)});
}

function dataavailablecb(aData) {
  mBlob = new Blob([mBlob, aData.data], {type: 'audio/ogg'});
  document.getElementById('size').value  = mBlob.size;
}

function dataavailablecb2(aData) {
  mBlob2 = new Blob([mBlob2, aData.data], {type: 'audio/ogg'});
  document.getElementById('size2').value  = mBlob2.size;
}

function errorcb(e) {
  alert(e);
}

function stopcb() {
  document.getElementById('status').value  = mMediaRecorder.state;
}

function getAudioContext() {
  var context = new AudioContext();
  var buffer = context.createBuffer(1, 409600, context.sampleRate);
  for (var i = 0; i < 409600; ++i) {
    buffer.getChannelData(0)[i] = Math.sin(1000 * 2 * Math.PI * i / context.sampleRate);
  }

  var source = context.createBufferSource();
  source.buffer = buffer;

  var dest = context.createMediaStreamDestination();
  source.connect(dest);
  var elem = document.getElementById('audioelem');
  elem.mozSrcObject = dest.stream;
  mMediaStream = dest.stream;
  source.start(0);
  elem.play();

}

function getAudioTag() {
  var a = document.getElementById('audioelem');
  a.src = "dtmfmono48k.ogg";
  audioout.mozSrcObject = a.mozCaptureStreamUntilEnded();
  mMediaStream = a.mozCaptureStreamUntilEnded();
  a.play();
  document.body.appendChild(audioout);
  audioout.play();
}

function getAudioTag2ch() {
  var a = document.getElementById('audioelem');
  a.src = "ehren.opus";
  audioout.mozSrcObject = a.mozCaptureStreamUntilEnded();
  mMediaStream = a.mozCaptureStreamUntilEnded();
  a.play();
  document.body.appendChild(audioout);
  audioout.play();
}

function getAudioTagNo() {
  var a = document.getElementById('audioelem');
  a.src = "big.wav";
  audioout.mozSrcObject = a.mozCaptureStreamUntilEnded();
  mMediaStream = a.mozCaptureStreamUntilEnded();
  a.play();
  document.body.appendChild(audioout);
  audioout.play();
}

function Start(time) {
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

function StartI2(time) {
  if (mMediaRecorder2 == null)
    mMediaRecorder2 = new MediaRecorder(mMediaStream);
  else if (mMediaRecorder2.state != "inactive") {
    alert("mMediaRecorder is not inactive, stop it first");
    return;
  }
  mBlob2 = null;
  mMediaRecorder2.onstop = stopcb;
  mMediaRecorder2.ondataavailable = dataavailablecb2;
  mMediaRecorder2.onerror = errorcb;
  mMediaRecorder2.start(time);
//  document.getElementById('status').value  = mMediaRecorder.state;
}

function Start0WithEvent() {
  if (mMediaRecorder == null)
    mMediaRecorder = new MediaRecorder(mMediaStream);
  else if (mMediaRecorder.state != "inactive") {
    alert("mMediaRecorder is not inactive, stop it first");
    return;
  }
  mBlob = null;
  mMediaRecorder.onstop = stopcb;
  mMediaRecorder.ondataavailable = function(e) {
                                                mMediaRecorder.requestData();
                                                dataavailablecb(e);
                                                console.log(e);}
  mMediaRecorder.onerror = errorcb;
  mMediaRecorder.start(0);
  mMediaRecorder.requestData();
  document.getElementById('status').value  = mMediaRecorder.state;
}

function Stop() {
  mMediaRecorder.stop();
}

function Resume() {
  mMediaRecorder.resume();
  document.getElementById('status').value  = mMediaRecorder.state;
}

function Pause() {
  mMediaRecorder.pause();
  document.getElementById('status').value  = mMediaRecorder.state;
}

function Playback() {
  _FReader = new FileReader();
  _FReader.readAsDataURL(mBlob);
  _FReader.onload = function (_FREvent) {
    audioReplay.src = _FREvent.target.result;
    audioReplay.play();
  };
}

function PlaybackIDX() {
        var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;
        var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || { READ_WRITE: 'readwrite' } ;
        var request = indexedDB.open("creatures", 2);
        request.onsuccess = function(event) {
          indexedDB.db = event.target.result;
        var transaction = indexedDB.db.transaction(["ogg"], "readwrite");

        transaction.objectStore("ogg").get("audio").onsuccess = function (event) {
                var audioblob = event.target.result;
                console.log("Got blob!" + audioblob.size);
                _FReader = new FileReader();
                _FReader.readAsDataURL(audioblob);
                _FReader.onload = function (_FREvent) {
                  audioReplay.src = _FREvent.target.result;
                  audioReplay.play();
                };
        };
        indexedDB.db.close();
        }
}

function Save() {
        if (!mBlob) {
          alert("no audio blob");
        }
        var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;
        var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || { READ_WRITE: 'readwrite' } ;

        var request = indexedDB.open("creatures", 2);
        request.onupgradeneeded = function () {
           request.result.createObjectStore("ogg");
        };
        request.onerror = function(event) {
          alert(event);
        }
        request.onsuccess = function(event) {
          indexedDB.db = event.target.result;
        var transaction = indexedDB.db.transaction(["ogg"], "readwrite");
        transaction.objectStore("ogg").put(mBlob, "audio");
        indexedDB.db.close();
        }
}

function binStringToHex3(s) {
        var s2 = '', c;
        for (var i = 0, l = s.length; i < l; ++i) {
          c = s.charCodeAt(i);
          s2 += (c >> 4).toString(16);
          s2 += (c & 0xF).toString(16);
        }
        return s2;
}

function PlaybackVideo() {
  _FReader = new FileReader();
//bug...
  _FReader.readAsDataURL(mBlob.slice(4,mBlob.size-4));
  _FReader.onload = function (_FREvent) {
    videoReplay.src = _FREvent.target.result;
    videoReplay.play();
  };
}

function PlayVideo()
{
  document.getElementById("videoelemsrc").src = 'onepiece.webm';
  document.getElementById("videoelemsrc").play();
  mMediaStream = document.getElementById("videoelemsrc").mozCaptureStreamUntilEnded();
  mMediaRecorder = null;
}

window.onload = function() {
  document.getElementById("getUserMedia").onclick = function() { gUM();};
  document.getElementById("getAudioTag2ch").onclick = function() { getAudioTag2ch();};
  document.getElementById("Start").onclick = function() { Start(1000);};
  document.getElementById("Stop").onclick = function() { Stop(); };
  document.getElementById("Resume").onclick = function() { Resume(); };
  document.getElementById("Pause").onclick = function() { Pause(); };
  document.getElementById("Save").onclick = function() { Save(); };
  document.getElementById("Playback").onclick = function() { Playback(); };
  document.getElementById("PlaybackIDX").onclick = function() { PlaybackIDX(); };
  document.getElementById("getAVUserMedia").onclick = function() { gAVUM();};
  document.getElementById("PlaybackVideo").onclick = function() { PlaybackVideo(); };
  document.getElementById("PlayVideo").onclick = function() { PlayVideo(); };
  videoReplay = document.getElementById("videoelem");};
