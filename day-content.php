<?php
header('Content-Type: application/json; charset=UTF-8');

date_default_timezone_set('Europe/Brussels');

$lang = isset($_GET['lang']) ? strtolower($_GET['lang']) : 'nl';
$day = isset($_GET['day']) ? (int) $_GET['day'] : 0;

$startDate = new DateTimeImmutable('2026-04-23 00:00:00');
$today = new DateTimeImmutable('today');
$dayDate = $startDate->modify('+' . max(0, $day - 1) . ' days');

if ($day < 1 || $day > 14) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid day']);
    exit;
}

if ($dayDate > $today) {
    http_response_code(403);
    echo json_encode(['success' => false, 'error' => 'Content not available yet']);
    exit;
}

$daysNl = [
    1 => ['type' => 'text', 'content' => "Day 1 - AV ⚔️\n\nVandaag is het zover: de AV. Altijd een spannend moment waarop we terugkijken naar het afgelopen jaar en zien wat goed liep en wat we kunnen meenemen naar volgend jaar.\n\nMaar vooral is dit een moment waarop we samenkomen als één groep.\n\nDaarnaast zal ik vandaag ook mijn kandidatuur voorstellen. Na de AV nodig ik jullie graag uit om samen iets te gaan drinken en na te praten op café 🍻\n\nUur en locatie worden nog gedeeld in het event.\nDe AV start om 19:30.\n\nTot straks ⚔️"],
    2 => ['type' => 'text', 'content' => "Day 2 - Folklore ⚔️\n\nWist je dat studentenfolklore al teruggaat tot de middeleeuwen?\nIn de eerste Europese universiteiten bestonden er al rituelen en tradities om nieuwe studenten op te nemen in de groep.\n\nFolklore draaide toen, net zoals nu, om één ding:\nverbondenheid.\n\nEn dat is exact waar Enigma vandaag nog steeds voor staat. 🍻"],
    3 => ['type' => 'text', 'content' => "Day 3 – Enigma ⚔️\n\nNiet elke kring voelt meteen als thuis.\n\nMaar eens het klikt…\ndan blijf je hangen.\n\nDat is wat Enigma voor mij is geworden. 🍻"],
    4 => ['type' => 'text', 'content' => "Day 4 – Vriendschap ⚔️\n\nIn elke queeste ontstaan de sterkste banden niet op voorhand.\n\nZe groeien onderweg.\nTijdens onverwachte momenten, met mensen die eerst vreemden waren…\nen daarna je trouwste strijdmakkers worden. 🍻"],
    5 => ['type' => 'riddle', 'redirect' => 'riddle.html'],
    6 => ['type' => 'text', 'content' => "Day 6 – De missie ⚔️\n\nStudent zijn is meer dan lessen volgen.\n\nHet is herinneringen maken, mensen leren kennen\nen ergens een plek vinden waar je blijft hangen.\n\nDat is waar we met Enigma elke dag aan bouwen."],
    7 => ['type' => 'text', 'content' => "Day 7 – Folklore ⚔️\n\nOnze zwarte klak? Die vindt zijn oorsprong bij de koolmijnwerkers van vroeger.\n\nHard werk, samen sterk…\nen af en toe een pint erbij. 🍻\n\nEn we zijn daar niet alleen in — binnen BSK dragen ook onze militaire vrienden van PoPo met trots hun zwarte klak.\n\nTraditie verbindt."],
    8 => ['type' => 'text', 'content' => "Day 8 – Chaos ⚔️\n\nTijd om jezelf te bewijzen.\n\nStuur mij de gekste foto die je hebt (van jezelf… of van mij 😅).\nDe beste inzending wint. Geen discussie.\n\nDe winnaar krijgt een pint op mijn kosten. 🍻\n\nLaat zien wie hier echt chaos brengt."],
    9 => ['type' => 'text', 'content' => "Day 9 – The Code ⚔️\n\nElke ridderorde heeft zijn eigen code.\n\nBinnen Enigma is dat geen geschreven regel,\nmaar iets dat je voelt: respect, sfeer en samenhorigheid.\n\nDat is wat een echte Knight of Enigma maakt."],
    10 => ['type' => 'text', 'content' => "Day 10 – The Legacy ⚔️\n\nNiet alles wat Enigma maakt, zie je meteen.\n\nSommige dingen zitten in verhalen, tradities\nen de mensen die het blijven doorgeven."],
    11 => ['type' => 'text', 'content' => "Day 11 – Feit ⚔️\n\nSommige dingen moet je niet uitleggen.\n\nDe beste kring is Enigma."],
    12 => ['type' => 'text', 'content' => "Day 12 – Credits ⚔️\n\nElke kring heeft zijn karakters.\n\nLucas die de cantus draagt.\nLionel die overal mee wegkomt.\n\nEn nog een hele hoop legendes ertussenin."],
    13 => ['type' => 'text', 'content' => "Day 13 – Final Challenge ⚔️\n\n11 vice-praesesses.\n1 juiste volgorde.\n\nKan jij ze allemaal correct plaatsen?\n\nDe eerste die het juist doorstuurt, wint een one of a kind Knights of Enigma hoodie. 🛡️\n\nFirst message = first win.\nDe winnaar wordt bekendgemaakt in het Facebook-event.\n\nGeen gokken. Alleen kennis."],
    14 => ['type' => 'text', 'content' => "Final Day – TD ⚔️\n\nVandaag is het zover.\n\nDe TD der verkiezingen.\nGeen uitleg nodig.\n\nKom af.\nDrink mee van het gratis vat. 🍻"],
];

$daysFr = [
    1 => ['type' => 'text', 'content' => "Jour 1 - AG ⚔️\n\nAujourd'hui, c'est le grand moment: l'AG. C'est toujours un moment important où l'on regarde l'année écoulée et ce que nous pouvons emporter avec nous pour l'année prochaine.\n\nMais surtout, c'est un moment où nous nous retrouvons tous comme un seul groupe.\n\nAujourd'hui, je presenterai egalement ma candidature. Apres l'AG, je vous invite volontiers a aller boire un verre ensemble et a discuter au cafe 🍻\n\nL'heure et le lieu seront encore partages dans l'evenement.\nL'AG commence a 19h30.\n\nA tout a l'heure ⚔️"],
    2 => ['type' => 'text', 'content' => "Jour 2 - Folklore ⚔️\n\nSaviez-vous que le folklore etudiant remonte deja au Moyen Age?\nDans les premieres universites europeennes, il existait deja des rites et des traditions pour integrer les nouveaux etudiants au groupe.\n\nLe folklore tournait alors, comme aujourd'hui, autour d'une seule chose:\nla solidarite.\n\nEt c'est exactement ce que represente encore Enigma aujourd'hui. 🍻"],
    3 => ['type' => 'text', 'content' => "Jour 3 - Enigma ⚔️\n\nToutes les cercles ne ressemblent pas immediatement a une maison.\n\nMais une fois que le declic se fait...\non y reste.\n\nC'est ce qu'Enigma est devenu pour moi. 🍻"],
    4 => ['type' => 'text', 'content' => "Jour 4 - Amitie ⚔️\n\nDans chaque quete, les liens les plus forts ne se creent pas a l'avance.\n\nIls grandissent en chemin.\nPendant des moments inattendus, avec des gens qui etaient d'abord des inconnus...\net qui deviennent ensuite tes plus fideles compagnons. 🍻"],
    5 => ['type' => 'riddle', 'redirect' => 'enigme/'],
    6 => ['type' => 'text', 'content' => "Jour 6 - La mission ⚔️\n\nEtre etudiant, c'est plus que suivre des cours.\n\nC'est creer des souvenirs, rencontrer des gens\net trouver un endroit ou l'on a envie de rester.\n\nC'est ce que nous construisons chaque jour avec Enigma."],
    7 => ['type' => 'text', 'content' => "Jour 7 - Folklore ⚔️\n\nNotre calotte noire? Elle trouve son origine chez les mineurs d'autrefois.\n\nTravail acharne, force collective...\net parfois une pinte en plus. 🍻\n\nEt nous ne sommes pas seuls - au sein du BSK, nos amis militaires de PoPo portent eux aussi fierement leur calotte noire.\n\nLa tradition rassemble."],
    8 => ['type' => 'text', 'content' => "Jour 8 - Chaos ⚔️\n\nIl est temps de faire tes preuves.\n\nEnvoie-moi la photo la plus folle que tu aies (de toi... ou de moi 😅).\nLa meilleure participation gagne. Sans discussion.\n\nLe gagnant recevra une pinte offerte par moi. 🍻\n\nMontre-nous qui apporte vraiment le chaos ici."],
    9 => ['type' => 'text', 'content' => "Jour 9 - The Code ⚔️\n\nChaque ordre de chevaliers a son propre code.\n\nChez Enigma, ce n'est pas une regle ecrite,\nmais quelque chose que l'on ressent: respect, ambiance et solidarite.\n\nC'est ce qui fait un vrai Knight of Enigma."],
    10 => ['type' => 'text', 'content' => "Jour 10 - The Legacy ⚔️\n\nTout ce qui fait Enigma ne se voit pas tout de suite.\n\nCertaines choses vivent dans les histoires, les traditions\net les personnes qui continuent a les transmettre."],
    11 => ['type' => 'text', 'content' => "Jour 11 - Fait ⚔️\n\nCertaines choses n'ont pas besoin d'etre expliquees.\n\nLe meilleur cercle, c'est Enigma."],
    12 => ['type' => 'text', 'content' => "Jour 12 - Credits ⚔️\n\nChaque cercle a ses personnages.\n\nLucas qui porte la cantus.\nLionel qui s'en sort toujours.\n\nEt tout un tas d'autres legendes entre les deux."],
    13 => ['type' => 'text', 'content' => "Jour 13 - Defi final ⚔️\n\n10 Pro-Senioren.\n1 seul bon ordre.\n\nPeux-tu tous les placer correctement?\n\nLa premiere personne qui envoie la bonne reponse remporte un hoodie Knights of Enigma unique. 🛡️\n\nPremier message = premiere victoire.\nLe gagnant sera annonce dans l'evenement Facebook.\n\nPas de hasard. Seulement des connaissances."],
    14 => ['type' => 'text', 'content' => "Dernier jour - TD ⚔️\n\nCa y est.\n\nLa TD des elections.\nPas besoin d'explications.\n\nViens.\nBois avec nous au fut gratuit. 🍻"],
];

$days = $lang === 'fr' ? $daysFr : $daysNl;
$entry = $days[$day];

echo json_encode([
    'success' => true,
    'type' => $entry['type'],
    'content' => $entry['content'] ?? null,
    'redirect' => $entry['redirect'] ?? null,
], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
