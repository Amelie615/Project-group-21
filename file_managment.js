"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var utilities_1 = require("./lib/utilities");
// const keysToHashed : Array<Pair<string, number>>= []
// const myBook : Cookbook = ph_empty(1, hash_id);
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
/**
 * Function to implement:
 * 1. Function that saves a cookbook to a file with a specified name (in: filename to create, cookbook to save)
 *      a. if the file already exits, ask if they wish to overwrite
 * --------------
 * 2. Function that returns a specified cookbook from a file
 *      a. Read the file
 *      b. recreate with zod library
 *      c. return cookbook
 * 3. Re-create main menu
 *      a. Open or Create New cookbook
 *          i. Open calls (2)
 *          ii. Create calls function to create new cookbook
 *              1. Decide how big the hashtable should be. (Can't be zero, should be warning for larger sizes. (Premium edition))
 *              note: id should only be as big as size of hashtable, no?
 *              won't need to name it before saving it.
 *
 * Change all long variable names to obj & their lowercase type so it's less messy.
 */
function saveCookbook(cookbook) {
    var cookbookName = (0, utilities_1.validAnswer)("Name your cookbook: >", "", []).toLowerCase();
    if (fs.existsSync("cookbookShelf/" + cookbookName + '.json')) {
        if ((0, utilities_1.validAnswer)("A cookbook with the name " + cookbookName + " already exists, do you wish to overwrite it?", "opt", ["y", "n"]).toLowerCase() === "n") {
            console.log("Saving cancelled.");
        }
        else {
            fs.writeFileSync("cookbookShelf/" + cookbookName + ".json", JSON.stringify(cookbook));
            console.log("Overwritten succesfully. Save completed.");
        }
    }
    else {
        fs.writeFileSync("cookbookShelf/" + cookbookName + ".json", JSON.stringify(cookbook));
        console.log("Save completed.");
    }
}
//Typeguards
function isCookbook(possibleCookbook) {
    console.log("Öppnar iscookbook");
    if (typeof possibleCookbook === "object" || possibleCookbook !== null) {
        var assertedCookbook = possibleCookbook;
        console.log("asserts cookbook");
        var test1 = isKeys(assertedCookbook.keys);
        console.log(assertedCookbook.keys);
        var test2 = isCookbookValues(assertedCookbook.values);
        var test3 = typeof assertedCookbook.entries === "number";
        console.log(test1, "iskeys resultat:");
        console.log(test2, "isCookbookValue resultat: ");
        console.log(test3, "entries type test: ");
        return test1 && test2 && test3;
    }
    else {
        console.log("isCookbook hamnar i else");
        return false;
    }
}
function isKeys(possibleKeys) {
    console.log("Öppnar isKeys");
    return (typeof possibleKeys === "number" || possibleKeys === null || possibleKeys === undefined);
}
function isCookbookValues(obj) {
    console.log("Öppnar isCookbookValues");
    if (Array.isArray(obj) && obj !== null) {
        var values = obj;
        values.every(function (item) { return isRecipe(item) || typeof item === undefined; });
    }
    else {
        console.log("cookbook values returnar false");
        return false;
    }
}
function isRecipe(possibleRecipe) {
    console.log("Öppnar isRecipe");
    if (typeof possibleRecipe === "object" || possibleRecipe !== null) {
        var assertedRecipe = possibleRecipe;
        return typeof assertedRecipe.id === "number" && typeof assertedRecipe.instructions === "string" &&
            typeof assertedRecipe.name === "string" && typeof assertedRecipe.servings === "number" &&
            (assertedRecipe.unit === "imperial" || assertedRecipe.unit === "metric");
    }
    else if (possibleRecipe === undefined) {
        return true;
    }
    else {
        return false;
    }
}
//
function retriveCookbook(filename) {
    var possibleCookbook = fs.readFileSync(filename, 'utf-8');
    return JSON.parse(possibleCookbook);
}
function newFunction() {
    // const possibleCookbook : object = retriveCookbook("italian.json")
    // saveCookbook(myBook)
    var obj = retriveCookbook("cookbookShelf/italian.json");
    if (isCookbook(obj)) {
        var cookbook = obj;
    }
    else {
        console.log("Error when loading cookbook.");
    }
}
newFunction();
