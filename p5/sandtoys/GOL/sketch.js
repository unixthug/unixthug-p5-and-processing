// Adam Jones | falling sand | modified from Daniel Shiffman
// 1-23-2024

function make2Darray (cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = 0;
    }
  }
  return arr;
}
let grid;
let w = 4;
let cols,rows;
function setup() {
  createCanvas(600,600);
  rows = height/w
  cols = width/w
  let reset_button = createButton('RESET⟳');
  reset_button.addClass('reset_button');
  reset_button.mousePressed(() => {
    grid = gen();
  });
  let sm_button = createButton('▪');
  sm_button.addClass('size_button');
  sm_button.mousePressed(() => {
    w = 2;
    rows = height/w
    cols = width/w
    grid = gen();
  });
  let md_button = createButton('■');
  md_button.addClass('size_button');
  md_button.mousePressed(() => {
    w = 4;
    rows = height/w
    cols = width/w
    grid = gen();
  });
  let lg_button = createButton('▉');
  lg_button.addClass('size_button');
  lg_button.mousePressed(() => {
    w = 10;
    rows = height/w
    cols = width/w
    grid = gen();
  });
  grid = gen();
}
function gen() {
  let newGen = make2Darray(cols,rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (random(1) < 0.8) {
        newGen[i][j] = 0;
      } else {
        newGen[i][j] = 1;
      }
    }
  }
  return newGen;
}
function draw() {
  background(0,20,0);
  for (let i = 0; i < cols; i++) {
    for(let j = 0; j < rows; j++) {
      noStroke();
      if (grid[i][j] === 1) {
        fill(0,grid[i][j] * 150,0);
        let x = i*w;
        let y = j*w;
        square(x,y,w);
      }
    }
  }
  let nextGrid = make2Darray(cols,rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      if (state === 1) {
        let above = grid[i][j-1];
        let aboveL = -1;
        let aboveR = -1;
        let L = -1;
        let R = -1;
        let below = grid[i][j+1];
        let belowL = -1;
        let belowR = -1;
        if (i - 1 >= 0 && i - 1 <= cols - 1) {
          aboveL = grid[i-1][j-1];
          L = grid[i-1][j];
          belowL = grid[i-1][j+1];
        }
        if (i + 1 >= 0 && i + 1 <= cols - 1) {
          aboveR = grid[i+1][j-1];
          R = grid[i+1][j];
          belowR = grid[i+1][j+1];
        }
        let surv = above + aboveL + aboveR + L + R + below + belowL + belowR;
        if (surv == 2 || surv == 3) {
          nextGrid[i][j] = state;
        } else {
          nextGrid[i][j] = 0;
        }
      } else if (state === 0) {
        let above = grid[i][j-1];
        let aboveL = -1;
        let aboveR = -1;
        let L = -1;
        let R = -1;
        let below = grid[i][j+1];
        let belowL = -1;
        let belowR = -1;
        if (i - 1 >= 0 && i - 1 <= cols - 1) {
          aboveL = grid[i-1][j-1];
          L = grid[i-1][j];
          belowL = grid[i-1][j+1];
        }
        if (i + 1 >= 0 && i + 1 <= cols - 1) {
          aboveR = grid[i+1][j-1];
          R = grid[i+1][j];
          belowR = grid[i+1][j+1];
        }
        let surv = above + aboveL + aboveR + L + R + below + belowL + belowR;
        if (surv == 3) {
          nextGrid[i][j] = 1;
        } else {
          nextGrid[i][j] = state;
        }
      }
    }
  }
  grid = nextGrid;
}
