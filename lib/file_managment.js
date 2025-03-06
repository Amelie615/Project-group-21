"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hashtables_1 = require("./hashtables");
var recipe_1 = require("./recipe");
var fs = require("fs");
//const fs = require('fs');
//const pasta : Recipe = {}
var keysToHashed = [];
var testHashtable = (0, hashtables_1.ph_empty)(10, hashtables_1.hash_id);
(0, recipe_1.createRecipe)(testHashtable, keysToHashed);
console.log(keysToHashed);
var JSONtest = JSON.stringify((0, hashtables_1.ph_lookup)(testHashtable, keysToHashed[0][1]));
// localStorage.setItem("italiensk" , test)
// console.log("hejhopp klar")
fs.writeFile('italian.txt', JSONtest, function (err) {
    if (err)
        throw err;
    console.log('Saved!');
});
function findInformation() {
    var possibleRecipe = fs.readFile('italian.txt', 'utf8', function (err, data) {
        if (err) {
            console.error(err);
            return;
        }
        return JSON.parse(data);
    });
}
// fs.readFile('italian.txt', 'utf8', (err, data) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log(data);
// });
