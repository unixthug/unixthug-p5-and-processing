//variables
var pos = {
    x: 305,
    y: 200
}
var speed = 2;
var rSize = 16;

//Initialize on Startup
function setup() {
  createCanvas(610, 400);
  background(50)
}

//Updates Every Frame
function draw() {
  //background(50);
  ellipse(pos.x, pos.y, rSize, rSize);
  
  //reset
  if (mouseIsPressed === true) 
  {
    pos.x = 305;
    pos.y = 200;
    speed = 2;
  }
  //calling functions
  frameRate(165);
  Movement();
  noStroke();
  fill(255, 10);
  Gravity();
  Collision();
  debug();
}
//Arrow Key Input Controller
function Movement() 
{
  if (keyIsDown(LEFT_ARROW)) 
  {
    pos.x -= speed;
  }
  if (keyIsDown(RIGHT_ARROW)) 
  {
    pos.x += speed;
  }
  if (keyIsDown(UP_ARROW)) 
  {
    pos.y -= speed;
  }
  if (keyIsDown(DOWN_ARROW)) 
  {
    pos.y += speed;
  }
  //Sprint
  if (keyIsDown(SHIFT))
  {
    speed *= 2;
  } else {
    speed = 2;
  }
  if (speed >= 8) 
  {
    speed = 8;
  }
}
//Constant Downwards force
function Gravity()
{
  pos.y ++;
}

//Self-Explanatory
function Collision()
{
  if (pos.y >= 400 - rSize/2) {
    pos.y = 400 - rSize/2;
  }
  if (pos.y >= 0 + rSize/2) {
    pos.y <= 0 + rSize/2;
  }
  if (pos.x >= 610 - rSize/2) {
    pos.x = 610 - rSize/2;
  }
}

//Console Logs
function debug()
{
  if (keyIsPressed === true)
  {
  console.log(pos.y);
  }
}