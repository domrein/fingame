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
    this.graphic.anchor.set(0.5);

    // this.graphic.on('pointerdown', () => console.log(`fresh: ${this.fresh}`));
  }

  appear() {
    this.graphic.scale.x = 0;
    this.graphic.scale.y = 0;
    this.graphic.rotation = -1;

    const duration = 250 + Math.floor(Math.random() * 250);
    new TWEEN.Tween(this.graphic.scale)
      .to({x: 1, y: 1}, duration)
      .easing(TWEEN.Easing.Back.Out)
      .start();
    new TWEEN.Tween(this.graphic)
      .to({rotation: 0}, duration + 100)
      .easing(TWEEN.Easing.Elastic.Out)
      .start();
  }

  disappear(complete) {
    const duration = 200 + Math.floor(Math.random() * 200);
    new TWEEN.Tween(this.graphic.scale)
      .to({x: 0, y: 0}, duration)
      .easing(TWEEN.Easing.Linear.None)
      .start();
    new TWEEN.Tween(this.graphic)
      .to({rotation: Math.PI * 1}, duration)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start()
      .onComplete(() => complete());
  }

  dance() {

  }
}
