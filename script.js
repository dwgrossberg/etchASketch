const container = document.getElementById('container');
const buttonClear = document.getElementById('reset');


//Creating and clearing the grid
function clearGrid(parent) {
    while(parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}

function createGrid(number) {
    if (typeof Number(number) != 'number') return; //end function if no number is entered
    clearGrid(container);
    const boxHeight = String(60/Number(number)) + 'vh';
    const boxWidth = String(50/Number(number)) + 'vw';
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


//Set boxPixel color and styles
function colorGrid() {
    this.style.backgroundColor = 'rgb(2, 69, 69)';
}


//select a random rbg color for each square
function randomRGB(e) {
    let r = Math.random, m = Math.round, s = 255;
    let rgb = 'rgb(' + m(r()*s) + ', ' + m(r()*s) + ', ' + m(r()*s) + ')';
    box.style.backgroundColor = rgb;    
}


//Buttons and user input
buttonClear.addEventListener('click', function() {
    clearGrid(container);
    createGrid(16);
}
);

