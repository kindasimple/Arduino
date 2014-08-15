var five = require('johnny-five');
var dgram = require('dgram');
var board = five.Board();
var socket, piezo;

board.on('ready', function(){
  var piezoPin = 8;
  var m
  socket = dgram.createSocket('udp4');

  piezo = new five.Piezo(piezoPin);
  board.repl.inject({piezo:piezo});

  socket.on("message", function (msg, rinfo) {
    console.log("server got: " + msg + " from " + rinfo.address + ":" + rinfo.port);
    piezo.play({ song: [
      ["C4", 1/4],
      ["D4", 1/4],
      ["F4", 1/4],
      ["D4", 1/4],
      ["A4", 1/4],
      [null, 1/4],
      ["A4", 1],
      ["G4", 1],
      [null, 1/2],
      ["C4", 1/4],
      ["D4", 1/4],
      ["F4", 1/4],
      ["D4", 1/4],
      ["G4", 1/4],
      [null, 1/4],
      ["G4", 1],
      ["F4", 1],
      [null, 1/2]
      ], tempo: 100});
  });

  socket.on('listening', function(){
    var address = socket.address();
    console.log("server listening " + address.address + ":" + address.port);
  });

  socket.bind(1337, function(){
    //socket.addMembership('localhost')
    console.log('binding to port 1337');
  });


});
