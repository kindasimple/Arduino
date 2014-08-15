int ledPins[] = {
  2,3,4,5,6,7,8,9};
int pinCount = 8;
int sensorPin = 0;    // select the input pin for the temperature gauge
int lightPin = 2;
int sensorValue = 0;
float celsius = 0;
float fahrenheit = 0;

void setup() {

  Serial.begin(9600); 
  while (!Serial) {
    ; // wait for serial port to connect. Needed for Leonardo only
  }
  for(int pinIndex=0 ; pinIndex < pinCount; pinIndex++) {
    pinMode(ledPins[pinIndex], OUTPUT);
  }
}

void loop() {
  float temp = readTemp();
  Serial.println(temp);
  int lights = getPins(temp);
  setPins(lights);
  delay(1000);
  while(readLight() < 3)
  {
    setPins(0);
    delay(5000);
  }
}

float readLight() {
  int lightLevel = analogRead(lightPin);
  Serial.println(lightLevel);
  lightLevel = autoTune(lightLevel);
  Serial.println(lightLevel);
  return lightLevel;
}

float base = 60;
float maxTemp = 95;

float readTemp(){
  float voltage = analogRead(sensorPin)* 0.004882814; 
  Serial.print("value ");
  Serial.println(voltage);
  celsius = (voltage - 0.5) * 100.0;
  fahrenheit = celsius * (9.0 / 5.0) + 32;
   Serial.print("temp ");
  Serial.println(fahrenheit);
  return fahrenheit;
}

int high = 0, low = 1023;

int autoTune(int lightLevel)
{
  if (lightLevel < low)
  {
    low = lightLevel;
  }
  
  if (lightLevel > high)
  {
    high = lightLevel;
  }
  
  lightLevel = map(lightLevel, low+30, high-30, 0, 10);
  lightLevel = constrain(lightLevel, 0, 10);
  return lightLevel;
  
}


int getPins(float temp)
{
  if(temp > maxTemp){
    maxTemp = temp;
  }
  float height = temp - base;
  if(height < 0){
    height = 0;
  }
  int lights = (height * pinCount) / (maxTemp - base);
  return lights;
}
void setPins(int pins) {
  for (int thisPin = 0; thisPin < pinCount; thisPin++) { 
    if(thisPin < pins) {
      digitalWrite(ledPins[thisPin], HIGH);   
    } else {     
      digitalWrite(ledPins[thisPin], LOW);    
    }
  }
}
