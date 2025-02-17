const arrayContainer = document.getElementById("array-container");
const statusText = document.getElementById("status");
let arr = [];
let isPaused = false;
let currentSorting = null;

// Color settings for better visualization
const defaultColor = "cyan";
const compareColor = "red";
const keyColor = "yellow";
const pivotColor = "purple";
const mergeColorLeft = "orange";
const mergeColorRight = "pink";
const sortedColor = "green";

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
    bar.style.backgroundColor = defaultColor;
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
      // Highlight bars being compared
      bars[j].style.backgroundColor = compareColor;
      bars[j + 1].style.backgroundColor = compareColor;
      await delay(50);
      if (arr[j] > arr[j + 1]) {
        await swapBars(bars, j, j + 1);
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
      // Return to default color
      bars[j].style.backgroundColor = defaultColor;
      bars[j + 1].style.backgroundColor = defaultColor;
    }
    // Mark the final element in this pass as sorted
    bars[arr.length - 1 - i].style.backgroundColor = sortedColor;
  }
  statusText.innerText = "Status: Bubble Sort Completed";
  document.querySelectorAll(".bar").forEach((bar) => (bar.style.backgroundColor = sortedColor));
}

// Insertion Sort
async function insertionSort() {
  let bars = document.querySelectorAll(".bar");
  for (let i = 1; i < arr.length; i++) {
    if (isPaused) return;
    let key = arr[i];
    // Mark key element in yellow
    bars[i].style.backgroundColor = keyColor;
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      if (isPaused) return;
      // Highlight element being compared
      bars[j].style.backgroundColor = compareColor;
      await delay(100);
      arr[j + 1] = arr[j];
      bars[j + 1].style.height = arr[j] + "px";
      bars[j].style.backgroundColor = defaultColor;
      j--;
    }
    arr[j + 1] = key;
    bars[j + 1].style.height = key + "px";
    bars[i].style.backgroundColor = defaultColor;
    await delay(100);
  }
  statusText.innerText = "Status: Insertion Sort Completed";
  document.querySelectorAll(".bar").forEach((bar) => (bar.style.backgroundColor = sortedColor));
}

// Selection Sort
async function selectionSort() {
  let bars = document.querySelectorAll(".bar");
  for (let i = 0; i < arr.length - 1; i++) {
    if (isPaused) return;
    let minIndex = i;
    // Mark the candidate minimum in yellow
    bars[minIndex].style.backgroundColor = keyColor;
    for (let j = i + 1; j < arr.length; j++) {
      if (isPaused) return;
      bars[j].style.backgroundColor = compareColor;
      await delay(100);
      if (arr[j] < arr[minIndex]) {
        bars[minIndex].style.backgroundColor = defaultColor;
        minIndex = j;
        bars[minIndex].style.backgroundColor = keyColor;
      }
      bars[j].style.backgroundColor = defaultColor;
    }
    if (minIndex !== i) {
      await swapBars(bars, i, minIndex);
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
    bars[i].style.backgroundColor = sortedColor;
  }
  statusText.innerText = "Status: Selection Sort Completed";
  document.querySelectorAll(".bar").forEach((bar) => (bar.style.backgroundColor = sortedColor));
}

// Quick Sort and its partition helper
async function quickSort(start, end) {
  if (start < end && !isPaused) {
    let pi = await partition(start, end);
    await quickSort(start, pi - 1);
    await quickSort(pi + 1, end);
  }
  if (start === 0 && end === arr.length - 1) {
    statusText.innerText = "Status: Quick Sort Completed";
    document.querySelectorAll(".bar").forEach((bar) => (bar.style.backgroundColor = sortedColor));
  }
}

async function partition(start, end) {
  let bars = document.querySelectorAll(".bar");
  let pivot = arr[end];
  // Mark pivot with purple
  bars[end].style.backgroundColor = pivotColor;
  let i = start - 1;
  for (let j = start; j < end; j++) {
    if (isPaused) return;
    bars[j].style.backgroundColor = compareColor;
    await delay(100);
    if (arr[j] < pivot) {
      i++;
      await swapBars(bars, i, j);
      [arr[i], arr[j]] = [arr[j], arr[i]];
      bars[i].style.backgroundColor = keyColor;
    }
    bars[j].style.backgroundColor = defaultColor;
  }
  await swapBars(bars, i + 1, end);
  [arr[i + 1], arr[end]] = [arr[end], arr[i + 1]];
  return i + 1;
}

// Merge Sort and its merge helper
async function mergeSort(start, end) {
  if (start >= end || isPaused) return;
  let mid = Math.floor((start + end) / 2);
  await mergeSort(start, mid);
  await mergeSort(mid + 1, end);
  await merge(start, mid, end);
  if (start === 0 && end === arr.length - 1) {
    statusText.innerText = "Status: Merge Sort Completed";
    document.querySelectorAll(".bar").forEach((bar) => (bar.style.backgroundColor = sortedColor));
  }
}

async function merge(start, mid, end) {
  let bars = document.querySelectorAll(".bar");
  let leftArr = arr.slice(start, mid + 1);
  let rightArr = arr.slice(mid + 1, end + 1);
  let leftIndex = 0,
      rightIndex = 0,
      k = start;

  // Color left and right parts for clarity
  for (let i = start; i <= mid; i++) {
    bars[i].style.backgroundColor = mergeColorLeft;
  }
  for (let i = mid + 1; i <= end; i++) {
    bars[i].style.backgroundColor = mergeColorRight;
  }
  
  await delay(100);
  
  while (leftIndex < leftArr.length && rightIndex < rightArr.length) {
    if (isPaused) return;
    if (leftArr[leftIndex] <= rightArr[rightIndex]) {
      arr[k] = leftArr[leftIndex];
      bars[k].style.height = leftArr[leftIndex] + "px";
      leftIndex++;
    } else {
      arr[k] = rightArr[rightIndex];
      bars[k].style.height = rightArr[rightIndex] + "px";
      rightIndex++;
    }
    // Return merged bar back to default color
    bars[k].style.backgroundColor = defaultColor;
    k++;
    await delay(100);
  }
  while (leftIndex < leftArr.length) {
    if (isPaused) return;
    arr[k] = leftArr[leftIndex];
    bars[k].style.height = leftArr[leftIndex] + "px";
    bars[k].style.backgroundColor = defaultColor;
    leftIndex++;
    k++;
    await delay(100);
  }
  while (rightIndex < rightArr.length) {
    if (isPaused) return;
    arr[k] = rightArr[rightIndex];
    bars[k].style.height = rightArr[rightIndex] + "px";
    bars[k].style.backgroundColor = defaultColor;
    rightIndex++;
    k++;
    await delay(100);
  }
}

generateArray();
