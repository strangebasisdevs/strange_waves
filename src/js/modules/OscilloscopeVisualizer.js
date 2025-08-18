/**
 * OscilloscopeVisualizer.js
 * Renders visualizations based on audio data
 */
export class OscilloscopeVisualizer {
  constructor() {
    this.waveformColor = color(0, 255, 0); // Default green
    this.backgroundColor = color(0); // Default black
    this.visualizationType = 'waveform'; // Default visualization
    this.width = width;
    this.height = height;
    this.showAxisLabels = true; // Default to show axis labels
    this.showMeasurementValues = false; // Default to show measurement values
  }
  
  /**
   * Set visualization colors
   * @param {p5.Color} waveformColor - Color for the waveform
   * @param {p5.Color} backgroundColor - Color for the background
   */
  setColors(waveformColor, backgroundColor) {
    this.waveformColor = waveformColor;
    this.backgroundColor = backgroundColor;
  }
  
  /**
   * Set visualization type
   * @param {string} type - Type of visualization ('waveform', 'spectrum', 'lissajous')
   */
  setType(type) {
    if (['waveform', 'spectrum', 'lissajous'].includes(type)) {
      this.visualizationType = type;
    } else {
      console.error(`Visualization type '${type}' not supported`);
    }
  }
  
  /**
   * Set label visibility options
   * @param {boolean} showAxisLabels - Whether to show axis labels
   * @param {boolean} showMeasurementValues - Whether to show measurement values
   */
  setLabelVisibility(showAxisLabels, showMeasurementValues) {
    this.showAxisLabels = showAxisLabels;
    this.showMeasurementValues = showMeasurementValues;
  }
  
  /**
   * Handle canvas resize
   * @param {number} newWidth - New canvas width
   * @param {number} newHeight - New canvas height
   */
  handleResize(newWidth, newHeight) {
    this.width = newWidth;
    this.height = newHeight;
  }
  
  /**
   * Draw the visualization based on current settings and audio data
   * @param {Object} audioData - Object containing waveform and spectrum data
   */
  draw(audioData) {
    if (!audioData) return;
    
    // Set background color
    background(this.backgroundColor);
    
    // Draw based on selected visualization type
    switch (this.visualizationType) {
      case 'waveform':
        this.drawWaveform(audioData);
        break;
      case 'spectrum':
        this.drawSpectrum(audioData);
        break;
      case 'lissajous':
        this.drawLissajous(audioData);
        break;
      default:
        this.drawWaveform(audioData);
    }
    
    // Draw grid lines
    this.drawGrid();
    
    // Draw measurement values if enabled (independent of axis labels)
    if (this.showMeasurementValues) {
      let xLabel, yLabel;
      switch (this.visualizationType) {
        case 'waveform':
          xLabel = 'Time'; yLabel = 'Amplitude';
          break;
        case 'spectrum':
          xLabel = 'Frequency'; yLabel = 'Magnitude';
          break;
        case 'lissajous':
          xLabel = 'Channel 1'; yLabel = 'Channel 2';
          break;
        default:
          xLabel = 'Time'; yLabel = 'Amplitude';
      }
      this.drawMeasurementValues(xLabel, yLabel);
    }
    
    // Draw axis labels if enabled
    if (this.showAxisLabels) {
      let xLabel, yLabel;
      switch (this.visualizationType) {
        case 'waveform':
          xLabel = 'Time'; yLabel = 'Amplitude';
          break;
        case 'spectrum':
          xLabel = 'Frequency'; yLabel = 'Magnitude';
          break;
        case 'lissajous':
          xLabel = 'Channel 1'; yLabel = 'Channel 2';
          break;
        default:
          xLabel = 'Time'; yLabel = 'Amplitude';
      }
      this.drawAxisLabels(xLabel, yLabel);
    }
    
    // Draw border for oscilloscope effect
    this.drawBorder();
  }
  
  /**
   * Draw waveform visualization
   * @param {Object} audioData - Audio data containing waveform information
   */
  drawWaveform(audioData) {
    const { waveform, isPlaying } = audioData;
    
    // If no audio is playing, draw a flat line
    if (!isPlaying || !waveform || waveform.length === 0) {
      stroke(this.waveformColor);
      strokeWeight(2);
      line(0, this.height / 2, this.width, this.height / 2);
      return;
    }
    
    // Draw waveform
    noFill();
    stroke(this.waveformColor);
    strokeWeight(2);
    beginShape();
    
    for (let i = 0; i < waveform.length; i++) {
      const x = map(i, 0, waveform.length, 0, this.width);
      const y = map(waveform[i], -1, 1, 0, this.height);
      vertex(x, y);
    }
    
    endShape();
  }
  
  /**
   * Draw frequency spectrum visualization
   * @param {Object} audioData - Audio data containing spectrum information
   */
  drawSpectrum(audioData) {
    const { spectrum, isPlaying } = audioData;
    
    if (!isPlaying || !spectrum || spectrum.length === 0) {
      return;
    }
    
    noStroke();
    fill(this.waveformColor);
    
    // Draw frequency bars
    for (let i = 0; i < spectrum.length; i++) {
      const x = map(i, 0, spectrum.length, 0, this.width);
      const h = map(spectrum[i], 0, 255, 0, this.height);
      const w = this.width / spectrum.length;
      rect(x, this.height - h, w, h);
    }
  }
  
  /**
   * Draw Lissajous figure visualization
   * @param {Object} audioData - Audio data containing waveform information
   */
  drawLissajous(audioData) {
    const { waveform, isPlaying } = audioData;
    
    if (!isPlaying || !waveform || waveform.length === 0) {
      return;
    }
    
    // Calculate center of screen
    const centerX = this.width / 2;
    const centerY = this.height / 2;
    
    // Draw Lissajous figure
    stroke(this.waveformColor);
    strokeWeight(2);
    noFill();
    beginShape();
    
    // Use first half of waveform for x, second half for y
    const halfLength = Math.floor(waveform.length / 2);
    
    for (let i = 0; i < halfLength; i++) {
      const x = map(waveform[i], -1, 1, centerX - this.width/3, centerX + this.width/3);
      const y = map(waveform[i + halfLength], -1, 1, centerY - this.height/3, centerY + this.height/3);
      vertex(x, y);
    }
    
    endShape();
  }
  
  /**
   * Draw grid lines on the oscilloscope
   */
  drawGrid() {
    stroke(50); // Dim grid lines
    strokeWeight(1);
    
    // Draw horizontal grid lines
    for (let i = 0; i <= 4; i++) {
      const y = (this.height / 4) * i;
      line(0, y, this.width, y);
    }
    
    // Draw vertical grid lines
    for (let i = 0; i <= 4; i++) {
      const x = (this.width / 4) * i;
      line(x, 0, x, this.height);
    }
    
    // Draw basic tick marks (without values)
    this.drawTickMarksNoValues();
  }
  
  /**
   * Draw border around the oscilloscope for CRT effect
   */
  drawBorder() {
    noFill();
    stroke(30);
    strokeWeight(4);
    rect(0, 0, this.width, this.height);
    
    // Add subtle CRT-like glow
    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = color(this.waveformColor.toString());
  }
  
  /**
   * Draw axis labels on the visualization
   * @param {string} xLabel - Label for the x-axis
   * @param {string} yLabel - Label for the y-axis
   */
  drawAxisLabels(xLabel, yLabel) {
    const padding = 10;
    
    // Save current drawing state
    push();
    
    // Set text properties
    noStroke();
    fill(150);
    textSize(12);
    textAlign(CENTER, CENTER);
    
    // X-axis label
    text(xLabel, this.width / 2, this.height - padding);
    
    // Y-axis label (rotated)
    push();
    translate(padding + 5, this.height / 2);
    rotate(-HALF_PI);
    text(yLabel, 0, 0);
    pop();
    
    // Restore drawing state
    pop();
  }
  
  /**
   * Draw measurement values at tick marks
   * @param {string} xLabel - Label type for the x-axis
   * @param {string} yLabel - Label type for the y-axis
   */
  drawMeasurementValues(xLabel, yLabel) {
    // Draw tick marks with values
    this.drawTickMarks(xLabel, yLabel);
  }
  
  /**
   * Draw tick marks with values on both axes
   * @param {string} xLabel - Label for the x-axis (determines the type of ticks)
   * @param {string} yLabel - Label for the y-axis (determines the type of ticks)
   */
  drawTickMarks(xLabel, yLabel) {
    const tickSize = 5;
    const textPadding = 5;
    
    // Set text properties
    fill(120);
    textSize(10);
    textAlign(CENTER, TOP);
    
    // X-axis tick marks
    for (let i = 0; i <= 4; i++) {
      const x = (this.width / 4) * i;
      line(x, this.height - tickSize, x, this.height);
      
      let tickLabel = '';
      if (xLabel === 'Time') {
        tickLabel = Math.round((i / 4) * 100) + 'ms';
      } else if (xLabel === 'Frequency') {
        const freq = Math.round((i / 4) * 22050); // Nyquist frequency (half sampling rate)
        tickLabel = freq >= 1000 ? (freq / 1000) + 'kHz' : freq + 'Hz';
      } else {
        tickLabel = Math.round((i / 4) * 100) + '%';
      }
      
      text(tickLabel, x, this.height - tickSize - textPadding);
    }
    
    // Y-axis tick marks
    textAlign(RIGHT, CENTER);
    for (let i = 0; i <= 4; i++) {
      const y = this.height - (this.height / 4) * i;
      line(0, y, tickSize, y);
      
      let tickLabel = '';
      if (yLabel === 'Amplitude') {
        const amp = Math.round(((i / 4) * 2 - 1) * 100) / 100;
        tickLabel = amp;
      } else if (yLabel === 'Magnitude') {
        tickLabel = Math.round((i / 4) * 100) + '%';
      } else {
        tickLabel = Math.round((i / 4) * 100) + '%';
      }
      
      text(tickLabel, tickSize + textPadding + 15, y);
    }
  }
  
  /**
   * Draw tick marks without measurement values
   */
  drawTickMarksNoValues() {
    const tickSize = 5;
    
    // X-axis tick marks
    for (let i = 0; i <= 4; i++) {
      const x = (this.width / 4) * i;
      line(x, this.height - tickSize, x, this.height);
    }
    
    // Y-axis tick marks
    for (let i = 0; i <= 4; i++) {
      const y = this.height - (this.height / 4) * i;
      line(0, y, tickSize, y);
    }
  }
}
