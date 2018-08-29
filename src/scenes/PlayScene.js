import * as loader from "../loader.js";
import Icon from "../actors/Icon.js";

const freshIconCount = 3;

export default class PlayScene {
  constructor(completed) {
    this.completed = completed;

    this.graphic = new PIXI.Container();

    this.level = 0;
    this.chosenIcons = [];
    this.showLevel();
  }

  showLevel() {
    const icons = [];
    this.chosenIcons.forEach(i => icons.push(new Icon(i, false)));

    const freshIcons = loader.icons
      .filter(i => !this.chosenIcons.includes(i.name))
      .map(i => i.name);

    for (let i = 0; i < freshIconCount; i++) {
      if (!freshIcons.length) {
        continue;
      }
      const index = Math.floor(Math.random() * freshIcons.length);
      const icon = new Icon(freshIcons[index], true);
      icons.push(icon);
      freshIcons.splice(index, 1);
    }

    icons.forEach(icon => {
      // TODO: put icons on grid
      icon.graphic.x = Math.random() * 700;
      icon.graphic.y = Math.random() * 500;
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
