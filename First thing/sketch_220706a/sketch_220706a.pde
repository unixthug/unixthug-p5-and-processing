//VARIABLES
float x;
float y;
float space = 50;

//INITIALIZES ON START
void setup()
{
  size(1000, 800);
  x = space;
  y = space;
}

//UPDATES EVERY FRAME
void draw()
{
  background(20);
  Grid();
  Player();
  stroke(180);
  fill(255, 0, 100);
}

//LINE GRID
public void Grid()
{ 
    for (int i = 0 ; i < width ; i += space)
  {
    line(i, 0, i, height);
  }
  for (int i = 0 ; i < height ; i += space)
  {
    line(0, i, width, i);
  }
  
}

//CONTROLS
void keyPressed() 
{
  if (key == CODED) 
  {
    if (keyCode == LEFT) {
        x -= space;
      } else if (keyCode == RIGHT) {
        x += space;
      } else if (keyCode == UP) {
        y -= space;
      } else if (keyCode == DOWN) {
        y += space;
      } 
   }
}

//CONTROLLABLE CIRCLE
public void Player()
{
   ellipse(x, y, space*2, space*2);   
}
