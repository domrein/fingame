export default class TitleScene {
  constructor(completed) {
    this.completed = completed;

    this.graphic = new PIXI.Container();

    const titleText = new PIXI.Text("Fingame");
    titleText.x = 30;
    titleText.y = 90;
    this.graphic.addChild(titleText);

    const instructionsText = new PIXI.Text("Touch the stuff that you haven't touched yet");
    instructionsText.x = 30;
    instructionsText.y = 150;
    this.graphic.addChild(instructionsText);

    const startText = new PIXI.Text("Touch to play");
    startText.x = 30;
    startText.y = 250;
    this.graphic.addChild(startText);
    startText.interactive = true;
    startText.buttonMode = true;
    startText.on('pointerdown', () => completed());
  }
}
