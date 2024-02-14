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
let woodGrid;
let w = 5;
let cols,rows;
let selection = "fire";
function setup() {
  createCanvas(600, 600);
  rows = height/w
  cols = width/w
  let swap_button = createButton('FIRE/WOOD');
  swap_button.addClass('swap_button');
  swap_button.mousePressed(() => {
    if (selection === "fire") {
      selection = "wood"
    } else {
      selection = "fire"
    }
  });
  let clear_button = createButton('CLEAR ✖');
  clear_button.addClass('clear_button');
  clear_button.mouseClicked(() => {
    woodGrid = clearScr();
  });
  grid = make2Darray(cols,rows);
  woodGrid = make2Darray(cols,rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = 0;
    }
  }
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (i)
      woodGrid[i][j] = 0;
  }
}
}
function clearScr() {
  let clearArr = make2Darray(rows,cols);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      clearArr[i][j] = 0;
    }
  }
  return clearArr;
}
function mousePressed() {
  let mousecol = floor(mouseX/w);
  let mouserow = floor(mouseY/w);
  let mat = 5;
  let extent = floor(mat/2);
  if (selection === "fire") {
    for (let i = -extent; i <= extent; i++) {
      for (let j = -extent; j <= extent; j++) {
        if (random(1) < 0.3) {
          let row = mouserow + i;
          let col = mousecol + j;
          if (col >= 0 && col <= cols - 1 && row >= 0 && row <= rows - 1) {
            grid[col][row] = 1;
          }
        }
      }
    }
  } else if (selection === "wood") {
    for (let i = -extent; i <= extent; i++) {
      for (let j = -extent; j <= extent; j++) {
        let row = mouserow + i;
        let col = mousecol + j;
        if (col >= 0 && col <= cols - 1 && row >= 0 && row <= rows - 1) {
          woodGrid[col][row] = 1;
        }
      }
    }
  }
}
let t = 0;
function draw() {
  background(30, 10, 10);
  if (mouseIsPressed) {
    mousePressed();
  }
  for (let i = 0; i < cols; i++) {
    for(let j = 0; j < rows; j++) {
      noStroke();
      if (grid[i][j] === 1) {
        n = noise(i*0.05,j*0.1+t)
        fill(grid[i][j] * 255, grid[i][j] * n * 180, 0);
        let x = i*w;
        let y = j*w;
        square(x,y,w);
      }
    }
  }
  for (let i = 0; i < cols; i++) {
    for(let j = 0; j < rows; j++) {
      noStroke();
      if (woodGrid[i][j] === 1) {
        fill(woodGrid[i][j] * 100, woodGrid[i][j] * 82, woodGrid[i][j] * 40);
        let x = i*w;
        let y = j*w;
        square(x,y,w);
      } else if (woodGrid[i][j] === 2) {
        fill(woodGrid[i][j] * random(220,255), woodGrid[i][j] * 80, 0);
        let x = i*w;
        let y = j*w;
        square(x,y,w);
      } else if (woodGrid[i][j] === 3) {
        fill(woodGrid[i][j] * random(200,255), woodGrid[i][j] * 20, 0);
        let x = i*w;
        let y = j*w;
        square(x,y,w);
      }
    }
  }
  t += 0.01
  let nextGrid = make2Darray(cols,rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      if (state === 1) {
        let above = grid[i][j-1];
        let dir = random([-1,1])
        let chance = random(1)
        let life = 0.1
        let aboveL = -1;
        let aboveR = -1;
        if (i - dir >= 0 && i - dir <= cols - 1) {
          aboveL = grid[i-dir][j-1];
        }
        if (i + dir >= 0 && i + dir <= cols - 1) {
          aboveR = grid[i+dir][j-1];
        }
        if (above === 0) {
          if (chance > life) {
            nextGrid[i][j-1] = state;
          }
        } else if (aboveL === 0) {
          if (chance > life) {
            nextGrid[i-dir][j-1] = state;
          }
        } else if (aboveR === 0) {
          if (chance > life) {
            nextGrid[i+dir][j-1] = state;
          }
        } else {
          nextGrid[i][j] = 0
        }
      }
    }
  }
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = woodGrid[i][j];
      if (state === 1) {
        let below = grid[i][j+1];
        let belowL = grid[i-1][j+1];
        let belowR = grid[i+1][j+1];
        let L = grid[i-1][j];
        let R = grid[i+1][j];
        let above = grid[i][j-1];
        surround = below + belowL + belowR + L + R + above;
        if (surround >= 2 || below === 2) {
          if (random(1) < 0.85) {
            woodGrid[i][j] = 2;
            grid[i][j] = 1;
          }
        } else {
          woodGrid[i][j] = 1;
        }
      } else if (state === 2) {
        let below = woodGrid[i][j+1];
        let L = woodGrid[i-1][j];
        let R = woodGrid[i+1][j];
        let above = woodGrid[i][j-1];
        surround = below + L + R + above;
        if (surround >= 6 && random(1) < 0.1) {
          woodGrid[i][j] = 3;
          grid[i][j] = 1
        } else {
          if (random(1) < 0.05) {
            woodGrid[i][j] = 3;
          }
        }
      } else if (state === 3) {
        if (random(1) < 0.3) {
          woodGrid[i][j] = 0;
        }
      }
    }
  }
  noFill()
  stroke(150)
  noCursor()
  square(mouseX-12.5,mouseY-12.5,25)
  grid = nextGrid; 
}
