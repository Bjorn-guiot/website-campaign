// advent.js

const startDate = new Date(2026, 3, 23); // 23 maart 2026 (maart = 2)
startDate.setHours(0,0,0,0);

const totalDays = 14;

const today = new Date();
today.setHours(0,0,0,0);

const daysContent = [
  { type:"text", content:`Day 1 - AV ⚔️

Vandaag is het zover: de AV. Altijd een spannend moment waarop we terugkijken naar het afgelopen jaar en zien wat goed liep en wat we kunnen meenemen naar volgend jaar.

Maar vooral is dit een moment waarop we samenkomen als één groep.

Daarnaast zal ik vandaag ook mijn kandidatuur voorstellen. Na de AV nodig ik jullie graag uit om samen iets te gaan drinken en na te praten op café 🍻

Uur en locatie worden nog gedeeld in het event.
De AV start om 19:30.

Tot straks ⚔️` },
  { type:"text", content:`Day 2 - Folklore ⚔️

Wist je dat studentenfolklore al teruggaat tot de middeleeuwen?
In de eerste Europese universiteiten bestonden er al rituelen en tradities om nieuwe studenten op te nemen in de groep.

Folklore draaide toen, net zoals nu, om één ding:
verbondenheid.

En dat is exact waar Enigma vandaag nog steeds voor staat. 🍻` },
  { type:"text", content:`Day 3 – Enigma ⚔️

Niet elke kring voelt meteen als thuis.

Maar eens het klikt…
dan blijf je hangen.

Dat is wat Enigma voor mij is geworden. 🍻` },
  { type:"text", content:`Day 4 – Vriendschap ⚔️

In elke queeste ontstaan de sterkste banden niet op voorhand.

Ze groeien onderweg.
Tijdens onverwachte momenten, met mensen die eerst vreemden waren…
en daarna je trouwste strijdmakkers worden. 🍻` },
  { type:"riddle", content:`Day 5 – Raadsel ⚔️

Tijd om je skills te testen.

Los het raadsel op en zet een stap dichter naar het kraken van de Enigma. 🧠

👉 Klik door en probeer het zelf.`},
  { type:"text", content:`Day 6 – De missie ⚔️

Student zijn is meer dan lessen volgen.

Het is herinneringen maken, mensen leren kennen
en ergens een plek vinden waar je blijft hangen.

Dat is waar we met Enigma elke dag aan bouwen.` },
  { type:"text", content:`Day 7 – Folklore ⚔️

Onze zwarte klak? Die vindt zijn oorsprong bij de koolmijnwerkers van vroeger.

Hard werk, samen sterk…
en af en toe een pint erbij. 🍻

En we zijn daar niet alleen in — binnen BSK dragen ook onze militaire vrienden van PoPo met trots hun zwarte klak.

Traditie verbindt.` },
  { type:"text", content:`Day 8 – Chaos ⚔️

Tijd om jezelf te bewijzen.

Stuur mij de gekste foto die je hebt (van jezelf… of van mij 😅).
De beste inzending wint. Geen discussie.

De winnaar krijgt een pint op mijn kosten. 🍻

Laat zien wie hier echt chaos brengt.` },
  { type:"text", content:`Day 9 – The Code ⚔️

Elke ridderorde heeft zijn eigen code.

Binnen Enigma is dat geen geschreven regel,
maar iets dat je voelt: respect, sfeer en samenhorigheid.

Dat is wat een echte Knight of Enigma maakt.` },
  { type:"text", content:`Day 10 – The Legacy ⚔️

Niet alles wat Enigma maakt, zie je meteen.

Sommige dingen zitten in verhalen, tradities
en de mensen die het blijven doorgeven.` },
  { type:"text", content:`Day 11 – Feit ⚔️

Sommige dingen moet je niet uitleggen.

De beste kring is Enigma.` },
  { type:"text", content:`Day 12 – Credits ⚔️

Elke kring heeft zijn karakters.

Lucas die de cantus draagt.
Lionel die overal mee wegkomt.

En nog een hele hoop legendes ertussenin.` },
  { type:"text", content:`Day 13 – Final Challenge ⚔️

10 Pro-Senioren.
1 juiste volgorde.

Kan jij ze allemaal correct plaatsen?

De eerste die het juist doorstuurt, wint een one of a kind Knights of Enigma hoodie. 🛡️

First message = first win.
De winnaar wordt bekendgemaakt in het Facebook-event.

Geen gokken. Alleen kennis.` },
  { type:"text", content:`Final Day – TD ⚔️

Vandaag is het zover.

De TD der verkiezingen.
Geen uitleg nodig.

Kom af.
Drink mee van het gratis vat. 🍻` }
];

const hall = document.getElementById("hall");

// Functie om te checken of sealDate <= vandaag
function isBeforeOrToday(sealDate, today){
  const s = new Date(sealDate);
  s.setHours(0,0,0,0);
  const t = new Date(today);
  t.setHours(0,0,0,0);
  return s.getTime() <= t.getTime();
}

for(let i=0;i<totalDays;i++){
  const seal = document.createElement("div");
  seal.classList.add("seal");
  seal.innerText = toRoman(i+1);

  const sealDate = new Date(startDate);
  sealDate.setDate(startDate.getDate() + i);

  const openedKey = `seal_opened_${i}`;
  const isOpened = localStorage.getItem(openedKey) === "true";

  // Status instellen
  if(!isBeforeOrToday(sealDate, today)){
    seal.classList.add("locked");
  } else if(!isOpened){
    seal.classList.add("today");
  } else {
    seal.classList.add("opened");
  }

  // Klik-event
  seal.addEventListener("click", () => {
    if(!isBeforeOrToday(sealDate, today)) return; // nog niet beschikbaar

    const day = daysContent[i];

    if(day.type==="riddle"){
      window.location.href = "riddle.html";
    } else {
      localStorage.setItem(openedKey,"true");
      seal.classList.remove("locked","today");
      seal.classList.add("opened");
      openModal(day.content);
    }
  });

  hall.appendChild(seal);
}

// Modal functies
function openModal(text){
  document.getElementById("modalText").innerText = text;
  document.getElementById("modal").style.display = "flex";
}
function closeModal(){
  document.getElementById("modal").style.display = "none";
}

// Romeinse nummers
function toRoman(num){
  const romans = ["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","XIII","XIV"];
  return romans[num-1];
}
