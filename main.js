import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(4.61, 2.74, 8);

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
});
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);



document.addEventListener('keydown', (event) => {
  if (gameRunning) {
    handleKeyDown(event.key);
  }
});

function handleKeyDown(key) {
  const moveDistance = 0.4; // Adjust the movement speed as needed

  switch (key.toLowerCase()) {
    case 'w':
      player.position.z -= moveDistance;
      break;
    case 'a':
      player.position.x -= moveDistance;
      break;
    case 's':
      player.position.z += moveDistance;
      break;
    case 'd':
      player.position.x += moveDistance;
      break;
  }
}


let player;
let gameRunning = true;
let gamePaused = false;
let gameOverScreen;
let points = 0;

const pointsDisplay = document.createElement('div');
pointsDisplay.style.position = 'fixed';
pointsDisplay.style.top = '10px';
pointsDisplay.style.left = '10px';
pointsDisplay.style.color = 'white';
pointsDisplay.style.zIndex = '999'; // Ensure it's above Three.js canvas
document.body.appendChild(pointsDisplay);
// Load the MTL and OBJ files for the playable character
const mtlLoader = new MTLLoader();
mtlLoader.load('objects/untitled.mtl', (mtl) => {
  mtl.preload();
  
  const objLoader = new OBJLoader();
  objLoader.setMaterials(mtl);
  objLoader.load('objects/untitled.obj', (obj) => {
    player = obj;
    player.scale.set(0.3, 0.3, 0.3); // Adjust the scale as needed
    player.position.set(0, 0.5, 0); // Set initial position on the ground
    player.rotation.set(0, -Math.PI / 2 , 0);
    player.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material.side = THREE.DoubleSide;
      }
    });
    scene.add(player);
  });
});



// Set up the ground
const ground = new THREE.Mesh(
  new THREE.BoxGeometry(10, 0.5, 50),
  new THREE.MeshStandardMaterial({ color: '#708090' })
);
ground.position.set(0, 0, 0); // Set the y-coordinate to 0 to place it on the ground
ground.receiveShadow = true;
scene.add(ground);

// Set up lights
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.y = 3;
light.position.z = 1;
light.castShadow = true;
scene.add(light);

scene.add(new THREE.AmbientLight(0xffffff, 0.5));

function spawnEnemy() {
  const enemy = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({ color: '#FF0000' })
  );

  // Set initial position of the enemy (you may adjust the coordinates)
  enemy.position.set(
    Math.random() * 10 - 5,  // Random x position within a certain range
    0.5,                         // Initial y position
    -25                       // Initial z position (behind the player)
  );

  enemy.castShadow = true;
  enemy.receiveShadow = true;

  scene.add(enemy);

  return enemy;
}

const enemies = [];


for (let i = 0; i < 5; i++) {
  const enemy = spawnEnemy();
  enemies.push(enemy);
}

function updatePointsDisplay() {
  pointsDisplay.textContent = `Points: ${points}`;
}


function updateEnemies() {
  const endOfGround = 25;

  enemies.forEach((enemy) => {
    enemy.position.z += 0.1;

    // Check if the player's position is past the enemy
    if (player.position.z < enemy.position.z) {
      // Increment points when the player successfully dodges the enemy
      points++;

      // Update points display
      updatePointsDisplay();

      // Remove the enemy
      scene.remove(enemy);
      enemies.splice(enemies.indexOf(enemy), 1);

      // Respawn a new enemy at the start of the ground
      const newEnemy = spawnEnemy();



      
      enemies.push(newEnemy);
    }

    // Check for collision with the player
    if (enemy.position.distanceTo(player.position) < 1) {
      console.log('Player collided with enemy!');
      stopGame();
    }
  });
}

function stopGame() {
  gameRunning = false;
  gamePaused = true;

  // Hide the player
  player.visible = false;

  // Hide the enemies
  enemies.forEach((enemy) => {
    enemy.visible = false;
  });

  // Create a game over screen
  gameOverScreen = document.createElement('div');
  gameOverScreen.style.position = 'absolute';
  gameOverScreen.style.width = '100%';
  gameOverScreen.style.height = '100%';
  gameOverScreen.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  gameOverScreen.style.display = 'flex';
  gameOverScreen.style.justifyContent = 'center';
  gameOverScreen.style.alignItems = 'center';
  gameOverScreen.innerHTML = '<h1 style="color: white;">Game Over!</h1>';
  document.body.appendChild(gameOverScreen);
}

// Animation function
function animate() {
  const animationId = requestAnimationFrame(animate);
  renderer.render(scene, camera);

  if (gamePaused) {
    return;
  }

 updatePointsDisplay();
  updateEnemies();

 
}

animate();
