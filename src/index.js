import * as loader from "./loader.js";
import TitleScene from "./scenes/TitleScene.js";
import PlayScene from "./scenes/PlayScene.js";
import ResultsScene from "./scenes/ResultsScene.js";

const app = new PIXI.Application(800, 600, {backgroundColor : 0x1099bb});
document.body.appendChild(app.view);
const loadingText = new PIXI.Text("Loading...");
app.stage.addChild(loadingText);

const sceneFlow = {
  title: {class: TitleScene, next: "play"},
  play: {class: PlayScene, next: "results"},
  results: {class: ResultsScene, next: "title"},
};

const gotoScene = sceneName => {
  const scene = new sceneFlow[sceneName].class(() => {
    new TWEEN.Tween(scene.graphic)
      .to({x: -app.screen.width}, 1500)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onComplete(() => app.stage.removeChild(scene.graphic))
      .start();

    gotoScene(sceneFlow[sceneName].next);
  }, app);

  scene.graphic.x = app.screen.width;
  app.stage.addChild(scene.graphic);

  new TWEEN.Tween(scene.graphic)
    .to({x: 0}, 1500)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start();
}

loader.load(() => {
  app.stage.removeChild(loadingText);

  // add background
  const background = new PIXI.Sprite(loader.textures.background);
  background.width = app.screen.width;
  background.height = app.screen.height;
  app.stage.addChild(background);

  gotoScene("title");

  // const bunny = new PIXI.Sprite(assets.balloons);

  // // center the sprite's anchor point
  // bunny.anchor.set(0.5);
  //
  // // move the sprite to the center of the screen
  // bunny.x = app.screen.width / 2;
  // bunny.y = app.screen.height / 2;
  //
  // app.stage.addChild(bunny);

  // Listen for animate update
  app.ticker.add(function(delta) {
    // just for fun, let's rotate mr rabbit a little
    // delta is 1 if running at 100% performance
    // creates frame-independent transformation
    // bunny.rotation += 0.1 * delta;
    TWEEN.update(performance.now());
    // TWEEN.update(1000 / 60 * delta);
  });

  // // var coords = { x: 0, y: 0 }; // Start at (0, 0)
  // var tween = new TWEEN.Tween(bunny) // Create a new tween that modifies 'coords'.
  //         .to({ x: 0, y: 0 }, 1000) // Move to (300, 200) in 1 second.
  //         .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
  //         // .onUpdate(function() { // Called after tween.js updates 'coords'.
  //         //     // Move 'box' to the position described by 'coords' with a CSS translation.
  //         //     box.style.setProperty('transform', 'translate(' + coords.x + 'px, ' + coords.y + 'px)');
  //         // })
  //         .start(); // Start the tween immediately.
});
