

function clearGrid(parent) {
    while(parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}


function createGrid(number) {
    if (typeof Number(number) != 'number') return; //end function if no number is entered
    const container = document.getElementById('container');
    clearGrid(container);
    const boxHeight = String(80/Number(number)) + 'vh';
    const boxWidth = String(80/Number(number)) + 'vw';
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

const box = document.querySelectorAll('div.box');

//add a random rgb color value for each div 'box' upon mouseover
box.forEach(box => box.addEventListener('mouseover', function(e){
    let r = Math.random, m = Math.round, s = 255;
    let rgb = 'rgb(' + m(r()*s) + ', ' + m(r()*s) + ', ' + m(r()*s) + ')';
    box.style.backgroundColor = rgb;
}
))

//reset sketch box to custom size and remove box coloring
const button = document.querySelector('button');
button.addEventListener('click', function(e){
    createGrid(prompt('Choose a number of squares to create a new sketchpad', ));
})