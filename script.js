

function createGrid(number) {
    const container = document.getElementById('container'); 
    for (let i = 0; i < number; i++) { 
        let divColumn = document.createElement('div');
        divColumn.classList.add('gridColumn');
        for (let i = 0; i < number; i++){
            let box = document.createElement('div');
            box.classList.add('box');
            divColumn.appendChild(box);
  } 
        container.appendChild(divColumn);
}
}

console.log(createGrid(16));