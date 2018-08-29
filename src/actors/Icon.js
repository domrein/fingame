import * as loader from "../loader.js";

export default class Icon {
  constructor(name, fresh) {
    this.name = name;
    this.fresh = fresh;

    this.graphic = new PIXI.Sprite(loader.textures[name]);
    this.graphic.interactive = true;
    this.graphic.buttonMode = true;
    this.graphic.on('pointerdown', () => console.log(`fresh: ${this.fresh}`));
  }
}
