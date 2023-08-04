const gridContainer = document.querySelector('div.gridContainer');

function createGrid(size) {

    for (let i = 1; i <= (size ** 2); i++) {

        let div = document.createElement('div');

        div.classList.add('gridSquare');

        gridContainer.appendChild(div);
        
    }

}

createGrid(2);