"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveCookbook = saveCookbook;
exports.loadCookbook = loadCookbook;
var hashtables_1 = require("./lib/hashtables");
var fs = require("fs");
var utilities_1 = require("./lib/utilities");
/**
 * Saves a cookbook and correlating keys to the folder ./cookbookshelf/
 * @param {Recipe} cookbook - the cookbook to be saved
 * @param {CookbookKeys} keys - the keys and names for each recipe in the cookbook
 */
function saveCookbook(cookbook, keys) {
    var cookbookName = (0, utilities_1.validAnswer)("Name your cookbook: > ", "", []).toLowerCase();
    if (fs.existsSync("cookbookShelf/"
        + cookbookName +
        '.json')) {
        if ((0, utilities_1.validAnswer)("A cookbook with the name " +
            cookbookName +
            " already exists, do you wish to overwrite it? > ", "opt", ["y", "n"]).toLowerCase() === "n") {
            console.log("Saving cancelled.");
        }
        else {
            cookbook.hash.toString(); //Functions are removed when stringified, in this case simply converting to a string solves the issue (pretty cool find/fix)
            var itemToSave = { book: cookbook, bookKeys: keys };
            fs.writeFileSync("cookbookShelf/"
                + cookbookName
                + ".json", JSON.stringify(itemToSave));
            console.log("Overwritten succesfully. Save completed.\n");
        }
    }
    else {
        var itemToSave = { book: cookbook, bookKeys: keys };
        fs.writeFileSync("cookbookShelf/"
            + cookbookName
            + ".json", JSON.stringify(itemToSave));
        console.log("Save completed.");
    }
}
/**
 * Checks whether an object fits the type of keys in Cookbook
 * @param {unknown} obj - the object to examine
 * @returns {boolean} Returns true if the object fits the type, false if not.
 */
function isKeys(obj) {
    if (Array.isArray(obj)) {
        var keys = obj;
        return keys.every(function (item) { return typeof item === "number"
            || item === null
            || item === undefined; });
    }
    else {
        return false;
    }
}
/**
 * Checks whether an object fits the type of values in Cookbook
 * @param {unknown} obj - the object to examine
 * @returns {boolean} Returns true if the object fits the type, false if not.
 */
function isCookbookValues(obj) {
    if (Array.isArray(obj) && obj !== null) {
        var values = obj;
        var testtracker = values
            .every(function (item) { return isRecipe(item); });
        return testtracker;
    }
    else {
        return false;
    }
}
/**
 * Checks whether an object fits the type Recipe.
 * @param {unknown} obj - the object to examine
 * @returns {boolean} Returns true if the object fits the type, false if not.
 */
function isRecipe(obj) {
    if (typeof obj === "object" && obj !== null) {
        var assertedRecipe = obj;
        return (isId(assertedRecipe.id))
            && typeof assertedRecipe.instructions === "string"
            && typeof assertedRecipe.name === "string"
            && typeof assertedRecipe.servings === "number"
            && (assertedRecipe.unit === "imperial"
                || assertedRecipe.unit === "metric");
    }
    else if (obj === undefined || obj === null) {
        return true;
    }
    else {
        return false;
    }
}
/**
 * Checks whether an object fits the type Recipe.
 * @param {unknown} obj - the object to examine
 * @returns {boolean} Returns true if the object fits the type, false if not.
 */
function isId(obj) {
    return typeof obj === "number"
        || typeof obj === null;
}
/**
 * Retrieves the content of a file as an object.
 * @param {string} cookbookName - filename of the file to load
 * @returns {object | undefined} Returns the content of the file if found, otherwise undefined.
 */
function retriveCookbook(cookbookName) {
    try {
        fs.readFileSync("cookbookShelf/"
            + cookbookName
            + ".json", 'utf-8');
    }
    catch (error) {
        console.log("The cookbook could not be found. ");
        return;
    }
    var obj = fs.readFileSync("cookbookShelf/"
        + cookbookName
        + ".json", 'utf-8');
    return JSON.parse(obj);
}
/**
 * Checks whether an object fits the type Cookbook.
 * @param {unknown} obj - the object to examine
 * @returns {boolean} Returns true if the object fits the type, false if not.
 */
function isCookbook(obj) {
    if (typeof obj === "object" || obj !== null) {
        var assertedCookbook = obj;
        return isKeys(assertedCookbook.keys)
            && isCookbookValues(assertedCookbook.values)
            && typeof assertedCookbook.entries === "number";
    }
    else {
        console.log("The file does not contain a valid cookbook. ");
        return false;
    }
}
/**
 * Retrieves data from a file in /cookbookShelf/ and translates it to a Cookbook
 * and their respective CookbookKeys, if applicable.
 * If the data has been changed enough to be untranslatable,
 * the function will instead log an error message and return undefined.
 * @returns {[Cookbook, CookbookKeys] | undefined} an array containing the Cookbook and correlating
 * CookbookKeys if found, undefined if not found or untranslatable.
 */
function loadCookbook() {
    var notFound = true;
    while (notFound) {
        var obj = retriveCookbook((0, utilities_1.validAnswer)("What name does your desired cookbook have? > ", "", []));
        if (obj === undefined) {
            if ((0, utilities_1.validAnswer)("Try again? (y/n) > ", "opt", ["y", "n"]).toLowerCase() === "n") {
                return;
            }
        }
        else {
            var retrievedObject = obj;
            if (isCookbook(retrievedObject.book) && Array.isArray(retrievedObject.bookKeys)) {
                var assertedObject = retrievedObject;
                assertedObject.book.hash = hashtables_1.hash_id;
                var cookbookNKeys = [assertedObject.book,
                    assertedObject.bookKeys];
                if (cookbookNKeys[1].length !== cookbookNKeys[0].entries) {
                    console.log("Error: There is a mismatch between keys and recipe entries.\n");
                    return;
                }
                else {
                    return cookbookNKeys;
                }
            }
            else {
                console.log("Error: Something went wrong when loading the cookbook.\n");
                return;
            }
        }
    }
    return;
}
