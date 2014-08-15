var five = require('johnny-five');
var board = five.Board();
var servo, pot;

board.on('ready', function(){
  servo = new five.Servo(9);

  pot = new five.Sensor({pin:"A0", freq: 250});

  board.repl.inject({servo: servo, pot: pot});

  pot.on("read", function() {
    console.log(this.value, this.raw);
    function s
    servo..
  });
})
