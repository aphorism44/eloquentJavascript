"use strict";

//chapter 2 exercises


//1 - looping a triangle

for (var i = 1; i < 8; i++) {
	var pounds = '';
	for (var j = 0; j < i; j++) {
		pounds += '#';
	}
	console.log(pounds);
}


//2 - FizzBuzz

for (var i = 1; i <= 100; i++) {
	if (i % 3 === 0 && i % 5 === 0) {
		console.log('FizzBuzz');
	} else if (i % 3 === 0) {
		console.log('Fizz');
	} else if (i % 5 === 0) {
		console.log('Buzz');
	} else {
		console.log(i);
	}
}

//3 - Chessboard

var size = 4;

for (var i = 0; i < size; i++) {
	var row = '';
	var firstPlace = 1;
	if (i % 2 === 0) {
		firstPlace = 0;
	}
	for (var j = 0; j < size; j++) {
		switch(firstPlace) {
			case 1: 
				if (j % 2 === 0) {
					row += '#';
				} else {
					row += ' ';
				}
				break;
			case 0:
				if (j % 2 === 0) {
					row += ' ';
				} else {
					row += '#';
				}
				break;
			
		}
	}
	console.log(row);	
}
