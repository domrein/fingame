export const icons = [
  {name: "213", file: "213"},
  {name: "balloons", file: "Balloons"},
  {name: "ballot", file: "Ballot"},
  {name: "bank", file: "Bank"},
  {name: "barGraph", file: "Bar_Graph"},
  {name: "budget", file: "Budget"},
  {name: "calc", file: "Calc"},
  {name: "capitol", file: "Capitol"},
  {name: "cards", file: "Cards"},
  {name: "cash", file: "Cash"},
  {name: "check", file: "Check"},
  {name: "circleGraph", file: "Circle_Graph"},
  {name: "converse", file: "Converse"},
  {name: "cour", file: "Cour"},
  {name: "debate", file: "Debate"},
  {name: "dems", file: "Dems"},
  {name: "eagle", file: "Eagle"},
  {name: "family", file: "Family"},
  {name: "flag", file: "Flag"},
  {name: "form", file: "Form"},
  {name: "forSale", file: "For_Sale"},
  {name: "graph", file: "Graph"},
  {name: "home", file: "Home"},
  {name: "keys", file: "Keys"},
  {name: "mobile", file: "Mobile"},
  {name: "online", file: "Online"},
  {name: "piggy", file: "Piggy"},
  {name: "repubs", file: "Repubs"},
  {name: "shield", file: "Shield"},
  {name: "supreme", file: "Supreme"},
  {name: "washington", file: "Washington"},
  {name: "whitehouse", file: "Whitehouse"},
  {name: "wrong", file: "Wrong"},
];

export const load = complete => {
  PIXI.loader.add("background", "assets/img/Background.jpg");
  icons.forEach(i => PIXI.loader.add(i.name, `assets/img/icons/${i.file}.png`));

  PIXI.loader.load((loader, resources) => {
    textures = {
      background: resources.background.texture,
    };
    icons.forEach(i => textures[i.name] = resources[i.name].texture);

    complete();
  });

  // throughout the process multiple signals can be dispatched.
  PIXI.loader.onProgress.add(() => {}); // called once per loaded/errored file
  PIXI.loader.onError.add(() => {}); // called once per errored file
  PIXI.loader.onLoad.add(() => {}); // called once per loaded file
  PIXI.loader.onComplete.add(() => {}); // called once when the queued resources all load.
};

export let textures = null;
