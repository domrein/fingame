import * as loader from "../loader.js";

export default class Icon {
  constructor(name, fresh, size) {
    this.name = name;
    this.fresh = fresh;

    this.graphic = new PIXI.Sprite(loader.textures[name]);
    this.graphic.width = size;
    this.graphic.height = size;
    this.graphic.interactive = true;
    this.graphic.buttonMode = true;
    this.graphic.on('pointerdown', () => console.log(`fresh: ${this.fresh}`));
  }
}
