import {
  numberArray,
  syncTimeout,
  clearTopContainer,
  color1 as colorGreen,
  color2 as colorRed,
  drawBarEnd,
} from "./script.js";

/* Selection Sort => "Karten aufnehmen"
  Das erste Element des arrays wird ausgewählt und rot gefärbt. Anschließend wird es (sofern vorhanden) mit seinem linken Nachbar verglichen.
  Ist es kleiner als sein linker Nachbar werden die Elemente getauscht. Das Element färbt sich blau. Dieser Schritt wird so lange wiederholt,
  bis es größer als sein linker Nachbar ist. Das Element ist nun an der richtigen Stelle und färbt sich grün. 
  Diese Schritte wiederholen sich jetzt mit dem Element im nächsten array index usw. solage, bis alle Elemente des arrays durchgegangen sind.
*/

export async function insertionSort() {
  for (let i = 0; i < numberArray.length; i++) {
    await insertionSortB(i);
  }
  clearTopContainer();
  drawBarEnd();
}
async function insertionSortB(i) {
  //let currentNumber = numberArray[i];
  let currentIndex = i;
  let counter = i - 1;
  clearTopContainer();
  drawBarIS(i, colorRed);
  await syncTimeout();
  if (counter < 0) {
    clearTopContainer();
    drawBarIS(i, colorGreen);
    await syncTimeout();
  }

  while (counter >= 0) {
    clearTopContainer();
    drawBarIS(numberArray[currentIndex], colorGreen);
    await syncTimeout();
    if (numberArray[currentIndex] < numberArray[counter]) {
      let numberLower = numberArray[currentIndex];
      let numberHigher = numberArray[counter];
      numberArray[counter] = numberLower;
      numberArray[currentIndex] = numberHigher;
      currentIndex--;
      // show blue div
      clearTopContainer();
      drawBarIS(currentIndex, "blue");
      await syncTimeout();
    }

    console.log(counter);
    if (counter == 0) {
      console.log("jetzt");
      clearTopContainer();
      drawBarIS(currentIndex, colorGreen);
      await syncTimeout();
    }
    counter--;
  }
  clearTopContainer();
  drawBarIS(numberArray[currentIndex], colorRed);
}

function drawBarIS(div1, color1) {
  for (let b = 0; b < numberArray.length; b++) {
    let para = document.createElement("div");
    para.className = "bar";
    if (b == div1) {
      para.style.backgroundColor = color1;
    }
    para.style.height = numberArray[b] / 5 + "%";
    document.getElementById("topContainer").appendChild(para);
  }
}
