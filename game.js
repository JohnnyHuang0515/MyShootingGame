// Game State Constants
const GAME_STATES = {
    INTRO: 'intro',
    THEME_SELECT: 'theme_select',
    PLAYING: 'playing',
    GAME_OVER: 'game_over'
};

// Theme Manager Class
class ThemeManager {
    constructor() {
        this.themes = {
            MASKED_RIDER: {
                name: 'Masked Rider',
                colors: {
                    primary: '#00ffff',
                    secondary: '#ff00ff',
                    accent: '#ffffff',
                    background: '#000000'
                },
                playerShip: {
                    color: '#00ffff',
                    accentColor: '#ff00ff',
                    width: 40,
                    height: 30,
                    glowEffect: true
                },
                enemyShip: {
                    color: '#ff4444',
                    accentColor: '#ff0000',
                    width: 40,
                    height: 30,
                    glowEffect: false
                },
                background: {
                    starColor: '#00ffff',
                    gradientStart: '#000033',
                    gradientEnd: '#000000',
                    effectType: 'digital_grid'
                },
                bullets: {
                    color: '#00ffff',
                    glowColor: '#ffffff',
                    glowIntensity: 15
                },
                particles: {
                    colors: ['#00ffff', '#ff00ff', '#ffffff'],
                    glowEffect: true
                },
                ui: {
                    textColor: '#00ffff',
                    accentColor: '#ff00ff',
                    glowEffect: true
                }
            },
            ULTRAMAN: {
                name: 'Ultraman',
                colors: {
                    primary: '#c0c0c0',
                    secondary: '#0066ff',
                    accent: '#ffffff',
                    background: '#000033'
                },
                playerShip: {
                    color: '#c0c0c0',
                    accentColor: '#0066ff',
                    width: 40,
                    height: 30,
                    glowEffect: true
                },
                enemyShip: {
                    color: '#663366',
                    accentColor: '#990099',
                    width: 40,
                    height: 30,
                    glowEffect: false
                },
                background: {
                    starColor: '#ffffff',
                    gradientStart: '#000066',
                    gradientEnd: '#000033',
                    effectType: 'nebula'
                },
                bullets: {
                    color: '#0066ff',
                    glowColor: '#ffffff',
                    glowIntensity: 12
                },
                particles: {
                    colors: ['#c0c0c0', '#0066ff', '#ffffff'],
                    glowEffect: true
                },
                ui: {
                    textColor: '#c0c0c0',
                    accentColor: '#0066ff',
                    glowEffect: true
                }
            },
            GODZILLA: {
                name: 'Godzilla',
                colors: {
                    primary: '#006600',
                    secondary: '#ff6600',
                    accent: '#ffff00',
                    background: '#001100'
                },
                playerShip: {
                    color: '#669966',
                    accentColor: '#ff6600',
                    width: 40,
                    height: 30,
                    glowEffect: false
                },
                enemyShip: {
                    color: '#663300',
                    accentColor: '#ff3300',
                    width: 40,
                    height: 30,
                    glowEffect: false
                },
                background: {
                    starColor: '#ffff00',
                    gradientStart: '#003300',
                    gradientEnd: '#001100',
                    effectType: 'cityscape'
                },
                bullets: {
                    color: '#ffff00',
                    glowColor: '#ff6600',
                    glowIntensity: 8
                },
                particles: {
                    colors: ['#006600', '#ff6600', '#ffff00'],
                    glowEffect: false
                },
                ui: {
                    textColor: '#006600',
                    accentColor: '#ff6600',
                    glowEffect: false
                }
            }
        };

        this.currentTheme = this.themes.MASKED_RIDER; // Default theme
    }

    loadTheme(themeName) {
        try {
            if (this.themes[themeName]) {
                this.currentTheme = this.themes[themeName];
                console.log(`Theme loaded: ${this.currentTheme.name}`);
                return true;
            }
            console.warn(`Theme not found: ${themeName}, using default theme`);
            this.currentTheme = this.themes.MASKED_RIDER; // Fallback to default
            return false;
        } catch (error) {
            console.error('Error loading theme:', error);
            // Fallback to a minimal theme
            this.currentTheme = this.createFallbackTheme();
            return false;
        }
    }

    createFallbackTheme() {
        return {
            name: 'Fallback',
            colors: {
                primary: '#ffffff',
                secondary: '#cccccc',
                accent: '#ffff00',
                background: '#000000'
            },
            playerShip: {
                color: '#00ff00',
                accentColor: '#ffffff',
                width: 40,
                height: 30,
                glowEffect: false
            },
            enemyShip: {
                color: '#ff0000',
                accentColor: '#ffffff',
                width: 40,
                height: 30,
                glowEffect: false
            },
            background: {
                starColor: '#ffffff',
                gradientStart: '#000033',
                gradientEnd: '#000000',
                effectType: 'none'
            },
            bullets: {
                color: '#ffff00',
                glowColor: '#ffffff',
                glowIntensity: 0
            },
            particles: {
                colors: ['#ffffff', '#ffff00', '#ff0000'],
                glowEffect: false
            },
            ui: {
                textColor: '#ffffff',
                accentColor: '#ffff00',
                glowEffect: false
            }
        };
    }

    getCurrentTheme() {
        return this.currentTheme;
    }

    getPlayerShipConfig() {
        return this.currentTheme.playerShip;
    }

    getEnemyShipConfig() {
        return this.currentTheme.enemyShip;
    }

    getBackgroundConfig() {
        return this.currentTheme.background;
    }

    getBulletConfig() {
        return this.currentTheme.bullets;
    }

    getParticleConfig() {
        return this.currentTheme.particles;
    }

    getUIConfig() {
        return this.currentTheme.ui;
    }

    getAllThemes() {
        return Object.keys(this.themes).map(key => ({
            key: key,
            name: this.themes[key].name,
            colors: this.themes[key].colors
        }));
    }

    drawThemedBackground(ctx, canvas, animationTime) {
        const bgConfig = this.getBackgroundConfig();

        // Create gradient background
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, bgConfig.gradientStart);
        gradient.addColorStop(1, bgConfig.gradientEnd);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw themed stars
        this.drawThemedStars(ctx, canvas, animationTime);

        // Draw theme-specific background effects
        switch (bgConfig.effectType) {
            case 'digital_grid':
                this.drawDigitalGrid(ctx, canvas, animationTime);
                break;
            case 'nebula':
                this.drawNebula(ctx, canvas, animationTime);
                break;
            case 'cityscape':
                this.drawCityscape(ctx, canvas, animationTime);
                break;
        }
    }

    drawThemedStars(ctx, canvas, animationTime) {
        const bgConfig = this.getBackgroundConfig();
        ctx.fillStyle = bgConfig.starColor;

        for (let i = 0; i < 100; i++) {
            const x = (i * 37) % canvas.width;
            const y = (i * 23 + animationTime * 0.02) % canvas.height;
            const twinkle = Math.sin(animationTime * 0.01 + i) * 0.5 + 0.5;
            ctx.globalAlpha = twinkle * 0.8 + 0.2;
            ctx.fillRect(x, y, 1, 1);
        }
        ctx.globalAlpha = 1;
    }

    drawDigitalGrid(ctx, canvas, animationTime) {
        ctx.strokeStyle = this.currentTheme.colors.primary;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.3;

        const gridSize = 50;
        const offset = (animationTime * 0.01) % gridSize;

        // Vertical lines
        for (let x = -offset; x < canvas.width + gridSize; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }

        // Horizontal lines
        for (let y = -offset; y < canvas.height + gridSize; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }

        ctx.globalAlpha = 1;
    }

    drawNebula(ctx, canvas, animationTime) {
        ctx.globalAlpha = 0.4;

        // Create nebula clouds
        for (let i = 0; i < 5; i++) {
            const x = (i * 150 + Math.sin(animationTime * 0.001 + i) * 50) % (canvas.width + 100);
            const y = (i * 80 + Math.cos(animationTime * 0.0008 + i) * 30) % (canvas.height + 50);

            const gradient = ctx.createRadialGradient(x, y, 0, x, y, 80);
            gradient.addColorStop(0, this.currentTheme.colors.secondary);
            gradient.addColorStop(1, 'transparent');

            ctx.fillStyle = gradient;
            ctx.fillRect(x - 80, y - 80, 160, 160);
        }

        ctx.globalAlpha = 1;
    }

    drawCityscape(ctx, canvas, animationTime) {
        ctx.fillStyle = this.currentTheme.colors.primary;
        ctx.globalAlpha = 0.6;

        // Draw building silhouettes
        const buildings = [
            { x: 0, width: 80, height: 120 },
            { x: 80, width: 60, height: 90 },
            { x: 140, width: 100, height: 150 },
            { x: 240, width: 70, height: 100 },
            { x: 310, width: 90, height: 130 },
            { x: 400, width: 120, height: 110 },
            { x: 520, width: 80, height: 140 },
            { x: 600, width: 100, height: 95 },
            { x: 700, width: 100, height: 125 }
        ];

        buildings.forEach(building => {
            const buildingY = canvas.height - building.height;
            ctx.fillRect(building.x, buildingY, building.width, building.height);

            // Add windows
            ctx.fillStyle = this.currentTheme.colors.accent;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < Math.floor(building.height / 20); j++) {
                    if (Math.random() > 0.7) {
                        ctx.fillRect(
                            building.x + 10 + i * 20,
                            buildingY + 10 + j * 20,
                            8, 8
                        );
                    }
                }
            }
            ctx.fillStyle = this.currentTheme.colors.primary;
        });

        ctx.globalAlpha = 1;
    }
}

class GameStateManager {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.currentState = GAME_STATES.INTRO;
        this.keys = {};

        // Initialize game systems
        this.game = null;
        this.themeManager = new ThemeManager();

        this.setupEventListeners();
        this.gameLoop();
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
            this.handleKeyDown(e);
        });

        document.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });

        // Mouse event listeners for button interactions
        this.canvas.addEventListener('mousemove', (e) => {
            this.handleMouseMove(e);
        });

        this.canvas.addEventListener('click', (e) => {
            this.handleMouseClick(e);
        });

        // Initialize transition system
        this.transitionAlpha = 0;
        this.isTransitioning = false;
        this.transitionDirection = 'in'; // 'in' or 'out'
        this.nextState = null;
    }

    handleKeyDown(e) {
        switch (this.currentState) {
            case GAME_STATES.INTRO:
                if (e.code === 'Space' || e.code === 'Enter') {
                    e.preventDefault();
                    this.transitionTo(GAME_STATES.THEME_SELECT);
                }
                break;

            case GAME_STATES.THEME_SELECT:
                if (this.themeSelectScreen) {
                    const result = this.themeSelectScreen.handleKeyDown(e.code);
                    if (result === 'confirm') {
                        e.preventDefault();
                        this.transitionTo(GAME_STATES.PLAYING);
                    } else if (result) {
                        e.preventDefault();
                    }
                }
                break;

            case GAME_STATES.PLAYING:
                if (this.game) {
                    this.game.handleKeyDown(e);
                }
                break;

            case GAME_STATES.GAME_OVER:
                if (e.code === 'KeyR') {
                    e.preventDefault();
                    this.transitionTo(GAME_STATES.PLAYING);
                } else if (e.code === 'Escape') {
                    e.preventDefault();
                    this.transitionTo(GAME_STATES.INTRO);
                }
                break;
        }
    }

    transitionTo(newState) {
        if (this.isTransitioning) return; // Prevent multiple transitions

        console.log(`Transitioning from ${this.currentState} to ${newState}`);

        // Trigger UI transition effect
        this.triggerUITransition();

        // Start transition out
        this.isTransitioning = true;
        this.transitionDirection = 'out';
        this.nextState = newState;
        this.transitionAlpha = 0;
    }

    triggerUITransition() {
        const transitionOverlay = document.getElementById('transitionOverlay');
        if (transitionOverlay) {
            transitionOverlay.classList.add('active');
            setTimeout(() => {
                transitionOverlay.classList.remove('active');
            }, 500);
        }
    }

    completeTransition() {
        // Clean up current state
        this.exitCurrentState();

        // Set new state
        this.currentState = this.nextState;
        this.nextState = null;

        // Initialize new state
        this.enterNewState();

        // Start transition in
        this.transitionDirection = 'in';
        this.transitionAlpha = 1;
    }

    exitCurrentState() {
        switch (this.currentState) {
            case GAME_STATES.INTRO:
                // Clean up intro screen
                if (this.introScreen) {
                    // Reset cursor style
                    document.body.style.cursor = 'default';
                }
                break;

            case GAME_STATES.THEME_SELECT:
                // Clean up theme selection screen
                if (this.themeSelectScreen) {
                    // Reset cursor style
                    document.body.style.cursor = 'default';
                }
                break;

            case GAME_STATES.PLAYING:
                // Clean up game instance if needed
                // Keep game instance for game over screen to show final score
                break;

            case GAME_STATES.GAME_OVER:
                // Clean up game over screen
                break;
        }
    }

    enterNewState() {
        switch (this.currentState) {
            case GAME_STATES.INTRO:
                // Initialize intro screen
                this.introScreen = new IntroScreen(this.canvas, this.ctx);
                break;

            case GAME_STATES.THEME_SELECT:
                // Initialize theme selection screen
                this.themeSelectScreen = new ThemeSelectionScreen(this.canvas, this.ctx, this.themeManager);
                break;

            case GAME_STATES.PLAYING:
                // Initialize or restart game with current theme
                this.game = new Game(this);
                // Apply current theme to UI immediately
                this.game.updateUI();
                // Ensure power-up system is properly initialized
                if (!this.game.powerUpSystem) {
                    this.game.powerUpSystem = new PowerUpSystem();
                }
                break;

            case GAME_STATES.GAME_OVER:
                // Initialize game over screen - preserve game instance for score display
                break;
        }
    }

    update() {
        try {
            // Handle transitions with smoother animation
            if (this.isTransitioning) {
                if (this.transitionDirection === 'out') {
                    this.transitionAlpha += 0.08; // Slightly faster fade out
                    if (this.transitionAlpha >= 1) {
                        this.completeTransition();
                    }
                } else if (this.transitionDirection === 'in') {
                    this.transitionAlpha -= 0.06; // Slightly slower fade in for smoother appearance
                    if (this.transitionAlpha <= 0) {
                        this.transitionAlpha = 0;
                        this.isTransitioning = false;
                    }
                }
            }

            // Update current state with error handling
            switch (this.currentState) {
                case GAME_STATES.INTRO:
                    this.updateIntroScreen();
                    break;

                case GAME_STATES.THEME_SELECT:
                    this.updateThemeSelectScreen();
                    break;

                case GAME_STATES.PLAYING:
                    if (this.game) {
                        this.game.update();
                        // Check if game should transition to game over
                        if (!this.game.gameRunning) {
                            this.transitionTo(GAME_STATES.GAME_OVER);
                        }
                    }
                    break;

                case GAME_STATES.GAME_OVER:
                    this.updateGameOverScreen();
                    break;

                default:
                    console.warn(`Unknown game state: ${this.currentState}`);
                    this.transitionTo(GAME_STATES.INTRO);
                    break;
            }
        } catch (error) {
            console.error('GameStateManager update error:', error);
            // Try to recover by going to intro screen
            this.currentState = GAME_STATES.INTRO;
            this.isTransitioning = false;
        }
    }

    render() {
        try {
            // Clear canvas
            this.ctx.fillStyle = 'rgba(0, 0, 0, 1)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            // Render current state with error handling
            switch (this.currentState) {
                case GAME_STATES.INTRO:
                    this.renderIntroScreen();
                    break;

                case GAME_STATES.THEME_SELECT:
                    this.renderThemeSelectScreen();
                    break;

                case GAME_STATES.PLAYING:
                    if (this.game) {
                        this.game.render();
                    }
                    break;

                case GAME_STATES.GAME_OVER:
                    this.renderGameOverScreen();
                    break;

                default:
                    this.renderFallbackScreen();
                    break;
            }

            // Render transition overlay with enhanced effects
            this.renderTransitionOverlay();

        } catch (error) {
            console.error('GameStateManager render error:', error);
            this.renderErrorScreen(error);
        }
    }

    renderTransitionOverlay() {
        if (this.isTransitioning && this.transitionAlpha > 0) {
            // Main transition overlay
            this.ctx.fillStyle = `rgba(0, 0, 0, ${this.transitionAlpha})`;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            // Add subtle glow effect during transition
            if (this.transitionDirection === 'out' && this.transitionAlpha > 0.5) {
                this.ctx.shadowColor = '#00ffff';
                this.ctx.shadowBlur = 20 * (this.transitionAlpha - 0.5) * 2;
                this.ctx.strokeStyle = `rgba(0, 255, 255, ${(this.transitionAlpha - 0.5) * 0.5})`;
                this.ctx.lineWidth = 2;
                this.ctx.strokeRect(10, 10, this.canvas.width - 20, this.canvas.height - 20);
                this.ctx.shadowBlur = 0;
            }
        }
    }

    renderFallbackScreen() {
        this.ctx.fillStyle = '#000033';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '24px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Loading...', this.canvas.width / 2, this.canvas.height / 2);
    }

    renderErrorScreen(error) {
        this.ctx.fillStyle = '#330000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#ff6666';
        this.ctx.font = '24px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Rendering Error', this.canvas.width / 2, this.canvas.height / 2 - 20);

        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '16px Arial';
        this.ctx.fillText('Press F5 to reload', this.canvas.width / 2, this.canvas.height / 2 + 20);
    }

    // Intro Screen Methods
    updateIntroScreen() {
        if (!this.introScreen) {
            this.introScreen = new IntroScreen(this.canvas, this.ctx);
        }
        this.introScreen.update();
    }

    renderIntroScreen() {
        if (!this.introScreen) {
            this.introScreen = new IntroScreen(this.canvas, this.ctx);
        }
        this.introScreen.render(this.themeManager);
    }

    // Theme Selection Screen Methods
    updateThemeSelectScreen() {
        if (!this.themeSelectScreen) {
            this.themeSelectScreen = new ThemeSelectionScreen(this.canvas, this.ctx, this.themeManager);
        }
        this.themeSelectScreen.update();
    }

    renderThemeSelectScreen() {
        if (!this.themeSelectScreen) {
            this.themeSelectScreen = new ThemeSelectionScreen(this.canvas, this.ctx, this.themeManager);
        }
        this.themeSelectScreen.render();
    }

    // Game Over Screen Methods
    updateGameOverScreen() {
        // Placeholder for game over screen updates
    }

    renderGameOverScreen() {
        // Draw themed background
        this.themeManager.drawThemedBackground(this.ctx, this.canvas, Date.now());

        // Draw game over overlay
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        const uiConfig = this.themeManager.getUIConfig();

        // Game Over title with enhanced styling
        if (uiConfig.glowEffect) {
            this.ctx.shadowColor = uiConfig.accentColor;
            this.ctx.shadowBlur = 25;
        }

        this.ctx.fillStyle = uiConfig.textColor;
        this.ctx.font = 'bold 56px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2 - 80);

        // Final score display
        if (this.game) {
            if (uiConfig.glowEffect) {
                this.ctx.shadowBlur = 15;
            }
            this.ctx.font = 'bold 28px Arial';
            this.ctx.fillStyle = uiConfig.accentColor;
            this.ctx.fillText(`Final Score: ${this.game.score.toLocaleString()}`, this.canvas.width / 2, this.canvas.height / 2 - 20);

            // Additional stats
            this.ctx.font = '18px Arial';
            this.ctx.fillStyle = uiConfig.textColor;
            const level = Math.floor(this.game.score / 500) + 1;
            this.ctx.fillText(`Level Reached: ${level}`, this.canvas.width / 2, this.canvas.height / 2 + 10);
        }

        // Control instructions with enhanced styling
        if (uiConfig.glowEffect) {
            this.ctx.shadowBlur = 8;
        }
        this.ctx.font = 'bold 20px Arial';
        this.ctx.fillStyle = uiConfig.textColor;
        this.ctx.fillText('Press R to Play Again', this.canvas.width / 2, this.canvas.height / 2 + 60);
        this.ctx.fillText('Press ESC to Return to Menu', this.canvas.width / 2, this.canvas.height / 2 + 90);

        // Theme indicator removed for cleaner UI

        // Reset shadow
        this.ctx.shadowBlur = 0;
    }

    drawStars() {
        this.themeManager.drawThemedBackground(this.ctx, this.canvas, Date.now());
    }

    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Update mouse position for current screen
        switch (this.currentState) {
            case GAME_STATES.INTRO:
                if (this.introScreen) {
                    this.introScreen.handleMouseMove(mouseX, mouseY);
                }
                break;
            case GAME_STATES.THEME_SELECT:
                if (this.themeSelectScreen) {
                    this.themeSelectScreen.handleMouseMove(mouseX, mouseY);
                }
                break;
        }
    }

    handleMouseClick(e) {
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Handle click for current screen
        switch (this.currentState) {
            case GAME_STATES.INTRO:
                if (this.introScreen && this.introScreen.handleMouseClick(mouseX, mouseY)) {
                    this.transitionTo(GAME_STATES.THEME_SELECT);
                }
                break;
            case GAME_STATES.THEME_SELECT:
                if (this.themeSelectScreen) {
                    const result = this.themeSelectScreen.handleMouseClick(mouseX, mouseY);
                    if (result === 'confirm') {
                        this.transitionTo(GAME_STATES.PLAYING);
                    }
                }
                break;
        }
    }

    gameLoop() {
        try {
            // Performance monitoring
            const frameStart = performance.now();

            // Update game state
            this.update();

            // Render with performance optimization
            this.render();

            // Performance tracking
            const frameTime = performance.now() - frameStart;
            this.trackPerformance(frameTime);

        } catch (error) {
            console.error('Game loop error:', error);
            this.handleGameLoopError(error);
        }

        requestAnimationFrame(() => this.gameLoop());
    }

    trackPerformance(frameTime) {
        // Simple performance tracking
        if (!this.performanceMetrics) {
            this.performanceMetrics = {
                frameCount: 0,
                totalFrameTime: 0,
                maxFrameTime: 0,
                lastFPSUpdate: Date.now()
            };
        }

        this.performanceMetrics.frameCount++;
        this.performanceMetrics.totalFrameTime += frameTime;
        this.performanceMetrics.maxFrameTime = Math.max(this.performanceMetrics.maxFrameTime, frameTime);

        // Log performance every 5 seconds
        const now = Date.now();
        if (now - this.performanceMetrics.lastFPSUpdate > 5000) {
            const avgFrameTime = this.performanceMetrics.totalFrameTime / this.performanceMetrics.frameCount;
            const fps = 1000 / avgFrameTime;

            if (fps < 45) {
                console.warn(`Performance warning: Average FPS: ${fps.toFixed(1)}, Max frame time: ${this.performanceMetrics.maxFrameTime.toFixed(2)}ms`);
            }

            // Reset metrics
            this.performanceMetrics = {
                frameCount: 0,
                totalFrameTime: 0,
                maxFrameTime: 0,
                lastFPSUpdate: now
            };
        }
    }

    handleGameLoopError(error) {
        // Fallback error handling
        console.error('Critical game loop error, attempting recovery:', error);

        // Try to recover by resetting to a safe state
        try {
            if (this.currentState === GAME_STATES.PLAYING && this.game) {
                // Reset game to a safe state
                this.game.gameRunning = false;
                this.transitionTo(GAME_STATES.GAME_OVER);
            } else {
                // Return to intro screen as fallback
                this.transitionTo(GAME_STATES.INTRO);
            }
        } catch (recoveryError) {
            console.error('Failed to recover from game loop error:', recoveryError);
            // Last resort: reload the page
            location.reload();
        }
    }
}

class Game {
    constructor(stateManager) {
        this.stateManager = stateManager;
        this.canvas = stateManager.canvas;
        this.ctx = stateManager.ctx;
        this.score = 0;
        this.lives = 3;
        this.gameRunning = true;
        this.timeScale = 1.0; // For time slow power-up

        // Initialize game objects with theme integration
        this.player = new Player(this.canvas.width / 2, this.canvas.height - 50);
        this.bullets = [];
        this.enemies = [];
        this.particles = [];
        this.powerUpSystem = new PowerUpSystem();

        this.lastEnemySpawn = 0;
        this.enemySpawnRate = 1000; // milliseconds

        // Visual effects
        this.screenFlash = null;
        this.powerUpNotification = null;
        this.scorePopups = [];

        // Initialize UI with current theme
        this.updateUI();

        // Ensure theme is applied to all rendering components
        this.applyThemeToGameObjects();
    }

    handleKeyDown(e) {
        if (e.code === 'Space') {
            e.preventDefault();
            this.player.shoot(this.bullets, this.enemies);
        }
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;

            if (e.code === 'Space') {
                e.preventDefault();
                this.player.shoot(this.bullets);
            }

            if (e.code === 'KeyR' && !this.gameRunning) {
                this.restart();
            }
        });

        document.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });
    }

    update() {
        if (!this.gameRunning) return;

        try {
            // Update player with error handling
            this.player.update(this.stateManager.keys, this.canvas);

            // Update power-up system with performance monitoring
            this.powerUpSystem.update(this);

            // Optimized bullet updates with batch processing
            this.updateBullets();

            // Optimized enemy spawning and updates
            this.updateEnemies();

            // Check collisions with spatial optimization
            this.checkCollisions();

            // Update particles with performance limits
            this.updateParticles();

            // Update visual effects
            this.updateVisualEffects();

            // Update score popups
            this.updateScorePopups();

            // Check game over condition
            if (this.lives <= 0) {
                this.gameRunning = false;
            }

        } catch (error) {
            console.error('Game update error:', error);
            // Continue game but log error
        }
    }

    updateBullets() {
        // Batch process bullets for better performance
        const bulletCount = this.bullets.length;
        if (bulletCount === 0) return;

        // Use for loop for better performance than filter
        for (let i = bulletCount - 1; i >= 0; i--) {
            const bullet = this.bullets[i];
            bullet.update(this.enemies);

            // Remove bullets that are off-screen
            if (bullet.y < -10 || bullet.x < -10 || bullet.x > this.canvas.width + 10) {
                this.bullets.splice(i, 1);
            }
        }
    }

    updateEnemies() {
        // Spawn enemies with performance consideration
        const now = Date.now();
        if (now - this.lastEnemySpawn > this.enemySpawnRate) {
            this.spawnEnemy();
            this.lastEnemySpawn = now;

            // Increase difficulty over time
            if (this.enemySpawnRate > 300) {
                this.enemySpawnRate -= 5;
            }
        }

        // Update existing enemies
        const enemyCount = this.enemies.length;
        for (let i = enemyCount - 1; i >= 0; i--) {
            const enemy = this.enemies[i];
            enemy.update(this.timeScale);

            // Check if enemy reached bottom
            if (enemy.y > this.canvas.height) {
                this.enemies.splice(i, 1);
                this.lives--;
                this.updateUI();
            }
        }
    }

    spawnEnemy() {
        // Determine enemy type based on probability
        let enemyType = 'basic';
        const rand = Math.random();

        if (rand < 0.1) { // 10% chance for armored
            enemyType = 'armored';
        } else if (rand < 0.02) { // 2% chance for boss
            enemyType = 'boss';
        }

        // Adjust spawn position for boss enemies (larger size)
        const enemyWidth = enemyType === 'boss' ? 60 : 40;
        this.enemies.push(new Enemy(
            Math.random() * (this.canvas.width - enemyWidth),
            -45, // Slightly higher spawn for larger enemies
            enemyType
        ));
    }

    updateParticles() {
        // Limit particle count for performance
        const maxParticles = 150;
        if (this.particles.length > maxParticles) {
            this.particles = this.particles.slice(0, maxParticles);
        }

        // Update particles efficiently
        const particleCount = this.particles.length;
        for (let i = particleCount - 1; i >= 0; i--) {
            const particle = this.particles[i];
            particle.update();

            if (particle.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }

    updateScorePopups() {
        if (!this.scorePopups || this.scorePopups.length === 0) return;

        const popupCount = this.scorePopups.length;
        for (let i = popupCount - 1; i >= 0; i--) {
            const popup = this.scorePopups[i];
            popup.life--;
            popup.y += popup.vy;
            popup.vy *= 0.98; // Slow down over time

            if (popup.life <= 0) {
                this.scorePopups.splice(i, 1);
            }
        }
    }

    checkCollisions() {
        // Bullet-Enemy collisions
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            for (let j = this.enemies.length - 1; j >= 0; j--) {
                if (this.bullets[i] && this.enemies[j] &&
                    this.bullets[i].collidesWith(this.enemies[j])) {

                    // Apply damage to enemy (use player's bullet damage)
                    const damage = this.player.bulletDamage || 1;
                    const enemyDestroyed = this.enemies[j].takeDamage(damage);

                    // Remove bullet unless it has penetration
                    if (!this.player.bulletPenetration) {
                        this.bullets.splice(i, 1);
                    }

                    if (enemyDestroyed) {
                        const enemy = this.enemies[j];

                        // Create explosion particles with enhanced effects
                        this.createExplosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, 'enemy');

                        // Calculate score based on enemy type
                        let scoreValue = 10;
                        switch (enemy.type) {
                            case 'armored':
                                scoreValue = 30;
                                break;
                            case 'boss':
                                scoreValue = 100;
                                // Add extra screen shake for boss destruction
                                this.addScreenShake(8, 400);
                                break;
                        }

                        // Add score popup effect before removing enemy
                        this.addScorePopup(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, scoreValue);

                        // Remove enemy and increase score
                        this.enemies.splice(j, 1);
                        this.score += scoreValue;
                        this.updateUI();
                    }

                    // Break if bullet was removed (no penetration)
                    if (!this.player.bulletPenetration) {
                        break;
                    }
                }
            }
        }

        // Player-Enemy collisions (only if not invincible)
        if (!this.player.invincible) {
            for (let i = this.enemies.length - 1; i >= 0; i--) {
                if (this.enemies[i].collidesWith(this.player)) {
                    const enemy = this.enemies[i];

                    // Create explosion with enhanced effects
                    this.createExplosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, 'enemy');

                    // Add screen shake for player hit
                    this.addScreenShake(6, 300);

                    // Add screen flash effect for damage
                    this.screenFlash = {
                        color: '#ff0000',
                        alpha: 0.4,
                        duration: 400,
                        startTime: Date.now()
                    };

                    this.enemies.splice(i, 1);
                    this.lives--;
                    this.updateUI();
                }
            }
        }

        // Power-up collisions - ensure proper integration with game mechanics
        this.powerUpSystem.checkCollisions(this.player, this);

        // Apply any active power-up effects to gameplay
        this.applyActivePowerUpEffects();
    }

    createExplosion(x, y, type = 'enemy') {
        // Enhanced particle system with theme-aware colors
        const particleConfig = this.stateManager.themeManager.getParticleConfig();
        const particleCount = type === 'enemy' ? 8 : 12;
        const particleSpeed = type === 'enemy' ? 1 : 1.5;

        for (let i = 0; i < particleCount; i++) {
            const particle = new Particle(x, y);
            if (type === 'powerup') {
                // Enhanced particles for power-up collection
                particle.vx *= particleSpeed;
                particle.vy *= particleSpeed;
                particle.life = 40;
                particle.maxLife = 40;
            }
            this.particles.push(particle);
        }

        // Add screen shake effect for explosions
        if (type === 'enemy') {
            this.addScreenShake(3, 200);
        }
    } ion(x, y, type = 'enemy') {
        const particleCount = type === 'enemy' ? 8 : 12;
        const particleSpeed = type === 'enemy' ? 1 : 1.5;

        for (let i = 0; i < particleCount; i++) {
            const particle = new Particle(x, y);
            if (type === 'powerup') {
                // Enhanced particles for power-up collection
                particle.vx *= particleSpeed;
                particle.vy *= particleSpeed;
                particle.life = 40;
                particle.maxLife = 40;
            }
            this.particles.push(particle);
        }

        // Add screen shake effect for explosions
        if (type === 'enemy') {
            this.addScreenShake(3, 200);
        }
    }

    addScreenShake(intensity, duration) {
        this.screenShake = {
            intensity: intensity,
            duration: duration,
            startTime: Date.now(),
            offsetX: 0,
            offsetY: 0
        };
    }

    addScorePopup(x, y, score) {
        if (!this.scorePopups) {
            this.scorePopups = [];
        }

        this.scorePopups.push({
            x: x,
            y: y,
            score: score,
            life: 60,
            maxLife: 60,
            vy: -2
        });
    }

    updateVisualEffects() {
        const now = Date.now();

        // Update screen flash effect
        if (this.screenFlash) {
            const elapsed = now - this.screenFlash.startTime;
            if (elapsed >= this.screenFlash.duration) {
                this.screenFlash = null;
            } else {
                const progress = elapsed / this.screenFlash.duration;
                this.screenFlash.alpha = 0.3 * (1 - progress);
            }
        }

        // Update power-up notification
        if (this.powerUpNotification) {
            const elapsed = now - this.powerUpNotification.startTime;
            if (elapsed >= this.powerUpNotification.duration) {
                this.powerUpNotification = null;
            } else {
                const progress = elapsed / this.powerUpNotification.duration;
                if (progress > 0.8) {
                    // Fade out in last 20%
                    this.powerUpNotification.alpha = (1 - progress) / 0.2;
                }
            }
        }
    }

    render() {
        try {
            // Apply screen shake if active
            this.ctx.save();
            if (this.screenShake) {
                const elapsed = Date.now() - this.screenShake.startTime;
                if (elapsed < this.screenShake.duration) {
                    const progress = elapsed / this.screenShake.duration;
                    const intensity = this.screenShake.intensity * (1 - progress);
                    this.screenShake.offsetX = (Math.random() - 0.5) * intensity * 2;
                    this.screenShake.offsetY = (Math.random() - 0.5) * intensity * 2;
                    this.ctx.translate(this.screenShake.offsetX, this.screenShake.offsetY);
                } else {
                    this.screenShake = null;
                }
            }

            // Optimized canvas clearing with performance consideration
            if (this.particles.length > 50) {
                // Full clear for heavy particle scenes
                this.ctx.fillStyle = 'rgba(0, 0, 0, 1)';
                this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            } else {
                // Trail effect for lighter scenes
                this.ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
                this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            }

            // Draw background with caching optimization
            this.drawStarsOptimized();

            // Batch render game objects for better performance
            this.renderGameObjects();

            // Draw UI elements
            this.renderUIElements();

            this.ctx.restore();

        } catch (error) {
            console.error('Render error:', error);
            // Fallback rendering
            this.renderFallback();
        }
    }

    drawStarsOptimized() {
        // Use cached background when possible
        if (!this.backgroundCache || Date.now() - this.lastBackgroundUpdate > 100) {
            this.stateManager.themeManager.drawThemedBackground(this.ctx, this.canvas, Date.now());
            this.lastBackgroundUpdate = Date.now();
        }
    }

    renderGameObjects() {
        const themeManager = this.stateManager.themeManager;

        // Render in optimal order (back to front)
        try {
            // Player
            this.player.draw(this.ctx, themeManager);

            // Bullets (batch render for performance)
            if (this.bullets.length > 0) {
                this.bullets.forEach(bullet => bullet.draw(this.ctx, themeManager));
            }

            // Enemies (batch render for performance)
            if (this.enemies.length > 0) {
                this.enemies.forEach(enemy => enemy.draw(this.ctx, themeManager));
            }

            // Particles (limit rendering for performance)
            if (this.particles.length > 0) {
                const maxParticles = 100; // Performance limit
                const particlesToRender = this.particles.slice(0, maxParticles);
                particlesToRender.forEach(particle => particle.draw(this.ctx, themeManager));
            }

            // Power-ups
            this.powerUpSystem.render(this.ctx, themeManager);

        } catch (error) {
            console.error('Game object rendering error:', error);
        }
    }

    renderUIElements() {
        try {
            // Draw visual effects
            this.renderVisualEffects();

            // Draw active power-ups UI
            this.renderActivePowerUps();

            // Draw score popups
            this.renderScorePopups();

        } catch (error) {
            console.error('UI rendering error:', error);
        }
    }

    renderFallback() {
        // Minimal fallback rendering in case of errors
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = 'white';
        this.ctx.font = '24px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Rendering Error - Game Continuing', this.canvas.width / 2, this.canvas.height / 2);
    }

    renderVisualEffects() {
        // Draw screen flash effect
        if (this.screenFlash && this.screenFlash.alpha > 0) {
            const color = this.screenFlash.color;
            const r = parseInt(color.slice(1, 3), 16);
            const g = parseInt(color.slice(3, 5), 16);
            const b = parseInt(color.slice(5, 7), 16);

            this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.screenFlash.alpha})`;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }

        // Draw power-up notification
        if (this.powerUpNotification && this.powerUpNotification.alpha > 0) {
            this.ctx.save();
            this.ctx.globalAlpha = this.powerUpNotification.alpha;

            // Enhanced notification panel
            const panelWidth = 400;
            const panelHeight = 100;
            const panelX = this.canvas.width / 2 - panelWidth / 2;
            const panelY = 40;

            // Background with glow effect
            this.ctx.shadowColor = this.powerUpNotification.color;
            this.ctx.shadowBlur = 20;
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
            this.ctx.fillRect(panelX, panelY, panelWidth, panelHeight);

            // Border
            this.ctx.strokeStyle = this.powerUpNotification.color;
            this.ctx.lineWidth = 3;
            this.ctx.strokeRect(panelX, panelY, panelWidth, panelHeight);

            // Reset shadow for text
            this.ctx.shadowBlur = 0;

            // Power-up icon
            const iconSize = 30;
            const iconX = panelX + 15;
            const iconY = panelY + 15;

            this.ctx.fillStyle = this.powerUpNotification.color;
            this.ctx.fillRect(iconX, iconY, iconSize, iconSize);

            this.ctx.fillStyle = '#ffffff';
            this.ctx.font = 'bold 18px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(this.powerUpNotification.symbol, iconX + iconSize / 2, iconY + 22);

            // Header text
            this.ctx.fillStyle = this.powerUpNotification.color;
            this.ctx.font = 'bold 18px Arial';
            this.ctx.textAlign = 'left';
            this.ctx.fillText('POWER-UP COLLECTED!', iconX + iconSize + 15, panelY + 25);

            // Power-up name
            this.ctx.font = 'bold 16px Arial';
            this.ctx.fillStyle = '#ffffff';
            this.ctx.fillText(this.powerUpNotification.name, iconX + iconSize + 15, panelY + 45);

            // Power-up description (truncated if too long)
            this.ctx.font = '12px Arial';
            this.ctx.fillStyle = '#cccccc';
            let description = this.powerUpNotification.description;
            if (description.length > 50) {
                description = description.substring(0, 47) + '...';
            }
            this.ctx.fillText(description, iconX + iconSize + 15, panelY + 65);

            // Duration indicator
            const elapsed = Date.now() - this.powerUpNotification.startTime;
            const progress = elapsed / this.powerUpNotification.duration;
            const barWidth = panelWidth - 30;
            const barHeight = 4;
            const barX = panelX + 15;
            const barY = panelY + panelHeight - 15;

            // Progress bar background
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            this.ctx.fillRect(barX, barY, barWidth, barHeight);

            // Progress bar fill
            this.ctx.fillStyle = this.powerUpNotification.color;
            this.ctx.fillRect(barX, barY, barWidth * (1 - progress), barHeight);

            this.ctx.restore();
        }
    }

    renderActivePowerUps() {
        const activePowerUps = this.powerUpSystem.getActivePowerUps();
        if (activePowerUps.length === 0) return;

        const startX = this.canvas.width - 220;
        const startY = 60;
        const itemHeight = 35;
        const itemWidth = 200;

        // Enhanced background panel with theme colors
        const uiConfig = this.stateManager.themeManager.getUIConfig();
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
        this.ctx.fillRect(startX - 10, startY - 25, itemWidth + 20, activePowerUps.length * itemHeight + 35);

        // Enhanced panel border with glow
        if (uiConfig.glowEffect) {
            this.ctx.shadowColor = uiConfig.accentColor;
            this.ctx.shadowBlur = 10;
        }
        this.ctx.strokeStyle = uiConfig.accentColor;
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(startX - 10, startY - 25, itemWidth + 20, activePowerUps.length * itemHeight + 35);
        this.ctx.shadowBlur = 0;

        // Title with theme styling
        this.ctx.fillStyle = uiConfig.textColor;
        this.ctx.font = 'bold 14px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('ACTIVE POWER-UPS', startX + itemWidth / 2, startY - 8);

        // Draw each active power-up
        activePowerUps.forEach((powerUp, index) => {
            const y = startY + index * itemHeight;
            const progress = powerUp.timeRemaining / powerUp.config.duration;

            // Power-up icon background with glow
            if (uiConfig.glowEffect) {
                this.ctx.shadowColor = powerUp.config.color;
                this.ctx.shadowBlur = 8;
            }
            this.ctx.fillStyle = powerUp.config.color;
            this.ctx.fillRect(startX, y, 25, 25);
            this.ctx.shadowBlur = 0;

            // Power-up symbol
            this.ctx.fillStyle = '#ffffff';
            this.ctx.font = 'bold 12px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(powerUp.config.symbol, startX + 12.5, y + 17);

            // Power-up name
            this.ctx.fillStyle = '#ffffff';
            this.ctx.font = '12px Arial';
            this.ctx.textAlign = 'left';
            this.ctx.fillText(powerUp.config.name, startX + 30, y + 12);

            // Timer bar background
            const barX = startX + 30;
            const barY = y + 16;
            const barWidth = 140;
            const barHeight = 6;

            this.ctx.fillStyle = '#333333';
            this.ctx.fillRect(barX, barY, barWidth, barHeight);

            // Timer bar fill with warning color
            this.ctx.fillStyle = progress > 0.3 ? powerUp.config.color : '#ff4444';
            this.ctx.fillRect(barX, barY, barWidth * progress, barHeight);

            // Timer bar border
            this.ctx.strokeStyle = '#666666';
            this.ctx.lineWidth = 1;
            this.ctx.strokeRect(barX, barY, barWidth, barHeight);

            // Time remaining text with warning
            const timeLeft = Math.ceil(powerUp.timeRemaining / 1000);
            this.ctx.fillStyle = progress > 0.3 ? '#ffffff' : '#ff4444';
            this.ctx.font = progress > 0.3 ? '10px Arial' : 'bold 10px Arial';
            this.ctx.textAlign = 'right';
            this.ctx.fillText(`${timeLeft}s`, startX + itemWidth - 5, y + 21);
        });
    }

    renderScorePopups() {
        if (!this.scorePopups || this.scorePopups.length === 0) return;

        this.scorePopups.forEach(popup => {
            const alpha = popup.life / popup.maxLife;
            const scale = 1 + (1 - alpha) * 0.5; // Grow as it fades

            this.ctx.save();
            this.ctx.globalAlpha = alpha;
            this.ctx.translate(popup.x, popup.y);
            this.ctx.scale(scale, scale);

            // Score text with glow effect
            this.ctx.shadowColor = '#ffff00';
            this.ctx.shadowBlur = 10;
            this.ctx.fillStyle = '#ffff00';
            this.ctx.font = 'bold 16px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(`+${popup.score}`, 0, 0);

            this.ctx.restore();
        });
    }

    drawStars() {
        this.stateManager.themeManager.drawThemedBackground(this.ctx, this.canvas, Date.now());
    }

    applyThemeToGameObjects() {
        // Ensure all game objects use the current theme for rendering
        // This method is called when theme changes or game starts
        const currentTheme = this.stateManager.themeManager.getCurrentTheme();
        console.log(`Applying theme to game objects: ${currentTheme.name}`);

        // Theme is applied through the themeManager parameter in draw methods
        // No additional setup needed as all draw methods accept themeManager
    }

    applyActivePowerUpEffects() {
        // Ensure active power-up effects are properly applied to gameplay
        // This is handled by the PowerUpSystem, but we can add additional integration here
        const activePowerUps = this.powerUpSystem.getActivePowerUps();

        // Log active power-ups for debugging (can be removed in production)
        if (activePowerUps.length > 0) {
            const activeNames = activePowerUps.map(p => p.config.name).join(', ');
            // console.log(`Active power-ups: ${activeNames}`);
        }
    }

    updateUI() {
        const scoreElement = document.getElementById('score');
        const livesElement = document.getElementById('lives');
        const levelElement = document.getElementById('level');
        const uiPanel = document.getElementById('uiPanel');
        const canvas = document.getElementById('gameCanvas');
        const themeIndicator = document.getElementById('themeIndicator');
        const gameTitle = document.getElementById('gameTitle');

        // Get current theme configuration
        const uiConfig = this.stateManager.themeManager.getUIConfig();
        const currentTheme = this.stateManager.themeManager.getCurrentTheme();

        // Update score with enhanced styling
        if (scoreElement) {
            scoreElement.textContent = this.score.toLocaleString();
            scoreElement.style.color = '#00ff00';
            if (uiConfig.glowEffect) {
                scoreElement.style.textShadow = `0 0 15px #00ff00`;
            }
        }

        // Update lives with critical warning
        if (livesElement) {
            livesElement.textContent = this.lives;
            if (this.lives <= 1) {
                livesElement.style.color = '#ff0000';
                livesElement.style.textShadow = `0 0 20px #ff0000`;
                livesElement.classList.add('critical');
            } else {
                livesElement.style.color = '#ff4444';
                livesElement.style.textShadow = `0 0 10px #ff4444`;
                livesElement.classList.remove('critical');
            }
        }

        // Update level (calculate based on score)
        if (levelElement) {
            const level = Math.floor(this.score / 500) + 1;
            levelElement.textContent = level;
            levelElement.style.color = uiConfig.textColor;
            if (uiConfig.glowEffect) {
                levelElement.style.textShadow = `0 0 10px ${uiConfig.accentColor}`;
            }
        }

        // Apply theme styling to UI panel
        if (uiPanel) {
            uiPanel.style.borderColor = uiConfig.accentColor;
            uiPanel.style.boxShadow = `0 0 20px ${uiConfig.accentColor}40`;
            if (uiConfig.glowEffect) {
                uiPanel.style.background = `rgba(0, 20, 40, 0.9)`;
            }
        }

        // Apply theme styling to canvas
        if (canvas) {
            canvas.style.borderColor = uiConfig.accentColor;
            canvas.style.boxShadow = `
                0 0 30px ${uiConfig.accentColor}66,
                inset 0 0 20px ${uiConfig.accentColor}20
            `;
        }

        // Theme indicator is now hidden via CSS
        // No need to update theme indicator display

        // Update game title
        if (gameTitle) {
            gameTitle.style.color = uiConfig.textColor;
            if (uiConfig.glowEffect) {
                gameTitle.style.textShadow = `0 0 20px ${uiConfig.accentColor}`;
            }
            gameTitle.classList.add('visible');
        }
    }


}

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 30;
        this.speed = 5;
        this.lastShot = 0;
        this.shootCooldown = 150;

        // Power-up related properties
        this.bulletSpread = 1;
        this.bulletDamage = 1;
        this.invincible = false;
        this.bulletPenetration = false;
        this.autoAim = false;
    }

    update(keys, canvas) {
        if (keys['ArrowLeft'] && this.x > 0) {
            this.x -= this.speed;
        }
        if (keys['ArrowRight'] && this.x < canvas.width - this.width) {
            this.x += this.speed;
        }
        if (keys['ArrowUp'] && this.y > 0) {
            this.y -= this.speed;
        }
        if (keys['ArrowDown'] && this.y < canvas.height - this.height) {
            this.y += this.speed;
        }
    }

    shoot(bullets, enemies = []) {
        const now = Date.now();
        if (now - this.lastShot > this.shootCooldown) {
            const centerX = this.x + this.width / 2;
            const bulletSpeed = -8;

            if (this.bulletSpread > 1 && this.spreadAngle) {
                // Wide shot - create multiple bullets in a spread pattern
                const spreadCount = this.bulletSpread;
                const totalAngle = this.spreadAngle * (spreadCount - 1);
                const startAngle = -totalAngle / 2;

                for (let i = 0; i < spreadCount; i++) {
                    const angle = startAngle + (this.spreadAngle * i);
                    const bullet = new Bullet(centerX, this.y, bulletSpeed);
                    bullet.vx = Math.sin(angle) * Math.abs(bulletSpeed);
                    bullet.vy = Math.cos(angle) * bulletSpeed;
                    bullet.autoAim = this.autoAim;
                    bullet.penetration = this.bulletPenetration;
                    bullets.push(bullet);
                }
            } else {
                // Single bullet
                const bullet = new Bullet(centerX, this.y, bulletSpeed);
                bullet.autoAim = this.autoAim;
                bullet.penetration = this.bulletPenetration;
                bullets.push(bullet);
            }

            this.lastShot = now;
        }
    }

    draw(ctx, themeManager) {
        const shipConfig = themeManager ? themeManager.getPlayerShipConfig() : { color: '#00ff00', accentColor: '#ffffff', glowEffect: false };

        // Draw shield effect if invincible
        if (this.invincible) {
            if (this.shieldAlpha === undefined) {
                this.shieldAlpha = 0;
            }
            this.shieldAlpha += 0.1;

            const shieldRadius = 30;
            const shieldAlpha = Math.sin(this.shieldAlpha) * 0.3 + 0.5;

            ctx.save();
            ctx.globalAlpha = shieldAlpha;
            ctx.strokeStyle = '#4444ff';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(this.x + this.width / 2, this.y + this.height / 2, shieldRadius, 0, Math.PI * 2);
            ctx.stroke();

            // Inner shield glow
            ctx.globalAlpha = shieldAlpha * 0.3;
            ctx.fillStyle = '#4444ff';
            ctx.fill();
            ctx.restore();
        }

        // Apply glow effect if enabled
        if (shipConfig.glowEffect) {
            ctx.shadowColor = shipConfig.color;
            ctx.shadowBlur = 10;
        }

        // Draw player ship
        ctx.fillStyle = shipConfig.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Draw ship details
        ctx.fillStyle = shipConfig.accentColor;
        ctx.fillRect(this.x + 5, this.y + 5, 30, 5);
        ctx.fillRect(this.x + 15, this.y - 5, 10, 10);

        // Reset shadow
        if (shipConfig.glowEffect) {
            ctx.shadowBlur = 0;
        }
    }

    collidesWith(other) {
        return this.x < other.x + other.width &&
            this.x + this.width > other.x &&
            this.y < other.y + other.height &&
            this.y + this.height > other.y;
    }
}

class HealthBar {
    constructor(width = 32, height = 4, offsetY = 8) {
        this.width = width;
        this.height = height;
        this.offsetY = offsetY;
        this.backgroundColor = '#333333';
        this.healthColors = {
            high: '#00ff00',    // > 66%
            medium: '#ffff00',  // 33-66%
            low: '#ff0000'      // < 33%
        };
    }

    getHealthColor(healthPercentage) {
        if (healthPercentage > 0.66) {
            return this.healthColors.high;
        } else if (healthPercentage > 0.33) {
            return this.healthColors.medium;
        } else {
            return this.healthColors.low;
        }
    }

    render(ctx, x, y, healthPercentage) {
        if (healthPercentage <= 0) return; // Don't render if no health

        const barX = x + (40 - this.width) / 2; // Center on enemy (assuming 40px width)
        const barY = y - this.offsetY;

        // Draw background
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(barX, barY, this.width, this.height);

        // Draw health bar
        const healthWidth = this.width * healthPercentage;
        ctx.fillStyle = this.getHealthColor(healthPercentage);
        ctx.fillRect(barX, barY, healthWidth, this.height);

        // Draw border
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.strokeRect(barX, barY, this.width, this.height);
    }
}

class Enemy {
    constructor(x, y, type = 'basic') {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 30;
        this.speed = 2 + Math.random() * 2;

        // Health system properties
        this.type = type;
        this.setHealthByType(type);
        this.currentHealth = this.maxHealth;

        // Create health bar
        this.healthBar = new HealthBar(Math.floor(this.width * 0.8), 4, 8);
    }

    setHealthByType(type) {
        switch (type) {
            case 'basic':
                this.maxHealth = 1;
                break;
            case 'armored':
                this.maxHealth = 3;
                this.speed *= 0.7; // Slower movement for armored enemies
                break;
            case 'boss':
                this.maxHealth = 10;
                this.speed *= 0.5; // Much slower movement for boss enemies
                this.width = 60; // Larger size for boss
                this.height = 45;
                break;
            default:
                this.maxHealth = 1;
        }
    }

    takeDamage(amount = 1) {
        this.currentHealth -= amount;
        if (this.currentHealth <= 0) {
            this.currentHealth = 0;
            return true; // Enemy destroyed
        }
        return false; // Enemy still alive
    }

    isDestroyed() {
        return this.currentHealth <= 0;
    }

    getHealthPercentage() {
        return this.currentHealth / this.maxHealth;
    }

    update(timeScale = 1.0) {
        this.y += this.speed * timeScale;
    }

    draw(ctx, themeManager) {
        const shipConfig = themeManager ? themeManager.getEnemyShipConfig() : { color: '#ff0000', accentColor: '#ffffff', glowEffect: false };

        // Apply glow effect if enabled
        if (shipConfig.glowEffect) {
            ctx.shadowColor = shipConfig.color;
            ctx.shadowBlur = 8;
        }

        // Draw enemy ship
        ctx.fillStyle = shipConfig.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Draw ship details
        ctx.fillStyle = shipConfig.accentColor;
        ctx.fillRect(this.x + 5, this.y + 20, 30, 5);
        ctx.fillRect(this.x + 15, this.y + 25, 10, 10);

        // Reset shadow
        if (shipConfig.glowEffect) {
            ctx.shadowBlur = 0;
        }

        // Draw health bar if enemy has more than 1 max health or is damaged
        if (this.maxHealth > 1 || this.currentHealth < this.maxHealth) {
            this.healthBar.render(ctx, this.x, this.y, this.getHealthPercentage());
        }
    }

    collidesWith(other) {
        return this.x < other.x + other.width &&
            this.x + this.width > other.x &&
            this.y < other.y + other.height &&
            this.y + this.height > other.y;
    }
}

class Bullet {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.width = 4;
        this.height = 10;
        this.speed = speed;
        this.vx = 0; // For spread shots
        this.vy = speed; // For spread shots
        this.autoAim = false;
        this.penetration = false;
    }

    update(enemies = []) {
        if (this.autoAim && enemies.length > 0) {
            // Find nearest enemy
            let nearestEnemy = null;
            let nearestDistance = Infinity;

            enemies.forEach(enemy => {
                const dx = enemy.x + enemy.width / 2 - this.x;
                const dy = enemy.y + enemy.height / 2 - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < nearestDistance) {
                    nearestDistance = distance;
                    nearestEnemy = enemy;
                }
            });

            if (nearestEnemy && nearestDistance < 200) { // Only track if close enough
                const dx = nearestEnemy.x + nearestEnemy.width / 2 - this.x;
                const dy = nearestEnemy.y + nearestEnemy.height / 2 - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Adjust velocity towards enemy
                const trackingStrength = 0.1;
                this.vx += (dx / distance) * trackingStrength;
                this.vy += (dy / distance) * trackingStrength;

                // Limit speed
                const currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
                if (currentSpeed > Math.abs(this.speed)) {
                    this.vx = (this.vx / currentSpeed) * Math.abs(this.speed);
                    this.vy = (this.vy / currentSpeed) * Math.abs(this.speed);
                }
            }
        }

        this.x += this.vx;
        this.y += this.vy;
    }

    draw(ctx, themeManager) {
        const bulletConfig = themeManager ? themeManager.getBulletConfig() : { color: '#ffff00', glowColor: '#ffffff', glowIntensity: 0 };

        // Apply glow effect
        if (bulletConfig.glowIntensity > 0) {
            ctx.shadowColor = bulletConfig.glowColor;
            ctx.shadowBlur = bulletConfig.glowIntensity;
        }

        ctx.fillStyle = bulletConfig.color;
        ctx.fillRect(this.x - this.width / 2, this.y, this.width, this.height);

        // Reset shadow
        if (bulletConfig.glowIntensity > 0) {
            ctx.shadowBlur = 0;
        }
    }

    collidesWith(other) {
        return this.x < other.x + other.width &&
            this.x + this.width > other.x &&
            this.y < other.y + other.height &&
            this.y + this.height > other.y;
    }
}

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 8;
        this.vy = (Math.random() - 0.5) * 8;
        this.life = 30;
        this.maxLife = 30;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;
    }

    draw(ctx, themeManager) {
        const particleConfig = themeManager ? themeManager.getParticleConfig() : { colors: ['#ff0000', '#ffff00', '#ffffff'], glowEffect: false };
        const alpha = this.life / this.maxLife;

        // Select color from theme
        const colorIndex = Math.floor(Math.random() * particleConfig.colors.length);
        const color = particleConfig.colors[colorIndex];

        // Parse color to get RGB values
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);

        // Apply glow effect if enabled
        if (particleConfig.glowEffect) {
            ctx.shadowColor = color;
            ctx.shadowBlur = 5 * alpha;
        }

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.fillRect(this.x, this.y, 3, 3);

        // Reset shadow
        if (particleConfig.glowEffect) {
            ctx.shadowBlur = 0;
        }
    }
}

// Power-up type definitions
const POWER_UP_TYPES = {
    RAPID_FIRE: {
        name: "Rapid Fire",
        description: "Increases shooting frequency by 300% for 8 seconds",
        duration: 8000,
        color: "#ff4444",
        glowColor: "#ff8888",
        symbol: "R",
        effect: (player) => {
            player.originalShootCooldown = player.shootCooldown;
            player.shootCooldown = Math.floor(player.shootCooldown * 0.25);
        },
        removeEffect: (player) => {
            if (player.originalShootCooldown) {
                player.shootCooldown = player.originalShootCooldown;
                delete player.originalShootCooldown;
            }
        }
    },
    WIDE_SHOT: {
        name: "Wide Shot",
        description: "Fires 5 bullets in a spread pattern for 10 seconds",
        duration: 10000,
        color: "#44ff44",
        glowColor: "#88ff88",
        symbol: "W",
        effect: (player) => {
            player.bulletSpread = 5;
            player.spreadAngle = 0.3;
        },
        removeEffect: (player) => {
            player.bulletSpread = 1;
            delete player.spreadAngle;
        }
    },
    SHIELD_GENERATOR: {
        name: "Shield Generator",
        description: "Provides complete invincibility for 5 seconds",
        duration: 5000,
        color: "#4444ff",
        glowColor: "#8888ff",
        symbol: "S",
        effect: (player) => {
            player.invincible = true;
            player.shieldAlpha = 0;
        },
        removeEffect: (player) => {
            player.invincible = false;
            delete player.shieldAlpha;
        }
    },
    TIME_SLOW: {
        name: "Time Slow",
        description: "Reduces all enemy movement by 70% for 12 seconds",
        duration: 12000,
        color: "#ff44ff",
        glowColor: "#ff88ff",
        symbol: "T",
        effect: (game) => {
            game.timeScale = 0.3;
        },
        removeEffect: (game) => {
            game.timeScale = 1.0;
        }
    },
    MEGA_BLAST: {
        name: "Mega Blast",
        description: "Fires penetrating bullets that destroy multiple enemies for 6 seconds",
        duration: 6000,
        color: "#ffff44",
        glowColor: "#ffff88",
        symbol: "M",
        effect: (player) => {
            player.bulletPenetration = true;
            player.bulletDamage = 2;
        },
        removeEffect: (player) => {
            player.bulletPenetration = false;
            player.bulletDamage = 1;
        }
    },
    AUTO_AIM: {
        name: "Auto-Aim",
        description: "Bullets automatically track the nearest enemy for 15 seconds",
        duration: 15000,
        color: "#44ffff",
        glowColor: "#88ffff",
        symbol: "A",
        effect: (player) => {
            player.autoAim = true;
        },
        removeEffect: (player) => {
            player.autoAim = false;
        }
    }
};

class PowerUp {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.width = 24;
        this.height = 24;
        this.speed = 1 + Math.random() * 0.5; // Slow downward movement
        this.type = type;
        this.config = POWER_UP_TYPES[type];
        this.rotation = 0;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.lifetime = 10000; // 10 seconds before disappearing
        this.age = 0;
    }

    update() {
        this.y += this.speed;
        this.rotation += 0.05;
        this.pulsePhase += 0.1;
        this.age += 16; // Approximate 60fps
    }

    isExpired() {
        return this.age >= this.lifetime;
    }

    draw(ctx, themeManager) {
        const pulse = Math.sin(this.pulsePhase) * 0.3 + 0.7;
        const alpha = Math.max(0, 1 - (this.age / this.lifetime) * 0.3); // Fade slightly as it ages

        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = alpha;

        // Enhanced outer glow effect with multiple layers
        ctx.shadowColor = this.config.glowColor;
        ctx.shadowBlur = 20 * pulse;

        // Outer ring for better visibility
        ctx.strokeStyle = this.config.glowColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, (this.width / 2) + 4, 0, Math.PI * 2);
        ctx.stroke();

        // Main power-up body with enhanced shape based on type
        ctx.shadowBlur = 15 * pulse;
        ctx.fillStyle = this.config.color;

        // Different shapes for different power-up types for better identification
        switch (this.type) {
            case 'RAPID_FIRE':
                // Diamond shape for rapid fire
                ctx.beginPath();
                ctx.moveTo(0, -this.height / 2);
                ctx.lineTo(this.width / 2, 0);
                ctx.lineTo(0, this.height / 2);
                ctx.lineTo(-this.width / 2, 0);
                ctx.closePath();
                ctx.fill();
                break;
            case 'WIDE_SHOT':
                // Hexagon for wide shot
                ctx.beginPath();
                for (let i = 0; i < 6; i++) {
                    const angle = (i * Math.PI) / 3;
                    const x = Math.cos(angle) * (this.width / 2);
                    const y = Math.sin(angle) * (this.height / 2);
                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.closePath();
                ctx.fill();
                break;
            case 'SHIELD_GENERATOR':
                // Circle for shield
                ctx.beginPath();
                ctx.arc(0, 0, this.width / 2, 0, Math.PI * 2);
                ctx.fill();
                break;
            case 'TIME_SLOW':
                // Star shape for time slow
                ctx.beginPath();
                for (let i = 0; i < 8; i++) {
                    const angle = (i * Math.PI) / 4;
                    const radius = (i % 2 === 0) ? this.width / 2 : this.width / 4;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.closePath();
                ctx.fill();
                break;
            case 'MEGA_BLAST':
                // Triangle for mega blast
                ctx.beginPath();
                ctx.moveTo(0, -this.height / 2);
                ctx.lineTo(this.width / 2, this.height / 2);
                ctx.lineTo(-this.width / 2, this.height / 2);
                ctx.closePath();
                ctx.fill();
                break;
            case 'AUTO_AIM':
                // Cross shape for auto-aim
                const crossSize = this.width / 2;
                const crossThickness = 6;
                ctx.fillRect(-crossThickness / 2, -crossSize, crossThickness, crossSize * 2);
                ctx.fillRect(-crossSize, -crossThickness / 2, crossSize * 2, crossThickness);
                break;
            default:
                // Default square
                ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        }

        // Inner core with pulsing effect
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#ffffff';
        const coreSize = 8 + (4 * pulse);
        ctx.fillRect(-coreSize / 2, -coreSize / 2, coreSize, coreSize);

        // Symbol with enhanced visibility
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.config.symbol, 0, 0);

        // Add type-specific visual effects
        this.drawTypeSpecificEffects(ctx, pulse);

        ctx.restore();
    }

    drawTypeSpecificEffects(ctx, pulse) {
        ctx.globalAlpha = 0.6 * pulse;

        switch (this.type) {
            case 'RAPID_FIRE':
                // Speed lines for rapid fire
                ctx.strokeStyle = this.config.color;
                ctx.lineWidth = 1;
                for (let i = 0; i < 4; i++) {
                    const angle = (i * Math.PI) / 2;
                    const startRadius = this.width / 2 + 5;
                    const endRadius = startRadius + 8;
                    ctx.beginPath();
                    ctx.moveTo(Math.cos(angle) * startRadius, Math.sin(angle) * startRadius);
                    ctx.lineTo(Math.cos(angle) * endRadius, Math.sin(angle) * endRadius);
                    ctx.stroke();
                }
                break;
            case 'SHIELD_GENERATOR':
                // Shield rings
                ctx.strokeStyle = this.config.color;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(0, 0, this.width / 2 + 6, 0, Math.PI * 2);
                ctx.stroke();
                break;
            case 'TIME_SLOW':
                // Clock-like marks
                ctx.strokeStyle = this.config.color;
                ctx.lineWidth = 2;
                for (let i = 0; i < 4; i++) {
                    const angle = (i * Math.PI) / 2;
                    const radius = this.width / 2 + 3;
                    ctx.beginPath();
                    ctx.moveTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
                    ctx.lineTo(Math.cos(angle) * (radius + 4), Math.sin(angle) * (radius + 4));
                    ctx.stroke();
                }
                break;
        }
    }

    collidesWith(other) {
        return this.x < other.x + other.width &&
            this.x + this.width > other.x &&
            this.y < other.y + other.height &&
            this.y + this.height > other.y;
    }
}

class PowerUpSystem {
    constructor() {
        this.powerUps = [];
        this.activePowerUps = [];
        this.lastSpawn = 0;
        this.spawnRate = 15000 + Math.random() * 10000; // 15-25 seconds
    }

    update(game) {
        const now = Date.now();

        // Spawn new power-ups
        if (now - this.lastSpawn > this.spawnRate) {
            this.spawnPowerUp(game.canvas.width);
            this.lastSpawn = now;
            this.spawnRate = 15000 + Math.random() * 10000; // Randomize next spawn
        }

        // Update existing power-ups
        this.powerUps = this.powerUps.filter(powerUp => {
            powerUp.update();
            // Remove if off screen or expired
            return powerUp.y < game.canvas.height + 50 && !powerUp.isExpired();
        });

        // Update active power-up timers
        this.activePowerUps = this.activePowerUps.filter(activePowerUp => {
            activePowerUp.timeRemaining -= 16; // Approximate 60fps
            if (activePowerUp.timeRemaining <= 0) {
                // Remove power-up effect
                this.removePowerUpEffect(activePowerUp, game);
                return false;
            }
            return true;
        });
    }

    spawnPowerUp(canvasWidth) {
        const powerUpTypes = Object.keys(POWER_UP_TYPES);
        const randomType = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];
        const x = Math.random() * (canvasWidth - 24);

        this.powerUps.push(new PowerUp(x, -30, randomType));
    }

    collectPowerUp(powerUp, game) {
        // Remove power-up from array
        const index = this.powerUps.indexOf(powerUp);
        if (index > -1) {
            this.powerUps.splice(index, 1);
        }

        // Create visual feedback - screen flash effect
        this.createCollectionEffect(powerUp, game);

        // Apply power-up effect
        this.applyPowerUpEffect(powerUp, game);

        // Add to active power-ups
        this.activePowerUps.push({
            type: powerUp.type,
            config: powerUp.config,
            timeRemaining: powerUp.config.duration,
            startTime: Date.now()
        });
    }

    createCollectionEffect(powerUp, game) {
        // Create collection particles
        for (let i = 0; i < 12; i++) {
            const particle = new Particle(
                powerUp.x + powerUp.width / 2,
                powerUp.y + powerUp.height / 2
            );
            // Override particle properties for collection effect
            particle.vx = (Math.random() - 0.5) * 12;
            particle.vy = (Math.random() - 0.5) * 12;
            particle.life = 20;
            particle.maxLife = 20;
            particle.color = powerUp.config.color;
            game.particles.push(particle);
        }

        // Add screen flash effect
        game.screenFlash = {
            color: powerUp.config.color,
            alpha: 0.3,
            duration: 300,
            startTime: Date.now()
        };

        // Enhanced power-up notification with description
        game.powerUpNotification = {
            name: powerUp.config.name,
            description: powerUp.config.description,
            symbol: powerUp.config.symbol,
            color: powerUp.config.color,
            alpha: 1.0,
            duration: 3000, // Increased duration for more info
            startTime: Date.now()
        };
    }

    applyPowerUpEffect(powerUp, game) {
        try {
            const config = powerUp.config;

            // Apply effect based on power-up type
            if (config.effect) {
                if (powerUp.type === 'TIME_SLOW') {
                    config.effect(game);
                } else {
                    config.effect(game.player);
                }
            }
        } catch (error) {
            console.error(`Error applying power-up effect for ${powerUp.type}:`, error);
            // Continue without the power-up effect
        }
    }

    removePowerUpEffect(activePowerUp, game) {
        try {
            const config = activePowerUp.config;

            // Remove effect based on power-up type
            if (config.removeEffect) {
                if (activePowerUp.type === 'TIME_SLOW') {
                    config.removeEffect(game);
                } else {
                    config.removeEffect(game.player);
                }
            }
        } catch (error) {
            console.error(`Error removing power-up effect for ${activePowerUp.type}:`, error);
            // Continue without removing the effect (it will expire naturally)
        }
    }

    render(ctx, themeManager) {
        this.powerUps.forEach(powerUp => {
            powerUp.draw(ctx, themeManager);
        });
    }

    checkCollisions(player, game) {
        for (let i = this.powerUps.length - 1; i >= 0; i--) {
            if (this.powerUps[i].collidesWith(player)) {
                this.collectPowerUp(this.powerUps[i], game);
                break; // Only collect one power-up per frame
            }
        }
    }

    getActivePowerUps() {
        return this.activePowerUps;
    }
}

class ThemeSelectionScreen {
    constructor(canvas, ctx, themeManager) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.themeManager = themeManager;
        this.animationTime = 0;

        // Theme selection state
        this.selectedThemeIndex = 0;
        this.themes = this.themeManager.getAllThemes();

        // UI elements
        this.themeCards = [];
        this.confirmButton = {
            x: this.canvas.width / 2 - 150,
            y: 480,
            width: 300,
            height: 50,
            hovered: false,
            pressed: false
        };

        // Initialize theme cards
        this.initializeThemeCards();
    }

    initializeThemeCards() {
        const cardWidth = 180;
        const cardHeight = 120;
        const cardSpacing = 20;
        const totalWidth = (cardWidth * 3) + (cardSpacing * 2);
        const startX = (this.canvas.width - totalWidth) / 2;
        const cardY = 200;

        this.themeCards = this.themes.map((theme, index) => ({
            x: startX + (cardWidth + cardSpacing) * index,
            y: cardY,
            width: cardWidth,
            height: cardHeight,
            theme: theme,
            index: index,
            hovered: false,
            selected: index === this.selectedThemeIndex
        }));
    }

    update() {
        this.animationTime += 16;

        // Update selected state
        this.themeCards.forEach((card, index) => {
            card.selected = index === this.selectedThemeIndex;
        });
    }

    render() {
        // Draw themed background
        this.themeManager.drawThemedBackground(this.ctx, this.canvas, this.animationTime);

        // Draw title
        this.drawTitle();

        // Draw theme cards
        this.drawThemeCards();

        // Draw spaceship preview
        this.drawSpaceshipPreview();

        // Draw confirm button
        this.drawConfirmButton();
    }

    drawTitle() {
        const uiConfig = this.themeManager.getUIConfig();

        // Title glow effect
        if (uiConfig.glowEffect) {
            this.ctx.shadowColor = uiConfig.accentColor;
            this.ctx.shadowBlur = 15;
        }
        this.ctx.fillStyle = uiConfig.textColor;
        this.ctx.font = 'bold 42px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('SELECT THEME', this.canvas.width / 2, 100);

        // Subtitle
        if (uiConfig.glowEffect) {
            this.ctx.shadowBlur = 8;
        }
        this.ctx.font = '18px Arial';
        this.ctx.fillStyle = uiConfig.accentColor;
        this.ctx.fillText('Choose your visual style', this.canvas.width / 2, 130);
        this.ctx.shadowBlur = 0;
    }

    drawThemeCards() {
        this.themeCards.forEach((card, index) => {
            // Card background with selection highlight
            if (card.selected) {
                this.ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
                this.ctx.strokeStyle = '#ffffff';
                this.ctx.lineWidth = 3;
            } else if (card.hovered) {
                this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
                this.ctx.strokeStyle = '#aaaaaa';
                this.ctx.lineWidth = 2;
            } else {
                this.ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
                this.ctx.strokeStyle = '#666666';
                this.ctx.lineWidth = 1;
            }

            this.ctx.fillRect(card.x, card.y, card.width, card.height);
            this.ctx.strokeRect(card.x, card.y, card.width, card.height);

            // Theme name
            this.ctx.fillStyle = card.selected ? '#ffffff' : '#cccccc';
            this.ctx.font = 'bold 18px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(card.theme.name, card.x + card.width / 2, card.y + 25);

            // Theme color preview
            const colorPreviewY = card.y + 40;
            const colorWidth = 40;
            const colorHeight = 20;
            const colorSpacing = 5;
            const totalColorWidth = (colorWidth * 3) + (colorSpacing * 2);
            const colorStartX = card.x + (card.width - totalColorWidth) / 2;

            // Primary color
            this.ctx.fillStyle = card.theme.colors.primary;
            this.ctx.fillRect(colorStartX, colorPreviewY, colorWidth, colorHeight);

            // Secondary color
            this.ctx.fillStyle = card.theme.colors.secondary;
            this.ctx.fillRect(colorStartX + colorWidth + colorSpacing, colorPreviewY, colorWidth, colorHeight);

            // Accent color
            this.ctx.fillStyle = card.theme.colors.accent;
            this.ctx.fillRect(colorStartX + (colorWidth + colorSpacing) * 2, colorPreviewY, colorWidth, colorHeight);

            // Theme description
            this.ctx.fillStyle = '#aaaaaa';
            this.ctx.font = '12px Arial';
            this.ctx.textAlign = 'center';

            let description = '';
            switch (card.theme.key) {
                case 'MASKED_RIDER':
                    description = 'Futuristic tech aesthetic';
                    break;
                case 'ULTRAMAN':
                    description = 'Clean heroic design';
                    break;
                case 'GODZILLA':
                    description = 'Dark monster theme';
                    break;
            }

            this.ctx.fillText(description, card.x + card.width / 2, card.y + 85);

            // Selection indicator
            if (card.selected) {
                this.ctx.fillStyle = '#00ff00';
                this.ctx.font = 'bold 14px Arial';
                this.ctx.fillText('✓ SELECTED', card.x + card.width / 2, card.y + 105);
            }
        });
    }

    drawSpaceshipPreview() {
        // Preview area
        const previewX = this.canvas.width / 2 - 100;
        const previewY = 350;
        const previewWidth = 200;
        const previewHeight = 80;

        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.strokeStyle = '#666666';
        this.ctx.lineWidth = 1;
        this.ctx.fillRect(previewX, previewY, previewWidth, previewHeight);
        this.ctx.strokeRect(previewX, previewY, previewWidth, previewHeight);

        // Preview label
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '14px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('SPACESHIP PREVIEW', this.canvas.width / 2, previewY - 10);

        // Draw preview spaceship using selected theme
        const selectedTheme = this.themes[this.selectedThemeIndex];
        this.themeManager.loadTheme(selectedTheme.key);
        const shipConfig = this.themeManager.getPlayerShipConfig();

        const shipX = this.canvas.width / 2 - 20;
        const shipY = previewY + 25;
        const shipWidth = 40;
        const shipHeight = 30;

        // Apply glow effect if enabled
        if (shipConfig.glowEffect) {
            this.ctx.shadowColor = shipConfig.color;
            this.ctx.shadowBlur = 10;
        }

        // Draw preview ship
        this.ctx.fillStyle = shipConfig.color;
        this.ctx.fillRect(shipX, shipY, shipWidth, shipHeight);

        // Draw ship details
        this.ctx.fillStyle = shipConfig.accentColor;
        this.ctx.fillRect(shipX + 5, shipY + 5, 30, 5);
        this.ctx.fillRect(shipX + 15, shipY - 5, 10, 10);

        // Reset shadow
        if (shipConfig.glowEffect) {
            this.ctx.shadowBlur = 0;
        }
    }

    drawConfirmButton() {
        const button = this.confirmButton;
        const uiConfig = this.themeManager.getUIConfig();

        // Button glow effect
        let glowIntensity = Math.sin(this.animationTime * 0.005) * 0.3 + 0.7;
        if (button.hovered) {
            glowIntensity *= 1.5;
        }
        if (button.pressed) {
            glowIntensity *= 0.5;
        }

        if (uiConfig.glowEffect) {
            this.ctx.shadowColor = uiConfig.accentColor;
            this.ctx.shadowBlur = 15 * glowIntensity;
        }

        // Button background
        let backgroundAlpha = 0.2 * glowIntensity;
        if (button.hovered) {
            backgroundAlpha *= 1.8;
        }
        if (button.pressed) {
            backgroundAlpha *= 2;
        }

        const r = parseInt(uiConfig.accentColor.slice(1, 3), 16);
        const g = parseInt(uiConfig.accentColor.slice(3, 5), 16);
        const b = parseInt(uiConfig.accentColor.slice(5, 7), 16);

        this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${backgroundAlpha})`;
        this.ctx.strokeStyle = uiConfig.accentColor;
        this.ctx.lineWidth = button.hovered ? 3 : 2;

        // Button position offset when pressed
        const offsetY = button.pressed ? 2 : 0;

        this.ctx.fillRect(button.x, button.y + offsetY, button.width, button.height);
        this.ctx.strokeRect(button.x, button.y + offsetY, button.width, button.height);

        // Button text
        this.ctx.fillStyle = button.hovered ? '#ffffff' : uiConfig.accentColor;
        this.ctx.font = button.hovered ? 'bold 22px Arial' : 'bold 20px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('START GAME', this.canvas.width / 2, button.y + 32 + offsetY);

        // Instructions
        this.ctx.fillStyle = '#aaaaaa';
        this.ctx.font = '14px Arial';
        this.ctx.fillText('Use arrow keys to select theme, SPACE/ENTER to confirm', this.canvas.width / 2, button.y + 55 + offsetY);

        // Reset shadow
        this.ctx.shadowBlur = 0;
    }

    handleKeyDown(keyCode) {
        switch (keyCode) {
            case 'ArrowLeft':
                this.selectedThemeIndex = Math.max(0, this.selectedThemeIndex - 1);
                return true;
            case 'ArrowRight':
                this.selectedThemeIndex = Math.min(this.themes.length - 1, this.selectedThemeIndex + 1);
                return true;
            case 'Space':
            case 'Enter':
                // Load selected theme and confirm
                const selectedTheme = this.themes[this.selectedThemeIndex];
                this.themeManager.loadTheme(selectedTheme.key);
                return 'confirm';
        }
        return false;
    }

    handleMouseMove(mouseX, mouseY) {
        // Check theme card hovers
        this.themeCards.forEach(card => {
            card.hovered = (
                mouseX >= card.x &&
                mouseX <= card.x + card.width &&
                mouseY >= card.y &&
                mouseY <= card.y + card.height
            );
        });

        // Check confirm button hover
        const button = this.confirmButton;
        const wasHovered = button.hovered;
        button.hovered = (
            mouseX >= button.x &&
            mouseX <= button.x + button.width &&
            mouseY >= button.y &&
            mouseY <= button.y + button.height
        );

        // Change cursor style
        const anyHovered = this.themeCards.some(card => card.hovered) || button.hovered;
        if (anyHovered !== (wasHovered || this.themeCards.some(card => card.hovered))) {
            document.body.style.cursor = anyHovered ? 'pointer' : 'default';
        }
    }

    handleMouseClick(mouseX, mouseY) {
        // Check theme card clicks
        for (let i = 0; i < this.themeCards.length; i++) {
            const card = this.themeCards[i];
            if (card.hovered) {
                this.selectedThemeIndex = i;
                return true;
            }
        }

        // Check confirm button click
        if (this.confirmButton.hovered) {
            this.confirmButton.pressed = true;

            // Reset cursor
            document.body.style.cursor = 'default';

            // Add click effect with slight delay
            setTimeout(() => {
                this.confirmButton.pressed = false;
            }, 150);

            // Load selected theme and confirm
            const selectedTheme = this.themes[this.selectedThemeIndex];
            this.themeManager.loadTheme(selectedTheme.key);
            return 'confirm';
        }

        return false;
    }
}

class IntroScreen {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.animationTime = 0;

        // Demo sprites for animation
        this.demoPlayer = {
            x: 150,
            y: 400,
            width: 30,
            height: 20
        };

        this.demoEnemy = {
            x: 150,
            y: 200,
            width: 30,
            height: 20
        };

        this.demoBullet = {
            x: 165,
            y: 380,
            width: 3,
            height: 8,
            active: false
        };

        this.demoPowerUp = {
            x: 250,
            y: 300,
            width: 20,
            height: 20,
            rotation: 0
        };

        // Animation states
        this.shootingDemo = false;
        this.movementDemo = 0; // 0=right, 1=left, 2=up, 3=down
        this.powerUpDemo = false;

        // Button interaction
        this.buttonHovered = false;
        this.buttonPressed = false;
        this.buttonBounds = {
            x: this.canvas.width / 2 - 150,
            y: 480,
            width: 300,
            height: 50
        };
    }

    update() {
        this.animationTime += 16; // Approximate 60fps

        // Movement demonstration
        const movementCycle = Math.floor(this.animationTime / 1000) % 4;
        this.movementDemo = movementCycle;

        // Update demo player position based on movement cycle
        // 這些位置將在渲染時根據實際的 demo 區域位置進行調整
        const baseX = 150;
        const baseY = 400;
        const moveDistance = 20;

        switch (this.movementDemo) {
            case 0: // Move right
                this.demoPlayer.x = baseX + Math.sin(this.animationTime * 0.003) * moveDistance;
                this.demoPlayer.y = baseY;
                break;
            case 1: // Move left
                this.demoPlayer.x = baseX - Math.sin(this.animationTime * 0.003) * moveDistance;
                this.demoPlayer.y = baseY;
                break;
            case 2: // Move up
                this.demoPlayer.x = baseX;
                this.demoPlayer.y = baseY - Math.sin(this.animationTime * 0.003) * moveDistance;
                break;
            case 3: // Move down
                this.demoPlayer.x = baseX;
                this.demoPlayer.y = baseY + Math.sin(this.animationTime * 0.003) * moveDistance;
                break;
        }

        // Shooting demonstration
        if (Math.floor(this.animationTime / 500) % 4 === 0) {
            this.shootingDemo = true;
            this.demoBullet.active = true;
            this.demoBullet.x = this.demoPlayer.x + this.demoPlayer.width / 2;
            this.demoBullet.y = this.demoPlayer.y;
        }

        // Update bullet position
        if (this.demoBullet.active) {
            this.demoBullet.y -= 3;
            if (this.demoBullet.y < this.demoEnemy.y + this.demoEnemy.height) {
                this.demoBullet.active = false;
            }
        }

        // Power-up rotation animation
        this.demoPowerUp.rotation += 0.05;

        // Power-up collection demo
        const powerUpCycle = Math.floor(this.animationTime / 2000) % 3;
        if (powerUpCycle === 2) {
            this.powerUpDemo = true;
            // Move power-up towards player
            const dx = this.demoPlayer.x - this.demoPowerUp.x;
            const dy = this.demoPlayer.y - this.demoPowerUp.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance > 5) {
                this.demoPowerUp.x += dx * 0.02;
                this.demoPowerUp.y += dy * 0.02;
            } else {
                // Reset power-up position
                this.demoPowerUp.x = 250;
                this.demoPowerUp.y = 300;
                this.powerUpDemo = false;
            }
        } else {
            this.demoPowerUp.x = 250;
            this.demoPowerUp.y = 300;
            this.powerUpDemo = false;
        }
    }

    render(themeManager) {
        // Draw animated stars background
        this.drawAnimatedStars(themeManager);

        // Draw title with glow effect
        this.drawTitle(themeManager);

        // Draw instruction panels
        this.drawInstructionPanels(themeManager);

        // Draw animated demonstrations
        this.drawGameplayDemonstrations(themeManager);

        // Draw start button with hover effect
        this.drawStartButton(themeManager);
    }

    drawAnimatedStars(themeManager) {
        if (themeManager) {
            themeManager.drawThemedBackground(this.ctx, this.canvas, this.animationTime);
        } else {
            // Fallback to default stars
            this.ctx.fillStyle = 'white';
            for (let i = 0; i < 100; i++) {
                const x = (i * 37) % this.canvas.width;
                const y = (i * 23 + this.animationTime * 0.02) % this.canvas.height;
                const twinkle = Math.sin(this.animationTime * 0.01 + i) * 0.5 + 0.5;
                this.ctx.globalAlpha = twinkle * 0.8 + 0.2;
                this.ctx.fillRect(x, y, 1, 1);
            }
            this.ctx.globalAlpha = 1;
        }
    }

    drawTitle(themeManager) {
        const uiConfig = themeManager ? themeManager.getUIConfig() : { textColor: '#ffffff', accentColor: '#00ffff', glowEffect: true };

        // Title glow effect
        if (uiConfig.glowEffect) {
            this.ctx.shadowColor = uiConfig.accentColor;
            this.ctx.shadowBlur = 20;
        }
        this.ctx.fillStyle = uiConfig.textColor;
        this.ctx.font = 'bold 48px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('SPACE SHOOTER', this.canvas.width / 2, 80);

        // Subtitle
        if (uiConfig.glowEffect) {
            this.ctx.shadowBlur = 10;
        }
        this.ctx.font = '24px Arial';
        this.ctx.fillStyle = uiConfig.accentColor;
        this.ctx.fillText('Enhanced Edition', this.canvas.width / 2, 110);

        // Reset shadow
        this.ctx.shadowBlur = 0;
    }

    drawInstructionPanels(themeManager) {
        // Main instruction panel - 移到畫布左側邊緣，但仍可見
        const mainPanelWidth = 200;
        const mainPanelHeight = 350;
        const mainPanelX = 10; // 靠近左邊緣
        const mainPanelY = 80;

        // Draw main instruction panel background
        this.ctx.fillStyle = 'rgba(0, 50, 100, 0.8)';
        this.ctx.strokeStyle = '#00ffff';
        this.ctx.lineWidth = 2;
        this.ctx.fillRect(mainPanelX, mainPanelY, mainPanelWidth, mainPanelHeight);
        this.ctx.strokeRect(mainPanelX, mainPanelY, mainPanelWidth, mainPanelHeight);

        // Instructions header
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = 'bold 18px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('GAME CONTROLS', mainPanelX + mainPanelWidth / 2, mainPanelY + 25);

        // Control instructions
        this.ctx.font = '14px Arial';
        this.ctx.textAlign = 'left';
        const instructionX = mainPanelX + 15;
        let instructionY = mainPanelY + 50;

        const instructions = [
            '🚀 MOVEMENT:',
            '   • Arrow Keys to move your ship',
            '   • Navigate to avoid enemy ships',
            '',
            '💥 SHOOTING:',
            '   • Spacebar to fire bullets',
            '   • Destroy enemies to score points',
            '',
            '🎯 OBJECTIVE:',
            '   • Survive as long as possible',
            '   • Collect power-ups for advantages',
            '',
            '🎮 CONTROLS:',
            '   • R to restart • ESC for menu'
        ];

        instructions.forEach((instruction, index) => {
            if (instruction.startsWith('🚀') || instruction.startsWith('💥') || instruction.startsWith('🎯')) {
                this.ctx.fillStyle = '#00ffff';
                this.ctx.font = 'bold 14px Arial';
            } else if (instruction === '') {
                instructionY += 5;
                return;
            } else {
                this.ctx.fillStyle = '#ffffff';
                this.ctx.font = '12px Arial';
            }
            this.ctx.fillText(instruction, instructionX, instructionY);
            instructionY += 16;
        });

        // Power-up explanation panel
        this.drawPowerUpExplanationPanel(themeManager);
    }

    drawPowerUpExplanationPanel(themeManager) {
        const powerUpPanelWidth = 200;
        const powerUpPanelHeight = 350;
        const powerUpPanelX = this.canvas.width - powerUpPanelWidth - 10; // 靠近右邊緣
        const powerUpPanelY = 80;

        // Draw power-up panel background
        this.ctx.fillStyle = 'rgba(100, 0, 50, 0.8)';
        this.ctx.strokeStyle = '#ff00ff';
        this.ctx.lineWidth = 2;
        this.ctx.fillRect(powerUpPanelX, powerUpPanelY, powerUpPanelWidth, powerUpPanelHeight);
        this.ctx.strokeRect(powerUpPanelX, powerUpPanelY, powerUpPanelWidth, powerUpPanelHeight);

        // Power-up header
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = 'bold 18px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('POWER-UP GUIDE', powerUpPanelX + powerUpPanelWidth / 2, powerUpPanelY + 25);

        // Power-up descriptions
        const powerUpStartX = powerUpPanelX + 15;
        let powerUpY = powerUpPanelY + 50;
        const iconSize = 20;
        const lineHeight = 40;

        // Get power-up types for display
        const powerUpTypes = [
            { type: 'RAPID_FIRE', config: POWER_UP_TYPES.RAPID_FIRE },
            { type: 'WIDE_SHOT', config: POWER_UP_TYPES.WIDE_SHOT },
            { type: 'SHIELD_GENERATOR', config: POWER_UP_TYPES.SHIELD_GENERATOR },
            { type: 'TIME_SLOW', config: POWER_UP_TYPES.TIME_SLOW },
            { type: 'MEGA_BLAST', config: POWER_UP_TYPES.MEGA_BLAST },
            { type: 'AUTO_AIM', config: POWER_UP_TYPES.AUTO_AIM }
        ];

        powerUpTypes.forEach((powerUp, index) => {
            const config = powerUp.config;
            const currentY = powerUpY + (index * lineHeight);

            // Draw power-up icon
            this.ctx.fillStyle = config.color;
            this.ctx.fillRect(powerUpStartX, currentY - iconSize / 2, iconSize, iconSize);

            // Draw power-up symbol
            this.ctx.fillStyle = '#ffffff';
            this.ctx.font = 'bold 12px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(config.symbol, powerUpStartX + iconSize / 2, currentY + 4);

            // Draw power-up name and description
            this.ctx.textAlign = 'left';
            this.ctx.fillStyle = config.color;
            this.ctx.font = 'bold 12px Arial';
            this.ctx.fillText(config.name, powerUpStartX + iconSize + 10, currentY - 5);

            this.ctx.fillStyle = '#ffffff';
            this.ctx.font = '10px Arial';

            // Split long descriptions into multiple lines
            const description = config.description;
            const maxWidth = powerUpPanelWidth - iconSize - 40;
            const words = description.split(' ');
            let line = '';
            let lineY = currentY + 8;

            for (let i = 0; i < words.length; i++) {
                const testLine = line + words[i] + ' ';
                const metrics = this.ctx.measureText(testLine);

                if (metrics.width > maxWidth && i > 0) {
                    this.ctx.fillText(line, powerUpStartX + iconSize + 10, lineY);
                    line = words[i] + ' ';
                    lineY += 12;
                } else {
                    line = testLine;
                }
            }
            this.ctx.fillText(line, powerUpStartX + iconSize + 10, lineY);
        });

        // Add collection tip at bottom
        this.ctx.fillStyle = '#ffff00';
        this.ctx.font = 'bold 12px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('💡 TIP: Fly into glowing power-ups to collect them!',
            powerUpPanelX + powerUpPanelWidth / 2, powerUpPanelY + powerUpPanelHeight - 15);
    }

    drawGameplayDemonstrations(themeManager) {
        // 創建一個中央遊戲展示區域，為左右面板留出空間
        const centralPanelWidth = 360;
        const centralPanelHeight = 280;
        const centralPanelX = (this.canvas.width - centralPanelWidth) / 2;
        const centralPanelY = 160;

        // 繪製中央面板背景
        this.ctx.fillStyle = 'rgba(0, 20, 40, 0.9)';
        this.ctx.strokeStyle = '#00ffff';
        this.ctx.lineWidth = 3;
        this.ctx.fillRect(centralPanelX, centralPanelY, centralPanelWidth, centralPanelHeight);
        this.ctx.strokeRect(centralPanelX, centralPanelY, centralPanelWidth, centralPanelHeight);

        // 中央標題
        this.ctx.fillStyle = '#00ffff';
        this.ctx.font = 'bold 24px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('GAME PREVIEW', this.canvas.width / 2, centralPanelY + 30);

        // Demo area background - 在中央面板內部
        const demoWidth = 120;
        const demoHeight = 180;
        const demoX = centralPanelX + 20;
        const demoY = centralPanelY + 60;

        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.strokeStyle = '#444';
        this.ctx.lineWidth = 1;
        this.ctx.fillRect(demoX, demoY, demoWidth, demoHeight);
        this.ctx.strokeRect(demoX, demoY, demoWidth, demoHeight);

        // Demo label
        this.ctx.fillStyle = '#ffff00';
        this.ctx.font = '12px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('LIVE DEMO', demoX + demoWidth / 2, demoY - 5);

        // 計算 demo 物件在新區域內的相對位置
        const demoEnemyX = demoX + 50;
        const demoEnemyY = demoY + 30;
        const demoPlayerX = demoX + 50 + Math.sin(this.animationTime * 0.003) * 15;
        const demoPlayerY = demoY + 130;

        // Draw demo enemy
        this.ctx.fillStyle = '#ff4444';
        this.ctx.fillRect(demoEnemyX, demoEnemyY, 30, 20);
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(demoEnemyX + 5, demoEnemyY + 15, 20, 3);

        // Draw demo player with movement indication
        this.ctx.fillStyle = '#44ff44';
        this.ctx.fillRect(demoPlayerX, demoPlayerY, 30, 20);
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(demoPlayerX + 5, demoPlayerY + 5, 20, 3);
        this.ctx.fillRect(demoPlayerX + 10, demoPlayerY - 3, 10, 8);

        // Draw movement arrows
        this.drawMovementIndicator(demoPlayerX, demoPlayerY, 30, 20);

        // Draw demo bullet - 相對於新的玩家位置
        if (this.demoBullet.active) {
            const bulletX = demoPlayerX + 15; // 玩家中心
            const bulletY = demoPlayerY - (this.animationTime * 0.1) % 100; // 向上移動的子彈
            this.ctx.fillStyle = '#ffff00';
            this.ctx.fillRect(bulletX, bulletY, 3, 8);
        }

        // Draw demo power-up - 相對於 demo 區域
        const powerUpX = demoX + 80;
        const powerUpY = demoY + 80;

        this.ctx.save();
        this.ctx.translate(powerUpX + 10, powerUpY + 10);
        this.ctx.rotate(this.demoPowerUp.rotation);

        // Power-up glow effect
        this.ctx.shadowColor = '#ff00ff';
        this.ctx.shadowBlur = 10;
        this.ctx.fillStyle = '#ff00ff';
        this.ctx.fillRect(-10, -10, 20, 20);

        // Power-up inner core
        this.ctx.shadowBlur = 0;
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(-6, -6, 12, 12);

        this.ctx.restore();

        // Power-up collection effect
        if (this.powerUpDemo) {
            this.ctx.strokeStyle = '#ff00ff';
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.moveTo(powerUpX + 10, powerUpY + 10);
            this.ctx.lineTo(demoPlayerX + 15, demoPlayerY + 10);
            this.ctx.stroke();
        }

        // 在中央面板右側添加遊戲信息
        const infoX = demoX + demoWidth + 20;
        const infoY = demoY + 10;

        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = 'bold 14px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillText('FEATURES:', infoX, infoY);

        this.ctx.font = '12px Arial';
        this.ctx.fillStyle = '#cccccc';
        this.ctx.fillText('• 3 Themed experiences', infoX, infoY + 20);
        this.ctx.fillText('• 6 Unique power-ups', infoX, infoY + 35);
        this.ctx.fillText('• Dynamic enemies', infoX, infoY + 50);
        this.ctx.fillText('• Particle effects', infoX, infoY + 65);

        this.ctx.font = 'bold 12px Arial';
        this.ctx.fillStyle = '#00ffff';
        this.ctx.fillText('CONTROLS:', infoX, infoY + 90);

        this.ctx.font = '11px Arial';
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillText('↑↓←→ Move', infoX, infoY + 105);
        this.ctx.fillText('SPACE Shoot', infoX, infoY + 118);
        this.ctx.fillText('R Restart', infoX, infoY + 131);

        this.ctx.font = 'bold 11px Arial';
        this.ctx.fillStyle = '#ffff00';
        this.ctx.fillText('📖 Check side panels', infoX, infoY + 150);
        this.ctx.fillText('for detailed guides!', infoX, infoY + 163);
    }

    drawMovementIndicator(playerX, playerY, playerWidth, playerHeight) {
        const arrowSize = 8;
        const playerCenterX = playerX + playerWidth / 2;
        const playerCenterY = playerY + playerHeight / 2;

        this.ctx.fillStyle = '#00ffff';
        this.ctx.strokeStyle = '#00ffff';
        this.ctx.lineWidth = 2;

        // Draw arrow based on current movement demo
        switch (this.movementDemo) {
            case 0: // Right arrow
                this.ctx.beginPath();
                this.ctx.moveTo(playerCenterX + 20, playerCenterY);
                this.ctx.lineTo(playerCenterX + 35, playerCenterY);
                this.ctx.lineTo(playerCenterX + 30, playerCenterY - 5);
                this.ctx.moveTo(playerCenterX + 35, playerCenterY);
                this.ctx.lineTo(playerCenterX + 30, playerCenterY + 5);
                this.ctx.stroke();
                break;
            case 1: // Left arrow
                this.ctx.beginPath();
                this.ctx.moveTo(playerCenterX - 20, playerCenterY);
                this.ctx.lineTo(playerCenterX - 35, playerCenterY);
                this.ctx.lineTo(playerCenterX - 30, playerCenterY - 5);
                this.ctx.moveTo(playerCenterX - 35, playerCenterY);
                this.ctx.lineTo(playerCenterX - 30, playerCenterY + 5);
                this.ctx.stroke();
                break;
            case 2: // Up arrow
                this.ctx.beginPath();
                this.ctx.moveTo(playerCenterX, playerCenterY - 20);
                this.ctx.lineTo(playerCenterX, playerCenterY - 35);
                this.ctx.lineTo(playerCenterX - 5, playerCenterY - 30);
                this.ctx.moveTo(playerCenterX, playerCenterY - 35);
                this.ctx.lineTo(playerCenterX + 5, playerCenterY - 30);
                this.ctx.stroke();
                break;
            case 3: // Down arrow
                this.ctx.beginPath();
                this.ctx.moveTo(playerCenterX, playerCenterY + 20);
                this.ctx.lineTo(playerCenterX, playerCenterY + 35);
                this.ctx.lineTo(playerCenterX - 5, playerCenterY + 30);
                this.ctx.moveTo(playerCenterX, playerCenterY + 35);
                this.ctx.lineTo(playerCenterX + 5, playerCenterY + 30);
                this.ctx.stroke();
                break;
        }
    }

    drawStartButton(themeManager) {
        const buttonX = this.buttonBounds.x;
        const buttonY = this.buttonBounds.y;
        const buttonWidth = this.buttonBounds.width;
        const buttonHeight = this.buttonBounds.height;

        // Button glow effect - enhanced when hovered
        let glowIntensity = Math.sin(this.animationTime * 0.005) * 0.3 + 0.7;
        if (this.buttonHovered) {
            glowIntensity *= 1.5;
        }
        if (this.buttonPressed) {
            glowIntensity *= 0.5;
        }

        this.ctx.shadowColor = '#00ff00';
        this.ctx.shadowBlur = 15 * glowIntensity;

        // Button background - different opacity when hovered/pressed
        let backgroundAlpha = 0.2 * glowIntensity;
        if (this.buttonHovered) {
            backgroundAlpha *= 1.8;
        }
        if (this.buttonPressed) {
            backgroundAlpha *= 2;
        }

        this.ctx.fillStyle = `rgba(0, 255, 0, ${backgroundAlpha})`;
        this.ctx.strokeStyle = '#00ff00';
        this.ctx.lineWidth = this.buttonHovered ? 3 : 2;

        // Button position offset when pressed
        const offsetY = this.buttonPressed ? 2 : 0;

        this.ctx.fillRect(buttonX, buttonY + offsetY, buttonWidth, buttonHeight);
        this.ctx.strokeRect(buttonX, buttonY + offsetY, buttonWidth, buttonHeight);

        // Button text
        this.ctx.fillStyle = this.buttonHovered ? '#ffffff' : '#00ff00';
        this.ctx.font = this.buttonHovered ? 'bold 22px Arial' : 'bold 20px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('START GAME - SELECT THEME', this.canvas.width / 2, buttonY + 32 + offsetY);

        // Hover cursor indication
        if (this.buttonHovered) {
            this.ctx.fillStyle = '#ffffff';
            this.ctx.font = '14px Arial';
            this.ctx.fillText('(click here or press SPACE/ENTER)', this.canvas.width / 2, buttonY + 52 + offsetY);
        }

        // Reset shadow
        this.ctx.shadowBlur = 0;
    }

    handleMouseMove(mouseX, mouseY) {
        // Check if mouse is over the start button
        const wasHovered = this.buttonHovered;
        this.buttonHovered = (
            mouseX >= this.buttonBounds.x &&
            mouseX <= this.buttonBounds.x + this.buttonBounds.width &&
            mouseY >= this.buttonBounds.y &&
            mouseY <= this.buttonBounds.y + this.buttonBounds.height
        );

        // Change cursor style
        if (this.buttonHovered !== wasHovered) {
            document.body.style.cursor = this.buttonHovered ? 'pointer' : 'default';
        }
    }

    handleMouseClick(mouseX, mouseY) {
        // Check if click is on the start button
        if (this.buttonHovered) {
            this.buttonPressed = true;
            // Reset cursor
            document.body.style.cursor = 'default';

            // Add click effect with slight delay for better user feedback
            setTimeout(() => {
                this.buttonPressed = false;
            }, 150);

            return true; // Indicate button was clicked
        }
        return false;
    }
}

// Start the game state manager
window.addEventListener('load', () => {
    new GameStateManager();
});