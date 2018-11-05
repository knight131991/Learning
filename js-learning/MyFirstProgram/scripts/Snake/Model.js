import { CPoint } from "../object3D";

class ModelSnake {
    constructor(space, fieldW, fieldH) {
        this.numX = 0;
        this.numY = 0;
        this.step = 5;
        this.snakePos = [];
        this.space = space;
        this.fieldW = fieldW;
        this.fieldH = fieldH;
        this.currentDire = null;
        this.applePos = new CPoint(0, 0);

        this.numXandY(fieldW, fieldH);
        this.calApplePos();
    }

    numXandY(fieldW, fieldH) {
        this.numX = fieldW / this.space;
        this.numY = fieldH / this.space;
    }

    calApplePos() {
        const valX = parseInt(Math.random() * this.numX * 100);
        const valY = parseInt(Math.random() * this.numY * 100);
        this.applePos.x = (valX % (this.numX - 1)) * this.space;
        this.applePos.y = (valY % (this.numY - 1)) * this.space;
        console.log('podss', this.applePos.x);
        return this.applePos;
    }

    updateSnakePos (snakeArr) {
        this.snakePos = snakeArr;
    }

    isFail(pos) {
        if(this.isHitBound(pos) 
        ||this.isSelfIntersection()) {
            return true;
        } else {
            return false;
        }

    }

    isHitBound(pos) {
        if(
            pos.x / this.space > this.numX - 1
            || pos.y / this.space > this.numY - 1
            || pos.x < 0
            || pos.y < 0) {
                return true;
        } else {
            return false;
        }
    }

    isSelfIntersection () {
        const snakeHead = this.snakePos[0];
        for(let i = 1; i < this.snakePos.length; i++) {
            if (snakeHead.x === this.snakePos[i].x 
                && snakeHead.y === this.snakePos[i].y) {
                return true;
            }
        }
        return false;
    }

    isSnakeGetApple (snakePos) {
        if (this.applePos.x === snakePos.x 
            && this.applePos.y === snakePos.y) {
                return true;
            } else 
            return false;

        // if (Math.abs(this.applePos.x - snakePos.x) < 20 
        //     && Math.abs(this.applePos.y - snakePos.y) < 20) {
        //         return true;
        //     } else 
        //     return false;
    }
}

export default ModelSnake;
