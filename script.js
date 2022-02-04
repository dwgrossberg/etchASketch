//Clearing the grid
function clearGrid(parent) {
    while(parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}

//Creating the grid
const container = document.getElementById('container');
container.style.cursor = 'crosshair';
function createGrid(number) {
    if (typeof Number(number) != 'number') return; //end function if no number is entered
    clearGrid(container);
    const boxHeight = String(60/Number(number)) + 'vh';
    const boxWidth = String(70/Number(number)) + 'vw';
    for (let i = 0; i < number; i++) { 
        let divColumn = document.createElement('div');
        divColumn.classList.add('gridColumn');
        for (let i = 0; i < number; i++){
            let box = document.createElement('div');
            box.classList.add('box'); 
            box.style.height = boxHeight;
            box.style.width = boxWidth;
            divColumn.appendChild(box);
        } 
        container.appendChild(divColumn);
    }
    clickToColor();
    }

//Initial grid size upon page load
createGrid(16);

//Add color to the grid
function colorGrid() {
    this.style.backgroundColor = colorPicker.value;
}

function addColorToGrid() {
    let box = document.querySelectorAll('div.box');
    box.forEach(box => box.addEventListener('mouseenter', colorGrid));
}

function stopColoringGrid() {
    let box = document.querySelectorAll('div.box');
    box.forEach(box => box.removeEventListener('mouseenter', colorGrid));
}

//Toggle pen on and off
function clickToColor() {
    let containerClicks = 0;
    container.onclick = function() {
        containerClicks++;
        console.log(containerClicks);
        if (containerClicks % 2 !== 0) {
            addColorToGrid();
        } else if (containerClicks % 2 === 0) {
            stopColoringGrid();
        } 
    }
}

//Color picker button
const colorPickerSpan = document.getElementById('colorPickerSpan');
const colorPicker = document.getElementById('colorPicker');
colorPickerSpan.addEventListener('mouseenter', () =>
    colorPickerSpan.classList.add('colorPickerSpanHover')
);

colorPickerSpan.addEventListener('mouseleave', () =>
    colorPickerSpan.classList.remove('colorPickerSpanHover')
);

colorPickerSpan.addEventListener('click', () => {
    removeRainbow();
    unEraseGridPixel();
    colorPicker.click();
});

colorPicker.addEventListener('change', () =>
    colorPickerSpan.style.backgroundColor = colorPicker.value
);

//Eraser button 
const eraser = document.getElementById('eraser');
eraser.addEventListener('mouseenter', () => 
    eraser.classList.add('eraserHover')
);

eraser.addEventListener('mouseleave', () => 
    eraser.classList.remove('eraserHover')
);

eraser.addEventListener('click', () => {
    removeRainbow();
    eraseGridPixel();
});

function whiteout() {
    this.style.backgroundColor = 'white';
}

function eraseGridPixel() {
    let box = document.querySelectorAll('div.box');
    box.forEach(box => box.addEventListener('mouseenter', whiteout));
    colorPickerSpan.style.backgroundColor = 'white';
}

function unEraseGridPixel() {
    let box = document.querySelectorAll('div.box');
    box.forEach(box => box.removeEventListener('mouseenter', whiteout));
}

//Rainbow button and rainbow color functionality 
const body = document.querySelector('body');
const h1 = document.querySelector('h1');
const rainbow = document.getElementById('rainbow');
rainbow.addEventListener('mouseenter', () =>
    rainbow.classList.add('rainbowHover')
);

rainbow.addEventListener('mouseleave', () =>
    rainbow.classList.remove('rainbowHover')
);

rainbow.addEventListener('click', addRainbow);

function randomRGB() {
    let r = Math.random, m = Math.round, s = 255;
    let rgb = 'rgb(' + m(r()*s) + ', ' + m(r()*s) + ', ' + m(r()*s) + ')';
    this.style.backgroundColor = rgb;
    body.style.backgroundColor = rgb; //some visual eye-candy
}

function addRainbow() {
    let box = document.querySelectorAll('div.box');
    box.forEach(box => box.addEventListener('mouseenter', randomRGB));
    h1.classList.add('h1Rainbow');
    colorPickerSpan.classList.add('rainbowSpan');
}

function removeRainbow() {
    let box = document.querySelectorAll('div.box');
    box.forEach(box => box.removeEventListener('mouseenter', randomRGB));
    h1.classList.remove('h1Rainbow');
    body.style.backgroundColor = '#E4F0F0';
    colorPickerSpan.classList.remove('rainbowSpan');
}

//Reset button
const buttonReset = document.getElementById('reset');
buttonReset.addEventListener('mouseenter', () => 
    buttonReset.classList.add('resetHover')
);

buttonReset.addEventListener('mouseleave', () => 
    buttonReset.classList.remove('resetHover')
);

buttonReset.addEventListener('click', () => {
    removeRainbow();
    clearGrid(container);
    createGrid(16);
    colorPickerSpan.style.backgroundColor = '#004242';
    colorPicker.value = '#004242';
}
);