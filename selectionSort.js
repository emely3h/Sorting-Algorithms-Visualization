import {
  numberArray,
  syncTimeout,
  clearTopContainer,
  color1 as colorRed,
  color2 as colorGreen,
  drawBarEnd,
} from "./script.js";
/* Selection Sort
In jeder Runde wird über das array iteriert, immer das aktuell höchste Element wird dabei rot gefärbt. Das Element, dass gerade mit dem aktuell
höchsten Element verglichen wird, wird dabei blau gefärbt.
Wurde das array durchiteriert, wird das rot gefärbte Element mit dem letzen Element der Runde vertauscht. Die Elemente die getauscht werden,
färben sich zunächst orange und nach dem tauschen grün. In der ersten Runde wird über das komplette array iteriert. In der zweiten Runde wird das
array bis zum vorletzen Element iteriert usw. Bis alle Elemente sortiert sind.
*/
let colorSwitch = false;
export async function selectionSort() {
  for (let i = 0; i < numberArray.length; i++) {
    let iterate = 0;
    let max = 0;
    let maxIndex = 0;

    while (iterate < numberArray.length - i) {
      // update current highest element
      if (numberArray[iterate] > max) {
        max = numberArray[iterate];
        maxIndex = iterate;
      }
      if (numberArray[iterate] > numberArray[iterate + 1]) {
        colorSwitch = true;
      }
      await syncTimeout();
      clearTopContainer();
      drawBarSS(maxIndex, iterate, "red");
      iterate++;
    }
    // swap elements

    clearTopContainer();
    drawBarSS(maxIndex, numberArray.length - 1 - i, "orange");
    await syncTimeout();
    let swapNum = numberArray[numberArray.length - 1 - i];
    numberArray[maxIndex] = swapNum;
    numberArray[numberArray.length - 1 - i] = max;
    clearTopContainer();
    drawBarSS(maxIndex, numberArray.length - 1 - i, "green");
    await syncTimeout();
    if (i == numberArray.length - 1) {
      clearTopContainer();
      drawBarEnd();
    }
  }
}
function drawBarSS(currentMax, i, color) {
  for (let b = 0; b < numberArray.length; b++) {
    var para = document.createElement("div");
    para.className = "bar";
    if (b == currentMax) {
      para.style.backgroundColor = color;
    }
    if (b == i && colorSwitch && currentMax != i) {
      if (color == "orange") {
        para.style.backgroundColor = "orange";
      } else if (color == "green") {
        para.style.backgroundColor = "green";
      } else {
        para.style.backgroundColor = "blue";
      }
    }
    para.style.height = numberArray[b] / 5 + "%";
    document.getElementById("topContainer").appendChild(para);
  }
}
