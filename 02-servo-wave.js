var five = require('johnny-five')
var board = new five.Board();
var servo;

board.on('ready', function(){
  servo = new five.Servo(9);

  board.repl.inject({ servo: servo});
  servo.sweep();
  this.wait(5000, function(){
    servo.stop();
    servo.center();
  })
});
