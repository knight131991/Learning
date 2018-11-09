/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CPoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CVector; });
class CPoint {
    constructor(x = 0, y = 0, z = 0) {
        this._x = x;
        this._y = y;
        this._z = z;
    }

    get x() { return this._x;}

    get y() { return this._y;}

    get z() { return this._z;}

    set x(val) {this._x = val;}

    set y(val) {this._y = val;}

    set z(val) {this._z = val;}

}

class CVector {
    constructor (x = 0, y = 0, z = 0) {
        this._x = x;
        this._y = y;
        this._z = z;
    }

    length() {
        return Math.sqrt((this._x * this._x) + (this._y * this._y) + (this._z * this._z));
    }

    set x(value) { this._x = value; }

    set y(value) { this._y = value; }

    set z(value) { this._z = value; }

    get x() { return this._x; }

    get y() { return this._y; }

    get z() { return this._z; }
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _object3D__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);


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
        this.applePos = new _object3D__WEBPACK_IMPORTED_MODULE_0__[/* CPoint */ "a"](0, 0);

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
    }
}

/* harmony default export */ __webpack_exports__["default"] = (ModelSnake);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./scripts/object3D.js
var object3D = __webpack_require__(0);

// CONCATENATED MODULE: ./scripts/SVGCanvas_temp.js


    class SVGCanvas_temp_SVGCanvas{
        constructor(){
            this._elem = document.createElementNS("http://www.w3.org/2000/svg",'svg');
            this._elem.classList.add('SVGCanvas');
            this._$elem = $(this._elem);
            this._items = [];
            this.bindMouseEvent();
        }

        draw() {
            this._items.forEach((item)=> {
                item.drawTo(this._elem);
            })
        }

        addItem(item) {
            this._items.push(item);
        }

        clearAllItems() {
            this._items = [];
            this._$elem.empty();
        }

        bindMouseEvent() {
            let mousedownPos;
            
            const mousedownEven = (e) => {
                mousedownPos = new object3D["a" /* CPoint */](e.clientX, e.clientY);
                const circle = new SVGMeasureLine(mousedownPos.x, mousedownPos.y);
                this.addItem(circle);
                this.draw();
            }

            const mousemoveEvent = (e) => {
                const moveVec = new object3D["b" /* CVector */](e.clientX - mousedownPos.x, e.clientY - mousedownPos.y);
                this._items[this._items.length -1 ].resetGeometry(moveVec);
            }

            this._$elem.mousedown((e) => {
                mousedownEven(e);
                this._$elem.mousemove(mousemoveEvent);
            });


            this._$elem.mouseup((e) => {
                this._$elem.unbind('mousemove', mousemoveEvent);
            })

        }

        appendTo(elem) {
            this._$elem.appendTo(elem);
        }
    }

    class SVGObject{
        constructor() {
            this._elem = null;
        }

        drawTo(elem) {}

        resetGeometry(vec) {}
    }

    class SVGCircle extends SVGObject{
        constructor(cx = 0, cy = 0, r = 5, colorStr = 'red') {
            super();
            this._cx = cx;
            this._cy = cy;
            this._r = r;
            this._colorStr = colorStr;
            this._elem = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            this._elem.setAttribute("cx", `${cx}px`);
            this._elem.setAttribute("cy", `${cy}px`);
            this._elem.setAttribute("r", `${r}px`);
            this._elem.setAttribute("fill", colorStr);
            this._$elem = $(this._elem);
        }

        get elem() { return this._elem; }

        get $elem() { return this._$elem; }

        get cx() { return this._cx; }

        get cy() { return this._cy; }

        set cx(val) { 
            this._cx = val; 
            this._elem.setAttribute("cx", `${this._cx}px`);
        }

        set cy(val) {
            this._cy = val;
            this._elem.setAttribute("cy", `${this._cy}px`);}

        resetGeometry(vec) {
            this._r = (vec.length());
            this._elem.setAttribute("r", `${this._r}px`);
        }

        drawTo(elem) {
            this._$elem.appendTo(elem);
        }

    }

    class SVGCanvas_temp_SVGRect extends SVGObject{
        constructor(x = 0, y = 0, width = 5, height = 5, colorStr = 'blue') {
            super();
            this._x = x;
            this._y = y;
            this._width = width;
            this._height = height;
            this._colorStr = colorStr;
            this._elem = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            this._elem.setAttribute("x", `${x}px`);
            this._elem.setAttribute("y", `${y}px`);
            this._elem.setAttribute("width", `${width}px`);
            this._elem.setAttribute("height", `${height}px`);
            this._elem.setAttribute("fill", colorStr);
            this._$elem = $(this._elem);
        }

        get elem() { return this._elem; }

        get $elem() { return this._$elem; }

        get x() { return this._x; }

        get y() { return this._y; }

        set x(val) { this._x = val; }

        set y(val) { this._y = val; }

        getPos() {
            return new object3D["a" /* CPoint */](this._x, this._y);
        }

        resetPos(pos) {
            this._x = pos.x;
            this._y = pos.y;
            this._elem.setAttribute("x", `${pos.x}px`);
            this._elem.setAttribute("y", `${pos.y}px`);
        }

        resetGeometry(vec) {
            this._width = (vec.x);
            this._height = (vec.y);
            this._elem.setAttribute("width", `${this._width}px`);
            this._elem.setAttribute("height", `${this._height}px`);
        }

        drawTo(elem) {
            this._$elem.appendTo(elem);
        }
    }

    class SVGLine extends SVGObject{
        constructor(x1 = 0, y1 = 0, width = 1, colorStr = 'blue') {
            super();
            this._x1 = x1;
            this._x2 = x1;
            this._y1 = y1;
            this._y2 = y1;
            this._colorStr = colorStr;
            this._elem = document.createElementNS("http://www.w3.org/2000/svg", "line");
            this._elem.setAttribute("x1", `${x1}px`);
            this._elem.setAttribute("y1", `${y1}px`);
            this._elem.setAttribute("x2", `${x1}px`);
            this._elem.setAttribute("y2", `${y1}px`);
            this._elem.setAttribute("stroke-width", `${width}px`);
            this._elem.setAttribute("stroke", colorStr);
            this._$elem = $(this._elem);
        }

        get elem() { return this._elem; }

        get $elem() { return this._$elem; }

        get x1() { return this._x1; }

        get y1() { return this._y1; }

        get x2() { return this._x2; }

        get y2() { return this._y2; }

        set x2(val) {
            this._x2 = val;
            this._elem.setAttribute("x2", `${this._x2}px`);
        }
        
        set y2(val) {
            this._y2 = val;
            this._elem.setAttribute("y2", `${this._y2}px`);}

        resetGeometry(vec) {
            this._x2 = vec.x + this._x1;
            this._y2 = vec.y + this._y1;
            this._elem.setAttribute("x2", `${this._x2}px`);
            this._elem.setAttribute("y2", `${this._y2}px`);
        }

        drawTo(elem) {
            this._$elem.appendTo(elem);
        }
    }

    class SVGMeasureLine extends SVGObject{
        constructor(x1 = 0, y1 = 0, circleR = 5, width = 1, colorStr = 'blue') {
            super();
            this.StartCircle = new SVGCircle(x1, y1, circleR, colorStr);
            this.EndCircle = new SVGCircle(x1, y1, circleR, colorStr);
            this.line = new SVGLine(x1, y1, width, colorStr);
            this._elem = [];
            this._$elem = [];
            this._elem.push(this.StartCircle.elem);
            this._elem.push(this.line.elem);            
            this._elem.push(this.EndCircle.elem);            
            this._$elem.push(this.StartCircle.$elem);
            this._$elem.push(this.line.$elem);
            this._$elem.push(this.EndCircle.$elem);
        }

        get elem() { return this._elem; }

        resetGeometry(vec) {
            this.line.x2 = vec.x + this.line.x1;
            this.line.y2 = vec.y + this.line.y1;
            this.EndCircle.cx = vec.x + this.StartCircle.cx;
            this.EndCircle.cy = vec.y + this.StartCircle.cy;
        }

        drawTo(elem) {
            this._$elem.forEach((item) => {
                item.appendTo(elem);
            })
        }
    }

/* harmony default export */ var SVGCanvas_temp = (SVGCanvas_temp_SVGCanvas);


// CONCATENATED MODULE: ./scripts/Snake/SnakeSVGCanvas.js



class SnakeSVGCanvas_SnakeSVGCanvas extends SVGCanvas_temp {
    constructor(unitSize) {
        super();
        this.unitSize = unitSize;
        this.snake = new SnakeSVGCanvas_SVGSnake(20, 20, unitSize);
        this.apple = new SVGCanvas_temp_SVGRect(60, 60, unitSize, unitSize, 'blueviolet');
        this._items.push(this.snake);
        this._items.push(this.apple);
        this.draw();
    }

    prependTo(elem) {
        this._$elem.prependTo(elem);
    }

    initial(applePos) {
        this.snake.startRect.x = 20;
        this.snake.startRect.y = 20;
        for(let i = 5; i < this.snake._units.length; i += 1) {
            delete this.snake._units[i];
        }
        this.snake._units.length = 5;
        this.apple.resetPos(applePos);

        this.clearAllItems();
        this._items.push(this.snake);
        this._items.push(this.apple);
        this.draw();
    }

    SVGSnakeMove(x, y) {
        this.snake.move(x, y);
    }

    snakeHeadPos() {
        return this.snake.firstElemPos();
    }

    snakePos() {
        return this.snake.allElemPos();
    }

    resetApplePos(pos) {
        this.apple.resetPos(pos);
    }

    increaseSnake(time) {
        for(let i = 0; i < time; i += 1) {
            this.snake.addUnit();
        }
    }

    width() {
        return this._$elem.width();
    }

    height() {
        return this._$elem.height();
    }
    
    bindMouseEvent() {}

}

class SnakeSVGCanvas_SVGSnake extends SVGObject {
    constructor(x = 0, y = 0, space = 5, colorStr = 'blue') {
        super();
        this.startRect = new SVGCanvas_temp_SVGRect(x, y, space, space, colorStr);
        this.space = space;
        this._units = [];
        this._units.push(this.startRect); 
        this._units.push(new SVGCanvas_temp_SVGRect(x - space, y, space, space, colorStr));
        this._units.push(new SVGCanvas_temp_SVGRect(x - space, y, space, space, colorStr));
        this._units.push(new SVGCanvas_temp_SVGRect(x - space, y, space, space, colorStr));
        this._units.push(new SVGCanvas_temp_SVGRect(x - space, y, space, space, colorStr));

    }

    move(x, y) {
        for(let i = this._units.length - 1; i > 0; i -= 1) {
            const previous = i - 1;
            //console.log('possss', this._units[previous].getPos());
            this._units[i].resetPos(this._units[previous].getPos());
        }

        const posX = this.startRect.x + x;
        const posY = this.startRect.y + y;
        this.startRect.resetPos(new object3D["a" /* CPoint */](posX, posY));
    }

    addUnit() {
        const space = this.space;
        const lastUnit = this._units[this._units.length - 1];
        const unitX = parseInt(lastUnit.x / space, 10) * space;
        const unitY = parseInt(lastUnit.y / space, 10) * space;
        const unit = new SVGCanvas_temp_SVGRect(unitX, unitY, space, space);
        this._units.push(unit);
    }

    drawTo(elem) {
        this._units.forEach((item) => {
            item.$elem.appendTo(elem);
        })
    }

    firstElemPos() {
        return new object3D["a" /* CPoint */](this.startRect.x, this.startRect.y);
    }

    allElemPos() {
        const result = this._units.map(element => element.getPos());
        return result;
    }
}

/* harmony default export */ var Snake_SnakeSVGCanvas = __webpack_exports__["default"] = (SnakeSVGCanvas_SnakeSVGCanvas);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);
__webpack_require__(1);
module.exports = __webpack_require__(4);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SnakeSVGCanvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _Model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);



class ControlSnake {
    constructor() {
        this.svgCanvas = new _SnakeSVGCanvas__WEBPACK_IMPORTED_MODULE_0__["default"](20);
        this.svgCanvas.prependTo(document.getElementById('MainDiv'));
        this.model = new _Model__WEBPACK_IMPORTED_MODULE_1__["default"](20, this.svgCanvas.width(), this.svgCanvas.height());
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




/***/ })
/******/ ]);