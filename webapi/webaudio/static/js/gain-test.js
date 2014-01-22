'use strict';

var gainTest = {
  init: function gt_init(url) {
    this.url = url;
    AudioSource.init();
    AudioSource.load(url);
    this.context = AudioSource.context;
  },
  run: function gt_run() {
    (this.playing ? this.stop() : this.play());
    this.playing = !this.playing;
  },
  play: function gt_play() {
    this.setupGraph();
    this.source.start(0);
  },
  stop: function gt_stop() {
    this.source.stop(0);
  },
  control: function gt_control(val) {
    this.gainNode.gain.value = val;
  },
  setupGraph: function gt_setupGraph() {
    this.source = this.context.createBufferSource();
    this.source.buffer = AudioSource.buffer[this.url];
    this.gainNode = this.context.createGain();
    this.analyser = this.context.createAnalyser();
    this.source.connect(this.gainNode);
    this.gainNode.connect(this.context.destination);
  }
};
