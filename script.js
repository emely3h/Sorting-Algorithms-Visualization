import { insertionSort } from "./insertionSort.js";
import { bubbleSort } from "./bubbleSort.js";
import { selectionSort } from "./selectionSort.js";
import { buttonQuickSort as quickSort } from "./quickSort.js";
import {buttonMergeSort as mergeSort} from "./mergeSort.js"

export var numberArray = [];
export var color2 = "red";
export var color1 = "rgb(65, 224, 65)";

var arraySizeSlider = document.getElementById("array-size");
var speedSlider = document.getElementById("sorting-speed");
var speed = 1000 - speedSlider.value;

arraySizeSlider.oninput = function () {
  numberArray = [];
  clearTopContainer();
  createArray();
  drawBars(numberArray);
};
speedSlider.oninput = function () {
  speed = 1000 - this.value;
};
document.getElementById("new-array").addEventListener("click", (e) => {
  location.reload();
});

document.getElementById("sort").addEventListener("click", bubbleSort);
document
  .getElementById("insertion-sort")
  .addEventListener("click", insertionSort);
document
  .getElementById("merge-sort")
  .addEventListener("click", mergeSort);
document.getElementById("quick-sort").addEventListener("click", quickSort);
document
  .getElementById("selection-sort")
  .addEventListener("click", selectionSort);

createArray();
drawBars();

export function clearTopContainer() {
  var div = document.getElementById("topContainer");
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
}
export function drawBarEnd() {
  for (let b = 0; b < numberArray.length; b++) {
    var para = document.createElement("div");
    para.className = "end-bar";
    para.style.height = numberArray[b] / 5 + "%";
    document.getElementById("topContainer").appendChild(para);
  }
  console.log("enter draw bar end");
}
export function syncTimeout() {
  return new Promise((resolve) => setTimeout(resolve, speed));
}
function drawBars() {
  for (let b = 0; b < numberArray.length; b++) {
    var para = document.createElement("div");
    para.className = "bar";
    para.style.height = numberArray[b] / 5 + "%";
    document.getElementById("topContainer").appendChild(para);
  }
}
function createArray() {
  for (let i = 0; i < arraySizeSlider.value; i++) {
    let ranbdomNum = Math.floor(Math.random() * 500) + 1;
    numberArray.push(ranbdomNum);
  }
}




 