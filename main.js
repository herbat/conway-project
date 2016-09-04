/*jslint node: true*/
/*jshint esnext: true */
/*jslint browser: true*/

'use strict';
var insert = require('./insert');

const STEP = 50;
const WIDTH = 115, HEIGHT = 50;
var ptr  = [[0, 1, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 1, 1, 1]];

function init(scr) {
    var cwObj = {
        canvas: document.getElementById(scr),
        gMap: new Array(HEIGHT).fill(new Array(WIDTH).fill(0))
    };
    draw(cwObj, ptr, 20, 20);
    step(cwObj.gMap);
    return cwObj;
}

function draw(cwObj, pattern, x = 0, y = 0) {
    if(pattern){
        pattern.map(function (cur, i){
            cwObj.gMap[x + i] = insert(cwObj.gMap[x + i], cur, y);
        });
    }
    var out = '';
    cwObj.gMap.map(function (cur) {
        cur.map(function (cell) {
            if(cell) {out += "<b>&#9632;</b>";} else {out += "&#9632;";}
        });
        out += "<br>";
    });
    cwObj.canvas.innerHTML = out;
}

function step (gm){
    return gm.map(function (cur, y) {
        return cur.map(function (cell, x){
            var n = getNb(gm, x, y);
            n = cell === 1 ? n - 1 : n;
            return n === 3 ? 1 : ((n === 2 && cell === 1) ? 1 : 0);
        });
    });
}

function getNb (gm, x, y){
    var w = WIDTH, h = HEIGHT,
        xmin = (x <= 0) ? 0 : x-1, ymin = (y <= 0) ? 0 : y-1,
        xmax = (x+2 > w) ? w : x+2, ymax = (y+2 > h) ? h : y+2;
    
    var env = gm.slice(ymin, ymax).map(function (row){
        return row.slice(xmin, xmax);
    });
    
    env = [].concat.apply([], env);

    return env.reduce(function (prev, cell) {
        return cell === 1 ? prev++ : prev;
    });
}

var Game = init("screen");

setInterval(function (){
    Game.gMap = step(Game.gMap);
    draw(Game);
}, STEP);








