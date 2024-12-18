function setup() {
  let canvas = createCanvas(600, 600, WEBGL);
  canvas.parent('sketch-holder'); // Put the canvas in the div
  noFill();
  stroke(0);
  frameRate(30);
}

function draw() {
  background(240);
  
  // Rotation
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);

  let maxCubes = 10; 
  let baseSize = 50;

  for (let i = 0; i < maxCubes; i++) {
    push();
    
    let scaleFactor = map(sin(frameCount * 0.02 + i), -1, 1, 0.5, 3);
    
    // Scaling
    scale(scaleFactor);
    
    // Draw cube
    box(baseSize);
    
    pop();
  }
}
