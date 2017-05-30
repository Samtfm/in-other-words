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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Word = __webpack_require__(2);

var Board = function () {
  function Board(ctx) {
    var _this = this;

    _classCallCheck(this, Board);

    this.words = [new Word('happy', 20, 20)];
    var i = 1;
    setInterval(function () {
      ctx.clearRect(0, 0, 400, 400);
      _this.words.forEach(function (word) {
        word.move();
        word.render(ctx);
      });
    }, 1000);
  }

  _createClass(Board, [{
    key: 'updateVelocities',
    value: function updateVelocities() {
      var _this2 = this;

      this.words.forEach(function (wordA) {
        _this2.word.forEach(function (wordB) {
          if (wordA !== wordB) {
            // calculateVel
          }
        });
      });
    }
  }]);

  return Board;
}();

module.exports = Board;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Board = __webpack_require__(0);
console.log(Board);
document.addEventListener("DOMContentLoaded", function () {
  var canvasEl = document.getElementById("canvas");
  canvasEl.width = 400;
  canvasEl.height = 200;

  var ctx = canvasEl.getContext("2d");

  var board = new Board(ctx);
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MIN_SPEED = 0.01;
var FRICTION = 0.3;

var Word = function () {
  function Word(text, x, y) {
    _classCallCheck(this, Word);

    this.text = text;
    this.pos = { x: x, y: y };
    this.vel = { x: 10, y: 6 };
  }

  _createClass(Word, [{
    key: 'render',
    value: function render(ctx) {
      ctx.font = '10pt sans-serif';
      this.width = ctx.measureText(this.text).width;
      this.height = 10;
      ctx.fillStyle = 'black';

      ctx.fillText(this.text, this.pos.x - this.width / 2, this.pos.y + this.height / 2);
      ctx.fillStyle = 'red';
      ctx.fillRect(this.pos.x, this.pos.y, 3, 3);
    }
  }, {
    key: 'move',
    value: function move() {
      this.pos.x += this.vel.x;
      this.pos.y += this.vel.y;
      if (Math.hypot(this.vel.x + this.vel.y) < MIN_SPEED) {
        this.vel.x = 0;
        this.vel.y = 0;
      } else {
        this.vel.x *= FRICTION;
        this.vel.y *= FRICTION;
      }
      console.log(this.vel);
    }
  }]);

  return Word;
}();

module.exports = Word;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map