// Adam Jones | falling sand | modified from Daniel Shiffman
// 1-23-2024

let cells = [];
let ruleValue;
let ruleset;
let w = 5;
let y = 0;
function setup() {
  createCanvas(600,600);
  ruleValue = floor(random(0,255));
  ruleset = ruleValue.toString(2).padStart(8,"0");
  total = width/w
  input = createInput();
  input.attribute('placeholder', 'Enter rule 0-255...')
  let gen_button = createButton('GENERATE');
  gen_button.addClass('gen_button');
  gen_button.mousePressed(() => {
    if (parseInt(input.value()) >= 0 && parseInt(input.value()) <= 255) {
      ruleValue = parseInt(input.value());
      ruleset = ruleValue.toString(2).padStart(8,"0");
      input.value('');
    }
    gen();
  });
  let sm_button = createButton('▪');
  sm_button.addClass('size_button');
  sm_button.mousePressed(() => {
    w = 2;
    total = width/w
    gen();
  });
  let md_button = createButton('■');
  md_button.addClass('size_button');
  md_button.mousePressed(() => {
    w = 5;
    total = width/w
    gen();
  });
  let lg_button = createButton('▉');
  lg_button.addClass('size_button');
  lg_button.mousePressed(() => {
    w = 8;
    total = width/w
    gen();
  });
  for (let i = 0; i < total; i++) {
    //cells[i] = floor(random(2));
    cells[i] = 0
  }
  cells[floor(total/2)] = 1
  background(0);
}

function gen() {
  background(0);
  for (let i = 0; i < total; i++) {
    cells[i] = 0
  }
  cells[floor(total/2)] = 1
  y = 0;
  let genCells = []
  for (let i = 1; i < cells.length-1; i++) {
    let left = cells[(i - 1 + cells.length) % cells.length];
    let state = cells[i];
    let right = cells[(i + 1) % cells.length];
    let newState = calculateState(left, state, right);
    genCells[i] = newState;
  }
  return genCells;
}

function draw() {
  for (let i = 0; i < cells.length; i++) {
    let x = i * w;
    noStroke();
    fill(cells[i]*100, 0, cells[i]*20);
    square(x,y,w)
  }
  y+=w;
  let nextCells = [];
  nextCells[0] = cells[0];
  nextCells[cells.length-1] = cells[cells.length-1];
  for (let i = 1; i < cells.length-1; i++) {
    let left = cells[(i - 1 + cells.length) % cells.length];
    let state = cells[i];
    let right = cells[(i + 1) % cells.length];
    let newState = calculateState(left, state, right);
    nextCells[i] = newState;
  }
  cells = nextCells;
  document.getElementById("rule").innerHTML = "Rule " + ruleValue;
}
function calculateState(a,b,c) {
  let neighborhood = "" + a + b + c;
  let value = 7-parseInt(neighborhood,2);
  return parseInt(ruleset[value]);
}
