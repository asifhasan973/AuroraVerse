// main.js
import {
  THREE, scene, camera, renderer, composer,
  initScene, updateControls, updateTime, time, transitionToView
} from './scene-core.js';

import { createSun, animateSun } from './sun.js';
import { createEarth } from './earth.js';
import { createSimpleDust, updateSimpleDust, clearAllDust, updateDustSpeed } from './simpleDust.js';
import { createMagnetosphere, updateMagnetosphere } from './magnetosphere.js';
import { createStars } from './stars.js';
import { ControlPanel } from './control-panel.js';
import { DonkiAPI } from './donki-api.js';
import { initGroundView, updateGroundAurora, showGroundView, renderGroundView } from './groundview.js';
import { createAuroraMaterial } from './auroraShader.js';

// Setup
initScene();
createStars();
const sun = createSun();
const earth = createEarth();

// Create MASSIVE angry sun dust storm
setTimeout(() => {
  console.log('Creating MASSIVE dust storm from angry sun!');
  console.log('Sun position:', sun ? sun.position : 'Sun not found');
  console.log('Earth position:', earth ? earth.position : 'Earth not found');

  if (sun && sun.position && earth && earth.position) {
    // Create dense dust clouds around the sun
    for (let i = 0; i < 4; i++) {
      createSimpleDust(sun.position, earth.position, simulationParams.windSpeed / 800);
    }
    console.log('Dense dust clouds created - 4 clouds of 6000 particles each!');
  } else {
    console.error('Sun or Earth not found!');
  }
}, 2000);

const simulationParams = {
  windSpeed: 800,
  density: 6,
  bz: -3,
  emissionInterval: 4, // Very frequent dense storms - every 4 seconds
  realMode: false
};
const controlPanel = new ControlPanel(simulationParams);
const auroraMaterial = createAuroraMaterial();
controlPanel.onParamChange((params) => {
  // Update dust particle speed when windSpeed changes
  if (params.windSpeed !== undefined) {
    console.log('Wind speed changed to:', params.windSpeed, 'km/s, updating dust speed to:', params.windSpeed / 800);
    updateDustSpeed(params.windSpeed / 800);
  }

  // Update magnetosphere when density or bz changes
  if (params.density !== undefined || params.bz !== undefined) {
    console.log('Magnetosphere parameters changed - Density:', params.density, 'Bz:', params.bz);
    // The magnetosphere will be updated in the next animation frame
  }

  scheduleNextAutoFlareSoon();
});
controlPanel.init();

// Data sources
const donki = new DonkiAPI();

// Optionally seed dust particles at startup
(async () => {
  if (!simulationParams.realMode) return;
  try {
    const latest = await donki.getCMEAnalysis();
    if (latest) {
      const particleCount = Math.floor(300 + simulationParams.density * 100);
      const speed = simulationParams.windSpeed / 80;
      const spread = 15 + simulationParams.density * 2;

      createDustParticles(sun.position, earth.position, {
        particleCount: particleCount,
        speed: speed,
        spread: spread,
        lifetime: 12.0
      });
      scheduleNextAutoFlareSoon();
    }
  } catch (e) {
    console.warn('DONKI seed error', e);
  }
})();

// Flare scheduling
let nextAuto = null;
let lastTap = -1e6;
function scheduleNextAutoFlareSoon() {
  if (simulationParams.emissionInterval > 0) {
    nextAuto = time + 0.2;
  } else {
    nextAuto = null;
  }
}
function maybeAuto() {
  if (simulationParams.emissionInterval <= 0) return;
  if (nextAuto === null) nextAuto = time + simulationParams.emissionInterval;
  if (time >= nextAuto) {
    console.log('Auto MASSIVE dust storm triggered');

    // Create dense dust clouds
    if (sun && sun.position && earth && earth.position) {
      for (let i = 0; i < 2; i++) {
        createSimpleDust(sun.position, earth.position, simulationParams.windSpeed / 800);
      }
    }

    nextAuto = time + simulationParams.emissionInterval;
  }
}
function spawnTap() {
  if (time - lastTap < 0.15) return;

  console.log('Manual MASSIVE dust storm triggered');

  // Create dense dust clouds
  if (sun && sun.position && earth && earth.position) {
    for (let i = 0; i < 3; i++) {
      createSimpleDust(sun.position, earth.position, simulationParams.windSpeed / 800);
    }
  }

  lastTap = time;
  nextAuto = time + (simulationParams.emissionInterval || 6);
}
sun.userData.onClick = spawnTap;

// Make dust creation available globally for testing
window.createDustStorm = () => {
  if (sun && sun.position && earth && earth.position) {
    // Create dense dust clouds
    for (let i = 0; i < 5; i++) {
      createSimpleDust(sun.position, earth.position, simulationParams.windSpeed / 800);
    }
    console.log('Dense dust clouds created - 5 clouds of 6000 particles each!');
  }
};

// Make simple test particles available globally
window.createTestParticles = () => {
  if (sun && sun.position) {
    createSimpleTestParticles(sun.position);
    console.log('Simple test particles created!');
  }
};

// Make moving particle test available globally
window.createMovingTest = () => {
  if (sun && sun.position && earth && earth.position) {
    createMovingParticleTest(sun.position, earth.position);
    console.log('Moving particle test created!');
  }
};

// Make basic shapes test available globally
window.createBasicShapes = () => {
  console.log('Creating basic shapes test...');

  // Create a simple red cube
  const cubeGeometry = new THREE.BoxGeometry(10, 10, 10);
  const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const testCube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  testCube.position.set(0, 0, 0);
  scene.add(testCube);
  console.log('Red cube created at center');

  // Create a simple green sphere
  const sphereGeometry = new THREE.SphereGeometry(5, 16, 16);
  const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const testSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  testSphere.position.set(20, 0, 0);
  scene.add(testSphere);
  console.log('Green sphere created');

  console.log('Scene children count:', scene.children.length);
};

// Debug function to check Three.js setup
window.debugThreeJS = () => {
  console.log('=== Three.js Debug Info ===');
  console.log('Scene:', scene);
  console.log('Camera:', camera);
  console.log('Renderer:', renderer);
  console.log('Scene children count:', scene.children.length);
  console.log('Camera position:', camera.position);
  console.log('Camera target:', camera.target);
  console.log('Renderer size:', renderer.getSize(new THREE.Vector2()));
  console.log('Renderer canvas:', renderer.domElement);
  console.log('========================');
};

// Clear all dust particles
window.clearDust = () => {
  clearAllDust();
  console.log('All dust particles cleared');
};

// Create a very obvious test particle cloud
window.createTestCloud = () => {
  if (sun && sun.position) {
    // Create a simple particle cloud at sun position
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(50 * 3);

    for (let i = 0; i < 50; i++) {
      const i3 = i * 3;
      positions[i3] = sun.position.x + (Math.random() - 0.5) * 30;
      positions[i3 + 1] = sun.position.y + (Math.random() - 0.5) * 30;
      positions[i3 + 2] = sun.position.z + (Math.random() - 0.5) * 30;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xffff00, // Bright yellow
      size: 15.0, // Very large
      transparent: true,
      opacity: 1.0
    });

    const cloud = new THREE.Points(geometry, material);
    scene.add(cloud);
    console.log('Test cloud created at sun position');
  }
};
renderer.domElement.addEventListener('pointerdown', evt => {
  const rect = renderer.domElement.getBoundingClientRect();
  const x = ((evt.clientX - rect.left) / rect.width) * 2 - 1;
  const y = -((evt.clientY - rect.top) / rect.height) * 2 + 1;
  const ray = new THREE.Raycaster();
  ray.setFromCamera({ x, y }, camera);
  const objs = ray.intersectObjects(scene.children, true);
  if (objs.length) {
    let o = objs[0].object;
    while (o) {
      if (o.userData?.onClick) { o.userData.onClick(); break; }
      o = o.parent;
    }
  }
});

// Ground view button: open/close pole selector without accidental immediate close
(() => {
  const groundViewWrapper = document.getElementById('ground-view-wrapper');
  const groundViewBtn = document.getElementById('ground-view-btn');
  if (!groundViewWrapper || !groundViewBtn) return;

  let outsideHandler = null;

  function closeMenu() {
    groundViewWrapper.classList.remove('active');
    if (outsideHandler) {
      document.removeEventListener('pointerdown', outsideHandler, true);
      outsideHandler = null;
    }
  }

  function openMenu() {
    groundViewWrapper.classList.add('active');
    if (outsideHandler) return;
    // Use capture to detect outside pointer downs reliably
    outsideHandler = (e) => {
      if (!groundViewWrapper.contains(e.target) && e.target !== groundViewBtn) {
        closeMenu();
      }
    };
    // Defer attach to avoid closing on the same event frame
    setTimeout(() => document.addEventListener('pointerdown', outsideHandler, true), 0);
  }

  groundViewBtn.addEventListener('pointerdown', (e) => {
    e.stopPropagation();
    const isActive = groundViewWrapper.classList.contains('active');
    if (isActive) closeMenu(); else openMenu();
  });
})();

// Initialize ground view
initGroundView();

// Handle view transitions
const spaceViewBtn = document.getElementById('space-view-btn');
const northPoleBtn = document.getElementById('north-pole-btn');
const southPoleBtn = document.getElementById('south-pole-btn');

if (spaceViewBtn) {
  spaceViewBtn.addEventListener('click', () => {
    showGroundView(false);
    transitionToView('space');
  });
}

if (northPoleBtn) {
  northPoleBtn.addEventListener('click', () => {
    const groundViewWrapper = document.getElementById('ground-view-wrapper');
    if (groundViewWrapper) groundViewWrapper.classList.remove('active');
    showGroundView(false);
    transitionToView('northPole', () => {
      showGroundView(true, 'north');
    });
  });
}

if (southPoleBtn) {
  southPoleBtn.addEventListener('click', () => {
    const groundViewWrapper = document.getElementById('ground-view-wrapper');
    if (groundViewWrapper) groundViewWrapper.classList.remove('active');
    showGroundView(false);
    transitionToView('southPole', () => {
      showGroundView(true, 'south');
    });
  });
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  updateTime();
  updateControls();
  animateSun(time);
  if (earth) earth.rotation.y += 0.003;

  maybeAuto();

  // Update simple dust particles
  updateSimpleDust();

  // Update magnetosphere with current simulation parameters
  updateMagnetosphere(time, {
    pd: simulationParams.density,
    bz: simulationParams.bz
  });

  composer.render();
  if (auroraMaterial?.uniforms) auroraMaterial.uniforms.uTime.value = time;
  updateGroundAurora(simulationParams, time);
  renderGroundView();
}
// Start animation immediately and hide loader when ready
console.log('Aurora Lab: Starting animation...');

try {
  // Start the animation loop
  animate();
  console.log('Aurora Lab: Animation started successfully');

  // Hide the loader after a short delay to ensure everything is loaded
  setTimeout(() => {
    if (window.hideAuroraLoader) {
      console.log('Aurora Lab: Hiding loader...');
      window.hideAuroraLoader();
    }
  }, 1000);
} catch (error) {
  console.error('Aurora Lab: Error starting animation:', error);

  // Hide loader even if there's an error
  setTimeout(() => {
    if (window.hideAuroraLoader) {
      window.hideAuroraLoader();
    }
  }, 2000);
}
