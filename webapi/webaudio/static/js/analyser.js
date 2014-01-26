'use strict';
//test for request animation frame code
window.requestAnimFrame = ( function(){
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function(callback){
      window.setTimeout(callback, 1000 / 60);
      };
  })();
// copy the magic number from web audio api sample
var WIDTH = 320;
var HEIGHT = 180;
var SMOOTHING = 0.8;
var FFT_SIZE = 512;
