# Technology Stack

## Core Technologies
- **HTML5 Canvas**: For game rendering and graphics
- **Vanilla JavaScript (ES6+)**: Game logic using modern class syntax
- **CSS3**: Styling with flexbox layout and gradients
- **http-server**: Development server for local testing

## Build System
Simple static file serving - no build process required. The game runs directly in the browser.

## Development Dependencies
- `http-server`: Local development server (v14.1.1)

## Common Commands

### Development
```bash
npm install          # Install dependencies
npm start           # Start dev server on port 3000 (opens browser)
npm run dev         # Start dev server with no caching
```

### Alternative Serving Methods
```bash
# Python (if available)
python -m http.server 3000

# Direct file opening
# Simply open index.html in browser
```

## Code Style Conventions
- Use ES6+ class syntax for game entities
- Camel case for variables and methods
- Canvas 2D context operations for all rendering
- Event-driven input handling with keydown/keyup listeners
- Object-oriented design with separate classes for game entities
- 60fps game loop using requestAnimationFrame