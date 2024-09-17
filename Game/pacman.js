class Pacman {
    //Constructor method that initializes an instance of the pacman class
    //Takes x, y, width, height, and speed as parameters
    constructor(x, y, width, height, speed) {
        this.x = x   //Sets pacmans x positon
        this.y = y   //Sets pacmans y position
        this.width = width   //Sets width of pacman
        this.height = height  //Sets height of pacman
        this.speed = speed;   //Set's pacmans speed
        this.direction = DIRECTION_RIGHT;   //initializes direction that pacman faces
        this.currentFrame = 1;   //Initializes the current frame animation
        this.frameCount = 7;     //Sets the total number of animation frames

        //Sets a timer to call the changeAnimation method every 100 milliseconds
        setInterval(() => {
            this.changeAnimation();
        }, 100);
    }


    moveProcess() {
        this.changeDirectionIfPossible();
        this.moveForwards();                  //Moves pacman forward in the current direction
        if(this.checkCollision()) {           //Checks for collisions
            this.moveBackwards();            //If a collision is detected, move pacman backwards
        }
    }
    
    eat() {

    }

    moveBackwards() {               //Moves pacman backwards based on it's current direction
        switch(this.direction) {    //Switch/case to handle different directions
            case DIRECTION_RIGHT:    //if facing right, decrease the x position by the speed
                this.x -= this.speed
                break;
            case DIRECTION_UP:       //if facing up, increase the y position by the speed
                this.y += this.speed
                break;
            case DIRECTION_LEFT:       //if facing left, increase the x position by the speed
                this.x += this.speed
                break;
            case DIRECTION_BOTTOM:     //If facing down, decrease the y position
                this.y -= this.speed
                break;
        }
    }
    
    moveForwards() {                //Moves pacman forward based on current direction
        switch(this.direction) {    //switch/case to handle movement in the opposite direction as above
            case DIRECTION_RIGHT:   //If facing right, increase x positon by speed
                this.x += this.speed
                break;
            case DIRECTION_UP:       //If facing up, decrease the y position by speed
                this.y -= this.speed
                break;
            case DIRECTION_LEFT:     //If facing left, decreasing x position by speed
                this.x -= this.speed
                break;
            case DIRECTION_BOTTOM:   //If facing down, increase y position by speed
                this.y += this.speed
                break;
        }
    }

    //Determine if pacman has collided with an obstacle on the map
    checkCollision() {
        let isCollided = false     //Initialize a variable to keep track of collision status
        //check if any of the map tiles around pacman contain the value of 1
        if (
            map[this.getMapY()][this.getMapX()] == 1||  //checks tile in front of pacman
            map[this.getMapYRightSide()][this.getMapX()] == 1 ||  //checks tile to the right of pacman
            map[this.getMapY()][this.getMapXRightSide()] == 1 ||  //checks tile below pacman
            map[this.getMapYRightSide()][this.getMapYRightSide()] == 1
        ) {
            return true;
        }
        return false;
    }

    checkGhostCollision() {

    }

    changeDirectionIfPossible() {

    }

    changeAnimation() {
        this.currentFrame = this.currentFrame == this.frameCount ? 1 : this.currentFrame + 1;
    }

    draw() {
        canvasContext.save()
        canvasContext.translate(this.x + oneBlockSize / 2, this.y + oneBlockSize / 2);
        canvasContext.rotate((this.direction = 90 * Math.PI) / 180);
        canvasContext.translate(-this.x - oneBlockSize / 2, -this.y - oneBlockSize / 2);
        canvasContext.drawImage(
            pacmanFrames,
            (this.currentFrame - 1) * oneBlockSize,
            0, oneBlockSize, oneBlockSize,
            this.x, this.y, this.width, this.height);
        canvasContext.restore();
    }

    getMapX() {
        return parseInt(this.x / oneBlockSize)
    }

    getMapY() {
        return parseInt(this.y / oneBlockSize)
    }

    getMapXRightSide() {
        return parseInt((this.x + 0.9999 * oneBlockSize) / oneBlockSize)
    }

    getMapYRightSide() {
        return parseInt((this.y + 0.9999 * oneBlockSize) / oneBlockSize)
    }
}