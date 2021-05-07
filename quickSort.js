import {
  numberArray,
  syncTimeout,
  clearTopContainer,
  color1,
  color2,
  drawBarEnd,
} from "./script.js";

/* Quick Sort
Der Quick sort ist ein schneller (O(nlogn)), rekursiver Sortieralgorithmus nach dem divide an conquer Prinzip
Zunächst wird die Liste in 2 Teillisten getrennt. Dazu wird ein Pivotelement (hier ist es das erste Element) ausgewählt und alle
anderen Elemente werden nach diesem Pivotelement sortiert. Das heißt, am Ende stehen alle Elemente die kleiner als das Pivot Element sind auf
der linken Seite des PivotElements und alle anderen auf der rechten Seite des Pivotelements. Anschließend erfolgt die Rekusion. Diese Schritte
werden zunächst mit der linken Teilliste (= alle Elemente links des Pivotelements) und dann mit der rechten Teilliste wiederholt.
Die Teilliste die aktuell bearbeitet wird, wird gelb markeirt.
Das aktuelle PivotElement ist blau hinterlegt.
Das Element, dass gerade mit dem PivotElement verglichen wird, ist grün gefärbt, sofern es am richtigen Platz ist, wenn nicht färbt es sich zunächst rot 
und nach erfolgreichem Tausch grün.
*/

export async function buttonQuickSort() {
  await quickSort(numberArray, 0, numberArray.length - 1);
  clearTopContainer();
  drawBarEnd();
}

async function quickSort(arr, start, end) {
  if (start >= end) {
    return;
  }
  let index = await partition(arr, start, end);

  clearTopContainer();
  drawBarQuickSort(index);

  await Promise.all([
    // rekursion
    quickSort(arr, start, index - 1),
    quickSort(arr, index + 1, end),
  ]);
}

async function partition(arr, start, end) {
  let pivotValue = arr[end];
  let pivotIndex = start;

  // mark region
  clearTopContainer();
  drawBarQuickSort(pivotIndex, start, end);
  await syncTimeout();

  // pivot element überspringen
  for (let i = start + 1; i < end; i++) {
    if (arr[i] < pivotValue) {
      clearTopContainer();
      drawBarQuickSort(pivotIndex, start, end, i, false);
      await syncTimeout();

      swap(arr, i, pivotIndex);

      let indexSwappedElement = pivotIndex;
      pivotIndex++;
      clearTopContainer();
      drawBarQuickSort(pivotIndex, start, end, indexSwappedElement, true);
      await syncTimeout();
    } else {
      clearTopContainer();
      drawBarQuickSort(pivotIndex, start, end, i, true);
      await syncTimeout();
    }
  }
  swap(arr, pivotIndex, end);
  clearTopContainer(pivotIndex);
  drawBarQuickSort(pivotIndex);
  await syncTimeout();

  return pivotIndex;
}
function drawBarQuickSort(pivot, start, end, selected, bool) {
  for (let b = 0; b < numberArray.length; b++) {
    var para = document.createElement("div");
    para.className = "bar";

    if (b >= start && b <= end) {
      para.style.backgroundColor = "yellow";
    }
    if (b == pivot) {
      console.log("asdf");
      para.style.backgroundColor = "blue";
    }
    if (b == selected && bool == false) {
      para.style.backgroundColor = "red";
    }
    if (b == selected && bool == true) {
      para.style.backgroundColor = "green";
    }
    para.style.height = numberArray[b] / 5 + "%";
    document.getElementById("topContainer").appendChild(para);
  }
}
function swap(arr, a, b) {
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}
