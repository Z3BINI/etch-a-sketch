const gridContainer = document.querySelector('div.gridContainer');

const slider = document.querySelector("input.slider");
const currentGridSize = document.querySelector("span.currentGridSize");

const colorOptions = document.querySelectorAll('input[name="color"]');

let currentColor = 'black'; //Initialize color ouside so that it doesn't get overwritten within the functions below

currentGridSize.innerHTML = slider.value; //Initialize the span with default slider value

createGrid(+(slider.value)); //Initialize the grid with the default slider value before the slider value ever modifying

slider.oninput = function() { //Called everytime slider value changes

    currentGridSize.innerHTML = this.value; 

    clearGrid(); //To avoid div accomulation

    createGrid(+(this.value));

}

const clearGrid = () => gridContainer.innerHTML = ''; 

function createGrid(size) { 

    createGridRows(size);

    function createGridRows(size) {console.log(currentColor);

        for (let i = 1; i <= size; i++) { //Make desired number of rows for the grid

            let divRow = document.createElement('div');

            divRow.classList.add('gridRow');

            gridContainer.appendChild(divRow);

        }

    }
        
    const gridRows = document.querySelectorAll('div.gridRow'); 
    
    gridRows.forEach(gridRow => createGridColumns(gridRow)); //Loop through each earlier made row to make same amount of columns with createGridColumns()

    function createGridColumns(gridRow) {

        for (let i = 1; i <= size; i++) {

            let divColumn = document.createElement('div');

            divColumn.classList.add('gridColumn');

            gridRow.appendChild(divColumn);

        }
    }

    const gridSquares = document.querySelectorAll('div.gridColumn');

    paintGridSquares(gridSquares, colorOptions);

}

function paintGridSquares(gridSquares, colorOptions) { 

    colorOptions.forEach(colorOption => colorOption.addEventListener('click', event => changeCurrentColor(event)));
    
    gridSquares.forEach(gridSquare => gridSquare.addEventListener('mouseover', event => paintSquare(event, currentColor)));

    function changeCurrentColor(event) {
        currentColor = event.currentTarget.value;
    }

    function paintSquare(event, currentColor) {

        switch (currentColor) {
            case 'black':
                event.currentTarget.classList.add('hoveredSquareBlack');

                event.currentTarget.classList.remove('hoveredSquareErase');
                event.currentTarget.classList.remove('hoveredSquareRGB');
                break;
            case 'white':
                event.currentTarget.classList.add('hoveredSquareErase');

                event.currentTarget.classList.remove('hoveredSquareBlack');
                event.currentTarget.classList.remove('hoveredSquareRGB');
                break;
            case 'rgb':
                event.currentTarget.classList.add('hoveredSquareRGB');

                event.currentTarget.classList.remove('hoveredSquareErase');
                event.currentTarget.classList.remove('hoveredSquareBlack');
                break;
            default:
                event.currentTarget.classList.add('hoveredSquareBlack');

                event.currentTarget.classList.remove('hoveredSquareErase');
                event.currentTarget.classList.remove('hoveredSquareRGB');
                break;
        }
        
    }

}