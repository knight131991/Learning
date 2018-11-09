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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./scripts/object3D.js
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
// CONCATENATED MODULE: ./scripts/SVGCanvas_temp.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SVGObject", function() { return SVGObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SVGCircle", function() { return SVGCircle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SVGRect", function() { return SVGCanvas_temp_SVGRect; });


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
                mousedownPos = new CPoint(e.clientX, e.clientY);
                const circle = new SVGMeasureLine(mousedownPos.x, mousedownPos.y);
                this.addItem(circle);
                this.draw();
            }

            const mousemoveEvent = (e) => {
                const moveVec = new CVector(e.clientX - mousedownPos.x, e.clientY - mousedownPos.y);
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
            return new CPoint(this._x, this._y);
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

/* harmony default export */ var SVGCanvas_temp = __webpack_exports__["default"] = (SVGCanvas_temp_SVGCanvas);



/***/ })
/******/ ]);