'use strict';
var dynamicsCompressor = {
  init: function dc_init(url) {
    this.url = url;
    AudioSource.init();
    AudioSource.load(url);
    this.context = AudioSource.context;
    //setting biquad default value
    this.threshold = -24;
    this.knee = 30;
    this.ratio = 12;
    this.attack = 0.003;
    this.release = 0.250;
  },
  run: function dc_run() {
    (this.playing ? this.stop() : this.play());
    this.playing = !this.playing;
  },
  play: function dc_play() {
    this.setupGraph();
    //reset with last values
    this.dynamicsCompressor.threshold.value = this.threshold;
    this.dynamicsCompressor.knee.value = this.knee;
    this.dynamicsCompressor.ratio.value = this.ratio;
    this.dynamicsCompressor.attack.value = this.attack;
    this.dynamicsCompressor.release.value = this.release;
    this.source.start(0);
    requestAnimFrame(this.draw.bind(this));
  },
  stop: function dc_stop() {
    this.source.stop(0);
  },
  changeThreshold: function dc_changeThreshold(val) {
    this.dynamicsCompressor.threshold.value = val;
    this.threshold = val;
    document.getElementById("threshold").nextSibling.innerHTML = val + "db";
  },
  changeKnee: function dc_changeKnee(val) {
    this.dynamicsCompressor.knee.value = val;
    this.knee = val;
    document.getElementById("knee").nextSibling.innerHTML = val + "db";
  },
  changeRatio: function dc_changeRatio(val) {
    this.dynamicsCompressor.ratio.value = val;
    this.ratio = val;
    document.getElementById("ratio").nextSibling.innerHTML = val;
  },
  changeAttack: function dc_changeAttack(val) {
    this.dynamicsCompressor.attack.value = val;
    this.attack = val;
    document.getElementById("attack").nextSibling.innerHTML = val + "sec";
  },
  changeRelease: function dc_changeRelease(val) {
    this.dynamicsCompressor.release.value = val;
    this.release = val;
    document.getElementById("release").nextSibling.innerHTML = val + "sec";
  },
  setupGraph: function dc_setupGraph() {
    this.source = this.context.createBufferSource();
    this.source.buffer = AudioSource.buffer[this.url];
    this.dynamicsCompressor = this.context.createDynamicsCompressor();
    this.analyser = this.context.createAnalyser();

    //Store frequency value from analyser
    this.freqs = new Uint8Array(this.analyser.frequencyBinCount);
    this.times = new Uint8Array(this.analyser.frequencyBinCount);

    this.source.connect(this.dynamicsCompressor);
    this.dynamicsCompressor.connect(this.analyser);
    this.analyser.connect(this.context.destination);
  },
  draw: function dc_draw() {
    this.analyser.smoothingTimeConstant = SMOOTHING;
    this.analyser.fftSize = FFT_SIZE;

    this.analyser.getByteFrequencyData(this.freqs);
    this.analyser.getByteTimeDomainData(this.times);

    var width = Math.floor(1/this.freqs.length, 10);

    var canvas = document.querySelector('canvas');
    var drawContext = canvas.getContext('2d');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    //Draw freq chart
    for( var i = 0; i < this.analyser.frequencyBinCount; i++ ) {
      var value = this.freqs[i];
      var percent = value / 256;
      var height = HEIGHT * percent;
      var offset = HEIGHT - height - 1;
      var barWidth = WIDTH / this.analyser.frequencyBinCount;
      var hue = i / this.analyser.frequencyBinCount * 360;
      drawContext.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
      drawContext.fillRect( i * barWidth, offset, barWidth, height);
    }

    //Draw time chart
    for( i = 0; i < this.analyser.frequencyBinCount; i++ ){
      value = this.times[i];
      percent = value / 256;
      height = HEIGHT * percent;
      offset = HEIGHT - height - 1;
      barWidth = WIDTH / this.analyser.frequencyBinCount;
      drawContext.fillStyle = 'white';
      drawContext.fillRect( i * barWidth, offset, 1, 2);
    }

    if( this.playing ) {
      requestAnimFrame(this.draw.bind(this));
    }
  }
};
