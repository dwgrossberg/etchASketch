

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

console.log(createGrid(10));