/* faux curseurs https://codepen.io/team/css-tricks/pen/YzGoBGq */

const editor = document.querySelector(".editor");
const preview = document.querySelector(".preview");

const bold = document.querySelector('input[value="bold"]');
const italic = document.querySelector('input[value="italic"]');
const maxCharsInput = document.querySelector('input[type="number"]');

const executeBtn = document.querySelector('input[value="Exécuter"]');

const charsMeter = document.querySelector(".charsMeter");

const charsRemaining = document.querySelector(".charsRemaining");

let maxChars = 200;

function getCharCounts() {
  // trouve les balises, complètes et incomplètes, et les retours à la ligne
  const regex = /<.*?>|<.*|\n/g;

  // longueur contenu texte
  const nbTextChars = editor.value.replace(regex, "").length;

  // longueur contenu balises
  let tagsFound = editor.value.match(regex);
  // si match renvoie null, assigner un tableau vide
  if (!tagsFound) {
    tagsFound = [];
  }

  const nbTagChars = tagsFound.join("").length;

  return [nbTextChars, nbTagChars];
}

function updateMeters() {
  const [nbtextChars, nbTagChars] = getCharCounts();
  charsMeter.value = nbtextChars;
  charsRemaining.innerText = maxChars - nbtextChars + " / " + maxChars;
  setMaxLength(nbTagChars);
}

function updatePreview() {
  const code = editor.value;
  preview.innerHTML = code;
}

function putBold() {
  editor.value += "<b></b>";
  updateMeters();
}

function putItalic() {
  editor.value += "<i></i>";
  updateMeters();
}

function setMaxLength(nbTagChars) {
  editor.setAttribute("maxlength", maxChars + nbTagChars);
}

function setMaxChars() {
  maxChars = Number(maxCharsInput.value);
  charsMeter.max = maxChars;
  charsMeter.high = maxChars * 0.8;
  charsMeter.low = maxChars * 0.5;
  charsMeter.optimum = maxChars * 0.2;
  //console.log(charsMeter);
  updateMeters();
}

editor.addEventListener("input", updateMeters);
executeBtn.addEventListener("click", updatePreview);

bold.addEventListener("click", putBold);
italic.addEventListener("click", putItalic);
maxCharsInput.addEventListener("input", setMaxChars);
