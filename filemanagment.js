"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hashtables_1 = require("./lib/hashtables");
var recipe_1 = require("./lib/recipe");
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
//Funkar
function isKeys(obj) {
    //console.log("Öppnar isKeys")
    if (Array.isArray(obj)) {
        var keys = obj;
        //return keys.every(item => typeof item === "number" || item === null || item === undefined)
        // const test = keys.every(item => typeof item === "number" || item === null || item === undefined)
        // console.log(test, "is keys returns")
        return keys.every(function (item) { return typeof item === "number" || item === null || item === undefined; });
    }
    else {
        return false;
    }
}
function isCookbookValues(obj) {
    console.log("Öppnar isCookbookValues");
    if (Array.isArray(obj) && obj !== null) {
        var values = obj;
        //console.log(values, "values")
        var testtracker = values.every(function (item) { return isRecipe(item); });
        console.log(testtracker, "testtracker");
        return testtracker; //det här blir false
    }
    else {
        console.log("cookbook values returnar false");
        return false;
    }
}
function isRecipe(possibleRecipe) {
    console.log("Öppnar isRecipe");
    if (typeof possibleRecipe === "object" && possibleRecipe !== null) {
        var assertedRecipe = possibleRecipe;
        console.log(assertedRecipe);
        return (isId(assertedRecipe.id)) && typeof assertedRecipe.instructions === "string" &&
            typeof assertedRecipe.name === "string" && typeof assertedRecipe.servings === "number" &&
            (assertedRecipe.unit === "imperial" || assertedRecipe.unit === "metric");
    }
    else if (possibleRecipe === undefined || possibleRecipe === null) {
        return true;
    }
    else {
        return false;
    }
}
function isId(obj) {
    return typeof obj === "number" || typeof obj === null;
}
function retriveCookbook(cookbookName) {
    var possibleCookbook = fs.readFileSync("cookbookShelf/" + cookbookName + ".json", 'utf-8');
    return JSON.parse(possibleCookbook);
}
function isCookbook(possibleCookbook) {
    console.log("Öppnar iscookbook");
    if (typeof possibleCookbook === "object" || possibleCookbook !== null) {
        var assertedCookbook = possibleCookbook;
        console.log("Is an object, asserts cookbook");
        //console.log(assertedCookbook.keys)
        var test2 = isCookbookValues(assertedCookbook.values);
        //console.log(test1 , "iskeys resultat:")
        console.log(test2, "isCookbookValue resultat: ");
        //console.log(test2 "va returns:")
        return isKeys(assertedCookbook.keys) && test2 && typeof assertedCookbook.entries === "number";
    }
    else {
        console.log("isCookbook hamnar i else");
        return false;
    }
}
function loadCookbook() {
    function createCookbooktest() {
        var keysToHashed = [];
        var myBook = (0, hashtables_1.ph_empty)(3, hashtables_1.hash_id);
        (0, recipe_1.createRecipe)(myBook, keysToHashed);
        (0, recipe_1.createRecipe)(myBook, keysToHashed);
        return myBook;
    }
    //const obj = retriveCookbook("cookbookShelf/italian.json")
    // const cookbook = createCookbooktest()
    // saveCookbook(cookbook)
    var obj = retriveCookbook("japanese");
    if (isCookbook(obj)) {
        var cookbook = obj;
        return cookbook;
    }
    else {
        console.log("Error when loading cookbook.");
        return false;
    }
}
console.log(loadCookbook());
