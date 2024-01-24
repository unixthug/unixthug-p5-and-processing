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

  let matrix = 5;
  let extent = floor(matrix/2);
  for (let i = -extent; i <= extent; i++) {
    for (let j = -extent; j <= extent; j++){
      if (random(1) < 0.3) {
        let row = mouserow + i;
        let col = mousecol + j;
        if (row >= 0 && row <= rows - 1 && col >= 0 && col <= cols - 1) {
          grid[row][col] = 1;
        }
      }
    }
  }
}
let t = 0;
function draw() {
  background(0, 20, 40);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      noStroke();
      if (grid[i][j] == 1) {
      fill(0, grid[i][j] * noise(i*0.5,j*0.5,t) * 60, grid[i][j] * 255);
      let x = i * w;
      let y = j * w;
      square(x,y,w)
      }
    }
    t += 0.0003;
  }
  let nextGrid = make2DArray(rows, cols);
  let liveGrid = grid;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let state = grid[i][j];
      if (state === 1) {
        let below = 0;
        if (j <= rows) {
          below = grid[i][j+1];
        }
        let dir = 1;
        if (random(1) < 0.5) {
          dir *= -1;
        }
        let belowL = -1;
        let belowR = -1;
        let L = -1;
        let R = -1;
        if (i - dir >= 0 && i - dir <= rows - 1) {
          belowL = liveGrid[i-dir][j+1];
        }
        if (i + dir >= 0 && i + dir < rows - 1) {
          belowR = liveGrid[i+dir][j+1];
        }
        if (i - dir >= 0 && i - dir <= rows - 1) {
          L = liveGrid[i-dir][j];
        }
        if (i + dir >= 0 && i + dir < rows - 1) {
          R = liveGrid[i+dir][j];
        }
        if (below === 0) {
          liveGrid[i][j] = 0;
          nextGrid[i][j+1] = state;
        } else if (belowL === 0) {
          liveGrid[i-dir][j+1] = state;
          liveGrid[i][j] = 0;
          nextGrid[i-dir][j+1] = state;
        } else if (belowR === 0) {
          liveGrid[i+dir][j+1] = state;
          liveGrid[i][j] = 0;
          nextGrid[i+dir][j+1] = state;
        } else if (L === 0) {
          liveGrid[i-dir][j] = state;
          nextGrid[i][j] = 0;
          liveGrid[i][j] = 0;
          nextGrid[i-dir][j] = state;
        } else if (R === 0) {
          liveGrid[i+dir][j] = state;
          liveGrid[i][j] = 0;
          nextGrid[i][j] = 0;
          nextGrid[i+dir][j] = state;
        } else {
          nextGrid[i][j] = state;
        }
      }
    }
  }
  grid = nextGrid;
}