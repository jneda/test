const editor = document.querySelector(".editor");
const preview = document.querySelector(".preview");

const tagButtons = document.querySelectorAll(".tag-btn");

const maxCharsInput = document.querySelector(".max-chars-input");

const charsMeter = document.querySelector(".chars-meter");
const countParagraph = document.querySelector(".chars-count");

let charsCount = 0;
let maxChars = 200;

function init() {
  editor.value = "";
  preview.value = "";
  maxCharsInput.value = maxChars;
  onEditorUpdate();
}

function updatePreview() { 
  preview.innerHTML = editor.value;
}

function getTextCount() {
  // use a regex not to count chars in tags
  return editor.value.replace(/<.*?>|<.*/gms, '').length;
  
  /* // count chars of preview text content instead ?
  return preview.textContent.length; */
}

function updateCountUI() {
  getTextCount();
  // update char count
  charsCount = getTextCount();
  // update count paragraph
  countParagraph.innerText = `${charsCount}/${maxChars}`;
  // update meter
  charsMeter.value = charsCount;
}

function updateMeterValues(maxChars) {
  // calculate and update values for the meter colors to make sense
  charsMeter.optimum = Math.floor(maxChars * 0.25);
  charsMeter.low = Math.floor(maxChars * 0.5);
  charsMeter.high = Math.floor(maxChars * 0.8);
  charsMeter.max = maxChars;
  // update editor's max chars count
  editor.maxLength = maxChars;
}

function onMaxCharsUpdate() {
  maxChars = maxCharsInput.value;
  updateMeterValues(maxChars);
  updateCountUI();
}

function onEditorUpdate() {
  // update UI
  updateCountUI();
  updatePreview();
}

function onTagButtonUpdate(ev) {
  const tag = ev.target.value;
  editor.value += `<${tag}><${tag}/>`;
}

editor.addEventListener("input", onEditorUpdate);
maxCharsInput.addEventListener("input", onMaxCharsUpdate);

for (const tagButton of tagButtons) {
  tagButton.addEventListener("click", onTagButtonUpdate);
}

window.addEventListener("load", init);

