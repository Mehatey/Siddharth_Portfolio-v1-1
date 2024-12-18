let startColor;
let endColor;
let changeDuration; // Duration for color transition in milliseconds
let startTime; // Time when the transition started

function setup() {
  createCanvas(600, 600);
  startColor = color(0, 102, 153); // Initial color
  endColor = color(255, 102, 153); // Final color
  changeDuration = 5000; // Change over 5 seconds
  startTime = millis(); // Record the start time
}

function draw() {
  let elapsedTime = millis() - startTime; // Time elapsed since the start
  let t = map(elapsedTime, 0, changeDuration, 0, 1); // Map time to 0-1

  // Gradually interpolate colors over time
  let currentColor = lerpColor(startColor, endColor, t);

  // Set the background color based on current time
  background(currentColor);

  // Reset the transition after the duration is complete
  if (elapsedTime >= changeDuration) {
    startColor = endColor; // Swap colors
    endColor = color(random(255), random(255), random(255)); // Pick a new random end color
    startTime = millis(); // Restart time
  }

  // Display  information about the current transition 
  fill(255);
  textSize(24);
  textAlign(CENTER, CENTER);
  text("Time: " + nf(t * 100, 1, 2) + "%", width / 2, height / 2);
}
