load('api_timer.js');
load('api_neopixel.js');

let pin = 5, numPixels = 12, colorOrder = NeoPixel.GRB, i = 0;
let strip = NeoPixel.create(pin, numPixels, colorOrder);

Timer.set(150, Timer.REPEAT, function() {
  let pixel = i++ % numPixels;
  let r = i % 255, g = i * 2 % 255, b = i * i % 255;
  strip.clear();
  setPixel(pixel, r, g, b);
  showStrip();
}, null);

function showStrip() {
   strip.show();
}


function setPixel(Pixel,  red,  green,  blue) {
   strip.setPixel(pixel, r, g, b);
}

function setAll(red, green,blue) {
  for(i = 0; i < numPixels; i++ ) {
    setPixel(i, red, green, blue); 
  }
  showStrip();
}
