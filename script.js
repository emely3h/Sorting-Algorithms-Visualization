
// VARIABLEN
var numberArray = [];
var arraySizeSlider = document.getElementById("array-size");
var speedSlider = document.getElementById("sorting-speed");
var speed = 100;
var color2 = "red";
var color1 = "rgb(65, 224, 65)";


// ABLAUF
createArray()
drawBars()

arraySizeSlider.oninput = function () {
    numberArray = [];
    clearTopContainer();
    createArray();
    drawBars(numberArray);
}
speedSlider.oninput = function () {
    if (this.value == 500) {
        speed = 500;
    } else {
        speed = 1000 - this.value;
    }

    console.log(speed)
}

document.getElementById("sort").addEventListener("click", buttonBubbleSort);
//document.getElementById("stopp").addEventListener("click", )
//document.getElementById("continue").addEventListener("click", )
document.getElementById("insertion-sort").addEventListener("click", buttonInsertionSort);
document.getElementById("merge-sort").addEventListener("click", buttonMergeSort);
document.getElementById("quick-sort").addEventListener("click", buttonQuickSort);
document.getElementById("selection-sort").addEventListener("click", buttonSelectionSort);



// FUNKTIONEN
function createArray() {
    for (let i = 0; i < arraySizeSlider.value; i++) {
        let ranbdomNum = (Math.floor(Math.random() * 500) + 1);
        numberArray.push(ranbdomNum);
    }
}
function clearTopContainer() {
    var div = document.getElementById('topContainer');
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}
function drawBars() {
    for (let b = 0; b < numberArray.length; b++) {
        var para = document.createElement("div");
        para.className = "bar";
        /* if (numberArray.length < 50) {
            para.innerHTML = numberArray[b];
        } */
        para.style.height = (numberArray[b] / 5) + "%";
        document.getElementById("topContainer").appendChild(para);
    }
}
function drawBarEnd() {
    for (let b = 0; b < numberArray.length; b++) {
        var para = document.createElement("div");
        para.className = "end-bar"
        para.style.height = (numberArray[b] / 5) + "%";
        document.getElementById("topContainer").appendChild(para);
    }
    console.log("enter draw bar end")
}
function syncTimeout() {
    return new Promise(resolve =>
        setTimeout(resolve, speed)
    );
}

// #region INSERTION SORT ///////////////////////////////////////////////////////////
function buttonInsertionSort() {
    insertionSortA()
}
async function insertionSortA() {
    p = Promise.resolve();
    for (let i = 1; i < numberArray.length; i++) {
        /*   p.then(p = new Promise(
             function(resolve) {
                  window.setTimeout(
                      function() {
                         insertionSortB(i);
                         resolve();
                         }, speed);  */
        await syncTimeout();
        await insertionSortB(i);
        /*       }
         ));
         await p;  */

        /* p = p.then(() => new Promise(resolve =>
            setTimeout(function () {
                insertionSortB(i)
                resolve();
            }, 5)
        ));
        await p; */
    }
    clearTopContainer()
    drawBarEnd()
    return;
}
async function insertionSortB(i) {
    let currentNumber = numberArray[i];
    let counter = i - 1;
    clearTopContainer();
    drawBarIS(i, color2);
    await syncTimeout()
    p = Promise.resolve();
    while (counter >= 0 && currentNumber < numberArray[counter]) {
        p.then(p = new Promise(function (resolve, reject) {
            window.setTimeout(function () {
                let num = numberArray[counter];
                numberArray[counter] = currentNumber;
                numberArray[counter + 1] = num;
                counter--;
                clearTopContainer();
                drawBarIS(counter + 1, color2);
                resolve();
            }, speed);
        }
        ));
        await p;
    }
    clearTopContainer();
    drawBarIS(counter, color1);
    await syncTimeout();
}

function drawBarIS(currentDiv, color) {
    for (let b = 0; b < numberArray.length; b++) {
        var para = document.createElement("div");
        para.className = "bar";
        if (b == currentDiv) {
            para.style.backgroundColor = color;
        }
        para.style.height = (numberArray[b] / 5) + "%";
        document.getElementById("topContainer").appendChild(para);
    }
}
//#endregion

//#region  QUICK SORT 
function buttonQuickSort() {
    numberArray = quickSortRecursive(numberArray, 0, numberArray.length - 1)
    clearTopContainer()
    drawBars(numberArray)
}
function quickSortRecursive(arr, start, end) {
    // Base case or terminating case
    if (start >= end) {
        return;
    }

    // Returns pivotIndex
    let index = partition(arr, start, end);

    // Recursively apply the same logic to the left and right subarrays
    quickSortRecursive(arr, start, index - 1);
    quickSortRecursive(arr, index + 1, end);
    return arr
}

function partition(arr, start, end) {
    // Taking the last element as the pivot
    const pivotValue = arr[end];
    let pivotIndex = start;
    for (let i = start; i < end; i++) {
        if (arr[i] < pivotValue) {
            // Swapping elements
            [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
            // Moving to next element
            pivotIndex++;
        }
    }

    // Putting the pivot value in the middle
    [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]]
    return pivotIndex;
};
//#endregion

//#region  SELECTION SORT ////////////////////////////////////////////////////////
function buttonSelectionSort() {
    selectionSort()
}
async function selectionSort() {
    for (let i = numberArray.length - 1; i >= 0; i--) {
        let iterate = i
        let max = 0;
        let maxIndex = 0;
        while (iterate >= 0) {
            if (numberArray[iterate] > max) {
                max = numberArray[iterate];
                maxIndex = iterate
            }
            await syncTimeout()
            clearTopContainer()
            if (i == 0 && iterate == 0) {
                drawBarEnd()
                return
            } else {
                drawBarSS(maxIndex, iterate, "red")
            }
            iterate--
        }
        clearTopContainer()
        drawBarSS(maxIndex, i, "red")
        let swapNum = numberArray[i]
        numberArray[maxIndex] = swapNum
        numberArray[i] = max;
        clearTopContainer()
        drawBarSS(maxIndex, i, "green")
    }
}
function drawBarSS(currentMax, i, color) {
    for (let b = 0; b < numberArray.length; b++) {
        var para = document.createElement("div");
        para.className = "bar";
        if (b == currentMax || b == i) {
            if (color == "red") {
                para.style.backgroundColor = color2;
            } else {
                para.style.backgroundColor = color1;
            }

        }
        para.style.height = (numberArray[b] / 5) + "%";
        document.getElementById("topContainer").appendChild(para);
    }
}
//#endregion

//#region  MERGE SORT ///////////////////////////////////////////////////////
function buttonMergeSort() {
    numberArray = mergeSort()
    clearTopContainer()
    drawBars()
}
function mergeSort(unsortedArray) {
    if (numberArray.length <= 1) {
        return numberArray;
    }
    const middle = Math.floor(numberArray.length / 2);
    const left = numberArray.slice(0, middle);
    const right = numberArray.slice(middle);
    return merge(
        mergeSort(left), mergeSort(right)
    );
}
async function merge(left, right) {
    let resultArray = [], leftIndex = 0, rightIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            resultArray.push(left[leftIndex]);
            clearTopContainer();
            drawBars();
            await syncTimeout();
            leftIndex++;
        } else {
            resultArray.push(right[rightIndex]);
            clearTopContainer();
            drawBars();
            await syncTimeout();
            rightIndex++;
        }
    }
    return resultArray
        .concat(left.slice(leftIndex))
        .concat(right.slice(rightIndex));
}
//#endregion

//#region  BUBBLE SORT ////////////////////////////////////////////////////////////////////
function buttonBubbleSort() {
    bubbleSort(numberArray);
}
async function bubbleSort(numberArray) {
    p = Promise.resolve()
    let counter = 0;
    while (counter < (numberArray.length - 1)) {
        p = p.then(() => new Promise(resolve =>
            setTimeout(function () {
                bubbleSort2(counter)
                console.log("Schleife 1: " + counter)

                resolve();
            }, speed)
        ));
        await p;
        counter++;
    }

}
async function bubbleSort2(counter) {
    var num1;
    var num2;
    p = Promise.resolve();
    for (let i = 0; i < numberArray.length - 1; i++) {
        console.log("Schleife 2: " + i);
        p = p.then(() => new Promise(resolve =>
            setTimeout(async function () {
                if (numberArray[i] > numberArray[i + 1]) {

                    clearTopContainer();
                    drawBarBS(i, "red");
                    await syncTimeout();
                    num1 = numberArray[i];
                    num2 = numberArray[i + 1];
                    numberArray[i] = num2;
                    numberArray[i + 1] = num1;
                }
                clearTopContainer();
                drawBarBS(i, "green");
                if (counter == (numberArray.length - 2)) {
                    clearTopContainer()
                    drawBarEnd();
                }
                resolve();
            }, speed)
        ));
    }
}
function drawBarBS(a, color) {
    for (let b = 0; b < numberArray.length; b++) {
        var para = document.createElement("div");
        if (b == a | b == (a + 1)) {
            para.className = "selected-bar"
            if (color == "green") {
                para.style.backgroundColor = color1;
            }
        } else {
            para.className = "bar";
        }
        para.style.height = (numberArray[b] / 5) + "%";
        document.getElementById("topContainer").appendChild(para);
    }
}
//#endregion




/*
async function test() {
    let p = new Promise(resolve => {
        window.setTimeout(function() {
            console.log('Promise wird ausgeführt');
            resolve('Promise ergebnis');
            }, 1000
        )
    });
    p.then(() =>
        console.log('Nach Promise ausführung')
        );

    console.log('Ausgabe nach Promise erstellt');

    let ergebnis = await p;

    console.log(ergebnis);
} */


















