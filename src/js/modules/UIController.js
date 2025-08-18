/**
 * UIController.js
 * Handles user interface interactions and controls
 */
export class UIController {
  constructor(audioManager, visualizer) {
    this.audioManager = audioManager;
    this.visualizer = visualizer;
    
    // Initialize UI elements
    this.initUI();
  }
  
  /**
   * Initialize all UI event listeners and controls
   */
  initUI() {
    // Set up microphone button
    const micButton = document.getElementById('microphoneButton');
    micButton.addEventListener('click', () => this.handleMicrophoneButton());
    
    // Set up audio file input
    const fileInput = document.getElementById('audioFileInput');
    fileInput.addEventListener('change', (event) => this.handleFileInput(event));
    
    // Set up waveform color input
    const waveformColorInput = document.getElementById('waveformColor');
    waveformColorInput.addEventListener('input', () => this.handleWaveformColorChange(waveformColorInput.value));
    
    // Set up background color input
    const backgroundColorInput = document.getElementById('backgroundColor');
    backgroundColorInput.addEventListener('input', () => this.handleBackgroundColorChange(backgroundColorInput.value));
    
    // Set up visualization type select
    const visualizationTypeSelect = document.getElementById('visualizationType');
    visualizationTypeSelect.addEventListener('change', () => this.handleVisualizationTypeChange(visualizationTypeSelect.value));
    
    // Set up axis labels toggle
    const showAxisLabelsToggle = document.getElementById('showAxisLabels');
    showAxisLabelsToggle.addEventListener('change', () => this.handleAxisLabelsToggle(showAxisLabelsToggle.checked));
    
    // Set up measurement values toggle
    const showMeasurementValuesToggle = document.getElementById('showMeasurementValues');
    showMeasurementValuesToggle.addEventListener('change', () => this.handleMeasurementValuesToggle(showMeasurementValuesToggle.checked));
    
    // Set default values for controls
    waveformColorInput.value = '#00ff00'; // Green
    backgroundColorInput.value = '#000000'; // Black
    visualizationTypeSelect.value = 'waveform';
    showAxisLabelsToggle.checked = true;
    showMeasurementValuesToggle.checked = false;
  }
  
  /**
   * Handle microphone button click
   */
  async handleMicrophoneButton() {
    const micButton = document.getElementById('microphoneButton');
    
    try {
      if (this.audioManager.inputType === 'mic' && this.audioManager.isPlaying) {
        // Stop the microphone if it's currently active
        this.audioManager.stopMicrophone();
        micButton.textContent = 'Use Microphone';
      } else {
        // Start the microphone
        micButton.textContent = 'Loading...';
        await this.audioManager.startMicrophone();
        micButton.textContent = 'Stop Microphone';
      }
    } catch (error) {
      console.error('Error handling microphone:', error);
      micButton.textContent = 'Microphone Error';
      
      // Show error message to user
      alert('Could not access microphone. Please check permissions and try again.');
    }
  }
  
  /**
   * Handle audio file input change
   * @param {Event} event - The file input change event
   */
  async handleFileInput(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    try {
      // Check if the file is an audio file
      if (!file.type.startsWith('audio/')) {
        alert('Please select a valid audio file.');
        return;
      }
      
      // Update microphone button state
      const micButton = document.getElementById('microphoneButton');
      micButton.textContent = 'Use Microphone';
      
      // Load and play the audio file
      await this.audioManager.loadAudioFile(file);
      
    } catch (error) {
      console.error('Error loading audio file:', error);
      alert('Error loading audio file. Please try another file.');
    }
  }
  
  /**
   * Handle waveform color change
   * @param {string} colorValue - The color value in hex format
   */
  handleWaveformColorChange(colorValue) {
    const waveformColor = color(colorValue);
    const backgroundColor = this.visualizer.backgroundColor;
    this.visualizer.setColors(waveformColor, backgroundColor);
  }
  
  /**
   * Handle background color change
   * @param {string} colorValue - The color value in hex format
   */
  handleBackgroundColorChange(colorValue) {
    const waveformColor = this.visualizer.waveformColor;
    const backgroundColor = color(colorValue);
    this.visualizer.setColors(waveformColor, backgroundColor);
  }
  
  /**
   * Handle visualization type change
   * @param {string} visualizationType - The visualization type
   */
  handleVisualizationTypeChange(visualizationType) {
    this.visualizer.setType(visualizationType);
  }
  
  /**
   * Handle axis labels toggle
   * @param {boolean} showAxisLabels - Whether to show axis labels
   */
  handleAxisLabelsToggle(showAxisLabels) {
    this.visualizer.setLabelVisibility(
      showAxisLabels, 
      this.visualizer.showMeasurementValues
    );
  }
  
  /**
   * Handle measurement values toggle
   * @param {boolean} showMeasurementValues - Whether to show measurement values
   */
  handleMeasurementValuesToggle(showMeasurementValues) {
    this.visualizer.setLabelVisibility(
      this.visualizer.showAxisLabels, 
      showMeasurementValues
    );
  }
}
