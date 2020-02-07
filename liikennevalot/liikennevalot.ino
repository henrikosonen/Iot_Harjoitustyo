#include "Adafruit_Sensor.h"
#include "Adafruit_AM2320.h"
Adafruit_AM2320 am2320 = Adafruit_AM2320();

//LEDien pinnit
int vihrea = 8,
    //keltainen = 4,
    punainen = 2;

//Käynnistellään
void setup() {
  Serial.begin(9600);
  pinMode(vihrea, OUTPUT);
  //pinMode(keltainen, OUTPUT);
  pinMode(punainen, OUTPUT);

  //odottelee, että portti on auki
  while (!Serial) {
    delay(10);
  }
  am2320.begin();
}

//Vihreän LED + ilmankosteus + Odotellaan 10sek
void loop() {
  vihreavalo();
  lampokosteus();
  delay(10000);

/* Unohdetaan keltainen valo, mutta jätetään alkuperäinen talteen
  keltainenvalo();
  lampokosteus();
  delay(5000);
*/

//Punainen LED + ilmankosteus + Odotellaan 10sek
  punainenvalo();
  lampokosteus();
  delay(10000);
}

//Vihreä LED päälle, muut pois + tulostetaan ilmoitus
void vihreavalo() {
  digitalWrite(vihrea, HIGH);
//  digitalWrite(keltainen, LOW);
  digitalWrite(punainen, LOW);
  Serial.println("Vihrea");
}

/* Keltainen unohdetaan. Jätetään koodi talteen.
void keltainenvalo() {
  digitalWrite(vihrea, LOW);
//  digitalWrite(keltainen, HIGH);
  digitalWrite(punainen, LOW);
  Serial.println("Keltainen");
}
*/ 

//Punainen LED päälle, muut pois + tulostetaan ilmoitus
void punainenvalo() {
  digitalWrite(vihrea, LOW);
  //digitalWrite(keltainen, LOW);
  digitalWrite(punainen, HIGH);
  Serial.println("Punainen");
}

//Tulostetaan lämpö ja kosteus. Pilkku erottaa nämä toisistaan Python puolella.
void lampokosteus() {
  Serial.print("I: "); 
  Serial.print(am2320.readTemperature());
  Serial.print(",");
  Serial.print(am2320.readHumidity());
  Serial.println("");
}
