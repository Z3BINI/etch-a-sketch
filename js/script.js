const gridContainer = document.querySelector('div.gridContainer');

function createGrid(size) {

    createGridRows(size);

    function createGridRows(size) {

        for (let i = 1; i <= size; i++) { //Make desired number of rows for the grid

            let divRow = document.createElement('div');

            divRow.classList.add('gridRow');

            gridContainer.appendChild(divRow);

        }

    }
        
    const gridRows = document.querySelectorAll('div.gridRow'); 
    
    gridRows.forEach(gridRow => createGridColumns(gridRow)); //Loop through each earlier made row to make same amount of columns 

    function createGridColumns(gridRow) {

        for (let i = 1; i <= size; i++) {

            let divColumn = document.createElement('div');

            divColumn.classList.add('gridColumn');

            gridRow.appendChild(divColumn);

        }
    }

    const gridSquares = document.querySelectorAll('div.gridColumn');

    paintGridSquares(gridSquares);

}

function paintGridSquares(gridSquares) {
    
    gridSquares.forEach(gridSquare => gridSquare.addEventListener('mouseover', paintSquare));

    function paintSquare(e) {
        
        this.classList.add('hoveredSquare');
        
    }

}



createGrid(9);