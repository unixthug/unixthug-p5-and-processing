int dia = 0;
int max = 80;
boolean sm = true;
boolean lg = false;
void setup() {
  size(700,700);
  frameRate(165);
  noCursor();
}

void draw() {
  colorMode(HSB, 360, 100, 100);
  background(20);
  fill(dia, 100, 100);
  ellipse(mouseX, mouseY, dia, dia);
  if (dia == max) {
    lg = true;
    sm = false;
  }
  if (dia < 0) {
    sm = true;
    lg = false;
  }
  if (sm) {
    dia++;
  } else if (lg) {
    dia--;
  }
  
  
}
