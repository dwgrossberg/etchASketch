//Clearing the grid
function clearGrid(parent) {
    while(parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}

//Creating the grid
const container = document.getElementById('container');
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
    let boxPixel = document.querySelectorAll('div.box');
    boxPixel.forEach(boxPixel => boxPixel.addEventListener('mouseenter', colorGrid));
}

//Initial grid size upon page load
createGrid(16);

//Color picker button
const colorPickerSpan = document.getElementById('colorPickerSpan');
const colorPicker = document.getElementById('colorPicker');
function colorGrid() {
    this.style.backgroundColor = colorPicker.value;
}

colorPickerSpan.addEventListener('mouseenter', () =>
    colorPickerSpan.classList.add('colorPickerSpanHover')
);

colorPickerSpan.addEventListener('mouseleave', () =>
    colorPickerSpan.classList.remove('colorPickerSpanHover')
);

colorPickerSpan.addEventListener('click', () => {
    colorPicker.click();
});

colorPicker.addEventListener('change', () =>
    colorPickerSpan.style.backgroundColor = colorPicker.value
);

//Rainbow button
const rainbow = document.getElementById('rainbow');
rainbow.addEventListener('click', addRainbow);
function addRainbow() {
    let box = document.querySelectorAll('div.box');
    box.forEach(box => box.addEventListener('mouseenter', () => {
        let r = Math.random, m = Math.round, s = 255;
        let rgb = 'rgb(' + m(r()*s) + ', ' + m(r()*s) + ', ' + m(r()*s) + ')';
        box.style.backgroundColor = rgb;
    }));
}

function removeRainbow() {

}

//Reset button
const buttonReset = document.getElementById('reset');
buttonReset.addEventListener('click', () => {
    clearGrid(container);
    createGrid(16);
    colorPickerSpan.style.backgroundColor = '#004242';
    colorPicker.value = '#004242';
}
);