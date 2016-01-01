
"use strict";

/*Retry*/

function primitiveMultiply(a, b) {
    var check = Math.random();
    try { 
        if (check <= 0.5) {
            console.log(a * b);
            return a * b;
        } else {
            throw new MuliplicatorUnitFailure("Invalid multiplication for : " + a + ", " + b) ;
        }
    } catch(e) {
        if (e instanceof MuliplicatorUnitFailure)
            console.log("failed: " + e);
        else
            throw e;
    }
}

function MuliplicatorUnitFailure(message) {
  this.message = message;
  this.stack = (new Error()).stack;
}
MuliplicatorUnitFailure.prototype = Object.create(Error.prototype);
MuliplicatorUnitFailure.prototype.name = "MultiplicatorUnitFailure";

while (primitiveMultiply(3,4) instanceof MuliplicatorUnitFailure) {
    console.log(primitiveMultiply(3,4));
}

