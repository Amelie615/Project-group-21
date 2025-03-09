"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveCookbook = saveCookbook;
exports.loadCookbook = loadCookbook;
var hashtables_1 = require("./lib/hashtables");
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
function saveCookbook(cookbook, keysToHashed) {
    var cookbookName = (0, utilities_1.validAnswer)("Name your cookbook: >", "", []).toLowerCase();
    if (fs.existsSync("cookbookShelf/" + cookbookName + '.json')) {
        if ((0, utilities_1.validAnswer)("A cookbook with the name " + cookbookName + " already exists, do you wish to overwrite it?", "opt", ["y", "n"]).toLowerCase() === "n") {
            console.log("Saving cancelled.");
        }
        else {
            cookbook.hash.toString(); //Functions are removed when stringified, in this case simply converting to a string solves the issue (pretty cool find/fix)
            var itemToSave = { book: cookbook, bookKeys: keysToHashed };
            fs.writeFileSync("cookbookShelf/" + cookbookName + ".json", JSON.stringify(itemToSave));
            console.log("Overwritten succesfully. Save completed.");
        }
    }
    else {
        var itemToSave = { book: cookbook, bookKeys: keysToHashed };
        fs.writeFileSync("cookbookShelf/" + cookbookName + ".json", JSON.stringify(itemToSave));
        console.log("Save completed.");
    }
}
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
    //console.log("Öppnar isCookbookValues")
    if (Array.isArray(obj) && obj !== null) {
        var values = obj;
        //console.log(values, "values")
        var testtracker = values.every(function (item) { return isRecipe(item); });
        //console.log(testtracker, "testtracker")
        return testtracker; //det här blir false
    }
    else { //console.log("cookbook values returnar false")
        return false;
    }
}
function isRecipe(possibleRecipe) {
    //console.log("Öppnar isRecipe")
    if (typeof possibleRecipe === "object" && possibleRecipe !== null) {
        var assertedRecipe = possibleRecipe;
        //console.log(assertedRecipe)
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
    try {
        fs.readFileSync("cookbookShelf/" + cookbookName + ".json", 'utf-8');
    }
    catch (error) {
        console.log("The cookbook could not be found");
        return;
    }
    var obj = fs.readFileSync("cookbookShelf/" + cookbookName + ".json", 'utf-8');
    return JSON.parse(obj);
}
function isCookbook(possibleCookbook) {
    //console.log("Öppnar iscookbook")
    if (typeof possibleCookbook === "object" || possibleCookbook !== null) {
        var assertedCookbook = possibleCookbook;
        console.log(assertedCookbook, "has been asserted as cookbook");
        //console.log("Is an object, asserts cookbook")
        //console.log(assertedCookbook.keys)
        //const test2 = isCookbookValues(assertedCookbook.values)
        //console.log(test1 , "iskeys resultat:")
        //console.log(test2, "isCookbookValue resultat: ")
        //console.log(test2 "va returns:")
        return isKeys(assertedCookbook.keys) && isCookbookValues(assertedCookbook.values) && typeof assertedCookbook.entries === "number";
    }
    else {
        //console.log("isCookbook hamnar i else")
        return false;
    }
}
function loadCookbook() {
    var notFound = true;
    while (notFound) {
        var obj = retriveCookbook((0, utilities_1.validAnswer)("What name does your desired cookbook have?", "", []));
        if (obj === undefined) {
            if ((0, utilities_1.validAnswer)("Try again? (y/n)", "opt", ["y", "n"]).toLowerCase() === "n") {
                return;
            }
        }
        else { ///fortsätt jobba här med det nya recordet
            var retrievedObject = obj;
            //console.log(savedItem.bookKeys)
            if (isCookbook(retrievedObject.book) && Array.isArray(retrievedObject.bookKeys)) { //kan utveckla array.isarray så d faktiskt funkar
                var assertedObject = retrievedObject;
                assertedObject.book.hash = hashtables_1.hash_id;
                var cookbookNKeys = [assertedObject.book, assertedObject.bookKeys]; //cookbook: savedItem.cookbook as Cookbook
                //console.log(savedItem.bookKeys, typeof savedItem.bookKeys)
                console.log(cookbookNKeys);
                return cookbookNKeys;
            }
            else {
                console.log("Error when loading cookbook.");
                return;
            }
        }
    }
    return;
}
//console.log(loadCookbook())
