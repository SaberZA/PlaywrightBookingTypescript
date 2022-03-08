"use strict";
exports.__esModule = true;
var fs = require("fs");
var csv = require("csv-parser");
var results = [];
fs.createReadStream('utd-places.csv')
    .pipe(csv())
    .on('data', function (data) { return results.push(data); })
    .on('end', function () {
    console.log(results);
});
