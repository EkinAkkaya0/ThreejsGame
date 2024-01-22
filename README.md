# Dodge the Enemies Game

## Instructions

1. Open `index.html` in your web browser.
2. Play the game!

### Controls

- **W:** Move player forward.
- **A:** Move player left.
- **S:** Move player backward.
- **D:** Move player right.

### Gameplay

The objective of the game is to dodge incoming enemies and accumulate points. The player can move in four directions using the W, A, S, and D keys. Points are earned by successfully dodging enemies. The game ends when the player collides with an enemy, and a game over screen is displayed.

### Player Representation

The player in this game is represented by a 3D object loaded from an OBJ (Wavefront .obj) file. The player's model is defined in the `objects/` directory, with its appearance and properties configured in the `main.js` file. To customize the player's appearance, replace the existing OBJ and MTL files with your own 3D model files.

### Features

- 3D graphics using Three.js.
- Player movement with W, A, S, D keys.
- Enemy spawning and movement.
- Points system.
- Game over screen.

### Customization

You can customize the game by modifying the following:

- **Player Model:** Replace the OBJ and MTL files in the `objects/` directory with your own 3D model.
- **Enemy Appearance:** Adjust the size and color of the enemy cubes in the `spawnEnemy` function.
- **Game Environment:** Modify the ground material and lighting settings in the "Set up the ground" and "Set up lights" sections.

### Contributing

Contributions are welcome! Feel free to open issues or pull requests for any improvements, bug fixes, or new features.
