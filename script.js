//Creating the grid
const container = document.getElementById('container');
const pixel = [];
container.style.cursor = 'crosshair';
function createGrid(number) {
    if (typeof Number(number) != 'number') return; //end function if no number is entered
    clearGrid(container);
    const boxHeight = String(450/Number(number)) + 'px';
    const boxWidth = String(450/Number(number)) + 'px';
    for (let i = 0; i < number; i++) { 
        let divColumn = document.createElement('div');
        divColumn.classList.add('gridColumn');
        for (let i = 0; i < number; i++){
            pixel[i] = document.createElement('div');
            pixel[i].classList.add('box');
            pixel[i].style.height = boxHeight;
            pixel[i].style.width = boxWidth;
            pixel[i].dataset.shade = 0; //set shade increment counter to zero 
            divColumn.appendChild(pixel[i]);
        } 
        container.appendChild(divColumn);
    }
    clickToColor();
    }

//Clearing the grid
function clearGrid(parent) {
    while(parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}

//Initial grid size upon page load
createGrid(16);

//Add color to the grid
const shade = document.getElementById('shade');
function colorGrid(e) {
    this.style.backgroundColor = colorPicker.value;
    if (!shade.checked) {
        e.target.dataset.shade = 0; //reset number of steps to reach full opacity
        this.style.opacity = 1;
    } else if (shade.checked) {
        let oldOpacity = Number(this.style.opacity);
        let currentShadeStep = e.target.dataset.shade;
        currentShadeStep ++;
        let newShade = getNewOpacityValue(oldOpacity, currentShadeStep);
        e.target.dataset.shade = currentShadeStep;
        return (this.style.opacity = newShade);
    }
}

function addColorToGrid() {
    let box = document.querySelectorAll('div.box');
    box.forEach(box => box.addEventListener('mouseup', colorGrid));
    box.forEach(box => box.addEventListener('mouseenter', colorGrid));
}

function stopColoringGrid() {
    let box = document.querySelectorAll('div.box');
    box.forEach(box => box.removeEventListener('mouseup', colorGrid));
    box.forEach(box => box.removeEventListener('mouseenter', colorGrid));
}

//Incremental shading
function getNewOpacityValue(oldOpacity, currentShadeStep) {
    if (currentShadeStep === 10) return;
    else if (currentShadeStep < 10) {
        let newOpacity = currentShadeStep / 10;
        return (String(newOpacity));
    }
}

//Toggle default pen on and off
function clickToColor() {
    let containerClicks = 0;
    container.onmousedown = function() {
        containerClicks++;
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
    clickToColor();
    colorPicker.click();
});

function addHoverClass() {
    
}

colorPicker.addEventListener('change', () =>
    colorPickerSpan.style.backgroundColor = colorPicker.value
);

//Rainbow button and rainbow color functionality (Random RBG)
const body = document.querySelector('body');
const h1 = document.querySelector('h1');
const rainbow = document.getElementById('rainbow');
rainbow.addEventListener('mouseenter', () =>
    rainbow.classList.add('rainbowHover')
);

rainbow.addEventListener('mouseleave', () =>
    rainbow.classList.remove('rainbowHover')
);

rainbow.addEventListener('click', clickToRainbow);

function randomRGB(e) {
    let r = Math.random, m = Math.round, s = 255;
    let rgb = 'rgb(' + m(r()*s) + ', ' + m(r()*s) + ', ' + m(r()*s) + ')';
    this.style.backgroundColor = rgb;
    if (!shade.checked) {
    e.target.dataset.shade = 0; //reset number of shade steps to 0
    this.style.opacity = 1;
    } else if (shade.checked) {
        let oldOpacity = Number(this.style.opacity);
        let currentShadeStep = e.target.dataset.shade;
        currentShadeStep++;
        let newShade = getNewOpacityValue(oldOpacity, currentShadeStep);
        e.target.dataset.shade = currentShadeStep;
        return (this.style.opacity = newShade);
        }
}

function addRainbow() {
    let box = document.querySelectorAll('div.box');
    box.forEach(box => box.addEventListener('mouseup', randomRGB));
    box.forEach(box => box.addEventListener('mouseenter', randomRGB));
}

function removeRainbow() {
    let box = document.querySelectorAll('div.box');
    box.forEach(box => box.removeEventListener('mouseenter', randomRGB));
    h1.classList.remove('h1Rainbow');
    body.style.backgroundColor = '#E4F0F0';
    colorPickerSpan.classList.remove('rainbowSpan');
}

//Toggle rainbow pen on and off
function clickToRainbow() {
    h1.classList.add('h1Rainbow');
    colorPickerSpan.classList.add('rainbowSpan');
    let containerClicks = 0;
    container.onmousedown = function() {
        containerClicks++;
        if (containerClicks % 2 !== 0) {
            if (h1.value != 'h1Rainbow') {
                h1.classList.add('h1Rainbow');
            }
            if (colorPickerSpan.value != 'rainbowSpan') {
                colorPickerSpan.classList.add('rainbowSpan');
            }
            addRainbow();
        } else if (containerClicks % 2 === 0) {
            let box = document.querySelectorAll('div.box');
            box.forEach(box => box.removeEventListener('mouseup', randomRGB));  //set these event listeners here so as not to effect 
            box.forEach(box => box.removeEventListener('mouseenter', randomRGB)); //the rainbow css styling while still in rainbow mode
        } 
    }
}

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
    clickToErase();
    shade.checked = false;
});

function whiteout(e) {
    this.style.backgroundColor = 'white';
    e.target.dataset.shade = 0;
    this.style.opacity = 1;
    shade.checked = false;
}

function eraseGridPixel() {
    let box = document.querySelectorAll('div.box');
    box.forEach(box => box.addEventListener('mouseup', whiteout));
    box.forEach(box => box.addEventListener('mouseenter', whiteout));
    colorPickerSpan.style.backgroundColor = 'white';
}

function unEraseGridPixel() {
    let box = document.querySelectorAll('div.box');
    box.forEach(box => box.removeEventListener('mouseup', whiteout));
    box.forEach(box => box.removeEventListener('mouseenter', whiteout));
}

//Toggle eraser on and off
function clickToErase() {
    colorPickerSpan.style.backgroundColor = 'white';
    let containerClicks = 0;
    container.onmousedown = function() {
        containerClicks++;
        if (containerClicks % 2 !== 0) {
            if (colorPickerSpan.vale != 'white') {
                colorPickerSpan.style.backgroundColor = 'white';
            }
            eraseGridPixel();
        } else if (containerClicks % 2 === 0) {
            unEraseGridPixel();
        } 
    }
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
    gridSize.value = 50; //resets the gridValue thumb to midway after hitting reset
    shade.checked = false;
    colorPickerSpan.style.backgroundColor = '#004242';
    colorPicker.value = '#004242';
}
);

//Grid resize button & footer
const gridSize = document.getElementById('gridSize');
gridSize.addEventListener('change', () => {
    let size = gridSize.value;
    removeRainbow();
    unEraseGridPixel();
    colorPickerSpan.style.backgroundColor = colorPicker.value;
    shade.checked = false;
    createGrid(size);
    }
)
