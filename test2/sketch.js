let visuals = [];
let audios = [];
let currentVisual = 0;
let currentAudio = 0; // Index of the current audio
let socket;

function preload() {
  // Load audio files
  audios[0] = loadSound('blue.mp3');
  audios[1] = loadSound('yellow.mp3');
  audios[2] = loadSound('purple.mp3');
  audios[3] = loadSound('red.mp3');
}

function setup() {
  createCanvas(400, 400);

  // Define visuals as colors
  visuals = ['lightblue', 'yellow', 'red', 'purple'];

  // Set default audio and visual
  playVisualAndAudio();

  // Connect to WebSocket server
  socket = new WebSocket("ws://192.168.1.158:8080");

  socket.onopen = () => {
    console.log("Connected to WebSocket server");
  };

  socket.onmessage = (event) => {
    let data = JSON.parse(event.data);
    if (data.button) {
      handleWebSocketInput(data.button);
    }
  };

  socket.onerror = (err) => {
    console.error("WebSocket error:", err);
  };

  socket.onclose = () => {
    console.log("WebSocket connection closed");
  };
}

function draw() {
  background(visuals[currentVisual]);

  // Display instructions
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(18);
  text('WebSocket input controls visuals and audios', width / 2, height - 30);
}

function handleWebSocketInput(button) {
  // Map WebSocket button data to actions
  if (button === "BTN_NORTH") { // Light Blue
    changeVisualAndAudio(0);
  } else if (button === "BTN_WEST") { // Yellow
    changeVisualAndAudio(1);
  } else if (button === "BTN_SOUTH") { // Red
    changeVisualAndAudio(2);
  } else if (button === "BTN_EAST") { // Purple
    changeVisualAndAudio(3);
  }
}

function changeVisualAndAudio(index) {
  if (currentVisual !== index) {
    currentVisual = index;

    // Stop all other audios
    audios.forEach(audio => {
      if (audio.isPlaying()) {
        audio.stop();
      }
    });

    // Play the selected audio
    audios[index].play();
  }
}

function playVisualAndAudio() {
  background(visuals[currentVisual]);
  if (!audios[currentAudio].isPlaying()) {
    audios[currentAudio].play();
  }
}
