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
// CONCATENATED MODULE: ./scripts/MainFrame.js


class JButtonCreator{
    constructor(name, className){
        this._$button = jQuery('<button></button>');
        this._$button.text(name);
        this._$button.addClass(className);
    }

    registerSpecifyEventAndName(url){
        const func = ()=>{
            document.getElementById("myiframe").src = url;
        }
          this._$button.on("click", func);
    }

    get $button(){
        return this._$button;
    }

}

class JLabelCreator{
    constructor(text){
        this._$label = jQuery('<h3></h3>');
        this._$label.text(text);
    }

    get $label(){
        return this._$label;
    }
}


const label_animation = new JLabelCreator('Animation Example');
const label_experiment = new JLabelCreator('Experiments');
const label_game = new JLabelCreator('Games');

const button1 = new JButtonCreator('Animation Sample 1', 'mybutton');
const button2 = new JButtonCreator('Animation Sample 2', 'mybutton');
const button_magnifier = new JButtonCreator('Magnifier', 'mybutton');
const button_magnifier2 = new JButtonCreator('Magnifier for mutiple images', 'mybutton');
const button_testingImportSass = new JButtonCreator('TestingImportSass', 'mybutton');
const button_svgCanvas = new JButtonCreator('SVG Canvas', 'mybutton');
const button_Snake = new JButtonCreator('Snake', 'mybutton');
button1.registerSpecifyEventAndName("AnimationSimple1.html");
button2.registerSpecifyEventAndName("AnimationSimple2.html");
button_magnifier.registerSpecifyEventAndName("Magnifier.html");
button_magnifier2.registerSpecifyEventAndName("Magnifier2.html");
button_testingImportSass.registerSpecifyEventAndName("TestingImportSass.html");
button_svgCanvas.registerSpecifyEventAndName("SVGCanvas.html");
button_Snake.registerSpecifyEventAndName("Snake.html");

$('nav').append(label_animation.$label);
$('nav').append(button1.$button);
$('nav').append(button2.$button);
$('nav').append(label_experiment.$label);
$('nav').append(button_magnifier.$button);
$('nav').append(button_magnifier2.$button);
$('nav').append(button_testingImportSass.$button);
$('nav').append(button_svgCanvas.$button);
$('nav').append(button_svgCanvas.$button);
$('nav').append(label_game.$label);
$('nav').append(button_Snake.$button);


const pt = new CPoint(1, 2, 30);
console.log('pt', pt.x, pt.y, pt.z);

/***/ })
/******/ ]);