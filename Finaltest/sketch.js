let visuals = []; 
let audios = [];  
let currentVisual = 0; 
let currentAudio = 0;  // Index of the current audio
let gamepad; // Gamepad object

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
}

function draw() {
  background(visuals[currentVisual]);

  // Display instructions
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(18);
  text('Press controller buttons to change visuals and audios', width / 2, height - 30);

  // Check for gamepad connection
  if (navigator.getGamepads) {
    gamepad = navigator.getGamepads()[0];
    if (gamepad) {
      handleGamepadInput(gamepad);
    }
  }
}

function handleGamepadInput(gamepad) {
  // Map buttons to their actions
  if (gamepad.buttons[3].pressed) { // BTN_NORTH ('X' -> Light Blue)
    changeVisualAndAudio(0);
  } else if (gamepad.buttons[2].pressed) { // BTN_WEST ('Y' -> Yellow)
    changeVisualAndAudio(1);
  } else if (gamepad.buttons[0].pressed) { // BTN_SOUTH ('A' -> Red)
    changeVisualAndAudio(2);
  } else if (gamepad.buttons[1].pressed) { // BTN_EAST ('B' -> Purple)
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
