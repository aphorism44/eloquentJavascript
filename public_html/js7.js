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
  
 var directionNames = ["n", "ne", "e", "se", "s", "sw", "w", "nw"];

 function Grid(width, height) {
     this.space = [];
     for (var i = 0; i < height; i++)
         this.space.push([]);
     this.width = width;
     this.height = height;
 }
 Grid.prototype.isInside = function(vec) {
     return vec.x < this.width && vec.y < this.height && vec.x >= 0 && vec.y >= 0;
 };
 Grid.prototype.get = function(vec) {
     return this.space[vec.y][vec.x];
 };
 Grid.prototype.set = function(vec, elem) {
     this.space[vec.y][vec.x] = elem;
 };
 Grid.prototype.forEach = function(f, context) {
     for (var y = 0; y < this.height; y++) {
         for (var x = 0; x < this.width; x++) {
             if (this.space[y][x] !== null)
                 f.call(context, this.space[y][x], new Vector(x, y));
         }
     }
 };
 
 var charLegend = {"#": "Wall", "o": "BouncingCritter"};

function elemFromChar(legend, char) {
    if (char === " ")
        return null;
    //grab string from legend and create the corresponding object
    //, which is how the book (tries) to do it
    var element = new window[legend[char]]();
    element.origChar = char;
    return element;
 }

function charFromElem(elem) {
    if (elem === null)
        return " ";
    else
        return elem.origChar;
}

function World(map, legend) {
     this.worldGrid = new Grid(map[0].length, map.length);
     this.legend = legend;
     for (var y = 0; y < map.length; y++) {
         for (var x = 0; x < map[y].length; x++) {
            this.worldGrid.set(new Vector(x, y), elemFromChar(charLegend, map[y][x]));
         }
     }
 }
World.prototype.toString = function() {
    var output = "";
    for (var y = 0; y < this.worldGrid.height; y++) {
        for (var x = 0; x < this.worldGrid.width; x++) {
            output += charFromElem(this.worldGrid.get(new Vector(x,y)));
        }
        output += "\n";
    }
    return output;
};
World.prototype.turn = function() {
    var alreadyActed = [];
    this.worldGrid.forEach(function(elem, vector) {
        console.log(elem);
        if (elem.act && alreadyActed.indexOf(elem) === -1) {
           alreadyActed.push(elem);
           this.letAct(elem, vector);
       }
    }, this);
};
World.prototype.letAct = function(critter, vector) {
    var action = critter.act(new View(this, vector));
    if (action && action.type === "move") {
        var dest = this.checkDestination(action, vector);
        console.log("dest: " + dest);
        if (dest && this.worldGrid.get(dest) === null) {
            this.worldGrid.set(vector, null);
            this.worldGrid.set(dest, critter);
        }
    }
};
World.prototype.checkDestination = function(action, vector) {
    if (directions.hasOwnProperty(action.direction)) {
        var dest = vector.plus(directions[action.direction]);
        if (this.worldGrid.isInside(dest))
            return dest;
    }
};

function View(world, vector) {
    this.world = world;
    this.vector = vector;
}
View.prototype.look = function(dir) {
    //sometimes dir is 0...
    //console.log(dir);
    //console.log(this.vector);
    var target = this.vector.plus(directions[dir]);
    //console.log("target: " + target.x + ", " + target.y);
    if (this.world.worldGrid.isInside(target))
        return charFromElem(this.world.worldGrid.get(target));
    else
        return "#";
};
View.prototype.findAll = function(ch) {
    var found = [];
    for (var dir in directionNames)
        if (this.look(dir) === ch)
            found.push(dir);
    return found;
};
View.prototype.find = function(ch) {
    var found = this.findAll(ch);
    if (found.length === 0)
        return null;
    return randomElement(found);
};

 function BouncingCritter() {
     this.direction = randomElement(directionNames);
 }
BouncingCritter.prototype.act = function(view) {
    //console.log(this.direction);
    if (view.look(this.direction) !== " ")
        this.direction = view.find(" ") || "s";
    return { type: "move", direction: this.direction };
};


 function Wall() {}

 var worldA = new World(plan, charLegend);

console.log(worldA.toString());
worldA.turn();
//console.log(worldA.toString());


