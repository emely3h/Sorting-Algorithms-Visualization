import {numberArray, syncTimeout, clearTopContainer, color1, color2, drawBarEnd} from "./script.js";

/* Bubble Sort
  Die ersten beiden Elemente (Element 1 und 2) werden verglichen. Ist das rechte Element größer als das linke sind sie in der richtigen Reihenfolge und
  beide Elemente färben sich grün. Sind sie in der falschen Reihenfolge, färben sie sich rot und tauschen ihren Platz. Jetzt sind die beiden Elemente 
  in der richtigen Reihenfolge und färben sich grün. Anschließend werden die nächsten beiden Elemente (Element 2 und 3) verglichen. 
  Die Schritte wiederholen sich solange bis man am Ende des Arrays angekommen ist. "Runde 1" ist zu Ende und das größte Element ist nun ganz rechts.
  In Runde 2 wiederholen sich nun alle Schritte aus Runde 1, mit dem Unterschied, dass nicht mehr bis zum letzten Element durchiteriert wird,
  sondern nur bis zum vorletzten Element, da das größte Element ja bereits an letzter Stelle steht. Jede Runde wird somit um einen Iterierschritt 
  kürzer, bis alle Elemente sortiert sind.
*/

export async function bubbleSort() {
    let counter = 0;
    while (counter < numberArray.length - 1) {
      await bubbleSort2(counter);
      await syncTimeout();
      counter++;
    }
  }
  async function bubbleSort2(counter) {
    var num1;
    var num2;
    for (let i = 0; i < numberArray.length - 1-counter; i++) {
      if (numberArray[i] > numberArray[i + 1]) {
        clearTopContainer();
        drawBars(i, color2);
        await syncTimeout();
        num1 = numberArray[i];
        num2 = numberArray[i + 1];
        numberArray[i] = num2;
        numberArray[i + 1] = num1;
        await syncTimeout();
      }
      clearTopContainer();
      drawBars(i, color1);
      await syncTimeout();
      if (counter == numberArray.length - 2) {
        clearTopContainer();
        drawBarEnd();
        await syncTimeout();
      } 
    }
  }
  function drawBars(a, color) {
    for (let b = 0; b < numberArray.length; b++) {
      var para = document.createElement("div");
      if ((b == a) | (b == a + 1)) {
        para.className = "selected-bar";
        if (color == color1) {
          para.style.backgroundColor = color1;
        }
      } else {
        para.className = "bar";
      }
      para.style.height = numberArray[b] / 5 + "%";
      document.getElementById("topContainer").appendChild(para);
    }
  }