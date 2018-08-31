export default class ResultsScene {
  constructor(completed, app, completeData) {
    console.log(completeData);
    this.completed = completed;

    this.graphic = new PIXI.Container();

    const titleText = new PIXI.Text("Great job!");
    titleText.x = 30;
    titleText.y = 90;
    this.graphic.addChild(titleText);

    const correctText = new PIXI.Text(`You got ${completeData.correct} correct`);
    correctText.x = 30;
    correctText.y = 120;
    this.graphic.addChild(correctText);

    const scoreText = new PIXI.Text(`You scored ${completeData.score}`);
    scoreText.x = 30;
    scoreText.y = 150;
    this.graphic.addChild(scoreText);

    // TODO: display all icons of things you got correct

    const loseText = new PIXI.Text("Touch to finish");
    loseText.x = 30;
    loseText.y = 250;
    this.graphic.addChild(loseText);
    loseText.interactive = true;
    loseText.buttonMode = true;
    loseText.on('pointerdown', () => completed());
  }
}
