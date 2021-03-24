const eventLoop = {
  queue: [],
  loop() {
    while (this.queue.length) {
      let callback = this.queue.shift();
      callback();
    }
    setTimeout(this.loop.bind(this), 50);
  },
  add(cb) {
    this.queue.push(cb);
  },
};

eventLoop.loop();

setTimeout(() => {
  eventLoop.add(function () {
    console.log(111);
  });
}, 500);
setTimeout(() => {
  eventLoop.add(function () {
    console.log(222);
  });
}, 1000);
