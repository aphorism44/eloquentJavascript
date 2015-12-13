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
 
 //var charLegend = {"#": "Wall", "o": "BouncingCritter"};

function elemFromChar(legend, char) {
    if (char === " ")
        return null;
    //grab string from legend and create the corresponding object
    //, which is how the book (tries) to do it; hitting bugs there
    //WARNING - I can't use that method; temporarily using eval, which blows, but textbook should know better
    //var element = new window[legend[char]]();
    var element = eval("new " + legend[char] + "()");
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

function Wall() {}

function View(world, vector) {
    this.world = world;
    this.vector = vector;
}
View.prototype.look = function(dir) {
    var target = this.vector.plus(directions[dir]);
    if (this.world.worldGrid.isInside(target))
        return charFromElem(this.world.worldGrid.get(target));
    else
        return "#";
};
View.prototype.findAll = function(ch) {
    var found = [];
    for (var dir in directions)
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
    if (view.look(this.direction) !== " ") {
        this.direction = view.find(" ") || "s";
    }
        
    return { type: "move", direction: this.direction };
};

 function dirPlus(direction, n) {
     //returns the direction that is n 45-degree turns from the dir
     var index = directionNames.indexOf(direction);
     return directionNames[(index + n + 8) % 8];
 }

function WallFollower() {
  this.direction = "s";
}
WallFollower.prototype.act = function(view) {
  var start = this.direction;
  if (view.look(dirPlus(this.direction, -3)) !== " ")
    start = this.direction = dirPlus(this.direction, -2);
  while (view.look(this.direction) !== " ") {
    this.direction = dirPlus(this.direction, 1);
    if (this.direction === start) break;
  }
  return {type: "move", direction: this.direction};
};

function LifelikeWorld(map, legend) {
  World.call(this, map, legend);
}
LifelikeWorld.prototype = Object.create(World.prototype);

var actionTypes = Object.create(null);

LifelikeWorld.prototype.letAct = function(critter, vector) {
  var action = critter.act(new View(this, vector));
  var handled = action &&
    action.type in actionTypes &&
    actionTypes[action.type].call(this, critter,
                                  vector, action);
  if (!handled) {
    critter.energy -= 0.2;
    if (critter.energy <= 0)
      this.worldGrid.set(vector, null);
  }
};

actionTypes.grow = function(critter) {
  critter.energy += 0.5;
  return true;
};
actionTypes.move = function(critter, vector, action) {
  var dest = this.checkDestination(action, vector);
  if (dest === null ||
      critter.energy <= 1 ||
      this.worldGrid.get(dest) !== null)
    return false;
  critter.energy -= 1;
  this.worldGrid.set(vector, null);
  this.worldGrid.set(dest, critter);
  return true;
};
actionTypes.eat = function(critter, vector, action) {
  var dest = this.checkDestination(action, vector);
  var atDest = dest !== null && this.worldGrid.get(dest);
  if (!atDest || atDest.energy === null)
    return false;
  critter.energy += atDest.energy;
  this.worldGrid.set(dest, null);
  return true;
};
actionTypes.reproduce = function(critter, vector, action) {
  var baby = elemFromChar(this.legend,
                             critter.origChar);
  var dest = this.checkDestination(action, vector);
  if (dest === null ||
      critter.energy <= 2 * baby.energy ||
      this.worldGrid.get(dest) !== null)
    return false;
  critter.energy -= 2 * baby.energy;
  this.worldGrid.set(dest, baby);
  return true;
};

function Plant() {
  this.energy = 3 + Math.random() * 4;
}
Plant.prototype.act = function(view) {
  if (this.energy > 15) {
    var space = view.find(" ");
    if (space)
      return {type: "reproduce", direction: space};
  }
  if (this.energy < 20)
    return {type: "grow"};
};

function PlantEater() {
  this.energy = 30;
}
PlantEater.prototype.act = function(view) {
  var space = view.find(" ");
  if (this.energy > 90 && space)
    return {type: "reproduce", direction: space};
  var plant = view.find("*");
  if (plant)
    return {type: "eat", direction: plant};
  if (space)
    return {type: "move", direction: space};
};

var valley = 
  ["############################",
   "#####                 ######",
   "##   ***      @         **##",
   "#   *##**         **  O  *##",
   "#    ***     O    ##**    *#",
   "#       O         ##***    #",
   "#                 ##**     #",
   "#   O       #*@            #",
   "#*          #**       O    #",
   "#***    @   ##**    O    **#",
   "##****     ###***       *###",
   "############################"];
   
 var charLegend = {"#": "Wall", "O": "PlantEater", "*": "Plant", "@": "Predator"};

//EXERCISE 1 - artificial stupidity - all you need to do is adjust so
//the PlantEaters don't reproduce as often
//EXERCISE 2 - see below

function Predator() {
  this.energy = 20;
}
Predator.prototype.act = function(view) {
  var space = view.find(" ");
  if (this.energy > 90 && space)
    return {type: "reproduce", direction: space};
  var plantEater = view.find("O");
  if (plantEater)
    return {type: "eat", direction: plantEater};
  if (space)
    return {type: "move", direction: space};
}; 

var worldA = new LifelikeWorld(valley, charLegend);
console.log(worldA.toString());
for (var i = 0; i < 100; i++) {
    worldA.turn();
    console.log(worldA.toString());
}
