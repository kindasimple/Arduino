var five = require('johnny-five');
var board = new five.Board();
var motor;

board.on('ready', function(){
  motor = new five.Motor({pin:9});
  board.repl.inject({ motor: motor});

  motor.on('start', function(err, timestamp){
    board.wait(2000, function(){
      motor.stop();
    })
  });

  motor.on('stop', function(err, timestamp){
    board.wait(1000, function(){
      motor.start(200);
    })
  })

  motor.start(200);

})
