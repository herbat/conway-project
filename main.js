/*jslint node: true*/
/*jshint esnext: true */
/*jslint browser: true*/

'use strict';
var insert = require('./insert');

const STEP = 50;
const WIDTH = 200, HEIGHT = 100;
var ptr  = [[0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [1, 1, 0, 0, 1, 1, 1]];

function init(scr) {
    var cwObj = {
        canvas: document.getElementById(scr),//set up the graphics department
        gMap: new Array(HEIGHT).fill(new Array(WIDTH).fill(0))
    };
    draw(cwObj, ptr, 30, 60);
    step(cwObj.gMap);
    return cwObj;
}

function draw(cwObj, pattern, x = 0, y = 0) {
    if(pattern){//draw pattern to map
        pattern.map(function (cur, i){
            cwObj.gMap[x + i] = insert(cwObj.gMap[x + i], cur, y);
            //insert() is a helper, just inserts at an index
        });
    }
    var out = '';
    cwObj.gMap.map(function (cur) {//create a string of active and
        cur.map(function (cell) {  //inactive cells
            if(cell) {out += "<b>&#9632;</b>";} else {out += "&#9632;";}
        });
        out += "<br>";
    });
    cwObj.canvas.innerHTML = out;  //put it in the HTML
}

function step (gm){
    return gm.map(function (cur, y) {
        return cur.map(function (cell, x){
            var n = getNb(gm, x, y);
            n = cell === 1 ? n - 1 : n;//getNb includes the cell itself
            console.log(n);
            return n === 3 ? 1 : ((n === 2 && cell === 1) ? 1 : 0);//rules
        });
    });
}

function getNb (gm, x, y){
    var w = WIDTH, h = HEIGHT,
        xmin = (x <= 0) ? 0 : x-1, ymin = (y <= 0) ? 0 : y-1,//handle borders
        xmax = (x+2 > w) ? w : x+2, ymax = (y+2 > h) ? h : y+2;
    
    var env = gm.slice(ymin, ymax).map(function (row){//get environment array
        return row.slice(xmin, xmax);
    });
    
    env = [].concat.apply([], env);//flatten array

    return env.reduce(function (prev, cell) {//sum the neighbors
        return prev += cell;
    });
}

var Game = init("screen");

setInterval(function (){//repeat the steps every 50ms
    Game.gMap = step(Game.gMap);
    draw(Game);
}, STEP);








