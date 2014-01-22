function OscillatorSample() {
  this.isPlaying = false;
  this.canvas = document.querySelector('canvas');
  this.WIDTH = 640;
  this.HEIGHT = 240;
}

OscillatorSample.prototype.play = function() {
  // Create some sweet sweet nodes.
  this.oscillator = context.createOscillator();
  this.analyser = context.createAnalyser();

  // Setup the graph.
  this.oscillator.connect(this.analyser);
  this.analyser.connect(context.destination);

  this.oscillator.start(0);

  requestAnimFrame(this.visualize.bind(this));
};

OscillatorSample.prototype.stop = function() {
  this.oscillator.stop(0);
};

OscillatorSample.prototype.toggle = function() {
  (this.isPlaying ? this.stop() : this.play());
  this.isPlaying = !this.isPlaying;

};

OscillatorSample.prototype.changeFrequency = function(val) {
  this.oscillator.frequency.value = val;
};

OscillatorSample.prototype.changeDetune = function(val) {
  this.oscillator.detune.value = val;
};

OscillatorSample.prototype.changeType = function(type) {
  this.oscillator.type = type;
};

OscillatorSample.prototype.visualize = function() {
  this.canvas.width = this.WIDTH;
  this.canvas.height = this.HEIGHT;
  var drawContext = this.canvas.getContext('2d');

  var times = new Uint8Array(this.analyser.frequencyBinCount);
  this.analyser.getByteTimeDomainData(times);
  for (var i = 0; i < times.length; i++) {
    var value = times[i];
    var percent = value / 256;
    var height = this.HEIGHT * percent;
    var offset = this.HEIGHT - height - 1;
    var barWidth = this.WIDTH/times.length;
    drawContext.fillStyle = 'black';
    drawContext.fillRect(i * barWidth, offset, 1, 1);
  }
  requestAnimFrame(this.visualize.bind(this));
};

