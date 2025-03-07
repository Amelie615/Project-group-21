"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var utilities_1 = require("./lib/utilities");
//const fs = require('fs');
//const pasta : Recipe = {}
// const keysToHashed : Array<Pair<string, number>>= []
// const myBook : Cookbook = ph_empty(250, hash_id);
// createRecipe(myBook, keysToHashed)
// createRecipe(myBook, keysToHashed)
// createRecipe(myBook, keysToHashed)
// console.log(keysToHashed)
//const JSONtest = JSON.stringify(ph_lookup(testHashtable, keysToHashed[0][1]))
// localStorage.setItem("italiensk" , test)
// console.log("hejhopp klar")
// function saveRecipeOld(recipe) {
//     fs.writeFile('italian.txt', JSONtest, (err: NodeJS.ErrnoException | null) => {
//     if (err) throw err;
//     console.log('Saved!');
//   });
// }
function saveCookbook(cookbook) {
    var cookbookName = (0, utilities_1.validAnswer)("Name your cookbook: >", "");
    fs.writeFileSync(cookbookName + ".json", JSON.stringify(cookbook));
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
    var possibleCookbook = fs.readFileSync(filename, 'utf-8');
    console.log(possibleCookbook);
    console.log(JSON.parse(possibleCookbook));
    return possibleCookbook;
}
function newFunction() {
    var possibleCookbook = findInformation("italian.json");
    //saveCookbook(cookbook)
}
newFunction();
// fs.readFile('italian.txt', 'utf8', (err, data) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log(data);
// });
