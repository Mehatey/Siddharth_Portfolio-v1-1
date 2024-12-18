function setup() {
    createCanvas(600, 800);
    noLoop();
  }
  
  function draw() {
    drawScenicBackground();  // Background
    drawAppleHead(300, 180, 100); // Head
    drawPandaBody(300, 350, 200); // Body
    drawHumanLegs(300, 550, 100); // Legs
  }
  
  function drawScenicBackground() {
    // Sky
    for (let i = 0; i < height; i++) {
      let inter = map(i, 0, height, 0, 1);
      let c = lerpColor(color(135, 206, 235), color(255, 255, 255), inter);
      stroke(c);
      line(0, i, width, i);
    }
    
    // Mountains
    fill(100, 100, 100);
    triangle(50, 600, 200, 300, 350, 600);
    triangle(250, 600, 400, 350, 550, 600);
    
    // Sun
    fill(255, 204, 0);
    ellipse(500, 100, 150, 150);
    
    drawTree(100, 650, 50, 150);  // Left tree
    drawTree(500, 650, 50, 150);  // Right tree
  }
  
  function drawTree(x, y, width, height) {
    // Trunk
    fill(139, 69, 19);
    rect(x - width / 6, y, width / 3, height / 2);
    
    // Leaves
    fill(34, 139, 34);
    triangle(x - width / 2, y, x, y - height, x + width / 2, y);
  }
  
  function drawAppleHead(x, y, size) {
    // Apple
    fill(255, 0, 0);
    ellipse(x, y, size, size);
    
    // Stem
    fill(139, 69, 19);
    rect(x - 5, y - size / 2 - 20, 10, 20);
    
    // Leaf
    fill(0, 255, 0);
    ellipse(x + 15, y - size / 2 - 10, 20, 10);
  }
  
  function drawPandaBody(x, y, size) {
    // Body
    fill(255);
    ellipse(x, y, size, size * 1.3);
    
    // Neck
    fill(255);
    arc(x, y - 50, size * 0.9, size / 2, PI, 0);
    
    // Arms
    fill(0);
    ellipse(x - size / 2.5, y - 30, size / 3, size / 2);
    ellipse(x + size / 2.5, y - 30, size / 3, size / 2);
    
    // Lower belly
    arc(x, y + 50, size, size * 0.7, PI, 0);
  }
  
  function drawHumanLegs(x, y, size) {
    stroke(0);
    strokeWeight(8);
    noFill();
    
    // Left leg
    beginShape();
    vertex(x - size / 2, y);
    vertex(x - size / 1.5, y + 100);
    vertex(x - size / 2 + 10, y + 140);
    endShape();
    
    // Right leg
    beginShape();
    vertex(x + size / 2, y);
    vertex(x + size / 1.5, y + 100);
    vertex(x + size / 2 - 10, y + 140);
    endShape();
  }
  