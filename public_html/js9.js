"use strict";


/*Regexp Golf */

var a1 = "car";
var a2 = "cat";

console.log("a");
var regExA = /ca[rt]/;
console.log(regExA.test(a1));
console.log(regExA.test(a2));

var b1 = "pop";
var b2 = "prop";

console.log("b");
var regExB = /pr?op/;
console.log(regExB.test(b1));
console.log(regExB.test(b2));

var c1 = "ferret";
var c2 = "ferry";
var c3 = "ferrari";

console.log("c");
var regExC = /ferr(et|y|ari)/;
console.log(regExC.test(c1));
console.log(regExC.test(c2));
console.log(regExC.test(c3));

var d1 = "delicious";
var d2 = "luscious";

console.log("d");
var regExD = /\wious/;
console.log(regExD.test(d1));
console.log(regExD.test(d2));

var e1 = " .";
var e2 = " ,";
var e3 = " :";
var e4 = " ;";

console.log("e");
var regExE = /\s[.,:;]/;
console.log(regExE.test(e1));
console.log(regExE.test(e2));
console.log(regExE.test(e3));
console.log(regExE.test(e4));

var f1 = "abcdef"; //false to check
var f2 = "abcdefg";
var f3 = "abcdefgh";
var f4 = ""; //false to check

console.log("f");
var regExF = /[\w]{7,}/;
console.log(regExF.test(f1));
console.log(regExF.test(f2));
console.log(regExF.test(f3));
console.log(regExF.test(f4));

var g1 = "fly";
var g2 = "regex"; //false to check
var g3 = "outdoors";

console.log("g");
var regExG = /\b[^eE]+\b/;
console.log(regExG.test(g1));
console.log(regExG.test(g2));
console.log(regExG.test(g3));

/*Quoting Style*/

var quote = "The coach said, 'The game isn't over until the fat lady sings.'";
var cleanQuote = quote.replace(/([^\w])(\')/g, "$1\"");
console.log(cleanQuote);

/*Numbers Again*/
var jsNumbers = /[+-]?\.?\d+[eE]?\d+\.?|/;

var num1 = "3";
var num2 = "33543";
var num3 = "3.76";
var num4 = ".36";
var num5 = "5.653";
var num6 = "5.";
var num7 = "+5.653";
var num8 = "-5.653";
var num9 = "5e-334";
var num10 = "-12E98";

console.log(jsNumbers.test(num1));
console.log(jsNumbers.test(num2));
console.log(jsNumbers.test(num3));
console.log(jsNumbers.test(num4));
console.log(jsNumbers.test(num5));
console.log(jsNumbers.test(num6));
console.log(jsNumbers.test(num7));
console.log(jsNumbers.test(num8));
console.log(jsNumbers.test(num9));
console.log(jsNumbers.test(num10));




