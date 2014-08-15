var five = require('johnny-five');
var board = five.Board();

var board, leds=[], ledPins = [2,3,4,5,6,7,8,9];
board.on("ready", function() {

  var sensor = new five.Sensor("A0");
  
  // initialize LEDs using a for loop
  for (var i = 0; i < ledPins.length; i++){
      var myLed = new five.Led(ledPins[i]);
      leds.push(myLed);
  }
  leds[0].on();
  board.repl.inject({sensor: sensor});
  sensor.on("data", function() {
    // TMP36
    var celsius = ((this.value * 0.004882814) - 0.5) * 100;
    var fahrenheit = celsius * (9 / 5) + 32;

    console.log(celsius + "°C", fahrenheit + "°F");
    var base = 60;
    var max = 95;
    var height = fahrenheit - base;
    if(height < 0)
      height = 0;
    var lights = (height * ledPins.length) / (max - base);
    console.log('lights ' + lights);
    for(var i=0;i<lights;i++){
      leds[i].on();
    }
  });
});
