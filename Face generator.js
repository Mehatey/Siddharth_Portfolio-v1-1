let bgColor;
let faceSize = 50;
let bigSquareSize = 150;
let currentSize = faceSize;
let x, y;
let speedX = 1;
let speedY = 1;
let isHovered = false;
let hoverColor1, hoverColor2;
let eyeFollowFactor = 0.1;
let textAlpha = 255;
let textFadingIn = true;
let sizeEasingFactor = 0.1;

let isExploding = false;
let particles = [];
let storedBgGradient1, storedBgGradient2;

function setup() {
  createCanvas(400, 400);
  cursor(HAND);
  bgColor = color(255);
  x = width / 2;
  y = height / 2;
  hoverColor1 = color(255, 0, 0);
  hoverColor2 = color(0, 0, 255);
}

function draw() {
  // If explosion is happening, use stored background colors
  if (isExploding) {
    setGradient(0, 0, width, height, storedBgGradient1, storedBgGradient2);
    updateParticles();
    return;
  }

  // Dynamically change background gradient based on mouse position
  let bgGradient1 = color(map(mouseX, 0, width, 0, 255), 100, 200);
  let bgGradient2 = color(100, map(mouseY, 0, height, 0, 255), 200);
  setGradient(0, 0, width, height, bgGradient1, bgGradient2);

  x += speedX;
  y += speedY;

  if (x > width - faceSize / 2 || x < faceSize / 2) speedX *= -1;
  if (y > height - faceSize / 2 || y < faceSize / 2) speedY *= -1;

  let distance = dist(mouseX, mouseY, x, y);

  if (distance < 100)
    currentSize = lerp(currentSize, bigSquareSize, sizeEasingFactor);
  else currentSize = lerp(currentSize, faceSize, sizeEasingFactor);

  let t = millis() / 1000;
  let dynamicColor1 = color(sin(t) * 128 + 128, cos(t) * 128 + 128, 200);
  let dynamicColor2 = color(cos(t) * 128 + 128, sin(t) * 128 + 128, 100);

  if (isHovered)
    drawGradientSquare(x, y, currentSize, dynamicColor1, dynamicColor2);
  else drawSquare(x, y, currentSize);

  let eye1PositionX = x - currentSize / 4;
  let eye2PositionX = x + currentSize / 4;
  let eyeSize = currentSize / 8;

  let eyeOffsetX = (mouseX - x) * eyeFollowFactor;
  let eyeOffsetY = (mouseY - y) * eyeFollowFactor;

  fill(0);
  ellipse(eye1PositionX + eyeOffsetX, y + eyeOffsetY, eyeSize);
  ellipse(eye2PositionX + eyeOffsetX, y + eyeOffsetY, eyeSize);

  let mouthWidth = currentSize / 6;
  let mouthHeight = currentSize / 20;
  strokeWeight(2);
  stroke(0);
  noFill();
  if (distance < 100)
    arc(x, y + currentSize / 4, mouthWidth, mouthHeight, 0, PI);
  else arc(x, y + currentSize / 4, mouthWidth, mouthHeight, PI, 0);

  if (distance < 100) {
    if (textFadingIn) textAlpha = min(255, textAlpha + 5);
    else textAlpha = max(0, textAlpha - 5);
    drawText("Hello!", width / 2 - 20, 50, textAlpha);
  } else {
    if (!textFadingIn) textAlpha = min(255, textAlpha + 5);
    else textAlpha = max(0, textAlpha - 5);
    drawText("Bye!", width / 2 - 20, 50, textAlpha);
  }
}

function drawSquare(x, y, size) {
  stroke(0);
  fill(200);
  rectMode(CENTER);
  rect(x, y, size, size);
}

function drawGradientSquare(x, y, size, color1, color2) {
  noFill();
  for (let i = 0; i < size; i++) {
    let inter = map(i, 0, size, 0, 1);
    let c = lerpColor(color1, color2, inter);
    stroke(c);
    rectMode(CENTER);
    rect(x, y, size - i, size - i);
  }
}

function drawText(txt, x, y, alpha) {
  push();
  fill(0, 0, 0, alpha);
  noStroke();
  textSize(20);
  text(txt, x, y);
  pop();
}

function setGradient(x, y, w, h, c1, c2) {
  for (let i = y; i <= y + h; i++) {
    let inter = map(i, y, y + h, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(x, i, x + w, i);
  }
}

function isMouseOverSquare() {
  return (
    mouseX > x - currentSize / 2 &&
    mouseX < x + currentSize / 2 &&
    mouseY > y - currentSize / 2 &&
    mouseY < y + currentSize / 2
  );
}

function mouseMoved() {
  isHovered = isMouseOverSquare();
  redraw();
}

function mousePressed() {
  if (isMouseOverSquare()) {
    // Store the background gradient colors before triggering the explosion
    storedBgGradient1 = color(map(mouseX, 0, width, 0, 255), 100, 200);
    storedBgGradient2 = color(100, map(mouseY, 0, height, 0, 255), 200);
    triggerExplosion();
  }
  bgColor = color(random(255), random(255), random(255));
}

function triggerExplosion() {
  isExploding = true;
  let numParticles = 80;

  for (let i = 0; i < numParticles; i++) {
    let angle = random(TWO_PI);
    let speed = random(2,10);
    particles.push({
      x: x,
      y: y,
      size: random(10, 20),
      speedX: cos(angle) * speed,
      speedY: sin(angle) * speed,
      color: color(random(255), random(255), random(255)),
      alpha: 255,
    });
  }
}

function updateParticles() {
  // Use the stored background colors during explosion
  setGradient(0, 0, width, height, storedBgGradient1, storedBgGradient2);

  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.x += p.speedX;
    p.y += p.speedY;
    p.alpha -= 5;
    p.alpha = max(p.alpha, 0);
    fill(p.color.levels[0], p.color.levels[1], p.color.levels[2], p.alpha);
    noStroke();
    rect(p.x, p.y, p.size, p.size);
    if (p.alpha <= 0) particles.splice(i, 1);
  }

  if (particles.length === 0) isExploding = false;
}
