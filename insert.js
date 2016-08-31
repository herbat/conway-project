/*jslint node: true*/
module.exports = function (arr1, arr2, i, del) {
    'use strict';
    if (del  === undefined) {del = false; }
//    if (arr1 === undefined) {return []; }
//    if (arr2 === undefined) {return arr1; }
//    if (i    === undefined) {return arr1.concat(arr2); }
    return arr1.slice(0, i).concat(arr2).concat(arr1.slice(del ? i : i + arr2.length));
};