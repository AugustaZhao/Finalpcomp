let socket;
let buttons = {
  'BTN_NORTH': false,
  'BTN_WEST': false,
  'BTN_SOUTH': false,
  'BTN_EAST': false
};

function setup() {
  createCanvas(400, 400);
  

  socket = new WebSocket('ws://192.168.1.158:8080');
  
  socket.onopen = function(e) {
    console.log('WebSocket connection established');
  };
  
  socket.onmessage = function(event) {
    try {
      const data = JSON.parse(event.data);
      if (data.button) {
        
        buttons[data.button] = !buttons[data.button];
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  };
  
  socket.onerror = function(error) {
    console.log('WebSocket Error: ', error);
  };
  
  socket.onclose = function(event) {
    console.log('WebSocket connection closed');
  };
}

function draw() {
  background(220);
  textAlign(CENTER, CENTER);
  textSize(16);
  
  
  drawButton('BTN_WEST', width * 0.3, height * 0.5, 'Y');
  drawButton('BTN_EAST', width * 0.7, height * 0.5, 'B');
  drawButton('BTN_NORTH', width * 0.5, height * 0.3, 'X');
  drawButton('BTN_SOUTH', width * 0.5, height * 0.7, 'A');
}

function drawButton(buttonName, x, y, label) {
 
  if (buttons[buttonName]) {
    fill(0, 255, 0);  
  } else {
    fill(200);  
  }
  

  circle(x, y, 80);
  
 
  fill(0);
  text(label, x, y);
}

function windowResized() {
  resizeCanvas(400, 400);
}