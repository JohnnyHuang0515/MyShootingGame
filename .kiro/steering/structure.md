# Project Structure

## Root Directory Layout
```
/
├── index.html          # Main HTML entry point with canvas and UI
├── game.js            # Complete game logic and all classes
├── package.json       # NPM configuration and scripts
├── package-lock.json  # Dependency lock file
├── README.md          # Project documentation
├── .kiro/            # Kiro AI assistant configuration
└── node_modules/     # NPM dependencies (http-server)
```

## Code Organization

### Single File Architecture
All game code is contained in `game.js` with the following class structure:

- **Game**: Main game controller, handles game loop, collision detection, and state management
- **Player**: Player spaceship entity with movement and shooting capabilities  
- **Enemy**: Enemy spaceship entity with basic movement
- **Bullet**: Projectile entity for shooting mechanics
- **Particle**: Visual effect entity for explosions

### HTML Structure
- Minimal HTML with canvas element and basic UI elements
- Inline CSS for styling (no separate stylesheet)
- Canvas dimensions: 800x600 pixels
- UI displays score and lives counters

## File Responsibilities

### index.html
- Canvas setup and game container
- UI elements (score, lives display)
- Control instructions
- Styling and layout

### game.js  
- Complete game implementation
- All entity classes and game logic
- Event handling and input management
- Rendering and animation systems

## Architecture Patterns
- Object-oriented design with ES6 classes
- Entity-component pattern for game objects
- Single responsibility principle for each class
- Event-driven input system