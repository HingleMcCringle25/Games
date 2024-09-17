const canvas = document.getElementById("canvas");           //Selects HTML canvas element, and assigns it to the canvas variable
const canvasContext = canvas.getContext("2d");              //Retrieves 2D drawing context.The canvasContext object provides methods and properties for drawing shapes, text, images, and more on the canvas.
const pacmanFrames = document.getElementById("animations");  //Selects HTML "animation" element, and assigns it to the pacmanFrames variable
const ghostFrames = document.getElementById("ghosts");      //Same as above, but ghosts
const tileSize = 20;               //Sets each tile size to 20px
const pacmanSize = 20;             //Sets Pacman's size to 20px
const pacmanColor = 'yellow';      //Sets Pacman's color to yellow
let createRect = (x, y, width, height, color) => {   //Defines a function that draws a filled rectangle on the canvas
    canvasContext.fillStyle = color;                 //Sets the fillStyle to a specified color
    canvasContext.fillRect(x, y, width, height);     //Draws the rectangle with the fillRect method
};
let fps = 30;                                            //Sets frame rate to 30
let oneBlockSize = 20;                                   //
let wallColor = "#342DCA";                               //Sets wall colors to shade of blue
let wallSpaceWidth = oneBlockSize / 1.4;                 //Calculates width of wall spaces 
let wallOffset = (oneBlockSize - wallSpaceWidth) / 2;     //Calculates offset for positioning walls correctly
let wallInnerColor = "black";

const DIRECTION_RIGHT = 4;
const DIRECTION_UP = 3;
const DIRECTION_LEFT = 2;
const DIRECTION_BOTTOM = 1;


let map = [
    [1,1,1,1,1 ,1,1,1,1,1 , 1,1,1,1,1, 1,1,1,1,1, 1],
    [1,2,2,2,2 ,2,2,2,2,2 , 1,2,2,2,2, 2,2,2,2,2, 1],
    [1,2,1,1,1 ,2,1,1,1,2 , 1,2,1,1,1, 2,1,1,1,2, 1],
    [1,2,1,1,1 ,2,1,1,1,2 , 1,2,1,1,1, 2,1,1,1,2, 1],
    [1,2,2,2,2 ,2,2,2,2,2 , 2,2,2,2,2, 2,2,2,2,2, 1],
    [1,2,1,1,1 ,2,1,2,1,1 , 1,1,1,2,1, 2,1,1,1,2, 1],
    [1,2,2,2,2 ,2,1,2,2,2 , 1,2,2,2,1, 2,2,2,2,2, 1],
    [1,1,1,1,1 ,2,1,1,1,2 , 1,2,1,1,1, 2,1,1,1,1, 1],
    [2,2,2,2,1 ,2,1,2,2,2 , 2,2,2,2,1, 2,1,2,2,2, 2],
    [1,1,1,1,1 ,2,1,2,1,1 , 2,1,1,2,1, 2,1,1,1,1, 1],
    [2,2,2,2,2 ,2,2,2,1,2 , 2,2,1,2,2, 2,2,2,2,2, 2],
    [1,1,1,1,1 ,2,1,2,1,2 , 2,2,1,2,1, 2,1,1,1,1, 1],
    [2,2,2,2,1 ,2,1,2,1,1 , 1,1,1,2,1, 2,1,2,2,2, 2],
    [2,2,2,2,1 ,2,1,2,2,2 , 2,2,2,2,1, 2,1,2,2,2, 2],
    [1,1,1,1,1 ,2,1,2,1,1 , 1,1,1,2,1, 2,1,1,1,1, 1],
    [1,2,2,2,2 ,2,2,2,2,2 , 1,2,2,2,2, 2,2,2,2,2, 1],
    [1,2,1,1,1 ,2,1,1,1,2 , 1,2,1,1,1, 2,1,1,1,2, 1],
    [1,2,2,2,2 ,2,2,2,2,2 , 1,2,2,2,2, 2,2,2,2,2, 1],
    [1,2,1,1,1 ,2,1,1,1,2 , 1,2,1,1,1, 2,1,1,1,2, 1],
    [1,2,2,2,1 ,2,2,2,2,2 , 2,2,2,2,2, 2,1,2,2,2, 1],
    [1,1,1,2,1 ,2,1,2,1,1 , 1,1,1,2,1, 2,1,2,1,1, 1],
    [1,2,2,2,2 ,2,1,2,2,2 , 1,2,2,2,1, 2,2,2,2,2, 1],
    [1,2,1,1,1 ,1,1,1,1,2 , 1,2,1,1,1, 1,1,1,1,2, 1],
    [1,2,2,2,2 ,2,2,2,2,2 , 2,2,2,2,2, 2,2,2,2,2, 1],
    [1,1,1,1,1 ,1,1,1,1,1 , 1,1,1,1,1, 1,1,1,1,1, 1],
];

let gameLoop = () => {          //This function is repeatedly called at a regular interval (set by setInterval).
    update()                    //Handles game state changes
    draw()                      //Renders the game screen
}

let update = () => {            //Logic for updating the game state
    // todo
    pacman.moveProcess()
}

let draw = () => {              //Renders the game to the screen
    createRect(0, 0, canvas.width, canvas.height, "black");    //Draws a black recetangle
    // todo 
    drawWalls();
    pacman.draw();
}

let gameInterval = setInterval(gameLoop, 1000/fps)   //Sets refresh rate to ~33 milliseconds

let drawWalls= () => {                              //Loops through the map array to draw walls on the canvas
    for(let i = 0; i < map.length; i++) {           //Iterates over each row
        for(let j = 0; j < map[0].length; j++) {    //Iterates over each column in the current row
            if(map[i][j] == 1) {                    //Checks if current tile is a wall
                createRect(                         //Draws a rectangle on the canvas where the map value is 1
                    j * oneBlockSize,               //Rectangle's x coordinates are j * oneBlockSize
                    i * oneBlockSize,               //Rectangle's y coordinates are i * oneBlockSize
                    oneBlockSize,                   //Width of oneBlockSize
                    oneBlockSize,                   //Height of oneBlockSize
                    wallColor                       //Colored
                );
                if (j > 0 && map[i][j - 1] == 1) {
                    createRect(
                        j * oneBlockSize,
                        i * oneBlockSize + wallOffset,
                        wallSpaceWidth + wallOffset,
                        wallSpaceWidth,
                        wallInnerColor
                    );
                };
                if ( j < map[0].length - 1 && map[i][j + 1] == 1) {
                    createRect(
                        j * oneBlockSize + wallOffset,
                        i * oneBlockSize + wallOffset,
                        wallSpaceWidth + wallOffset,
                        wallSpaceWidth,
                        wallInnerColor
                    );
                };
                if (i > 0 && map[i - 1][j] == 1) {
                    createRect(
                        j * oneBlockSize + wallOffset,
                        i * oneBlockSize,
                        wallSpaceWidth,
                        wallSpaceWidth + wallOffset,
                        wallInnerColor
                    );
                };
                if (i < map.length - 1 && map[i + 1][j] == 1) {
                    createRect(
                        j * oneBlockSize + wallOffset,
                        i * oneBlockSize + wallOffset,
                        wallSpaceWidth,
                        wallSpaceWidth + wallOffset,
                        wallInnerColor
                    );
                };
            }
        }
    }
};

let createNewPacman = () => {
    pacman = new Pacman(
        oneBlockSize,
        oneBlockSize,
        oneBlockSize,
        oneBlockSize,
        oneBlockSize / 5
    )
}

createNewPacman();
gameLoop();