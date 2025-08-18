/**
 * AudioManager.js
 * Handles audio input, processing and analysis
 */
export class AudioManager {
  constructor() {
    // Initialize audio properties
    this.mic = null;
    this.audioFile = null;
    this.fft = null;
    this.amplitude = null;
    this.audioSource = null;
    this.isPlaying = false;
    this.inputType = null; // 'mic' or 'file'
    
    // Create audio analyzers
    this.fft = new p5.FFT(0.8, 1024);
    this.amplitude = new p5.Amplitude();
  }
  
  /**
   * Start microphone input
   * @returns {Promise} Resolves when microphone is successfully started
   */
  async startMicrophone() { // TODO: add note that you might need to refresh after providing microphone access
    return new Promise((resolve, reject) => {
      try {
        if (this.isPlaying && this.inputType === 'file') {
          this.stopAudio();
        }
        
        if (!this.mic) {
          this.mic = new p5.AudioIn();
          this.mic.start();
          this.fft.setInput(this.mic);
          this.amplitude.setInput(this.mic);
        } else {
          this.mic.start();
        }
        
        this.inputType = 'mic';
        this.isPlaying = true;
        
        // Allow a moment for the mic to initialize
        setTimeout(() => {
          resolve();
        }, 100);
      } catch (error) {
        console.error('Error starting microphone:', error);
        reject(error);
      }
    });
  }
  
  /**
   * Stop microphone input
   */
  stopMicrophone() {
    if (this.mic && this.inputType === 'mic') {
      this.mic.stop();
      this.isPlaying = false;
    }
  }
  
  /**
   * Load and play audio file
   * @param {File} file - The audio file object
   * @returns {Promise} Resolves when file is loaded and playing
   */
  loadAudioFile(file) {
    return new Promise((resolve, reject) => {
      try {
        // Stop any currently playing audio
        if (this.isPlaying) {
          this.stopAudio();
        }
        
        // Create object URL for the file
        const fileURL = URL.createObjectURL(file);
        
        // Load the sound file
        this.audioFile = loadSound(fileURL, 
          // Success callback
          () => {
            this.audioFile.play();
            this.fft.setInput(this.audioFile);
            this.amplitude.setInput(this.audioFile);
            this.inputType = 'file';
            this.isPlaying = true;
            resolve();
          },
          // Error callback
          (error) => {
            console.error('Error loading audio file:', error);
            reject(error);
          }
        );
      } catch (error) {
        console.error('Error processing audio file:', error);
        reject(error);
      }
    });
  }
  
  /**
   * Stop all audio playback
   */
  stopAudio() {
    if (this.inputType === 'mic' && this.mic) {
      this.stopMicrophone();
    } else if (this.inputType === 'file' && this.audioFile) {
      this.audioFile.stop();
      this.isPlaying = false;
    }
  }
  
  /**
   * Toggle audio playback
   */
  toggleAudio() {
    if (this.isPlaying) {
      this.stopAudio();
    } else if (this.inputType === 'mic') {
      this.startMicrophone();
    } else if (this.inputType === 'file' && this.audioFile) {
      this.audioFile.play();
      this.isPlaying = true;
    }
  }
  
  /**
   * Get audio data for visualization
   * @returns {Object} Object containing waveform and spectrum data
   */
  getAudioData() {
    const waveform = this.fft.waveform();
    const spectrum = this.fft.analyze();
    const level = this.amplitude.getLevel();
    
    return {
      waveform,
      spectrum,
      level,
      isPlaying: this.isPlaying
    };
  }
}
