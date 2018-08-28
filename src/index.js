"use strict";

const app = new PIXI.Application(800, 600, {backgroundColor : 0x1099bb});
document.body.appendChild(app.view);

// create a new Sprite from an image path
const bunny = PIXI.Sprite.fromImage("assets/img/icons/Balloons.png");

// create instructions and add offscreen
const initInstructions = () => {
  const container = new PIXI.Container();
  container.x = app.screen.width;
  app.stage.addChild(container);

  const titleText = new PIXI.Text("Fingame");
  titleText.x = 30;
  titleText.y = 90;
  container.addChild(titleText);
  const instructionsText = new PIXI.Text("Touch the stuff that you haven't touched yet");
  instructionsText.x = 30;
  instructionsText.y = 150;
  container.addChild(instructionsText);
  const startText = new PIXI.Text("Touch to play");
  startText.x = 30;
  startText.y = 250;
  container.addChild(startText);
  startText.interactive = true;
  startText.buttonMode = true;
  startText.on('pointerdown', () => {
    new TWEEN.Tween(container)
      .to({x: -app.screen.width}, 1500)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onComplete(() => app.stage.removeChild(container))
      .start();

    initGame();
  });

  new TWEEN.Tween(container)
    .to({x: 0}, 1500)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start();
};

// start game process
const initGame = () => {
  const container = new PIXI.Container();
  container.x = app.screen.width;
  app.stage.addChild(container);

  const titleText = new PIXI.Text("This is the game");
  titleText.x = 30;
  titleText.y = 90;
  container.addChild(titleText);
  const startText = new PIXI.Text("Touch to lose");
  startText.x = 30;
  startText.y = 250;
  container.addChild(startText);
  startText.interactive = true;
  startText.buttonMode = true;
  startText.on('pointerdown', () => {
    new TWEEN.Tween(container)
      .to({x: -app.screen.width}, 1500)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onComplete(() => app.stage.removeChild(container))
      .start();

    initGameOver();
  });

  new TWEEN.Tween(container)
    .to({x: 0}, 1500)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start();
};

// create game over screen and add offscreen
const initGameOver = () => {
  const container = new PIXI.Container();
  container.x = app.screen.width;
  app.stage.addChild(container);

  const titleText = new PIXI.Text("This is the game over");
  titleText.x = 30;
  titleText.y = 90;
  container.addChild(titleText);
  const startText = new PIXI.Text("Touch to play again");
  startText.x = 30;
  startText.y = 250;
  container.addChild(startText);
  startText.interactive = true;
  startText.buttonMode = true;
  startText.on('pointerdown', () => {
    new TWEEN.Tween(container)
      .to({x: -app.screen.width}, 1500)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onComplete(() => app.stage.removeChild(container))
      .start();

    initInstructions();
  });

  new TWEEN.Tween(container)
    .to({x: 0}, 1500)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start();
};

// center the sprite's anchor point
bunny.anchor.set(0.5);

// move the sprite to the center of the screen
bunny.x = app.screen.width / 2;
bunny.y = app.screen.height / 2;

app.stage.addChild(bunny);

// Listen for animate update
app.ticker.add(function(delta) {
  // just for fun, let's rotate mr rabbit a little
  // delta is 1 if running at 100% performance
  // creates frame-independent transformation
  bunny.rotation += 0.1 * delta;
  TWEEN.update(performance.now());
  // TWEEN.update(1000 / 60 * delta);
});
initInstructions();

// // var coords = { x: 0, y: 0 }; // Start at (0, 0)
// var tween = new TWEEN.Tween(bunny) // Create a new tween that modifies 'coords'.
//         .to({ x: 0, y: 0 }, 1000) // Move to (300, 200) in 1 second.
//         .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
//         // .onUpdate(function() { // Called after tween.js updates 'coords'.
//         //     // Move 'box' to the position described by 'coords' with a CSS translation.
//         //     box.style.setProperty('transform', 'translate(' + coords.x + 'px, ' + coords.y + 'px)');
//         // })
//         .start(); // Start the tween immediately.
