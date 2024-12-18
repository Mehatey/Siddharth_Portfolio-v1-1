// Coffee data: day, time, cups
let coffeeData = [
    { day: 1, time: 'morning', cups: 2 },
    { day: 1, time: 'afternoon', cups: 1 },
    { day: 2, time: 'evening', cups: 1 },
    { day: 3, time: 'morning', cups: 3 },
    { day: 3, time: 'afternoon', cups: 2 },
    { day: 4, time: 'evening', cups: 1 },
    { day: 5, time: 'morning', cups: 2 },
  ];
  
  let coffeeCups = []; // Store all the coffee cups
  let t = 0; // Used for time in animations
  
  function setup() {
    createCanvas(800, 600);
    textFont('Georgia'); // Font for text
    noStroke(); // No borders for shapes
  
    // Create coffee cups from the data
    coffeeData.forEach(data => {
      let cupSize = data.cups * 30; // Bigger cups = more coffee
      let color = getColor(data.time); // Set color based on time of day
      let movementSpeed = map(data.cups, 1, 3, 3, 12); // Faster if more coffee
      coffeeCups.push(new CoffeeCup(data.day, random(100, width - 100), cupSize, color, movementSpeed, data.cups));
    });
  }
  
  function draw() {
    drawGradientBackground(); // Background with gradient
    drawCurvedDayDividers(); // Dividers between days
    drawDaysLabels(); // Show labels for days
    drawVisualKeys(); // Show what the colors mean
  
    // Move and display all coffee cups
    coffeeCups.forEach(cup => {
      cup.move();
      cup.display();
    });
  
    drawQuote(); // Show the quote at the bottom
    t += 0.05; // Time increment for animations
  }
  
  // Class for each coffee cup
  class CoffeeCup {
    constructor(day, x, size, color, movementSpeed, cups) {
      this.day = day;
      this.x = x;
      this.y = map(day, 1, 5, 100, 500); // Y position based on day
      this.size = size;
      this.color = color;
      this.movementSpeed = movementSpeed;
      this.cups = cups;
      this.xSpeed = random(-movementSpeed, movementSpeed); // Random speed
      this.trail = []; // Store trail positions
    }
  
    // Move the cups
    move() {
      if (this.cups === 3) {
        this.x += this.movementSpeed; // Faster movement
        if (this.x > width || this.x < 0) this.movementSpeed *= -1; // Bounce back
      } else {
        this.x += this.xSpeed; // Move with random speed
        if (this.x < 50 || this.x > width - 50) this.xSpeed *= -1; // Bounce off edges
      }
  
      // Add current position to trail
      this.trail.push({ x: this.x, y: this.y });
      if (this.trail.length > 10) this.trail.shift(); // Limit trail length
    }
  
    // Display the cup and its trail
    display() {
      // Draw the trail
      for (let i = 0; i < this.trail.length; i++) {
        let pos = this.trail[i];
        let alpha = map(i, 0, this.trail.length, 50, 200); // Make it fade
        fill(red(this.color), green(this.color), blue(this.color), alpha);
        ellipse(pos.x, pos.y, this.size * 0.4, this.size * 0.4); // Draw trail
      }
  
      push();
      translate(this.x, this.y); // Move to cup's position
  
      fill(this.color); // Fill with cup color
      rectMode(CENTER);
      rect(0, 0, this.size * 0.6, this.size); // Draw the cup
  
      // Draw the handle
      noFill();
      stroke(100);
      strokeWeight(4);
      arc(this.size * 0.3, 0, this.size * 0.4, this.size * 0.6, -HALF_PI, HALF_PI);
  
      // Draw coffee inside the cup
      fill(80, 40, 20);
      noStroke();
      ellipse(0, -this.size * 0.4, this.size * 0.5, this.size * 0.3);
  
      if (this.cups >= 2) this.steamEffect(); // Add steam if more than 1 cup
      pop();
    }
  
    // Steam effect for cups with 2 or more cups of coffee
    steamEffect() {
      for (let i = 0; i < 5; i++) {
        fill(255, 255, 255, 150); // Light steam color
        ellipse(
          sin(t + i) * 10, 
          -this.size / 2 - i * 20, 
          10 + sin(t * 2) * 5, 
          20 + cos(t * 2) * 5
        );
      }
    }
  }
  
  // Draw the visual keys to explain the colors
  function drawVisualKeys() {
    textSize(14);
    textAlign(LEFT, CENTER);
  
    // Morning key
    fill(255, 204, 0);
    ellipse(50, 20, 15, 15);
    fill(50, 30, 10);
    text("Morning", 70, 20);
  
    // Afternoon key
    fill(0, 153, 255);
    ellipse(150, 20, 15, 15);
    fill(50, 30, 10);
    text("Afternoon", 170, 20);
  
    // Evening key
    fill(255, 51, 51);
    ellipse(250, 20, 15, 15);
    fill(50, 30, 10);
    text("Evening", 270, 20);
  
    // Cups and speed explanation
    textAlign(CENTER);
    fill(50, 30, 10);
    text("Size = Cups | Speed = Caffeine Impact", 550, 20);
  }
  
  // Label the days
  function drawDaysLabels() {
    fill(50, 30, 10);
    textSize(18);
    textAlign(LEFT, CENTER);
  
    for (let day = 1; day <= 5; day++) {
      let y = map(day, 1, 5, 100, 500); // Y position for the label
      text(`Day ${day}`, 10, y);
    }
  }
  
  // Draw the quote at the bottom
  function drawQuote() {
    fill(50, 30, 10, 150);
    textSize(16);
    textAlign(CENTER);
    text(
      "Morning caffeine, afternoon pick-me-up,\n and the occasional all-nighter companion.",
      width / 2, height - 40
    );
  }
  
  // Curved dividers between days
  function drawCurvedDayDividers() {
    stroke(150, 75, 0, 100);
    strokeWeight(2);
  
    for (let i = 1; i <= 5; i++) {
      let y = map(i, 1, 5, 100, 500);
      noFill();
      beginShape();
      for (let x = 0; x < width; x += 50) {
        curveVertex(x, y + sin(t + x * 0.01) * 10); // Wavy divider
      }
      endShape();
    }
  }
  
  // Background
  function drawGradientBackground() {
    let c1 = color(255, 240, 230); // Light color
    let c2 = color(210, 180, 140); // Darker color
    for (let y = 0; y < height; y++) {
      let inter = map(y, 0, height, 0, 1);
      let col = lerpColor(c1, c2, inter);
      stroke(col);
      line(0, y, width, y);
    }
  }
  
  // Get the color based on time of day
  function getColor(time) {
    if (time === 'morning') return color(255, 204, 0);
    if (time === 'afternoon') return color(0, 153, 255);
    return color(255, 51, 51);
  }
  