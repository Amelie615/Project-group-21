"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hashtables_1 = require("./lib/hashtables");
var recipe_1 = require("./lib/recipe");
var fs = require("fs");
//const fs = require('fs');
//const pasta : Recipe = {}
var keysToHashed = [];
var myBook = (0, hashtables_1.ph_empty)(2, hashtables_1.hash_id);
(0, recipe_1.createRecipe)(myBook, keysToHashed);
(0, recipe_1.createRecipe)(myBook, keysToHashed);
(0, recipe_1.createRecipe)(myBook, keysToHashed);
console.log(keysToHashed);
//const JSONtest = JSON.stringify(ph_lookup(testHashtable, keysToHashed[0][1]))
// localStorage.setItem("italiensk" , test)
// console.log("hejhopp klar")
// function saveRecipeOld(recipe) {
//     fs.writeFile('italian.txt', JSONtest, (err: NodeJS.ErrnoException | null) => {
//     if (err) throw err;
//     console.log('Saved!');
//   });
// }
function saveAll(filename) {
    fs.writeFileSync(filename, JSON.stringify(myBook));
}
function findInformationOld(filename) {
    fs.readFile(filename, 'utf8', function (err, data) {
        if (err) {
            if (err.code === "ENOENT") {
                console.error("File not found:", err.path);
            }
            else {
                console.error("Error reading file:", err);
            }
        }
        console.log("test: possible recipe", data);
        return data;
    });
}
function findInformation(filename) {
    var possibleRecipe = fs.readFileSync(filename, 'utf-8');
    console.log(possibleRecipe);
    console.log(JSON.parse(possibleRecipe));
}
function newFunction() {
    saveAll('italian.txt');
    findInformation('italian.txt');
}
newFunction();
// fs.readFile('italian.txt', 'utf8', (err, data) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log(data);
// });
