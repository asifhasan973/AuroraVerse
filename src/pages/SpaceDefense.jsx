import { useState, useEffect, useRef, useCallback } from 'react';
import { Play, RotateCcw, Trophy, Target, Zap, Shield, Star, Rocket, Timer, Space } from 'lucide-react';

export default function SpaceDefense() {
    const [gameState, setGameState] = useState('menu'); // 'menu', 'playing', 'paused', 'gameOver', 'victory'
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [lives, setLives] = useState(3);
    const [wave, setWave] = useState(1);
    const [enemies, setEnemies] = useState([]);
    const [bullets, setBullets] = useState([]);
    const [powerUps, setPowerUps] = useState([]);
    const [particles, setParticles] = useState([]);
    const [playerPosition, setPlayerPosition] = useState({ x: 50, y: 50 });
    const [keys, setKeys] = useState({});
    const [lastShot, setLastShot] = useState(0);
    const [shootCooldown, setShootCooldown] = useState(150);
    const [enemySpawnTimer, setEnemySpawnTimer] = useState(0);
    const [waveTimer, setWaveTimer] = useState(0);
    const [isShieldActive, setIsShieldActive] = useState(false);
    const [shieldTimer, setShieldTimer] = useState(0);
    const [multiShot, setMultiShot] = useState(false);
    const [rapidFire, setRapidFire] = useState(false);
    const [highScore, setHighScore] = useState(0);
    const [survivalTime, setSurvivalTime] = useState(100); // 10 seconds survival timer
    const [gameStartTime, setGameStartTime] = useState(0);

    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const gameAreaRef = useRef(null);

    // Use refs to store current values for keyboard handlers
    const playerPositionRef = useRef(playerPosition);
    const multiShotRef = useRef(multiShot);
    const lastShotRef = useRef(lastShot);
    const shootCooldownRef = useRef(shootCooldown);

    // Update refs when state changes
    useEffect(() => {
        playerPositionRef.current = playerPosition;
    }, [playerPosition]);

    useEffect(() => {
        multiShotRef.current = multiShot;
    }, [multiShot]);

    useEffect(() => {
        lastShotRef.current = lastShot;
    }, [lastShot]);

    useEffect(() => {
        shootCooldownRef.current = shootCooldown;
    }, [shootCooldown]);

    // Game constants
    const CANVAS_WIDTH = 800;
    const CANVAS_HEIGHT = 600;
    const PLAYER_SIZE = 40;
    const ENEMY_SIZE = 30;
    const BULLET_SIZE = 6;
    const POWERUP_SIZE = 25;

    // Initialize game
    useEffect(() => {
        const savedHighScore = localStorage.getItem('spaceDefenseHighScore');
        if (savedHighScore) {
            setHighScore(parseInt(savedHighScore));
        }
    }, []);

    // Game loop
    const gameLoop = useCallback(() => {
        if (gameState !== 'playing') return;

        const now = Date.now();
        const deltaTime = now - lastShot;

        // Update player position based on keys
        updatePlayerPosition();

        // Spawn enemies
        if (now - enemySpawnTimer > 1000 - (level * 50)) {
            spawnEnemy();
            setEnemySpawnTimer(now);
        }

        // Update bullets
        updateBullets();

        // Update enemies
        updateEnemies();

        // Update power-ups
        updatePowerUps();

        // Update particles
        updateParticles();

        // Check collisions
        checkCollisions();

        // Check wave completion
        checkWaveCompletion();

        // Update shield
        if (isShieldActive && now - shieldTimer > 3000) {
            setIsShieldActive(false);
        }

        // Update survival timer
        if (gameStartTime > 0) {
            const elapsed = (now - gameStartTime) / 5000;
            const remaining = Math.max(0, 10 - elapsed);
            setSurvivalTime(remaining);

            if (remaining <= 0) {
                setGameState('victory');
                if (score > highScore) {
                    setHighScore(score);
                    localStorage.setItem('spaceDefenseHighScore', score.toString());
                }
            }
        }

        // Draw everything
        draw();

        animationRef.current = requestAnimationFrame(gameLoop);
    }, [gameState, playerPosition, enemies, bullets, powerUps, particles, level, wave, isShieldActive, shieldTimer, lastShot, shootCooldown]);

    // Start game loop when playing
    useEffect(() => {
        if (gameState === 'playing') {
            animationRef.current = requestAnimationFrame(gameLoop);
        } else {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        }

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [gameState, gameLoop]);

    // Shoot function using refs for current values
    const shoot = useCallback(() => {
        const now = Date.now();
        if (now - lastShotRef.current < shootCooldownRef.current) return;

        setLastShot(now);
        const currentPos = playerPositionRef.current;

        if (multiShotRef.current) {
            // Triple shot
            setBullets(prev => [
                ...prev,
                { id: Date.now(), x: currentPos.x, y: currentPos.y - 20, vx: 0, vy: -10, type: 'player' },
                { id: Date.now() + 1, x: currentPos.x - 15, y: currentPos.y - 15, vx: -2, vy: -9, type: 'player' },
                { id: Date.now() + 2, x: currentPos.x + 15, y: currentPos.y - 15, vx: 2, vy: -9, type: 'player' }
            ]);
        } else {
            setBullets(prev => [
                ...prev,
                { id: Date.now(), x: currentPos.x, y: currentPos.y - 20, vx: 0, vy: -10, type: 'player' }
            ]);
        }
    }, []);

    // Keyboard controls
    useEffect(() => {
        const handleKeyDown = (e) => {
            setKeys(prev => ({ ...prev, [e.code]: true }));

            if (gameState === 'playing') {
                if (e.code === 'Space') {
                    e.preventDefault();
                    shoot();
                }
            }
        };

        const handleKeyUp = (e) => {
            setKeys(prev => ({ ...prev, [e.code]: false }));
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [gameState, shoot]);

    const updatePlayerPosition = () => {
        setPlayerPosition(prev => {
            let newX = prev.x;
            let newY = prev.y;
            const speed = 5;

            if (keys['ArrowLeft'] || keys['KeyA']) {
                newX = Math.max(PLAYER_SIZE / 2, newX - speed);
            }
            if (keys['ArrowRight'] || keys['KeyD']) {
                newX = Math.min(CANVAS_WIDTH - PLAYER_SIZE / 2, newX + speed);
            }
            if (keys['ArrowUp'] || keys['KeyW']) {
                newY = Math.max(PLAYER_SIZE / 2, newY - speed);
            }
            if (keys['ArrowDown'] || keys['KeyS']) {
                newY = Math.min(CANVAS_HEIGHT - PLAYER_SIZE / 2, newY + speed);
            }

            return { x: newX, y: newY };
        });
    };

    const spawnEnemy = () => {
        const enemyTypes = [
            { type: 'asteroid', speed: 2, health: 1, color: '#8B7355', points: 10, rotation: Math.random() * Math.PI * 2 },
            { type: 'comet', speed: 4, health: 1, color: '#87CEEB', points: 15, rotation: 0 },
            { type: 'solarFlare', speed: 1.5, health: 3, color: '#FFA500', points: 25, rotation: 0 }
        ];

        const enemyType = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];

        setEnemies(prev => [
            ...prev,
            {
                id: Date.now(),
                x: Math.random() * (CANVAS_WIDTH - ENEMY_SIZE),
                y: -ENEMY_SIZE,
                vx: (Math.random() - 0.5) * 2,
                vy: enemyType.speed,
                health: enemyType.health,
                maxHealth: enemyType.health,
                type: enemyType.type,
                color: enemyType.color,
                points: enemyType.points,
                rotation: enemyType.rotation,
                rotationSpeed: (Math.random() - 0.5) * 0.1
            }
        ]);
    };

    const updateBullets = () => {
        setBullets(prev => prev.filter(bullet => {
            bullet.x += bullet.vx;
            bullet.y += bullet.vy;
            return bullet.y > -BULLET_SIZE && bullet.y < CANVAS_HEIGHT + BULLET_SIZE &&
                bullet.x > -BULLET_SIZE && bullet.x < CANVAS_WIDTH + BULLET_SIZE;
        }));
    };

    const updateEnemies = () => {
        setEnemies(prev => prev.filter(enemy => {
            enemy.x += enemy.vx;
            enemy.y += enemy.vy;
            enemy.rotation += enemy.rotationSpeed;

            // Bounce off walls
            if (enemy.x <= 0 || enemy.x >= CANVAS_WIDTH - ENEMY_SIZE) {
                enemy.vx *= -1;
            }

            return enemy.y < CANVAS_HEIGHT + ENEMY_SIZE;
        }));
    };

    const updatePowerUps = () => {
        setPowerUps(prev => prev.filter(powerUp => {
            powerUp.y += powerUp.vy;
            powerUp.rotation = (powerUp.rotation || 0) + 0.05;
            return powerUp.y < CANVAS_HEIGHT + POWERUP_SIZE;
        }));
    };

    const updateParticles = () => {
        setParticles(prev => prev.filter(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= 0.02;
            return particle.life > 0;
        }));
    };

    const checkCollisions = () => {
        // Bullet vs Enemy
        setBullets(prev => {
            const remainingBullets = [...prev];
            const playerBullets = remainingBullets.filter(bullet => bullet.type === 'player');

            setEnemies(prevEnemies => {
                const remainingEnemies = [...prevEnemies];

                playerBullets.forEach((bullet, bulletIndex) => {
                    remainingEnemies.forEach((enemy, enemyIndex) => {
                        if (isColliding(bullet, enemy, BULLET_SIZE, ENEMY_SIZE)) {
                            // Remove bullet
                            remainingBullets.splice(remainingBullets.indexOf(bullet), 1);

                            // Damage enemy
                            enemy.health--;

                            // Create explosion particles
                            createExplosion(enemy.x + ENEMY_SIZE / 2, enemy.y + ENEMY_SIZE / 2, enemy.color);

                            if (enemy.health <= 0) {
                                // Remove enemy and add score
                                remainingEnemies.splice(enemyIndex, 1);
                                setScore(prev => prev + enemy.points);

                                // Chance to spawn power-up
                                if (Math.random() < 0.15) {
                                    spawnPowerUp(enemy.x + ENEMY_SIZE / 2, enemy.y + ENEMY_SIZE / 2);
                                }
                            }
                        }
                    });
                });

                return remainingEnemies;
            });

            return remainingBullets;
        });

        // Enemy vs Player
        setEnemies(prev => {
            const remainingEnemies = [...prev];

            remainingEnemies.forEach((enemy, index) => {
                if (isColliding(enemy, playerPosition, ENEMY_SIZE, PLAYER_SIZE)) {
                    if (!isShieldActive) {
                        setLives(prev => prev - 1);
                        setIsShieldActive(true);
                        setShieldTimer(Date.now());
                        createExplosion(playerPosition.x, playerPosition.y, '#00ffff');
                    }
                    remainingEnemies.splice(index, 1);
                }
            });

            return remainingEnemies;
        });

        // Power-up vs Player
        setPowerUps(prev => {
            const remainingPowerUps = [...prev];

            remainingPowerUps.forEach((powerUp, index) => {
                if (isColliding(powerUp, playerPosition, POWERUP_SIZE, PLAYER_SIZE)) {
                    applyPowerUp(powerUp.type);
                    remainingPowerUps.splice(index, 1);
                }
            });

            return remainingPowerUps;
        });
    };

    const isColliding = (obj1, obj2, size1, size2) => {
        const dx = obj1.x - obj2.x;
        const dy = obj1.y - obj2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < (size1 + size2) / 2;
    };

    const createExplosion = (x, y, color) => {
        const newParticles = [];
        for (let i = 0; i < 12; i++) {
            newParticles.push({
                id: Date.now() + i,
                x,
                y,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                color,
                life: 1
            });
        }
        setParticles(prev => [...prev, ...newParticles]);
    };

    const spawnPowerUp = (x, y) => {
        const powerUpTypes = ['weaponBoost', 'energyShield'];
        const type = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];

        setPowerUps(prev => [...prev, {
            id: Date.now(),
            x,
            y,
            vx: 0,
            vy: 2,
            type,
            rotation: 0
        }]);
    };

    const applyPowerUp = (type) => {
        switch (type) {
            case 'weaponBoost':
                // Weapon boost power-up: Multi-shot and rapid fire combined
                setMultiShot(true);
                setRapidFire(true);
                setShootCooldown(75);
                setTimeout(() => {
                    setMultiShot(false);
                    setRapidFire(false);
                    setShootCooldown(150);
                }, 12000);
                break;
            case 'energyShield':
                // Energy shield power-up: Shield and extended survival time
                setIsShieldActive(true);
                setShieldTimer(Date.now());
                setSurvivalTime(prev => Math.min(prev + 3, 15)); // Add 3 seconds, max 15
                break;
        }
    };

    const checkWaveCompletion = () => {
        if (enemies.length === 0 && waveTimer === 0) {
            setWaveTimer(Date.now());
        }

        if (waveTimer > 0 && Date.now() - waveTimer > 3000) {
            setWave(prev => prev + 1);
            setLevel(prev => prev + 1);
            setWaveTimer(0);
        }
    };

    const draw = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        // Clear canvas with space background
        const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
        gradient.addColorStop(0, '#000428');
        gradient.addColorStop(1, '#004e92');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Draw stars background
        drawStars(ctx);

        // Draw player
        drawPlayer(ctx);

        // Draw enemies
        enemies.forEach(enemy => drawEnemy(ctx, enemy));

        // Draw bullets
        bullets.forEach(bullet => drawBullet(ctx, bullet));

        // Draw power-ups
        powerUps.forEach(powerUp => drawPowerUp(ctx, powerUp));

        // Draw particles
        particles.forEach(particle => drawParticle(ctx, particle));

        // Draw UI
        drawUI(ctx);
    };

    const drawStars = (ctx) => {
        ctx.fillStyle = '#ffffff';
        for (let i = 0; i < 100; i++) {
            const x = (i * 7) % CANVAS_WIDTH;
            const y = (i * 11) % CANVAS_HEIGHT;
            const size = Math.sin(Date.now() * 0.001 + i) * 1.5 + 0.5;
            ctx.globalAlpha = 0.5 + Math.sin(Date.now() * 0.002 + i) * 0.5;
            ctx.fillRect(x, y, size, size);
        }
        ctx.globalAlpha = 1;
    };

    const drawPlayer = (ctx) => {
        const { x, y } = playerPosition;

        ctx.save();
        ctx.translate(x, y);

        // Shield effect
        if (isShieldActive) {
            const time = Date.now() * 0.002;
            ctx.strokeStyle = `rgba(0, 255, 255, ${0.3 + Math.sin(time) * 0.2})`;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(0, 0, PLAYER_SIZE + 10, 0, Math.PI * 2);
            ctx.stroke();

            // Inner shield ring
            ctx.strokeStyle = `rgba(0, 200, 255, ${0.2 + Math.sin(time + 1) * 0.1})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(0, 0, PLAYER_SIZE + 5, 0, Math.PI * 2);
            ctx.stroke();
        }

        // Spacecraft body
        ctx.fillStyle = '#2C3E50';
        ctx.beginPath();
        ctx.moveTo(0, -PLAYER_SIZE / 2);
        ctx.lineTo(-PLAYER_SIZE / 3, PLAYER_SIZE / 3);
        ctx.lineTo(-PLAYER_SIZE / 6, PLAYER_SIZE / 2);
        ctx.lineTo(PLAYER_SIZE / 6, PLAYER_SIZE / 2);
        ctx.lineTo(PLAYER_SIZE / 3, PLAYER_SIZE / 3);
        ctx.closePath();
        ctx.fill();

        // Spacecraft detail
        ctx.fillStyle = '#34495E';
        ctx.beginPath();
        ctx.moveTo(0, -PLAYER_SIZE / 2);
        ctx.lineTo(-PLAYER_SIZE / 4, PLAYER_SIZE / 4);
        ctx.lineTo(0, PLAYER_SIZE / 3);
        ctx.lineTo(PLAYER_SIZE / 4, PLAYER_SIZE / 4);
        ctx.closePath();
        ctx.fill();

        // Cockpit
        ctx.fillStyle = '#3498DB';
        ctx.beginPath();
        ctx.arc(0, -PLAYER_SIZE / 4, PLAYER_SIZE / 8, 0, Math.PI * 2);
        ctx.fill();

        // Wings
        ctx.fillStyle = '#E74C3C';
        ctx.fillRect(-PLAYER_SIZE / 2, 0, PLAYER_SIZE / 6, PLAYER_SIZE / 3);
        ctx.fillRect(PLAYER_SIZE / 3, 0, PLAYER_SIZE / 6, PLAYER_SIZE / 3);

        // Engine flames
        const flameSize = Math.sin(Date.now() * 0.01) * 3 + 8;
        ctx.fillStyle = '#FF6B35';
        ctx.beginPath();
        ctx.moveTo(-PLAYER_SIZE / 6, PLAYER_SIZE / 2);
        ctx.lineTo(-PLAYER_SIZE / 8, PLAYER_SIZE / 2 + flameSize);
        ctx.lineTo(0, PLAYER_SIZE / 2 + flameSize / 2);
        ctx.lineTo(PLAYER_SIZE / 8, PLAYER_SIZE / 2 + flameSize);
        ctx.lineTo(PLAYER_SIZE / 6, PLAYER_SIZE / 2);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#FFEB3B';
        ctx.beginPath();
        ctx.moveTo(-PLAYER_SIZE / 8, PLAYER_SIZE / 2);
        ctx.lineTo(-PLAYER_SIZE / 10, PLAYER_SIZE / 2 + flameSize * 0.6);
        ctx.lineTo(0, PLAYER_SIZE / 2 + flameSize * 0.4);
        ctx.lineTo(PLAYER_SIZE / 10, PLAYER_SIZE / 2 + flameSize * 0.6);
        ctx.lineTo(PLAYER_SIZE / 8, PLAYER_SIZE / 2);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    };

    const drawEnemy = (ctx, enemy) => {
        const { x, y, type, rotation } = enemy;

        ctx.save();
        ctx.translate(x + ENEMY_SIZE / 2, y + ENEMY_SIZE / 2);
        ctx.rotate(rotation);

        if (type === 'asteroid') {
            // Draw asteroid
            ctx.fillStyle = '#8B7355';
            ctx.strokeStyle = '#654321';
            ctx.lineWidth = 2;
            ctx.beginPath();
            const sides = 8;
            for (let i = 0; i < sides; i++) {
                const angle = (i / sides) * Math.PI * 2;
                const radius = ENEMY_SIZE / 2 + Math.sin(i * 1.7) * 5;
                if (i === 0) {
                    ctx.moveTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
                } else {
                    ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
                }
            }
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Crater details
            ctx.fillStyle = '#696969';
            ctx.beginPath();
            ctx.arc(5, -3, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(-4, 4, 2, 0, Math.PI * 2);
            ctx.fill();

        } else if (type === 'comet') {
            // Draw comet
            ctx.fillStyle = '#87CEEB';
            ctx.beginPath();
            ctx.arc(0, 0, ENEMY_SIZE / 2, 0, Math.PI * 2);
            ctx.fill();

            // Ice core
            ctx.fillStyle = '#B0E0E6';
            ctx.beginPath();
            ctx.arc(-3, -3, ENEMY_SIZE / 3, 0, Math.PI * 2);
            ctx.fill();

            // Tail
            const tailGradient = ctx.createLinearGradient(0, 0, 0, ENEMY_SIZE * 2);
            tailGradient.addColorStop(0, 'rgba(135, 206, 235, 0.6)');
            tailGradient.addColorStop(1, 'rgba(135, 206, 235, 0)');
            ctx.fillStyle = tailGradient;
            ctx.beginPath();
            ctx.moveTo(-ENEMY_SIZE / 3, 0);
            ctx.lineTo(0, ENEMY_SIZE * 2);
            ctx.lineTo(ENEMY_SIZE / 3, 0);
            ctx.closePath();
            ctx.fill();

        } else if (type === 'solarFlare') {
            // Draw solar flare
            const time = Date.now() * 0.003;

            // Outer glow
            const glowGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, ENEMY_SIZE);
            glowGradient.addColorStop(0, 'rgba(255, 215, 0, 0.8)');
            glowGradient.addColorStop(0.5, 'rgba(255, 140, 0, 0.5)');
            glowGradient.addColorStop(1, 'rgba(255, 69, 0, 0)');
            ctx.fillStyle = glowGradient;
            ctx.beginPath();
            ctx.arc(0, 0, ENEMY_SIZE, 0, Math.PI * 2);
            ctx.fill();

            // Core
            ctx.fillStyle = '#FFD700';
            ctx.beginPath();
            ctx.arc(0, 0, ENEMY_SIZE / 2, 0, Math.PI * 2);
            ctx.fill();

            // Flare spikes
            ctx.strokeStyle = '#FFA500';
            ctx.lineWidth = 2;
            for (let i = 0; i < 8; i++) {
                const angle = (i / 8) * Math.PI * 2 + time;
                const innerRadius = ENEMY_SIZE / 2;
                const outerRadius = ENEMY_SIZE / 2 + Math.sin(time + i) * 8 + 5;
                ctx.beginPath();
                ctx.moveTo(Math.cos(angle) * innerRadius, Math.sin(angle) * innerRadius);
                ctx.lineTo(Math.cos(angle) * outerRadius, Math.sin(angle) * outerRadius);
                ctx.stroke();
            }
        }

        // Health bar
        if (enemy.health < enemy.maxHealth) {
            ctx.restore();
            ctx.save();
            ctx.translate(x, y - 8);
            ctx.fillStyle = '#ff0000';
            ctx.fillRect(0, 0, ENEMY_SIZE, 4);
            ctx.fillStyle = '#00ff00';
            ctx.fillRect(0, 0, (ENEMY_SIZE * enemy.health) / enemy.maxHealth, 4);
        }

        ctx.restore();
    };

    const drawBullet = (ctx, bullet) => {
        // Draw laser bullet
        const gradient = ctx.createLinearGradient(
            bullet.x, bullet.y + BULLET_SIZE,
            bullet.x, bullet.y - BULLET_SIZE * 2
        );
        gradient.addColorStop(0, 'rgba(255, 255, 0, 0.2)');
        gradient.addColorStop(0.5, 'rgba(255, 255, 0, 1)');
        gradient.addColorStop(1, 'rgba(255, 200, 0, 1)');

        ctx.fillStyle = gradient;
        ctx.fillRect(bullet.x - BULLET_SIZE / 2, bullet.y - BULLET_SIZE * 2, BULLET_SIZE, BULLET_SIZE * 3);

        // Glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#FFFF00';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(bullet.x - BULLET_SIZE / 4, bullet.y - BULLET_SIZE, BULLET_SIZE / 2, BULLET_SIZE * 1.5);
        ctx.shadowBlur = 0;
    };

    const drawPowerUp = (ctx, powerUp) => {
        const { x, y, type, rotation } = powerUp;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation || 0);

        if (type === 'weaponBoost') {
            // Draw weapon boost power-up
            const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, POWERUP_SIZE);
            gradient.addColorStop(0, 'rgba(0, 255, 136, 0.8)');
            gradient.addColorStop(1, 'rgba(0, 255, 136, 0.2)');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(0, 0, POWERUP_SIZE, 0, Math.PI * 2);
            ctx.fill();

            // Icon
            ctx.fillStyle = '#FFFFFF';
            ctx.font = 'bold 16px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('⚡', 0, 0);

        } else if (type === 'energyShield') {
            // Draw shield power-up
            const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, POWERUP_SIZE);
            gradient.addColorStop(0, 'rgba(0, 200, 255, 0.8)');
            gradient.addColorStop(1, 'rgba(0, 200, 255, 0.2)');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(0, 0, POWERUP_SIZE, 0, Math.PI * 2);
            ctx.fill();

            // Icon
            ctx.fillStyle = '#FFFFFF';
            ctx.font = 'bold 16px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('🛡️', 0, 0);
        }

        // Rotating border
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.arc(0, 0, POWERUP_SIZE - 2, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.restore();
    };

    const drawParticle = (ctx, particle) => {
        ctx.globalAlpha = particle.life;
        const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, 4
        );
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(particle.x - 4, particle.y - 4, 8, 8);
        ctx.globalAlpha = 1;
    };

    const drawUI = (ctx) => {
        // UI Background
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, CANVAS_WIDTH, 180);

        // Score
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 20px Arial';
        ctx.fillText(`Score: ${score}`, 10, 30);

        // Lives with hearts
        ctx.fillText(`Lives: `, 10, 60);
        for (let i = 0; i < lives; i++) {
            ctx.fillText('❤️', 70 + i * 25, 60);
        }

        // Level
        ctx.fillText(`Level: ${level}`, 10, 90);

        // Wave
        ctx.fillText(`Wave: ${wave}`, 10, 120);

        // Survival Timer
        ctx.fillStyle = survivalTime <= 3 ? '#ff4444' : '#ffffff';
        ctx.font = 'bold 24px Arial';
        ctx.fillText(`Survival: ${survivalTime.toFixed(1)}s`, 10, 155);
        ctx.font = 'bold 20px Arial';

        // Power-up indicators
        if (isShieldActive) {
            ctx.fillStyle = '#00ffff';
            ctx.fillText('🛡️ SHIELD ACTIVE', CANVAS_WIDTH - 180, 30);
        }
        if (multiShot) {
            ctx.fillStyle = '#ff00ff';
            ctx.fillText('⚡ MULTI SHOT', CANVAS_WIDTH - 180, 60);
        }
        if (rapidFire) {
            ctx.fillStyle = '#ffff00';
            ctx.fillText('🔥 RAPID FIRE', CANVAS_WIDTH - 180, 90);
        }
    };

    const startGame = () => {
        setGameState('playing');
        setScore(0);
        setLevel(1);
        setLives(3);
        setWave(1);
        setEnemies([]);
        setBullets([]);
        setPowerUps([]);
        setParticles([]);
        setPlayerPosition({ x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT - 80 });
        setLastShot(0);
        setEnemySpawnTimer(0);
        setWaveTimer(0);
        setIsShieldActive(false);
        setMultiShot(false);
        setRapidFire(false);
        setShootCooldown(150);
        setSurvivalTime(10);
        setGameStartTime(Date.now());
    };

    const pauseGame = () => {
        setGameState(gameState === 'playing' ? 'paused' : 'playing');
    };

    const resetGame = () => {
        setGameState('menu');
        if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('spaceDefenseHighScore', score.toString());
        }
    };

    // Check game over
    useEffect(() => {
        if (lives <= 0 && gameState === 'playing') {
            setGameState('gameOver');
            if (score > highScore) {
                setHighScore(score);
                localStorage.setItem('spaceDefenseHighScore', score.toString());
            }
        }
    }, [lives, gameState, score, highScore]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white">
            {/* Animated particles background */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(80)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-cyan-300 rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 4}s`,
                            animationDuration: `${3 + Math.random() * 3}s`
                        }}
                    />
                ))}
                {/* Floating space debris */}
                {[...Array(30)].map((_, i) => (
                    <div
                        key={`debris-${i}`}
                        className="absolute w-2 h-2 bg-purple-400 rounded-full animate-bounce opacity-40"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${4 + Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 container mx-auto px-4 py-8 pt-20">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="relative inline-block">
                        <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full blur-md opacity-20 animate-pulse"></div>
                        <h1 className="relative text-4xl md:text-6xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-cyan-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
                                🚀 Space Defense 🚀
                            </span>
                        </h1>
                    </div>
                    <p className="text-lg md:text-xl text-cyan-200 max-w-2xl mx-auto">
                        Defend Earth from cosmic threats! Navigate through asteroids, comets, and solar flares.
                    </p>
                </div>

                {/* Game Area */}
                <div className="flex justify-center mb-8">
                    <div className="relative">
                        <canvas
                            ref={canvasRef}
                            width={CANVAS_WIDTH}
                            height={CANVAS_HEIGHT}
                            className="border-2 border-cyan-400/30 rounded-lg shadow-2xl shadow-cyan-500/20"
                            style={{ background: '#0a0a0a' }}
                        />

                        {/* Game Over Overlay */}
                        {gameState === 'gameOver' && (
                            <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-lg">
                                <div className="text-center">
                                    <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                                    <h2 className="text-3xl font-bold text-red-400 mb-2">Game Over!</h2>
                                    <p className="text-xl text-cyan-200 mb-4">Final Score: {score}</p>
                                    <p className="text-lg text-purple-200 mb-6">High Score: {highScore}</p>
                                    <div className="flex gap-4 justify-center">
                                        <button
                                            onClick={startGame}
                                            className="flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-all duration-300 hover:scale-105"
                                        >
                                            <Play className="w-5 h-5" />
                                            Play Again
                                        </button>
                                        <button
                                            onClick={resetGame}
                                            className="flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-all duration-300 hover:scale-105"
                                        >
                                            <RotateCcw className="w-5 h-5" />
                                            Menu
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Victory Overlay */}
                        {gameState === 'victory' && (
                            <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-lg">
                                <div className="text-center">
                                    <Star className="w-16 h-16 text-yellow-400 mx-auto mb-4 animate-pulse" />
                                    <h2 className="text-3xl font-bold text-green-400 mb-2">Mission Complete!</h2>
                                    <p className="text-xl text-cyan-200 mb-2">You survived the cosmic storm!</p>
                                    <p className="text-lg text-yellow-200 mb-4">Final Score: {score}</p>
                                    <p className="text-lg text-purple-200 mb-6">High Score: {highScore}</p>
                                    <div className="flex gap-4 justify-center">
                                        <button
                                            onClick={startGame}
                                            className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all duration-300 hover:scale-105"
                                        >
                                            <Play className="w-5 h-5" />
                                            Play Again
                                        </button>
                                        <button
                                            onClick={resetGame}
                                            className="flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-all duration-300 hover:scale-105"
                                        >
                                            <RotateCcw className="w-5 h-5" />
                                            Menu
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Pause Overlay */}
                        {gameState === 'paused' && (
                            <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-lg">
                                <div className="text-center">
                                    <h2 className="text-3xl font-bold text-cyan-400 mb-6">Game Paused</h2>
                                    <div className="flex gap-4 justify-center">
                                        <button
                                            onClick={pauseGame}
                                            className="flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-all duration-300 hover:scale-105"
                                        >
                                            <Play className="w-5 h-5" />
                                            Resume
                                        </button>
                                        <button
                                            onClick={resetGame}
                                            className="flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-all duration-300 hover:scale-105"
                                        >
                                            <RotateCcw className="w-5 h-5" />
                                            Menu
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Menu */}
                {gameState === 'menu' && (
                    <div className="text-center">
                        <div className="bg-gradient-to-br from-slate-800/30 via-purple-900/20 to-indigo-800/30 backdrop-blur-md rounded-2xl p-8 border-2 border-cyan-400/30 shadow-2xl shadow-cyan-500/10 max-w-2xl mx-auto">
                            <div className="mb-8">
                                <Rocket className="w-20 h-20 text-cyan-400 mx-auto mb-4" />
                                <h2 className="text-2xl font-bold text-cyan-300 mb-4">Welcome to Space Defense</h2>
                                <p className="text-cyan-100 mb-6">
                                    Navigate your spacecraft through dangerous cosmic obstacles! Destroy asteroids, avoid comets, and survive solar flares.
                                </p>
                                <div className="text-left max-w-md mx-auto space-y-2 text-sm text-cyan-200">
                                    <div className="flex items-center gap-2">
                                        <Target className="w-4 h-4" />
                                        <span>Arrow keys or WASD to move</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Zap className="w-4 h-4" />
                                        <span>Spacebar to shoot</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">☄️</span>
                                        <span>Asteroids: Slow but sturdy space rocks</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">💫</span>
                                        <span>Comets: Fast icy projectiles</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">☀️</span>
                                        <span>Solar Flares: Powerful energy bursts</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Timer className="w-4 h-4" />
                                        <span>Survive 10 seconds to win!</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <button
                                    onClick={startGame}
                                    className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 text-lg font-semibold"
                                >
                                    <Play className="w-6 h-6" />
                                    Start Game
                                </button>

                                {highScore > 0 && (
                                    <div className="text-center text-cyan-300">
                                        <p className="text-lg font-semibold">High Score: {highScore}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Controls Info */}
                {gameState === 'playing' && (
                    <div className="text-center">
                        <div className="bg-gradient-to-br from-slate-800/30 via-purple-900/20 to-indigo-800/30 backdrop-blur-md rounded-xl p-4 border border-cyan-400/30 max-w-2xl mx-auto">
                            <p className="text-cyan-200 text-sm">
                                <span className="font-semibold">Controls:</span> Arrow Keys/WASD to move • Spacebar to shoot • Survive 10 seconds to win!
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}