const startDate = new Date(2026, 3, 23);
startDate.setHours(0, 0, 0, 0);

const totalDays = 14;

const today = new Date();
today.setHours(0, 0, 0, 0);

const hall = document.getElementById("hall");

function isBeforeOrToday(sealDate, today){
  const s = new Date(sealDate);
  s.setHours(0, 0, 0, 0);
  const t = new Date(today);
  t.setHours(0, 0, 0, 0);
  return s.getTime() <= t.getTime();
}

for(let i = 0; i < totalDays; i++){
  const seal = document.createElement("div");
  seal.classList.add("seal");
  seal.innerText = toRoman(i + 1);

  const sealDate = new Date(startDate);
  sealDate.setDate(startDate.getDate() + i);

  const openedKey = `seal_opened_fr_${i}`;
  const isOpened = localStorage.getItem(openedKey) === "true";

  if(!isBeforeOrToday(sealDate, today)){
    seal.classList.add("locked");
  } else if(!isOpened){
    seal.classList.add("today");
  } else {
    seal.classList.add("opened");
  }

  seal.addEventListener("click", async () => {
    if(!isBeforeOrToday(sealDate, today)) return;

    try {
      const response = await fetch(`../day-content.php?lang=fr&day=${i + 1}`, {
        headers: { "Accept": "application/json" }
      });
      const day = await response.json();

      if(!response.ok || !day.success) return;

      localStorage.setItem(openedKey, "true");
      seal.classList.remove("locked", "today");
      seal.classList.add("opened");

      if(day.type === "riddle"){
        window.location.href = day.redirect;
      } else {
        openModal(day.content);
      }
    } catch (error) {
      console.error(error);
    }
  });

  hall.appendChild(seal);
}

function openModal(text){
  document.getElementById("modalText").innerText = text;
  document.getElementById("modal").style.display = "flex";
}

function closeModal(){
  document.getElementById("modal").style.display = "none";
}

function toRoman(num){
  const romans = ["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","XIII","XIV"];
  return romans[num - 1];
}
