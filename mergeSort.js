import {
    numberArray,
    syncTimeout,
    clearTopContainer,
    drawBarEnd,
  } from "./script.js";


/* Merge Sort
Der Merge Sort ist wie der Quick Sort ein schneller Sortieralgorithmus nach dem Divide and Conquer Prinzip. 
Das Array wir d rekursiv immer in der Mitte in in zwei Teillisten aufgeteilt. Solange bis die Teillisten nur noch aus einem Element bestehen. 
Da eine Liste aus einem Element nicht sortiert werden kann sind die Elemente nun für den ersten merge bereit. In der richtigen Reihenfolge
werden sie nun zu einer Liste zusammengefügt. Diese Teilliste ist nun sortiert und wird mit der nächst kleineren sotierten Teilliste gemerged.
Da die Teillisten schon vor dem mergen für sich sortiert sind, ist der merge sort effizienter als beispielsweise der quick sort.
Das aktuell sortierte Teilarray wird dabei immer blau markiert

https://www.hackerearth.com/practice/algorithms/sorting/merge-sort/visualize/
*/



let itmd=[]
let visited=[]


export async function buttonMergeSort() {

    for(let i =0;i<numberArray.length;i++){
        itmd.push(0)
        visited.push(0)
      }
      

  await mergeSort(0, numberArray.length- 1)

  clearTopContainer();
 drawBarEnd()

}

async function mergeArray(start, end) {
  let mid = parseInt((start + end) >> 1);
  let start1 = start
  let start2 = mid + 1
  let end1 = mid
  let end2 = end
    
  // Initial index of merged subarray
  let index = start

  while (start1 <= end1 && start2 <= end2) {
      if (numberArray[start1] <= numberArray[start2]) {
          itmd[index] = numberArray[start1]
          index = index + 1
          start1 = start1 + 1;
      }
      else if(numberArray[start1] > numberArray[start2]) {
          itmd[index] = numberArray[start2]
          index = index + 1
          start2 = start2 + 1;
      }
  
  }

  // Copy the remaining elements of
  // numberArray, if there are any
  while (start1 <= end1) {
      itmd[index] = numberArray[start1]
      index = index + 1
      start1 = start1 + 1;
  }

  while (start2 <= end2) {
      itmd[index] = numberArray[start2]
      index = index + 1
      start2 = start2 + 1;
  }

  index = start
  while (index <= end) {
    numberArray[index] = itmd[index];
      index++;
  }
}


// Merge Sorting
async function mergeSort(start, end)  {
  if (start < end) {
      let mid = parseInt((start + end) >> 1)
      await mergeSort(start, mid)
      await mergeSort(mid + 1, end)
      await mergeArray(start, end)
      clearTopContainer()
       drawBarsMergeSort(start, end)
     await syncTimeout()
  }
}



function drawBarsMergeSort(start, end) {
  for (let b = 0; b < numberArray.length; b++) {
    var para = document.createElement("div");
    para.className = "bar";
 if(b>=start && b<=end){
   para.style.backgroundColor="blue"
 }
    para.style.height = numberArray[b] / 5 + "%";
    document.getElementById("topContainer").appendChild(para);
  }
}