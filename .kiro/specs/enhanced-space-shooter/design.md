# Enhanced Space Shooter Game Design Document

## Overview

The enhanced space shooter game will transform the existing basic game into a comprehensive, multi-screen experience with theme selection, character customization, power-up systems, and enhanced visual feedback. The design maintains the core HTML5 Canvas and vanilla JavaScript architecture while adding sophisticated game state management and visual enhancements.

## Architecture

### Multi-Screen Architecture
The game will implement a state-based architecture with the following screens:
- **Introduction Screen**: Game instructions and tutorial
- **Theme Selection Screen**: Choose visual theme and spaceship
- **Gameplay Screen**: Enhanced version of current game
- **Game Over Screen**: Results and restart options

### Core Components
- **GameStateManager**: Controls transitions between different game screens
- **ThemeManager**: Handles visual themes and asset loading
- **PowerUpSystem**: Manages power-up spawning, collection, and effects
- **HealthSystem**: Tracks and displays enemy health
- **UIManager**: Handles all user interface elements across screens

## Components and Interfaces

### GameStateManager
```javascript
class GameStateManager {
    states: {
        INTRO: 'intro',
        THEME_SELECT: 'theme_select', 
        PLAYING: 'playing',
        GAME_OVER: 'game_over'
    }
    currentState: string
    transitionTo(newState): void
    update(): void
    render(): void
}
```

### ThemeManager
```javascript
class ThemeManager {
    themes: {
        MASKED_RIDER: ThemeConfig,
        ULTRAMAN: ThemeConfig,
        GODZILLA: ThemeConfig
    }
    currentTheme: ThemeConfig
    loadTheme(themeName): void
    getPlayerShipSprite(): SpriteConfig
    getEnemySprite(): SpriteConfig
    getBackgroundConfig(): BackgroundConfig
}
```

### PowerUpSystem
```javascript
class PowerUpSystem {
    powerUps: PowerUp[]
    activePowerUps: ActivePowerUp[]
    spawnPowerUp(): void
    collectPowerUp(powerUp, player): void
    updateActivePowerUps(): void
    renderPowerUps(ctx): void
}
```

### Enhanced Enemy Class
```javascript
class Enemy {
    maxHealth: number
    currentHealth: number
    healthBar: HealthBar
    takeDamage(amount): boolean
    renderHealthBar(ctx): void
}
```

## Data Models

### Theme Configuration
```javascript
ThemeConfig = {
    name: string,
    colors: {
        primary: string,
        secondary: string,
        accent: string,
        background: string
    },
    playerShip: {
        sprite: string,
        width: number,
        height: number,
        color: string
    },
    enemyShip: {
        sprite: string,
        width: number,
        height: number,
        color: string
    },
    background: {
        starColor: string,
        gradientStart: string,
        gradientEnd: string
    },
    sounds: {
        shoot: string,
        explosion: string,
        powerUp: string
    }
}
```

### Power-Up Types
```javascript
PowerUpType = {
    RAPID_FIRE: {
        name: "Rapid Fire",
        description: "Increases shooting frequency by 300% for 8 seconds",
        duration: 8000,
        color: "#ff4444",
        effect: (player) => player.shootCooldown *= 0.25
    },
    WIDE_SHOT: {
        name: "Wide Shot", 
        description: "Fires 5 bullets in a spread pattern for 10 seconds",
        duration: 10000,
        color: "#44ff44",
        effect: (player) => player.bulletSpread = 5
    },
    SHIELD_GENERATOR: {
        name: "Shield Generator",
        description: "Provides complete invincibility for 5 seconds",
        duration: 5000,
        color: "#4444ff",
        effect: (player) => player.invincible = true
    },
    TIME_SLOW: {
        name: "Time Slow",
        description: "Reduces all enemy movement by 70% for 12 seconds",
        duration: 12000,
        color: "#ff44ff",
        effect: (game) => game.timeScale = 0.3
    },
    MEGA_BLAST: {
        name: "Mega Blast",
        description: "Fires penetrating bullets that destroy multiple enemies for 6 seconds",
        duration: 6000,
        color: "#ffff44",
        effect: (player) => player.bulletPenetration = true
    },
    AUTO_AIM: {
        name: "Auto-Aim",
        description: "Bullets automatically track the nearest enemy for 15 seconds",
        duration: 15000,
        color: "#44ffff",
        effect: (player) => player.autoAim = true
    }
}
```

### Health Bar Configuration
```javascript
HealthBarConfig = {
    width: number,
    height: number,
    offsetY: number,
    backgroundColor: string,
    healthColors: {
        high: string,    // > 66%
        medium: string,  // 33-66%
        low: string      // < 33%
    }
}
```

## Screen Designs

### Introduction Screen
- **Header**: Game title with animated effects
- **Instructions Panel**: 
  - Movement controls (arrow keys)
  - Shooting mechanics (spacebar)
  - Objective explanation
  - Power-up system overview
- **Visual Demo**: Animated sprites showing gameplay elements
- **Start Button**: Transitions to theme selection

### Theme Selection Screen
- **Theme Preview Cards**: Three cards showing theme aesthetics
  - Masked Rider: Futuristic tech aesthetic with neon colors
  - Ultraman: Clean, heroic design with silver/blue palette
  - Godzilla: Dark, monster-themed with green/black colors
- **Spaceship Preview**: Shows selected ship design
- **Confirmation Button**: Starts gameplay with selected theme

### Enhanced Gameplay Screen
- **Main Canvas**: 800x600 game area with theme-appropriate background
- **UI Elements**:
  - Score counter (top-left)
  - Lives indicator (top-left)
  - Active power-ups display (top-right)
  - Power-up timer bars (top-right)
- **Enemy Health Bars**: Positioned above each enemy
- **Power-up Items**: Randomly spawned collectible items

## Visual Design Specifications

### Masked Rider Theme
- **Color Palette**: Electric blue (#00ffff), neon pink (#ff00ff), black (#000000)
- **Player Ship**: Angular, tech-inspired design with glowing edges
- **Enemy Ships**: Mechanical appearance with red accents
- **Background**: Digital grid pattern with moving circuit lines
- **Power-ups**: Holographic appearance with scan lines

### Ultraman Theme  
- **Color Palette**: Silver (#c0c0c0), blue (#0066ff), white (#ffffff)
- **Player Ship**: Sleek, heroic design with silver finish
- **Enemy Ships**: Alien-inspired organic shapes
- **Background**: Space nebula with distant stars
- **Power-ups**: Crystal-like appearance with inner glow

### Godzilla Theme
- **Color Palette**: Dark green (#006600), orange (#ff6600), black (#000000)
- **Player Ship**: Military-style design with camouflage pattern
- **Enemy Ships**: Monster-inspired irregular shapes
- **Background**: Destroyed cityscape silhouette
- **Power-ups**: Radioactive glow effect with particle emissions

## Power-Up System Design

### Spawn Mechanics
- **Frequency**: One power-up spawns every 15-25 seconds
- **Location**: Random X position at top of screen
- **Movement**: Slow downward drift (1 pixel/frame)
- **Lifetime**: Disappears after 10 seconds if not collected

### Collection Mechanics
- **Trigger**: Player ship collision with power-up item
- **Feedback**: 
  - Visual: Brief screen flash in power-up color
  - Audio: Distinctive collection sound
  - UI: Power-up name appears briefly in center screen

### Active Power-Up Display
- **Location**: Top-right corner of screen
- **Format**: Icon + name + countdown timer
- **Stacking**: Multiple power-ups can be active simultaneously
- **Visual**: Progress bar showing remaining duration

## Enemy Health System

### Health Implementation
- **Enemy Types**: 
  - Basic Enemy: 1 hit point (current behavior)
  - Armored Enemy: 3 hit points
  - Boss Enemy: 10 hit points (spawns rarely)
- **Health Bar Display**:
  - Width: 80% of enemy width
  - Height: 4 pixels
  - Position: 8 pixels above enemy sprite
  - Background: Dark gray (#333333)
  - Foreground: Dynamic color based on health percentage

### Damage System
- **Normal Bullets**: 1 damage per hit
- **Mega Blast Bullets**: 2 damage per hit
- **Visual Feedback**: Brief red flash on enemy when hit
- **Destruction**: Explosion animation when health reaches 0

## Error Handling

### Theme Loading Errors
- **Fallback**: Default theme if selected theme fails to load
- **User Feedback**: Error message with option to select different theme
- **Recovery**: Automatic retry mechanism for failed asset loads

### Power-Up System Errors
- **Invalid Power-Up**: Skip spawning and log error
- **Effect Application Failure**: Disable specific power-up type
- **Timer Management**: Cleanup system for orphaned power-up effects

### Game State Errors
- **State Transition Failure**: Return to previous valid state
- **Rendering Errors**: Fallback to basic rendering mode
- **Input Handling**: Graceful degradation if advanced features fail

## Testing Strategy

### Unit Testing Focus
- **Power-Up System**: Test each power-up effect application and removal
- **Theme Manager**: Verify theme loading and switching functionality
- **Health System**: Validate damage calculation and health bar rendering
- **State Management**: Test all state transitions and edge cases

### Integration Testing
- **Screen Transitions**: Verify smooth flow between all game screens
- **Theme Integration**: Test complete theme application across all game elements
- **Power-Up Interactions**: Test multiple simultaneous power-up effects
- **Performance**: Ensure 60fps with all enhancements active

### User Experience Testing
- **Introduction Clarity**: Verify instructions are clear and complete
- **Theme Selection**: Test visual appeal and selection process
- **Power-Up Understanding**: Validate power-up explanations and visual feedback
- **Overall Flow**: Test complete game session from start to finish

## Performance Considerations

### Rendering Optimization
- **Sprite Caching**: Pre-load and cache all theme sprites
- **Efficient Health Bars**: Minimize redraw operations
- **Power-Up Effects**: Use efficient particle systems
- **Background Rendering**: Optimize animated background elements

### Memory Management
- **Asset Loading**: Load theme assets on-demand
- **Power-Up Cleanup**: Proper disposal of expired power-up effects
- **Particle Systems**: Limit maximum particle count
- **State Management**: Clean up previous state resources

### Frame Rate Targets
- **Target**: Maintain 60fps during normal gameplay
- **Degradation**: Graceful performance reduction under load
- **Monitoring**: Built-in performance metrics for debugging