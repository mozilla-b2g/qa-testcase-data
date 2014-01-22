'use strict';
var AudioSource = {
  buffer: {},  // store all buffers
  init: function as_init() {
    if (this.context) {
      return;
    }
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    this.context = new AudioContext();
    this.playing = false;
  },
  load: function as_load(url) {
    this.init();
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";
    var loader = this;
    request.onload = function req_onload() {
      loader.context.decodeAudioData(
        request.response,
        function (output) {
          if (!output) {
            console.log("decode url fail, buffer is empty");
            return;
          }
          loader.buffer[url] = output;
        },
        function (error) {
          if (error) {
            console.log("decode error: ", error);
          } else {
            console.log("decode error: unknown error");
          }
        }
      );
    };
    request.onerror = function req_onerror(msg, url, l) {
      var errMsg = "There was an error on this page.\n\n";
      errMsg += "Error: " + msg + "\n";
      errMsg += "URL: " + url + "\n";
      errMsg += "Line: " + l + "\n\n";
      console.log(errMsg);
      return true;
    };
    request.send();
  }
};
