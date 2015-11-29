/* 
 * Electronic life chapter
 * to avoid copying the book's code, I implemented it using my own interpretation
 * using 2D arrays instead of the book's 1Ds to prove it
 * USE vector program created in last chapter (turns out they had different
 * definition of plus/minus methods)
 */

"use strict";

function Vector(x,y) {
    this.x = x;
    this.y = y;
};
Vector.prototype.plus = function(vec) {
    return new Vector(this.x + vec.x, this.y + vec.y);
};
Vector.prototype.minus = function(vec) {
    return new Vector(this.x - vec.x, this.y - vec.y);
};
Vector.prototype.length = function() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
};

 function randomElement(arr) {
     return arr[Math.floor(Math.random() * arr.length)];
 }
 
 var plan = ["############################",
            "#      #    #      o      ##",
            "#                          #",
            "#          #####           #",
            "##         #   #    ##     #",
            "###           ##     #     #",
            "#           ###      #     #",
            "#   ####                   #",
            "#   ##       o             #",
            "# o  #         o       ### #",
            "#    #                     #",
            "############################"];
 
 var directions = {
   "n" : new Vector(0, -1)
   , "ne" : new Vector(1, -1)
   , "e" : new Vector(1, 0)
   , "se" : new Vector(1, 1)
   , "s" : new Vector(0, 1)
   , "sw" : new Vector(-1, 1)
   , "w" : new Vector(-1, 0)
   , "nw" : new Vector(-1, -1)
 };
  
 var directionArray = ["n", "ne", "e", "se", "s", "sw", "w", "nw"];

 function Grid(width, height) {
     this.space = [];
     for (var i = 0; i < height; i++)
         this.space.push([]);
     this.width = width;
     this.height = height;
 }
 Grid.prototype.isInside = function(vec) {
     return vec.x <= this.width && vec.y <= this.height && vec.x >= 0 && vec.y >= 0;
 };
 Grid.prototype.get = function(vec) {
     return this.space[vec.x][vec.y];
 };
 Grid.prototype.set = function(vec, elem) {
     this.space[vec.x][vec.y] = elem;
 };
 
 var charLegend = {"#": "Wall", "o": "BouncingCritter"};

function elemFromChar(legend, char) {
     if (char === " ")
         return null;
     var element = {};
     element.elem =  legend[char];
     element.origChar = char;
     return element;
 }

function World(map, legend) {
     var testRow = map[0];
     this.worldGrid = new Grid(testRow.length, map.length);
     this.legend = legend;
     for (var i = 0; i < map.length; i++) {
         var row = map[i];
         for (var j = 0; j < row.length; j++) {
             this.worldGrid.set(new Vector(i, j), elemFromChar(charLegend, row[j]));
         }
     }
 }
 
 var worldA = new World(plan, charLegend);

 function BouncingCritter() {
     this.direction = randomElement(directionArray);
 }
 
 function Wall() {}
 
 
 
 console.log(worldA);