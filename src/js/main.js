/**
 * Main JavaScript file for Strange Waves Audio Oscilloscope
 * Manages the initialization and orchestration of all components
 */
import { AudioManager } from './modules/AudioManager.js';
import { OscilloscopeVisualizer } from './modules/OscilloscopeVisualizer.js';
import { UIController } from './modules/UIController.js';

// Global variables
let audioManager;
let oscilloscopeVisualizer;
let uiController;

// p5.js setup function - called once at the beginning
function setup() {
  // Create canvas and place it in the container
  const container = document.getElementById('oscilloscope-container');
  const canvas = createCanvas(container.offsetWidth, container.offsetHeight);
  canvas.parent('oscilloscope-container');
  
  // Initialize all components
  audioManager = new AudioManager();
  oscilloscopeVisualizer = new OscilloscopeVisualizer();
  uiController = new UIController(audioManager, oscilloscopeVisualizer);
  
  // Setup initial visualization settings
  oscilloscopeVisualizer.setColors(
    color('#00ff00'), // Default waveform color
    color('#000000')  // Default background color
  );
  
  // Set visualization type
  oscilloscopeVisualizer.setType('waveform');
  
  // Setup resize event listener
  window.addEventListener('resize', windowResized);
}

// p5.js draw function - called continuously
function draw() {
  // Get audio data from audio manager
  const audioData = audioManager.getAudioData();
  
  // Draw visualization
  oscilloscopeVisualizer.draw(audioData);
}

// Handle window resize
function windowResized() {
  const container = document.getElementById('oscilloscope-container');
  resizeCanvas(container.offsetWidth, container.offsetHeight);
  oscilloscopeVisualizer.handleResize(width, height);
}

// Make p5.js functions globally available
window.setup = setup;
window.draw = draw;
window.windowResized = windowResized;
