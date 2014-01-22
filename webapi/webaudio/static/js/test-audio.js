context = new AudioContext();
var audio = new Audio();
audio.src = 'sound/sample.ogg';
audio.autoplay = true;

var sourceNode = context.createMediaElementNode(audio);
