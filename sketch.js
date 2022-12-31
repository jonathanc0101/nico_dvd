// Bouncing DVD Logo
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/131-bouncing-dvd-logo.html
// https://youtu.be/0j86zuqqTlQ

let x;
let y;

let xspeed;
let yspeed;

let dvds;
let dvdIndex = 0;
let dvd;
const MAXDVD = 18;

let smackSound;
let fishMoanSound;
let hentaiSound;

let lastPositions = [];
let numberOfPositions = 10;

let r, g, b;

let clackCounter = 0;

function preload() {
  soundFormats("wav", "mp3");

  dvds = [];
  for (let i = 0; i < MAXDVD; i++) {
    dvds.push(loadImage("dvd_logo" + i + ".png"));
  }

  smackSound = loadSound("smack.wav");
  fishMoanSound = loadSound("moaning-fish.mp3");
  hentaiSound = loadSound("hentai-orgasm-short.mp3");

  dvd = dvds[0];
}

function setup() {
  const speed = 20;
  createCanvas(windowWidth, windowHeight);
  x = random(width);
  y = random(height);
  xspeed = speed;
  yspeed = speed;
  pickColor();

  setInterval(registrarPos,100);
}

function pickColor() {
  r = random(100, 256);
  g = random(100, 256);
  b = random(100, 256);
}

function draw() {
  background(0);
  // rect(x, y, 80, 60);
  // Draw the DVD logo
  tint(r, g, b);
  
  for(let i = 0; i<lastPositions.length; i++){
    image(dvd, lastPositions[i][0], lastPositions[i][1]);
  }

  

  x = x + xspeed;
  y = y + yspeed;

  if (x + dvd.width >= width || x <= 0 || y + dvd.height >= height || y <= 0) {
    handleClack();
  }

  if (x + dvd.width >= width) {
    xspeed = -xspeed;
    x = width - dvd.width;
    pickColor();
  } else if (x <= 0) {
    xspeed = -xspeed;
    x = 0;
    pickColor();
  }

  if (y + dvd.height >= height) {
    yspeed = -yspeed;
    y = height - dvd.height;
    pickColor();
  } else if (y <= 0) {
    yspeed = -yspeed;
    y = 0;
    pickColor();
  }
}

function handleClack() {
  clackCounter++;
  newDvd();
  if (clackCounter % 15 == 0) {
    hentaiSound.play();
  }
  if (clackCounter % 10 == 0) {
    fishMoanSound.play();
  } else {
    smackSound.play();
  }
}

function registrarPos() {
  lastPositions.push([x, y]);
  if (lastPositions.length >= numberOfPositions ) {
    lastPositions.shift();
  }
}

function newDvd() {
  dvdIndex++;
  dvd = dvds[dvdIndex % dvds.length];
}
