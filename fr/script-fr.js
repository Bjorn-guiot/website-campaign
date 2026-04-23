const startDate = new Date(2026, 3, 23);
startDate.setHours(0, 0, 0, 0);

const totalDays = 14;

const today = new Date();
today.setHours(0, 0, 0, 0);

const daysContent = [
  { type:"text", content:`Jour 1 - AG ⚔️

Aujourd'hui, c'est le grand moment: l'AG. C'est toujours un moment important où l'on regarde l'année écoulée et ce que nous pouvons emporter avec nous pour l'année prochaine.

Mais surtout, c'est un moment où nous nous retrouvons tous comme un seul groupe.

Aujourd'hui, je presenterai egalement ma candidature. Apres l'AG, je vous invite volontiers a aller boire un verre ensemble et a discuter au cafe 🍻

L'heure et le lieu seront encore partages dans l'evenement.
L'AG commence a 19h30.

A tout a l'heure ⚔️` },
  { type:"text", content:`Jour 2 - Folklore ⚔️

Saviez-vous que le folklore etudiant remonte deja au Moyen Age?
Dans les premieres universites europeennes, il existait deja des rites et des traditions pour integrer les nouveaux etudiants au groupe.

Le folklore tournait alors, comme aujourd'hui, autour d'une seule chose:
la solidarite.

Et c'est exactement ce que represente encore Enigma aujourd'hui. 🍻` },
  { type:"text", content:`Jour 3 - Enigma ⚔️

Toutes les cercles ne ressemblent pas immediatement a une maison.

Mais une fois que le declic se fait...
on y reste.

C'est ce qu'Enigma est devenu pour moi. 🍻` },
  { type:"text", content:`Jour 4 - Amitie ⚔️

Dans chaque quete, les liens les plus forts ne se creent pas a l'avance.

Ils grandissent en chemin.
Pendant des moments inattendus, avec des gens qui etaient d'abord des inconnus...
et qui deviennent ensuite tes plus fideles compagnons. 🍻` },
  { type:"riddle", content:`Jour 5 - Enigme ⚔️

Il est temps de tester tes competences.

Resolvez l'enigme et rapproche-toi encore un peu plus du dechiffrement d'Enigma. 🧠

👉 Clique et essaie par toi-meme.` },
  { type:"text", content:`Jour 6 - La mission ⚔️

Etre etudiant, c'est plus que suivre des cours.

C'est creer des souvenirs, rencontrer des gens
et trouver un endroit ou l'on a envie de rester.

C'est ce que nous construisons chaque jour avec Enigma.` },
  { type:"text", content:`Jour 7 - Folklore ⚔️

Notre calotte noire? Elle trouve son origine chez les mineurs d'autrefois.

Travail acharné, force collective...
et parfois une pinte en plus. 🍻

Et nous ne sommes pas seuls - au sein du BSK, nos amis militaires de PoPo portent eux aussi fierement leur calotte noire.

La tradition rassemble.` },
  { type:"text", content:`Jour 8 - Chaos ⚔️

Il est temps de faire tes preuves.

Envoie-moi la photo la plus folle que tu aies (de toi... ou de moi 😅).
La meilleure participation gagne. Sans discussion.

Le gagnant recevra une pinte offerte par moi. 🍻

Montre-nous qui apporte vraiment le chaos ici.` },
  { type:"text", content:`Jour 9 - The Code ⚔️

Chaque ordre de chevaliers a son propre code.

Chez Enigma, ce n'est pas une regle ecrite,
mais quelque chose que l'on ressent: respect, ambiance et solidarite.

C'est ce qui fait un vrai Knight of Enigma.` },
  { type:"text", content:`Jour 10 - The Legacy ⚔️

Tout ce qui fait Enigma ne se voit pas tout de suite.

Certaines choses vivent dans les histoires, les traditions
et les personnes qui continuent a les transmettre.` },
  { type:"text", content:`Jour 11 - Fait ⚔️

Certaines choses n'ont pas besoin d'etre expliquees.

Le meilleur cercle, c'est Enigma.` },
  { type:"text", content:`Jour 12 - Credits ⚔️

Chaque cercle a ses personnages.

Lucas qui porte la cantus.
Lionel qui s'en sort toujours.

Et tout un tas d'autres legendes entre les deux.` },
  { type:"text", content:`Jour 13 - Defi final ⚔️

10 Pro-Senioren.
1 seul bon ordre.

Peux-tu tous les placer correctement?

La premiere personne qui envoie la bonne reponse remporte un hoodie Knights of Enigma unique. 🛡️

Premier message = premiere victoire.
Le gagnant sera annonce dans l'evenement Facebook.

Pas de hasard. Seulement des connaissances.` },
  { type:"text", content:`Dernier jour - TD ⚔️

Ca y est.

La TD des elections.
Pas besoin d'explications.

Viens.
Bois avec nous au fut gratuit. 🍻` }
];

const hall = document.getElementById("hall");

function isBeforeOrToday(sealDate, today){
  const s = new Date(sealDate);
  s.setHours(0,0,0,0);
  const t = new Date(today);
  t.setHours(0,0,0,0);
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

  seal.addEventListener("click", () => {
    if(!isBeforeOrToday(sealDate, today)) return;

    const day = daysContent[i];

    if(day.type === "riddle"){
      window.location.href = "enigme/";
    } else {
      localStorage.setItem(openedKey, "true");
      seal.classList.remove("locked", "today");
      seal.classList.add("opened");
      openModal(day.content);
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
