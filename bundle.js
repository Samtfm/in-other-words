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
  function Board(ctx, width, height) {
    var _this = this;

    _classCallCheck(this, Board);

    this.width = width;
    this.height = height;
    this.words = [];
    for (var i = 0; i < 65; i++) {
      var word = new Word('worrrddd' + i, Math.random() * this.width, Math.random() * this.height, ctx);
      this.words.push(word);
    }
    console.log(this.width);
    var times = 0;
    var ticker = setInterval(function () {
      ctx.clearRect(0, 0, 400, 400);
      _this.updateVelocities();
      _this.updatePositions();
      _this.renderAll(ctx);
      if (times > 60) {
        clearInterval(ticker);
      }
      times++;
    }, 40);
  }

  _createClass(Board, [{
    key: 'updateVelocities',
    value: function updateVelocities() {
      var _this2 = this;

      var collisions = [];
      this.words.forEach(function (wordA) {
        _this2.words.forEach(function (wordB) {
          if (wordA !== wordB) {
            var collision = wordA.checkCollision(wordB);
            if (collision) {
              collisions.push(collision);
            }
          }
        });
      });
      collisions.forEach(function (_ref) {
        var object = _ref.object,
            impulse = _ref.impulse;

        object.vel.x += impulse.x / 2;
        object.vel.y += impulse.y / 2;
        // object.pos.x += impulse.x;
        // object.pos.y += impulse.y;
      });
    }
  }, {
    key: 'updatePositions',
    value: function updatePositions() {
      this.words.forEach(function (word) {
        word.move();
      });
    }
  }, {
    key: 'renderAll',
    value: function renderAll(ctx) {
      this.words.forEach(function (word) {
        word.render(ctx);
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

  var board = new Board(ctx, 400, 200);
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MIN_SPEED = 0.01;
var FRICTION = 0.1;
var PADDING = 4;

var Word = function () {
  function Word(text, x, y, ctx) {
    _classCallCheck(this, Word);

    this.text = text;
    this.pos = { x: x, y: y };
    this.vel = { x: Math.random() * 10 - 5, y: Math.random() * 10 - 5 };
    ctx.font = '10pt sans-serif';
    this.width = ctx.measureText(this.text).width + PADDING * 2;
    this.height = 10 + PADDING * 2;
  }

  _createClass(Word, [{
    key: 'render',
    value: function render(ctx) {
      ctx.fillStyle = 'skyblue';
      ctx.fillRect(this.pos.x, this.pos.y, this.width, -this.height);
      ctx.fillStyle = 'black';
      ctx.fillText(this.text, this.pos.x + PADDING, this.pos.y - PADDING);
      ctx.fillStyle = 'red';
      ctx.fillRect(this.pos.x + this.width / 2, this.pos.y - this.height / 2, 3, 3);
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
        this.vel.x *= 1 - FRICTION;
        this.vel.y *= 1 - FRICTION;
      }
    }
  }, {
    key: 'isInBounds',
    value: function isInBounds(x, y) {
      return x >= this.pos.x && x <= this.pos.x + this.width && y >= this.pos.y && y <= this.pos.y + this.height;
    }
    // y = 10
    // x = 4
    // x

  }, {
    key: 'checkCollision',
    value: function checkCollision(otherWord) {
      // console.log(this.pos.y < otherWord.pos.y);
      if (this.pos.x + this.width > otherWord.pos.x && this.pos.x < otherWord.pos.x + otherWord.width && this.pos.y + this.height > otherWord.pos.y && this.pos.y < otherWord.pos.y + otherWord.height) {

        var thisRight = this.pos.x + this.width;
        var thisLeft = this.pos.x;
        var otherRight = otherWord.pos.x + otherWord.width;
        var otherLeft = otherWord.pos.x;

        var thisTop = this.pos.y;
        var thisBottom = this.pos.y + this.height;
        var otherTop = otherWord.pos.y;
        var otherBottom = otherWord.pos.y + otherWord.height;

        var xDiff = void 0,
            yDiff = void 0;
        var topA = this.pos.y;
        if (this.pos.x + this.width * 0.5 < otherWord.pos.x + otherWord.width * 0.5) {
          // this word needs to move to the left
          xDiff = otherLeft - thisRight;
        } else {
          xDiff = otherRight - thisLeft;
        }
        if (this.pos.y + this.height * 0.5 < otherWord.pos.y + otherWord.height * 0.5) {
          // this word needs to move up
          yDiff = otherTop - thisBottom;
        } else {
          yDiff = otherBottom - thisTop;
        }

        var impulse = {};
        if (Math.abs(xDiff) > Math.abs(yDiff)) {
          impulse.x = Math.abs(yDiff) / xDiff;
          impulse.y = yDiff;
        } else {
          impulse.x = xDiff;
          impulse.y = Math.abs(xDiff) / yDiff;
        }

        console.log(xDiff, yDiff);

        // const impulse = {
        //   x: this.pos.x + this.width*0.5 - (otherWord.pos.x + otherWord.width*0.5),
        //   y: this.pos.y + this.width*0.5 - (otherWord.pos.y + otherWord.width*0.5),
        // };
        return { object: this, impulse: impulse };
      }
      // const leftCollision = this.x+this.width/2 - (otherWord.pos.x + otherWord.width/2);
    }
  }]);

  return Word;
}();

module.exports = Word;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map