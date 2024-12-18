


let beanieColor;
let darkerColor;
let foldHeight = 30; 
let embroideredText = "donna";
let video;

function setup() {
  createCanvas(400, 400);

  // Access webcam
  video = createCapture(VIDEO);
  video.size(400, 400); // Set the video size to match the canvas
  video.hide(); // Hide the default video element to only display it on the canvas

  // Beanie color
  beanieColor = color(207, 255, 58);

  // Darker shade for fold
  darkerColor = lerpColor(beanieColor, color(0), 0.2);
}

function draw() {
  // Display the video feed
  image(video, 0, 0, width, height);

  // Draw beanie body with flat bottom, resized for a face
  fill(beanieColor);
  noStroke();

  beginShape();
  vertex(width / 2 - 100, height / 2 - 30); 
  vertex(width / 2 + 100, height / 2 - 30);
  quadraticVertex(
    width / 2 + 90,
    height / 2 - 120,
    width / 2,
    height / 2 - 140
  );
  quadraticVertex(
    width / 2 - 100,
    height / 2 - 120,
    width / 2 - 100,
    height / 2 - 30
  );
  endShape(CLOSE);

  // Add some texture
  stroke(240);
  for (let i = height / 2 - 130; i < height / 2 - 30; i += 10) {
    line(width / 2 - 80, i, width / 2 + 90, i); 
  }

  // Draw the folded bottom part of the beanie
  fill(darkerColor);
  rect(width / 2 - 100, height / 2 - foldHeight - 30, 200, foldHeight, 20); // Reduced the fold width

  // Draw the embroidered text (centered on the fold)
  fill(0);
  textSize(14); 
  textAlign(CENTER, CENTER); // Ensure text is centered both horizontally and vertically
  push();
  translate(width / 2, height / 2 - foldHeight / 2 - 30); // Adjust position for the fold on the head
  rotate(HALF_PI); // Rotate text to be vertical
  text(embroideredText, 0, 0);
  pop();
}


