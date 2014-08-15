var five = require('johnny-five')
var board = new five.Board()
var myLed;
board.on('ready', function () {

  myLed = new five.Led(12);
  myLed.strobe(1000);
  this.repl.inject({led:myLed});

})
