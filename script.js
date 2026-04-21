// advent.js

const startDate = new Date(2026, 3, 23); // 23 maart 2026 (maart = 2)
startDate.setHours(0,0,0,0);

const totalDays = 14;

const today = new Date();
today.setHours(0,0,0,0);

const daysContent = [
  { type:"text", content:"Nu dat AV gedaan is, laten we samen ene drinken op cafe" },
  { type:"text", content:"In veel Europese universiteiten, zoals Leuven, Heidelberg en Wenen, ontstond studentenfolklore al in de middeleeuwen. Studenten hadden toen nog strengere regels en examens, dus ze ontwikkelden rituelen en tradities om samen stress te ontladen." },
  { type:"text", content:"De Enigma was een Duitse codeermachine uit de Tweede Wereldoorlog die berichten versleutelde met een ingewikkeld systeem van rotors, lampjes en plugboards." },
  { type:"text", content:"De sterkste vriendschappen in studentenkringen ontstaan vaak tijdens de meest random momenten." },
  { type:"riddle", content:"Solve the riddle! Click to go to riddle page." },
  { type:"text", content:"HEt studentenras is stervende help mij deze weer tot leven te brengen stap per stap." },
  { type:"text", content:"Wist je dat de verschillende kleuren klakken een betekenis hebben zo is die van ons zwart gebaseerd op de koolmijners vann vroeger." },
  { type:"text", content:"Stuur mij de gekste foto van jezelf of die je van mij hebt door indien deze wint kan je komen genieten van een pint op mijn kosten!!!!!" },
  { type:"text", content:"Rest is not weakness." },
  { type:"text", content:"Question what you believe." },
  { type:"text", content:"Honor binds the Order." },
  { type:"text", content:"Prepare for the final trial." },
  { type:"text", content:"Enigma heeft 10 Pro-Senioren kan jij ze in juiste volgorde als eerste doorsturen krijg je van mij een costume " },
  { type:"text", content:"Hey vandaag is de TD der verkiezingen wees erbij en drink mee van het gratis vat dat ik trakteer" }
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