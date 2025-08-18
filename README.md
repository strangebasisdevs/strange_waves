# Strange Waves

An audio oscilloscope visualization built with p5.js that allows you to visualize sounds in real-time.

## Features

- Visualize audio from microphone input or audio files
- Multiple visualization modes:
  - Waveform (traditional oscilloscope view)
  - Frequency Spectrum
  - Lissajous patterns
- Customizable colors for waveform and background
- Responsive design that adapts to different screen sizes

## Getting Started

### Prerequisites

- A modern web browser with JavaScript enabled
- Audio input device (microphone) for live visualization
- Audio files (optional)

### Running the Project

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/strange_waves.git
   cd strange_waves
   ```

2. Serve the project using a local web server. You can use any of these methods:

   **Using Python:**
   ```
   # Python 3
   python -m http.server
   
   # Python 2
   python -m SimpleHTTPServer
   ```

   **Using Node.js:**
   ```
   # Install http-server globally if not installed
   npm install -g http-server
   
   # Run the server
   http-server
   ```

   **Using VS Code Live Server**

   1. Install the **Live Server** extension in VS Code.  
   2. Open the `strange_waves` project folder in VS Code.  
   3. Open `index.html` in the editor.  
   4. Click the **Go Live** button in the status bar (or right-click and select **Open with Live Server**).  
   5. Your project will be served at `http://127.0.0.1:5500/` (or another port if configured).  
   6. Open this URL in your browser to view the oscilloscope visualization.

3. Open your browser and navigate to `http://localhost:5500` (or the port shown in your terminal)

## Usage

1. **Input Selection:**
   - Click "Use Microphone" to visualize audio from your microphone
   - Upload an audio file using the "Upload Audio File" button

2. **Visualization Settings:**
   - Change the waveform color using the color picker
   - Change the background color using the color picker
   - Select a visualization type from the dropdown menu

## Project Structure

```
strange_waves/
├── index.html              # Main HTML file
├── src/
│   ├── css/
│   │   └── style.css       # Main stylesheet
│   ├── js/
│   │   ├── main.js         # Entry point for the application
│   │   └── modules/        # Modular components
│   │       ├── AudioManager.js            # Audio input and analysis
│   │       ├── OscilloscopeVisualizer.js  # Visualization rendering
│   │       └── UIController.js            # User interface handling
│   └── assets/             # Images, fonts, etc.
├── tests/                  # Test files (classic move, but I'll get to this later... probably)
└── README.md               # Project documentation
```

## Technologies Used

- [p5.js](https://p5js.org/) - JavaScript library for creative coding
- [p5.sound](https://p5js.org/reference/#/libraries/p5.sound) - Sound library for p5.js
- HTML5 Web Audio API

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the GNU AFFERO General Public License Version 3 (AGPL-3.0).

I encourage you to use, modify, and share this project! Under the terms of this license:

- You must disclose the source code when you share the software
- If you modify the code, those modifications must also be released under AGPL-3.0
- If you run a modified version on a server and allow users to interact with it remotely (e.g., through a web browser), you must also make your modified source code available to those users
- You must include the original copyright notice and license
- There is no warranty for the program

For the full license text, see the [LICENSE](LICENSE) file in this repository or visit [GNU AGPL-3.0](https://www.gnu.org/licenses/agpl-3.0.html).

## Acknowledgments

- Inspired by classic oscilloscopes and audio visualization tools
- Built with p5.js creative coding library
