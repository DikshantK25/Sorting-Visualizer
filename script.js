const arrayContainer = document.getElementById("array-container");
const statusText = document.getElementById("status");
let arr = [];
let isPaused = false;
let currentSorting = null;

// Generate a new random array
function generateArray() {
  arrayContainer.innerHTML = "";
  arr = [];
  for (let i = 0; i < 20; i++) {
    let value = Math.floor(Math.random() * 200) + 20;
    arr.push(value);
    let bar = document.createElement("div");
    bar.style.height = value + "px";
    bar.classList.add("bar");
    arrayContainer.appendChild(bar);
  }
  statusText.innerText = "Status: Ready";
}

// Delay function
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Swap function for animations
async function swapBars(bars, i, j) {
  await delay(100);
  let tempHeight = bars[i].style.height;
  bars[i].style.height = bars[j].style.height;
  bars[j].style.height = tempHeight;
}

// Pause & Resume functions
function pauseSorting() {
  isPaused = true;
  statusText.innerText = "Status: Paused";
}

function resumeSorting() {
  isPaused = false;
  statusText.innerText = "Status: Resuming " + currentSorting.name;
  if (currentSorting) {
    currentSorting();
  }
}

// Start sorting based on button click
function startSorting(type) {
  isPaused = false;
  switch (type) {
    case "bubble":
      currentSorting = bubbleSort;
      break;
    case "insertion":
      currentSorting = insertionSort;
      break;
    case "selection":
      currentSorting = selectionSort;
      break;
    case "quick":
      currentSorting = () => quickSort(0, arr.length - 1);
      break;
    case "merge":
      currentSorting = () => mergeSort(0, arr.length - 1);
      break;
  }
  statusText.innerText = "Status: Running " + type + " sort";
  if (currentSorting) {
    currentSorting();
  }
}

// Bubble Sort
async function bubbleSort() {
  let bars = document.querySelectorAll(".bar");
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (isPaused) return;
      bars[j].style.backgroundColor = "red";
      bars[j + 1].style.backgroundColor = "red";

      if (arr[j] > arr[j + 1]) {
        await swapBars(bars, j, j + 1);
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }

      bars[j].style.backgroundColor = "cyan";
      bars[j + 1].style.backgroundColor = "cyan";
    }
  }
  statusText.innerText = "Status: Bubble Sort Completed";
}

// Insertion Sort
async function insertionSort() {
  let bars = document.querySelectorAll(".bar");
  for (let i = 1; i < arr.length; i++) {
    if (isPaused) return;
    let key = arr[i];
    let j = i - 1;

    bars[i].style.backgroundColor = "red";
    while (j >= 0 && arr[j] > key) {
      if (isPaused) return;
      bars[j + 1].style.height = arr[j] + "px";
      arr[j + 1] = arr[j];
      j--;
      await delay(100);
    }
    arr[j + 1] = key;
    bars[j + 1].style.height = key + "px";
    bars[i].style.backgroundColor = "cyan";
  }
  statusText.innerText = "Status: Insertion Sort Completed";
}

// Selection Sort
async function selectionSort() {
  let bars = document.querySelectorAll(".bar");
  for (let i = 0; i < arr.length - 1; i++) {
    if (isPaused) return;
    let minIndex = i;
    bars[minIndex].style.backgroundColor = "red";

    for (let j = i + 1; j < arr.length; j++) {
      if (isPaused) return;
      bars[j].style.backgroundColor = "blue";
      await delay(100);
      if (arr[j] < arr[minIndex]) {
        bars[minIndex].style.backgroundColor = "cyan";
        minIndex = j;
        bars[minIndex].style.backgroundColor = "red";
      }
      bars[j].style.backgroundColor = "cyan";
    }

    if (minIndex !== i) {
      await swapBars(bars, i, minIndex);
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }

    bars[i].style.backgroundColor = "cyan";
  }
  statusText.innerText = "Status: Selection Sort Completed";
}

// Merge Sort
async function mergeSort(start, end) {
  if (start >= end || isPaused) return;
  let mid = Math.floor((start + end) / 2);
  await mergeSort(start, mid);
  await mergeSort(mid + 1, end);
  await merge(start, mid, end);
  statusText.innerText = "Status: Merge Sort Completed";
}

generateArray();
