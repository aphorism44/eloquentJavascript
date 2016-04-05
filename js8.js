
"use strict";

/*Retry*/

function primitiveMultiply(a, b) {
    var check = Math.random();
    if (check <= 0.5) {
        return a * b;
    } else {
        throw new MuliplicatorUnitFailure("Invalid multiplication for : " + a + ", " + b) ;
    }
}

function MuliplicatorUnitFailure(message) {
  this.message = message;
  this.stack = (new Error()).stack;
}
MuliplicatorUnitFailure.prototype = Object.create(Error.prototype);
MuliplicatorUnitFailure.prototype.name = "MultiplicatorUnitFailure";


var multAnswer;

for (;;) {
    try {
        multAnswer = primitiveMultiply(3,4);
        console.log(multAnswer);
        break;
    } catch(e) {
        console.log("Hit this error: " + e);
    }
}


/*The Locked Box 
*/

var box = {
  locked: true,
  unlock: function() { this.locked = false; },
  lock: function() { this.locked = true;  },
  _content: [],
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this._content;
  }
};


function withBoxUnlocked(func) {
    try {
        return func();
    } finally {
        box.lock();
    }
}

function okayFunction() {
    box.unlock();
    box.content.push("item");
}

function errorFunction() {
    box.content.push("item");
}

console.log(box.locked);

try {
    withBoxUnlocked(okayFunction);
} catch(e) {
    console.log(e);
}

console.log(box.locked);

try {
    withBoxUnlocked(errorFunction);
} catch(e) {
    console.log(e);
}

console.log(box.locked);