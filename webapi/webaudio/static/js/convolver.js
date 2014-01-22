var Convolver = {
  init: function conv_init() {
    this.mainSong = "sound/sample.ogg";
    this.impulseResponse = "sound/irHall.ogg";
    AudioSource.init();
    AudioSource.load(this.mainSong);
    AudioSource.load(this.impulseResponse);
    this.context = AudioSource.context;
  },
  run: function conv_run() {
    (this.playing ? this.stop() : this.play());
    this.playing = !this.playing;
  },
  play: function conv_play() {
    this.setupGraph();
    this.source.start(0);
  },
  stop: function conv_stop() {
    this.source.stop(0);
  },
  setupGraph: function conv_setupGraph() {
    this.source = this.context.createBufferSource();
    this.source.buffer = AudioSource.buffer[this.mainSong];
    this.convolver = this.context.createConvolver();
    this.convolver.buffer = AudioSource.buffer[this.impulseResponse];
    this.analyser = this.context.createAnalyser();
    this.source.connect(this.convolver);
    this.convolver.connect(this.context.destination);
    //this.source.connect(this.context.destination);
  }
};
