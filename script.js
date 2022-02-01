

function createGrid(number) {
    const container = document.getElementById('container');
    const boxHeight = String(600/number) + 'px';
    const boxWidth = String(600/number) + 'px';
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

createGrid(16);

const box = document.querySelectorAll('div.box');
box.forEach(box => box.addEventListener('mouseover', function(e){
    let r = Math.random, m = Math.round, s = 255;
    let rgb = 'rgb(' + m(r()*s) + ', ' + m(r()*s) + ', ' + m(r()*s) + ')';
    box.style.backgroundColor = rgb;
}
))
    
