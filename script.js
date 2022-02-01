const container = document.getElementById('container');
const box = document.querySelectorAll('div.box');


function clearGrid(parent) {
    while(parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}


function createGrid(number) {
    if (typeof Number(number) != 'number') return; //end function if no number is entered
    clearGrid(container);
    const boxHeight = String(75/Number(number)) + 'vh';
    const boxWidth = String(90/Number(number)) + 'vw';
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
}

//initial grid size upon page load
createGrid(16);


//mouseover color effect
function colorSet(e) {
    e.target.style.backgroundColor = 'black';
}


//select a random rbg color for each square
function randomRGB(e) {
    let r = Math.random, m = Math.round, s = 255;
    let rgb = 'rgb(' + m(r()*s) + ', ' + m(r()*s) + ', ' + m(r()*s) + ')';
    box.style.backgroundColor = rgb;    
}


//add mouseover functionality to the grid
box.forEach(item => {
    item.addEventListener('mouseover', colorSet);
} 
);


//reset sketch box to original size and remove any box styling
const buttonClear = document.getElementById('clear');
buttonClear.addEventListener('click', function(e) {
    clearGrid(container);
    createGrid(16);
}
);

