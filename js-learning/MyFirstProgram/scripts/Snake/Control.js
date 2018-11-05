import SnakeSVGCanvas from "./SnakeSVGCanvas";
import ModelSnake from "./Model";

class ControlSnake {
    constructor() {
        this.svgCanvas = new SnakeSVGCanvas(20);
        this.svgCanvas.prependTo(document.getElementById('MainDiv'));
        this.model = new ModelSnake(20, this.svgCanvas.width(), this.svgCanvas.height());
        this.stepCount = 0;
        this.requestID = null;
        this.isStarted = false;
        this.triggeredEvents = [];
        this.currentKeyEvent = this.right;

        this.initial();
    }

    startGame() {
        const move = () => {
            
            this.changeCurrentEvent();
            this.checkCondition();
            this.currentKeyEvent();
            console.log(this.svgCanvas.snakeHeadPos());
            this.model.updateSnakePos(this.svgCanvas.snakePos());
            this.stepCount += this.model.step;

            this.requestID = window.requestAnimationFrame(move);
        }
        this.requestID = window.requestAnimationFrame(move);
    }

    initial() {
        this.currentKeyEvent = this.right;
        this.svgCanvas.initial(this.model.calApplePos());
        this.svgCanvas.resetApplePos(this.model.calApplePos());
        this.stepCount = 0;
    }

    changeCurrentEvent() {
        if(this.stepCount % 20 === 0 && this.triggeredEvents.length > 0) {
            this.currentKeyEvent = this.triggeredEvents[0];
            this.triggeredEvents.shift();
            this.stepCount = 0;
        }
    }

    appendTriggeredEvent(event) {
        if (this.triggeredEvents.length > 0) {
            const last = this.triggeredEvents.length - 1;
            if(event !== this.triggeredEvents[last]) {
                this.triggeredEvents.push(event);
            }
        } else {
            this.triggeredEvents.push(event);
        }
    }

    stopGame() {
        if(this.requestID !== null) {
            window.cancelAnimationFrame(this.requestID);
        }
    }

    finishGame() {

    }

    toggleGame() {
        if(this.isStarted === true) {
            this.stopGame();
            this.isStarted = false;
        } else {
            this.startGame();
            this.isStarted = true;
        }
    }

    checkCondition() {
        if (this.model.isFail(this.svgCanvas.snakeHeadPos())) {
            alert('fail');
            this.initial();
        }

        if (this.model.isSnakeGetApple(this.svgCanvas.snakeHeadPos())) {
            console.log(this.svgCanvas.snakeHeadPos());
            const applePos = this.model.calApplePos();
            this.svgCanvas.resetApplePos(applePos);
            this.svgCanvas.increaseSnake(20 / this.model.step);
            this.svgCanvas.draw();
        }
    }

    left() {                
        this.svgCanvas.SVGSnakeMove(-this.model.step,0);
    }

    up() {                                
        this.svgCanvas.SVGSnakeMove(0,-this.model.step);
    }

    right() {                        
        this.svgCanvas.SVGSnakeMove(this.model.step,0);
    }

    down() {                                 
        this.svgCanvas.SVGSnakeMove(0,this.model.step);
    }

    bindKeyBoardEvent() {
        const keyBoardEvent = (event) => {
            // if (this.stepCount < 20) return;
            // this.stepCount = 0;

            const key = event.which || event.keyCode;
            switch (key) {
            case 37:
                if(this.currentKeyEvent !== this.right) {
                    //this.currentKeyEvent = this.left;
                    this.appendTriggeredEvent(this.left);
                }
                break;
            case 38:
                if(this.currentKeyEvent !== this.down) {
                    //this.currentKeyEvent = this.up;
                    this.appendTriggeredEvent(this.up);
                }
                break;
            case 39:
                if(this.currentKeyEvent !== this.left) {
                    //this.currentKeyEvent = this.right;
                    this.appendTriggeredEvent(this.right);
                }
                break;
            case 40:
                if(this.currentKeyEvent !== this.up) {
                    //this.currentKeyEvent = this.down;
                    this.appendTriggeredEvent(this.down);
                }
                break;
            case 32: 
            case 229:
                this.toggleGame();
            default:
                break;
            }
        }

        $(document).keydown(keyBoardEvent);
    }
}

const controlSnake = new ControlSnake();
controlSnake.bindKeyBoardEvent();
// controlSnake.startGame();


