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

    function createGridRows(size) {

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

        const squareStatus = (currentSquare) => currentSquare.currentTarget.style.cssText; //Check current in-line CSS
        
        switch (currentColor) {

            case 'black':

                if ((!(squareStatus(event)) || (squareStatus(event).includes('white')) || (squareStatus(event).includes('rgb') && !(squareStatus(event).includes('rgba(0, 0, 0') || squareStatus(event).includes('rgb(0, 0, 0)'))))) { //Checks if square has not been painted at least once by any other color

                    event.currentTarget.style.cssText = `background-color: rgb(0, 0, 0, 0.1);`; //If not then 'initialize' the painting with 0.1 alpha
                    
                } else { 
                    
                    if (squareStatus(event).includes('rgba')) { //If it has alpha defined then make darker

                        let currentOpacity = +(event.currentTarget.style.cssText.split(',')[3].slice(0, 4)); //If alpha is still not 1 (disapeared by default when reaches 1) it will get the current alpha and convert to int

                        event.currentTarget.style.cssText = `background-color: rgb(0, 0, 0, ${currentOpacity += 0.1});`; 
                        
                    }

                }

                break;

            case 'white':

                event.currentTarget.style.cssText = 'background-color: white;';

                break;

            case 'rgb':

                const randomizeRGB = () => Math.floor(Math.random() * 255);

                event.currentTarget.style.cssText = `background-color: rgb(${randomizeRGB()}, ${randomizeRGB()}, ${randomizeRGB()});`;

                break;

        }
        
    }

}