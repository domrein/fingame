import * as globals from "../globals.js";
import * as loader from "../loader.js";
import Icon from "../actors/Icon.js";

const freshIconCount = 3;
let gridTop = 0;
let gridLeft = 0;

export default class PlayScene {
  constructor(completed, app) {
    this.completed = completed;
    this.app = app;

    this.graphic = new PIXI.Container();

    this.correct = 0;
    this.score = 0;
    this.chosenIcons = [];

    // calc grid coords
    gridTop = (app.screen.height - globals.cellSize * globals.gridHeight) / 2;
    gridLeft = (app.screen.width - globals.cellSize * globals.gridWidth) / 2;

    // add gui
    [
      {label: "Score: ", prop: "scoreText"},
      {label: "Correct: ", prop: "correctText"},
    ].forEach((elem, i) => {
      const graphics = new PIXI.Graphics();
      graphics.beginFill(0xFFFFFF, .7);
      graphics.drawRect(
        0,
        0,
        globals.cellSize,
        globals.cellSize / 4,
      );
      graphics.x = this.app.screen.width - globals.cellSize * (i + 1) - globals.cellSize * .1 * (i + 1);
      this.graphic.addChild(graphics);
      const text = new PIXI.Text(elem.label);
      this[elem.prop] = text;
      graphics.addChild(text);
    });
    this.updateLabels();

    this.showLevel();
  }

  updateLabels() {
    this.correctText.text = `Correct: ${this.correct}`;
    this.scoreText.text = `Score: ${this.score}`;
  }

  showLevel() {
    const icons = [];
    this.chosenIcons.forEach(i => icons.push(new Icon(i, false, globals.cellSize)));

    const freshIcons = loader.icons
      .filter(i => !this.chosenIcons.includes(i.name))
      .map(i => i.name);

    for (let i = 0; i < freshIconCount; i++) {
      if (!freshIcons.length && icons.length < globals.gridWidth * globals.gridHeight) {
        continue;
      }
      const index = Math.floor(Math.random() * freshIcons.length);
      const icon = new Icon(freshIcons[index], true, globals.cellSize);
      icons.push(icon);
      freshIcons.splice(index, 1);
    }

    const cellsAvailable = [];
    for (let i = 0; i < globals.gridWidth; i++) {
      for (let j = 0; j < globals.gridHeight; j++) {
        cellsAvailable.push({x: i, y: j});
      }
    }

    icons.forEach(icon => {
      // find out which cell to put icon in
      const index = Math.floor(Math.random() * cellsAvailable.length);
      const cell = cellsAvailable[index];
      cellsAvailable.splice(index, 1);

      // TODO: put icons on grid
      const destY = cell.y * globals.cellSize + gridTop;
      icon.graphic.x = cell.x * globals.cellSize + gridLeft;
      icon.graphic.y = destY - this.app.screen.height;

      new TWEEN.Tween(icon.graphic)
        .to({y: destY}, 1500 + Math.floor(Math.random() * 500))
        .easing(TWEEN.Easing.Back.Out)
        .start();

      icon.graphic.on('pointerdown', () => {
        // console.log(`touched in play scene fresh: ${icon.fresh}`);
        if (icon.fresh) {
          this.chosenIcons.push(icon.name);
          this.clearLevel(icons);
        }
        else {
          this.completed();
        }
      });
      this.graphic.addChild(icon.graphic);
    });
    // create all the icons
    // set which icons are old and new
    // tween all the icons onscreen
    // if old icon clicked, go to results
    // if new icon clicked, show next level
  }

  clearLevel(icons) {
    // tween all old icons off screen
    // kill old icons
    icons.forEach(i => this.graphic.removeChild(i.graphic));
    // show next level
    this.correct++;
    this.updateLabels();
    this.showLevel();
  }
}
