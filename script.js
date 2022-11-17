const gridContainer = document.querySelector('.grid-container');
const gridItems = document.getElementsByClassName('grid-item');

const colorPicker = document.getElementById('draw-color');
const bgColorPicker = document.getElementById('bg-color');

const rainbowButton = document.getElementById('rainbow-mode');
const eraserButton = document.getElementById('toggle-eraser');
const clearButton = document.getElementById('clear-button');
const toggleGridButton = document.getElementById('toggle-grid');

const gridRange = document.getElementById('grid-range');
const gridSize = document.getElementById('grid-size');

let currentColor = '#000000';
let currentBgColor = bgColorPicker.value;
let currentInkType = 'default';
let currentSize = 16;
let mouseDown = false;

// Change currentSize according to range input value
gridRange.addEventListener('mousemove', (e) => {
  currentSize = e.target.value;
  gridContainer.style.gridTemplateColumns = `repeat(${currentSize}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${currentSize}, 1fr)`;
  gridSize.innerText = `Grid size: ${currentSize} x ${currentSize}`;
  if (!mouseDown) return;
  clear();
});

// Create divs to use as grid items according to currentSize
for (i = 0; i < (currentSize ** 3); i++) {
  let newDivs = document.createElement(`div`);
  newDivs.className = 'grid-item outline';
  gridContainer.appendChild(newDivs);
}

// Change ink color to the chose one
colorPicker.addEventListener('input', (e) => {
  currentColor = e.target.value;
});

// Change background color to the chose one (only for blocks that aren't painted)
for (let i = 0; i < gridItems.length; i++) {
  bgColorPicker.addEventListener('input', (e) => {
    currentBgColor = e.target.value;
    if (!gridItems[i].classList.contains('painted')) {
      gridItems[i].style.background = currentBgColor;
    }
  });
}

// Make the Rainbow Mode button change currentInkType to rainbow
rainbowButton.addEventListener('click', () => {
  if (currentInkType !== 'rainbow') {
    currentInkType = 'rainbow';
    rainbowButton.classList.toggle('active');
  }
  else {
    currentInkType = 'default';
    rainbowButton.classList.remove('active');
  }
});

// Make the Eraser button turn Eraser on
eraserButton.addEventListener('click', () => {
  if (!eraserButton.classList.contains('active')) {
    eraserButton.classList.toggle('active');
  }
  else {
    eraserButton.classList.remove('active');
  }
});

// Make the Clear button paint all the blocks with the same color as the background
clearButton.addEventListener('click', () => {
  clear()
});

function clear() {
  for (let i = 0; i < gridItems.length; i++) {
    if (gridItems[i].classList.contains('painted'))
    gridItems[i].style.background = currentBgColor;
    gridItems[i].classList.remove('painted');
  }
}

// Make the Toggle Grid Lines button remove the outlines from grid items
toggleGridButton.addEventListener('click', () => {
  for (item of gridItems) {
    item.classList.toggle('outline');
  }
  toggleGridButton.classList.toggle('active');
});

// Allow user to paint blocks while hovering w/ mouse down
document.body.addEventListener('mousedown', () => {
  mouseDown = true;
});

document.body.addEventListener('mouseup', () => {
  mouseDown = false;
});

for (item of gridItems) {
  item.addEventListener('mouseover', (e) => {
    if (!mouseDown) return;
    paintBlocks(e);
  });
}

// Allow user to paint blocks when click on them
for (item of gridItems) {
  item.addEventListener('click', (e) => {
    paintBlocks(e);
  });
}

// Paint the grid blocks according to the currentInkType
function paintBlocks(e) {
  if (currentInkType == 'default' && !eraserButton.classList.contains('active')) {
    e.target.style.background = currentColor;
    e.target.classList.toggle('painted');
  }
  else if (eraserButton.classList.contains('active')) {
    e.target.style.background = currentBgColor;
    e.target.classList.remove('painted');
  }
  else if (currentInkType == 'rainbow') {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    e.target.style.background = `rgb(${randomR}, ${randomG}, ${randomB}`;
    e.target.classList.toggle('painted');
  }
}

// If mouse leaves the container, mouseDown event is turned off to prevent bugging
gridContainer.addEventListener('mouseleave', () => {
  mouseDown = false;
});
