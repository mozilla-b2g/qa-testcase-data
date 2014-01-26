'use strict';
var biquadFilter = {
  init: function bf_init(url) {
    this.url = url;
    AudioSource.init();
    AudioSource.load(url);
    this.context = AudioSource.context;
    //setting biquad default value
    this.frequency = 500;
    this.type = "allpass";
    this.Q = 1;
    this.gain = 100;
    this.detune = 10;
  },
  run: function bf_run() {
    (this.playing ? this.stop() : this.play());
    this.playing = !this.playing;
  },
  play: function bf_play() {
    this.setupGraph();
    //reset with last values
    this.biquadFilter.frequency.value = this.frequency;
    this.biquadFilter.type = this.type;
    this.biquadFilter.Q.value = this.Q;
    this.biquadFilter.detune.value = this.detune;
    this.biquadFilter.gain.value = this.gain;
    this.source.start(0);
    requestAnimFrame(this.draw.bind(this));
  },
  stop: function bf_stop() {
    this.source.stop(0);
  },
  changeFrequency: function bf_changeFrequency(val) {
    this.biquadFilter.frequency.value = val;
    this.frequency = val;
    document.getElementById("frequency").nextSibling.innerHTML = val;
  },
  changeDetune: function bf_changeDetune(val) {
    this.biquadFilter.detune.value = val;
    this.detune = val;
    document.getElementById("detune").nextSibling.innerHTML = val + "%";
  },
  changeType: function bf_changeType(val) {
    this.biquadFilter.type = val;
    this.type = val;
  },
  changeGain: function bf_changeGain(val) {
    this.biquadFilter.gain.value = val;
    this.gain = val;
    document.getElementById("gain").nextSibling.innerHTML = val;
  },
  changeQ: function bf_changeQ(val) {
    var input = Math.pow(10, val);
    this.biquadFilter.Q.value = input;
    this.Q = input;
    document.getElementById("Q").nextSibling.innerHTML = input;
  },
  setupGraph: function bf_setupGraph() {
    this.source = this.context.createBufferSource();
    this.source.buffer = AudioSource.buffer[this.url];
    this.biquadFilter = this.context.createBiquadFilter();
    this.analyser = this.context.createAnalyser();

    //Store frequency value from analyser
    this.freqs = new Uint8Array(this.analyser.frequencyBinCount);
    this.times = new Uint8Array(this.analyser.frequencyBinCount);

    this.source.connect(this.biquadFilter);
    this.biquadFilter.connect(this.analyser);
    this.analyser.connect(this.context.destination);
  },
  //Draw function for analyser
  draw: function bf_draw() {
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

