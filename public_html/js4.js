"use strict";

/* Sum of a Range
 *create function that takes 2 args, start and end, and returns an array containing
 *all numbers from start up to/including end
 *then write sum function, that takes array and sums all numbers in it
 *BONUS - add a step parameter to range that only sums every step-th integer; make sure it works with neg step values
 *
 */

function range(startInt, endInt, stepInt) {
    var range = [];
    if (startInt < endInt) {
        for (var i = startInt; i <= endInt; i+=stepInt)
            range.push(i);
    } else {
        for (var j = startInt; j >= endInt; j+=stepInt)
            range.push(j);
    }
    
    return range;
}


function sum(rangeArray) {
    var sum = 0;
    for (var i = 0; i < rangeArray.length; i++)
        sum += rangeArray[i];
    return sum;
}

console.log(sum(range(1, 10, 1)));

/*Reversing an Array
 *write 2 functions:
 *1. reverseArray - takes array argument and produces new array with same elemtns in inverse order
 *2. reverseArrayInPlace - modify the array passed to be inverse
 */


var test1 = [1,2,3,4,5,6];
var test2 = reverseArray(test1);
console.log(test2);

var test3 = [1,2,3,4,5,6];
reverseArrayInPlace(test3);
console.log(test3);

function reverseArray(array) {
    var reversed = [];
    for (var i = 0; i < array.length; i++)
        reversed.unshift(array[i]);
    return reversed;
}

function reverseArrayInPlace(array) {
    var l = array.length;
    for (var i = 0; i < l; i++)
        array[i] = array[l - 1 - i];
}


/*A List
 *a list is a nested data object where 1st object holds a ref to the second, etc.; last point is null
 *create arrayToList that translates it one way
 *and listToArray for the reverse
 *add helper functions:
 *prepend: takes an element and a list and creates new list with element at the front
 *nth: take a list and a number and returns element at given position of the list
 *, or undefined when there is no such element; make it recursive
 *each list node has a value, and a "rest"
 */

var a1 = [1,2,3];
var l1 = arrayToList(a1);
console.log(l1);

var l2 = prepend(7, l1);

console.log(l2);

var l3 = arrayToList([1,2,3,4,5,6,7]);

console.log(nth(l3,2));
console.log(nth(l3,13));

var al3 = listToArray(l3);
console.log(al3);

function arrayToList(array) {
    var list = {};
    list.value = array[0];
    var len = array.length;
    if (len === 1) 
        list.rest = null;
    else
        list.rest = arrayToList(array.slice(1, len));
    return list;
}

function listToArray(list) {
    var array = [], n = 0;
    var elem = nth(list, n);
    while (elem !== undefined) {
        array.push(elem);
        n++;
        elem = nth(list, n);
    }
    return array;
}

function prepend(elem, list) {
    var newlist = {};
    newlist.value = elem;
    newlist.rest = list;
    return newlist;
}

function nth(list, n) {
    if (list.rest === null && n > 0) 
        return undefined;
    else if (n === 0)
        return list.value;
    else
        return nth(list.rest, n - 1);
}


/*Deep comparison
 *create function deepEqual that takes in 2 values and return true ONLY
 *if they are same value, or objects with the same properties whose values
 *are also equal when compared to a recursive call to deepEqual
 *INST - use typeof with properties; only do deepEqual when both values are objects
 *WEIRD EXCEPTION -"null" is also an "object" when you do typeof on it
 *
 */

var l5 = arrayToList([1,2,3]);
var l6 = arrayToList([1,2,3]);
var l7 = arrayToList([1,2,4]);
console.log(deepEqual(l5, l7));

function deepEqual(o1, o2) {
    if (typeof(o1) !== typeof(o2)) {
        return false;
    } else {
        //same type established
        //weird JavaScript null exception
        if (o1 === null || o2 === null) {
           if (o1 === null && o2 === null)
                return true;
            else
                return false;        
        } else if (typeof(o1) !== "object") {
            return o1 === o2;
        } else {
        //perform deep comparison
            if (arguments[0].length !== arguments[1].length) {
                return false;
            } else {
                var a = Object.keys(o1);
                var b = Object.keys(o2);
                console.log(a);
                return Object.keys(a).every(function (i) { return b.indexOf(i) !== -1; }) &&
                    b.every(function (i) { return objectEquals(a[i], b[i]); });
                
                
            }
        } //end deep comparison
    }
}
