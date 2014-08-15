var five = require('johnny-five');
var board = five.Board();

var button, led;

board.on('ready', function(){
  led = new five.Led(9);
  button = new five.Button(5);
  board.repl.inject({ button: button, led: led });

  button.on('press', function(){
    led.on();
    console.log( "Button pressed" );
  });

  button.on('release', function(){
    led.off();
    console.log( "Button released" );
  })
})
