export default class ResultsScene {
  constructor(completed, app, completeData) {
    console.log(completeData);
    this.completed = completed;

    this.graphic = new PIXI.Container();

    const titleText = new PIXI.Text("This is the results!");
    titleText.x = 30;
    titleText.y = 90;
    this.graphic.addChild(titleText);

    const loseText = new PIXI.Text("Touch to finish");
    loseText.x = 30;
    loseText.y = 250;
    this.graphic.addChild(loseText);
    loseText.interactive = true;
    loseText.buttonMode = true;
    loseText.on('pointerdown', () => completed());
  }
}
