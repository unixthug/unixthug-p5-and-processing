// Adam Jones | falling sand | modified from Daniel Shiffman
// 1-23-2024

function make2DArray(rows, cols) {
  let arr = new Array(rows);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(cols);
    for (let j = 0; j < arr.length; j++) {
      arr[i][j] = 0
    }
  }
  return arr;
}

let grid;
let w = 5;
let rows, cols;

function setup() {
  createCanvas(600, 600);
  rows = width/w;
  cols = height/w;
  grid = make2DArray(rows, cols);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j] = 0;
    }
  }
}

function mouseDragged() {
  let mouserow = floor(mouseX/w);
  let mousecol = floor(mouseY/w);

  let matrix = 2;
  let extent = floor(matrix/2);
  for (let i = -extent; i <= extent; i++) {
    for (let j = -extent; j <= extent; j++){
      if (random(1) < 0.75) {
        let row = mouserow + i;
        let col = mousecol + j;
        if (row >= 0 && row <= rows - 1 && col >= 0 && col <= cols - 1) {
          grid[row][col] = 1;
        }
      }
    }
  }
}

function draw() {
  background(0, 0, 20);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      noStroke();
      if (grid[i][j] == 1) {
      fill(grid[i][j] * random(155, 255), 0, grid[i][j] * 80);
      let x = i * w;
      let y = j * w;
      square(x,y,w)
      }
    }
  }
  let nextGrid = make2DArray(rows, cols);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let state = grid[i][j];
      if (state === 1) {
        let below = grid[i][j+1];
        let dir = 1;
        if (random(1) < 0.5) {
          dir *= -1;
        }
        let belowL = -1;
        let belowR = -1;
        if (i - dir >= 0 && i - dir <= rows - 1) {
          belowL = grid[i-dir][j+1];
        }
        if (i + dir >= 0 && i + dir < rows - 1) {
          belowR = grid[i+dir][j+1];
        }
        if (below === 0) {
          nextGrid[i][j+1] = state;
        } else if (belowL === 0) {
          nextGrid[i-dir][j+1] = state;
        } else if (belowR === 0) {
          nextGrid[i+dir][j+1] = state;
        } else {
          nextGrid[i][j] = state;
        }
      }
    }
  }
  grid = nextGrid;
}