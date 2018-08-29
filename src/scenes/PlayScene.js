import * as loader from "../loader.js";
import Icon from "../actors/Icon.js";

const freshIconCount = 3;
const gridSize = 7;
let cellSize = 100; // default size
let gridTop = 0;
let gridLeft = 0;

export default class PlayScene {
  constructor(completed, app) {
    this.completed = completed;
    this.app = app;

    this.graphic = new PIXI.Container();

    this.level = 0;
    this.chosenIcons = [];

    // calc cell size
    if (app.screen.width < app.screen.height) {
      cellSize = app.screen.width / gridSize;
    }
    else {
      cellSize = app.screen.height / gridSize;
    }

    // calc grid coords
    gridTop = (app.screen.height - cellSize * gridSize) / 2;
    gridLeft = (app.screen.width - cellSize * gridSize) / 2;

    this.showLevel();
  }

  showLevel() {
    const icons = [];
    this.chosenIcons.forEach(i => icons.push(new Icon(i, false, cellSize)));

    const freshIcons = loader.icons
      .filter(i => !this.chosenIcons.includes(i.name))
      .map(i => i.name);

    for (let i = 0; i < freshIconCount; i++) {
      if (!freshIcons.length && icons.length < gridSize ** 2) {
        continue;
      }
      const index = Math.floor(Math.random() * freshIcons.length);
      const icon = new Icon(freshIcons[index], true, cellSize);
      icons.push(icon);
      freshIcons.splice(index, 1);
    }

    const cellsAvailable = [];
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        cellsAvailable.push({x: i, y: j});
      }
    }

    icons.forEach(icon => {
      // find out which cell to put icon in
      const index = Math.floor(Math.random() * cellsAvailable.length);
      const cell = cellsAvailable[index];
      cellsAvailable.splice(index, 1);

      // TODO: put icons on grid
      const destY = cell.y * cellSize + gridTop;
      icon.graphic.x = cell.x * cellSize + gridLeft;
      icon.graphic.y = destY - this.app.screen.height;

      new TWEEN.Tween(icon.graphic)
        .to({y: destY}, 1500 + Math.floor(Math.random() * 500))
        .easing(TWEEN.Easing.Back.Out)
        .start();

      icon.graphic.on('pointerdown', () => {
        console.log(`touched in play scene fresh: ${icon.fresh}`);
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
    this.level++;
    this.showLevel();
  }
}
