"use strict";

var ancestry = JSON.parse(ANCESTRY_FILE);

/*Flattening
 *use reduce method with concat to flatten of an array of arrays into single array */
var array2D = [ [3,1,2], [5,6,4], [8,7,9] ];
var array1D = array2D.reduce(function(arrayA, arrayB) { return arrayA.concat(arrayB); })
console.log(array1D);

/*Mother-Child Age Difference
 *compute the average age of a mother when a child is born, using mean function
 *use byName object created in chapter too */
function mean(array) {
    function plus(a, b) { return a + b;  }
    return array.reduce(plus) / array.length;
}

var byName = {}, birthData = [];
ancestry.forEach(function(p) { byName[p.name] = p; });
ancestry.forEach(function(p) { if (byName[p.mother] !== undefined) birthData.push(p.born - byName[p.mother].born); });
//when available, associate mother data with birth data
console.log(mean(birthData));

/*Historical life expectancy
 *get the average age - by century
 *century = Math.ceil(person.died / 100)
 *BONUS - write groupBy that abstracts grouping operation
 *it accepts an array and a function that combines the group for an element in the array, and returns an object that maps group names to arrays of group numbers*/
function getCentury(person) {
    return Math.ceil(person.died / 100);
}
var centGroups = {};
ancestry.forEach(function(p) {
    var pCent = getCentury(p);
    if (!(pCent in centGroups))
        centGroups[pCent] = [];
    centGroups[pCent].push(p.died - p.born);
});

for (var key in centGroups) {
    console.log("century: " + key + ", average age: " + mean(centGroups[key]));
}
function groupBy(array, gFunction) {
    var assocArr = {};
    for (var i = 0; i < array.length; i++) {
        var iden = gFunction(array[i]);
        if (!(iden in assocArr))
            assocArr[iden] = [];
        assocArr[iden].push(array[i]);
    }
    return assocArr;
}
console.log(groupBy(ancestry, getCentury));

//Every and then some
//rewrite the array functions every and some as seperate ones with array as parameter

var t1 = [2,3,4];
var t2 = [3,3,3];
function isThree(n) { return n === 3; }

function every(array, predFunc) {
    return array.filter(predFunc).length === array.length;
}
function some(array, predFunc) {
    return array.filter(predFunc).length > 0;
}

console.log(t1.every(isThree));
console.log(t2.every(isThree));
console.log(every(t1, isThree));
console.log(every(t2, isThree));
console.log(t1.some(isThree));
console.log(t2.some(isThree));
console.log(some(t1, isThree));
console.log(some(t2, isThree));

 