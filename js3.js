"use strict";

//chapter 3 exercices

//1 - minumum

console.log(minimum(24,23));

function minimum(num1, num2) {
	if (num1 > num2) {
		return num2;
	} else {
		return num1;
	}
}

//2 - recursion version of isEven

console.log(isEven(-50));

function isEven(num) {
	num = Math.abs(num);
	if (num === 0) {
		return true;
	} else if (num === 1) {
		return false;
	} else {
		return isEven(num - 2);
	}
	
}

//3 - bean counting

console.log(countChar('Open the pod bay doors, HAL.', 'o'));

function countChar(str, letter) {
	var count = 0;
	for (var i = 0; i < str.length; i++) {
		if (str.charAt(i) === letter) {
			count++;
		}
	}
	return count;
}
