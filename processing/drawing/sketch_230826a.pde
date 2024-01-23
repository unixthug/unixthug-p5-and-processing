int idia = 10;
int dia = idia;

boolean sm = true;
boolean lg = false;
void setup() {
  size(500,500);
  background(0);
}

void draw() {
  if (dia == 2*idia) {
    lg = true;
    sm = false;
  };
  if (dia < 0.5*idia) {
    sm = true;
    lg = false;
   };
  if (sm) {
    dia++;
   };
  if (lg) {
    dia--;
  };
  circle(mouseX, mouseY, dia);
  noStroke();
  fill(255, 0, 80);
  
}
