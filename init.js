load('api_timer.js');
load('api_neopixel.js');

let pin = 5, numPixels = 20, colorOrder = NeoPixel.GRB, i = 0;
let strip = NeoPixel.create(pin, numPixels, colorOrder);

if (false)
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


function setPixel(pixel,  r,  g,  b) {
   strip.setPixel(pixel, r, g, b);
}

function setAll(red, green,blue) {
  for(i = 0; i < numPixels; i++ ) {
    setPixel(i, red, green, blue); 
  }
  showStrip();
}

function delay(t) {
  Sys.usleep(t*1000);
}


function RGBLoop(){
  let j=0;
  for(j = 0; j < 1; j++ ) { 
    // Fade IN
    let k=0;
    for(k = 0; k < 256; k++) { 
      if (j===0)
        setAll(k,0,0);
      if (j===1)
        setAll(0,k,0);
      if (j===2)
        setAll(0,0,k);
  
      showStrip();
      delay(3);
    }
    for(k = 255; k >= 0; k--) { 
       if (j===0)
        setAll(k,0,0);
      if (j===1)
        setAll(0,k,0);
      if (j===2)
        setAll(0,0,k);
      showStrip();
      delay(3);
    }
  }
  
}


function FadeInOut(red, green,  blue){
  let r, g, b,k;
      
  for( k = 0; k < 256; k=k+1) { 
    r = (k/256.0)*red;
    g = (k/256.0)*green;
    b = (k/256.0)*blue;
    setAll(r,g,b);
    showStrip();
  }
     
  for( k = 255; k >= 0; k=k-2) {
    r = (k/256.0)*red;
    g = (k/256.0)*green;
    b = (k/256.0)*blue;
    setAll(r,g,b);
    showStrip();
  }
}


function Strobe(red, green, blue, StrobeCount, FlashDelay, EndPause){
  let j;
  for(j = 0; j < StrobeCount; j++) {
    setAll(red,green,blue);
    showStrip();
    delay(FlashDelay);
    setAll(0,0,0);
    showStrip();
    delay(FlashDelay);
  }
 
 delay(EndPause);
}



function CylonBounce(red, green, blue, EyeSize, SpeedDelay,  ReturnDelay){
  let i;
  for(i = 0; i < numPixels-EyeSize-2; i++) {
    setAll(0,0,0);
    setPixel(i, red/10, green/10, blue/10);
    let j;
    for(j = 1; j <= EyeSize; j++) {
      setPixel(i+j, red, green, blue); 
    }
    setPixel(i+EyeSize+1, red/10, green/10, blue/10);
    showStrip();
    delay(SpeedDelay);
  }

  delay(ReturnDelay);

  for(i = numPixels-EyeSize-2; i > 0; i--) {
    setAll(0,0,0);
    setPixel(i, red/10, green/10, blue/10);
    let j;
    for(j = 1; j <= EyeSize; j++) {
      setPixel(i+j, red, green, blue); 
    }
    setPixel(i+EyeSize+1, red/10, green/10, blue/10);
    showStrip();
    delay(SpeedDelay);
  }
  
  delay(ReturnDelay);
}


function Twinkle(red,  green, blue, Count, SpeedDelay,  OnlyOne) {
  setAll(0,0,0);
  let i;
  for ( i=0; i<Count; i++) {
    setPixel(Math.random(numPixels),red,green,blue);
     showStrip();
     delay(SpeedDelay);
     if(OnlyOne) { 
       setAll(0,0,0); 
     }
   }
  
  delay(SpeedDelay);
}

function SnowSparkle(red, green, blue,  SparkleDelay, SpeedDelay) {
  setAll(red,green,blue);
  
  let Pixel = Math.random(numPixels);
  setPixel(Pixel,0xff,0xff,0xff);
  showStrip();
  delay(SparkleDelay);
  setPixel(Pixel,red,green,blue);
  showStrip();
  delay(SpeedDelay);
}

function RunningLights(red,  green, blue, WaveDelay) {
  let Position=0;
  
  for(i=0; i<numPixels*2; i++)
  {
      Position++; // = 0; //Position + Rate;
      for(i=0; i<numPixels; i++) {
        // sine wave, 3 offset waves make a rainbow!
        //float level = sin(i+Position) * 127 + 128;
        //setPixel(i,level,0,0);
        //float level = sin(i+Position) * 127 + 128;
        setPixel(i,((Math.sin(i+Position) * 127 + 128)/255)*red,
                   ((Math.sin(i+Position) * 127 + 128)/255)*green,
                   ((Math.sin(i+Position) * 127 + 128)/255)*blue);
      }
      
      showStrip();
      delay(WaveDelay);
  }
}

function colorWipe(red, green, blue, SpeedDelay) {
  let i;
  for( i=0; i<numPixels; i++) {
      setPixel(i, red, green, blue);
      showStrip();
      delay(SpeedDelay);
  }
}


function theaterChase(red, green, blue, SpeedDelay) {
  let j,q,i;
  for (j=0; j<10; j++) {  //do 10 cycles of chasing
    for (q=0; q < 3; q++) {
      for (i=0; i < numPixels; i=i+3) {
        setPixel(i+q, red, green, blue);    //turn every third pixel on
      }
      showStrip();
     
      delay(SpeedDelay);
     
      for (i=0; i < numPixels; i=i+3) {
        setPixel(i+q, 0,0,0);        //turn every third pixel off
      }
    }
  }
}




strip.clear();
//RunningLights(0xff,0xff,0x00, 50);

//SnowSparkle(0x10, 0x10, 0x10, 20, Math.random(1000)+100);
//Twinkle(0xff, 0, 0, 10, 100, false);

//Strobe(0xff, 0xff, 0xff, 10, 50, 1000);

//colorWipe(0x00,0xff,0x00, 50);
//colorWipe(0x00,0x00,0x00, 50);
