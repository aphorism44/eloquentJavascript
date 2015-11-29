"use strict";

//A vector type
function Vector(x,y) {
    this.x = x;
    this.y = y;
};
Vector.prototype.plus = function(vec) {
    this.x += vec.x;
    this.y += vec.y;
};
Vector.prototype.minus = function(vec) {
    this.x -= vec.x;
    this.y -= vec.y;
};
Vector.prototype.length = function() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
};

var vecA = new Vector(3,4);
console.log(vecA.length());
var vecB = new Vector(3,2);
var vecC = new Vector(-1, -1);
vecA.plus(vecB);
console.log(vecA);
vecB.minus(vecC);
console.log(vecB);

/*Another cell
 * this is an extension of the table formatting in the chapter (code below)
 * add a new cell type called StretchCell(inner, width, height) that
 * wraps any cell (inner) and makes sure it has at least the w and h in parameters */
function repeat(string, times) {
    var result = "";
    for (var i = 0; i < times; i++)
        result += string;
    return result;
}
function rowHeights(rows) {
    return rows.map(function(row) {
        return row.reduce(function(max, cell) {
           return Math.max(max, cell.minHeight()); 
        }, 0);
    });
}
function colWidths(rows) {
    return rows[0].map(function(_, i) {
        return rows.reduce(function(max, row) {
           return Math.max(max, row[i].minWidth()); 
        }, 0);
    });
}

function TextCell(text) {
    this.text = text.split("\n");
};
TextCell.prototype.minWidth = function() {
    return this.text.reduce(function(width, line) { return Math.max(width, line.length);
}, 0); };
TextCell.prototype.minHeight = function() {
    return this.text.length;
};
TextCell.prototype.draw = function(width, height) {
    var result = [];
    for (var i = 0; i < height; i++) {
        var line = this.text[i] || "";
        result.push(line + repeat(" ", width - line.length));
    }
    return result;
};

function UnderlinedCell(innerCell) {
    this.inner = innerCell;
}
UnderlinedCell.prototype.minWidth = function() {
    return this.inner.minWidth();
};
UnderlinedCell.prototype.minHeight = function() {
    return this.inner.minHeight() + 1;
};
UnderlinedCell.prototype.draw = function(width, height) {
    return this.inner.draw(width, height - 1).concat([repeat("-", width)]);
};

function StretchCell(innerCell, width, height) {
    this.inner = innerCell;
    this.width = width;
    this.height = height;
}
StretchCell.prototype.minWidth = function() {
    return Math.max(this.width, this.inner.minWidth());
};
StretchCell.prototype.minHeight = function() {
    return Math.max(this.height, this.inner.minHeight());
};
StretchCell.prototype.draw = function(width, height) {
    return this.inner.draw(width, height);
};

function drawTable(rows) {
    var heights = rowHeights(rows);
    var widths = colWidths(rows);
    
    function drawLine(blocks, lineNo) {
        return blocks.map(function(block) {
            return block[lineNo];
        }).join(" ");
    }
    function drawRow(row, rowNo) {
        var blocks = row.map(function(cell, colNo) {
            return cell.draw(widths[colNo], heights[rowNo]);
        });
        return blocks[0].map(function(_, lineNo) {
            return drawLine(blocks, lineNo);
        }).join("\n");
    }
    return rows.map(drawRow).join("\n");
}



var h = [], a = [], b = [], c = [], testRows = [];
var h1 = new TextCell("Name");
var h2 = new TextCell("Nth President");
var h3 = new TextCell("Year of Death");
var hu1 = new UnderlinedCell(h1);
var hu2 = new UnderlinedCell(h2);
var hu3 = new UnderlinedCell(h3);
h.push(hu1);
h.push(hu2);
h.push(hu3);
var a1 = new TextCell("George Washington");
var a2 = new TextCell("1");
var a3 = new TextCell("1799");
a.push(a1);
a.push(a2);
a.push(a3);
var b1 = new TextCell("Abraham Lincoln");
var b2 = new TextCell("16");
var b3 = new TextCell("1865");
var bs1 = new StretchCell(b1, 30, 3);
var bs2 = new StretchCell(b2, 15, 3);
var bs3 = new StretchCell(b3, 15, 2);
b.push(bs1);
b.push(bs2);
b.push(bs3);
var c1 = new TextCell("Franklin Delano Roosevelt");
var c2 = new TextCell("34");
var c3 = new TextCell("1945");
c.push(c1);
c.push(c2);
c.push(c3);
testRows.push(h);
testRows.push(a);
testRows.push(b);
testRows.push(c);
console.log(drawTable(testRows));

/*Sequence interface 
 * interface that abstract iteration over a collection of values
 * I WASN'T SURE precisely what the book was looking for, so check its website
 * what they want was NOT clearly stated in book, but here it is
 * TAKE THAT confusing JavaScript object inheritance
 * */

function Seq(obj) {
    this.sequence = obj;
    this.counter = 1;
    for (var key in this.sequence)
        break;
    this.currentElement = this.sequence[key];
}
Seq.prototype.iterate = function() {
    var i = 1;
    for (var key in this.sequence) {
        if (i === this.counter + 1) {
            this.counter++;
            break;
        }
        i++;
    }
    this.currentElement = this.sequence[key];
};

function ArraySeq(arr) {
    var arrObj = {};
    for (var i = 0; i < arr.length; i++)
        arrObj[i] = arr[i];
    Seq.call(this, arrObj);
}
ArraySeq.prototype = Object.create(Seq.prototype);

function RangeSeq(from, to) {
    var rangeObj = {};
    for (var i = from; i < to; i++)
        rangeObj[i] = i;
    Seq.call(this, rangeObj);
}
RangeSeq.prototype = Object.create(Seq.prototype);

function logFive(seq) {
    var lastCounter = 1;
    for (var i = 0; i < 5; i++) {
        console.log(seq.currentElement);
        seq.iterate();
        if (seq.counter === lastCounter)
            break;
        else
            lastCounter++;
    }
}

var s1 = {a:3,b:6,c:9,d:12,e:15,f:18};
var s2 = {a:3,b:6,c:9};
var s3 = [3,4,5,6];
var seq1 = new Seq(s1);
var seq2 = new Seq(s2);
logFive(seq1);
logFive(seq2);
var aSeq1 = new ArraySeq(s3);
logFive(aSeq1);
var rSeq1 = new RangeSeq(3,9);
logFive(rSeq1);

