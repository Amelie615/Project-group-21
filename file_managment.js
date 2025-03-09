"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hashtables_1 = require("./lib/hashtables");
var recipe_1 = require("./lib/recipe");
var fs = require("fs");
var utilities_1 = require("./lib/utilities");
var keysToHashed = [];
var myBook = (0, hashtables_1.ph_empty)(1, hashtables_1.hash_id);
(0, recipe_1.createRecipe)(myBook, keysToHashed);
(0, recipe_1.createRecipe)(myBook, keysToHashed);
(0, recipe_1.createRecipe)(myBook, keysToHashed);
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
/**
 * Function to implement:
 * 1. Function that saves a cookbook to a file with a specified name (in: filename to create, cookbook to save)
 *      a. if the file already exits, ask if they wish to overwrite
 * 2. Function that returns a specified cookbook from a file
 *      a. Read the file
 *      b. recreate with zod library
 *      c. return cookbook
 * 3. Re-create main menu
 *      a. Open or Create New cookbook
 *          i. Open calls (2)
 *          ii. Create calls function to create new cookbook
 *              1. Decide how big the hashtable should be.
 *              note: id should only be as big as size of hashtable, no?
 *              won't need to name it before saving it.
 */
function saveCookbook(cookbook) {
    var cookbookName = (0, utilities_1.validAnswer)("Name your cookbook: >", "", []);
    if (fs.existsSync("cookbookShelf/" + cookbookName + '.json')) {
        if ((0, utilities_1.validAnswer)("A cookbook with the name " + cookbook + " already exists, do you wish to overwrite it?", "opt", ["y", "n"]).toLowerCase() === "n") {
            console.log("Saving cancelled.");
        }
        else {
            fs.writeFileSync("cookbookShelf/" + cookbookName + ".json", JSON.stringify(cookbook));
        }
    }
    else {
        fs.writeFileSync("cookbookShelf/" + cookbookName + ".json", JSON.stringify(cookbook));
    }
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
//
function retriveCookbook(filename) {
    var possibleCookbook = fs.readFileSync(filename, 'utf-8');
    return JSON.parse(possibleCookbook);
}
function newFunction() {
    //const possibleCookbook : string = retriveCookbook("italian.json")
    saveCookbook(myBook);
    retriveCookbook("cookbookShelf/italian.json");
}
function createCookbook() {
}
newFunction();
// fs.readFile('italian.txt', 'utf8', (err, data) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log(data);
// });
