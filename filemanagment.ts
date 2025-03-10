import { Cookbook, CookbookKeys } from "./main";
import { hash_id } from "./lib/hashtables";
import { Recipe} from "./lib/recipe";
import * as fs from 'fs';
import { validAnswer } from "./lib/utilities";

/**
 * Checks whether an object fits the type of keys in Cookbook
 * @param {unknown} obj - the object to examine
 * @returns {boolean} Returns true if the object fits the type, false if not.
 */
function isKeys(obj : unknown): obj is Array <number | null | undefined> {
    if (Array.isArray(obj)) {
        const keys = obj as Array<unknown>
        return keys.every(item => typeof item === "number" 
                                         || item === null 
                                         || item === undefined)
    } else {return false} 
}

/**
 * Checks whether an object fits the type of values in Cookbook
 * @param {unknown} obj - the object to examine
 * @returns {boolean} Returns true if the object fits the type, false if not.
 */
function isCookbookValues(obj : unknown) : obj is Array<Recipe | undefined> { 
    if (Array.isArray(obj) && obj !== null) {
        const values = obj as unknown[]
        const testtracker = values
                            .every(item => isRecipe(item))
        return testtracker 
    } else {
        return false}
}

/**
 * Checks whether an object fits the type Recipe.
 * @param {unknown} obj - the object to examine
 * @returns {boolean} Returns true if the object fits the type, false if not.
 */
function isRecipe(obj : unknown): obj is Recipe | null {
    if (typeof obj === "object" && obj !== null) {
        const assertedRecipe = obj as Recipe
        return (isId(assertedRecipe.id)) 
                && typeof assertedRecipe.instructions === "string" 
                && typeof assertedRecipe.name === "string" 
                && typeof assertedRecipe.servings === "number" 
                && (assertedRecipe.unit === "imperial" 
                || assertedRecipe.unit === "metric")
    } else if (obj === undefined || obj === null){
        return true;
    } else {
       return false; 
    }
}

/**
 * Checks whether an object fits the type Recipe.
 * @param {unknown} obj - the object to examine
 * @returns {boolean} Returns true if the object fits the type, false if not.
 */
function isId(obj: unknown): obj is number | null {
    return typeof obj === "number" 
           || typeof obj === null
}

/**
 * Checks whether an object fits the type Cookbook.
 * @param {unknown} obj - the object to examine
 * @returns {boolean} Returns true if the object fits the type, false if not.
 */
function isCookbook(obj : unknown): obj is Cookbook {
    if (typeof obj === "object" || obj !== null) {
        const assertedCookbook = obj as Cookbook
        return isKeys(assertedCookbook.keys) 
               && isCookbookValues(assertedCookbook.values) 
               && typeof assertedCookbook.entries === "number"
    } else {
        console.log("The file does not contain a valid cookbook. ")
        return false
    } 
}

/**
 * Retrieves the content of a file as an object.
 * @param {string} cookbookName - filename of the file to load
 * @returns {object | undefined} Returns the content of the file if found, otherwise undefined.
 */
function retriveCookbook(cookbookName: string) : object | undefined {
    try {
        fs.readFileSync("cookbookshelf/" 
                            + cookbookName 
                            + ".json",
                        'utf-8')
    } 
    catch (error) {
        console.log("The cookbook could not be found. ")
        return;
    }
    const obj = fs.readFileSync("cookbookshelf/" 
                                    + cookbookName 
                                    + ".json",
                                'utf-8')
    return JSON.parse(obj)
}

/**
 * Retrieves data from a file in /cookbookshelf/ and translates it to a Cookbook
 * and their respective CookbookKeys, if applicable. 
 * If the data has been changed enough to be untranslatable, 
 * the function will instead log an error message and return undefined.
 * @returns {[Cookbook, CookbookKeys] | undefined} an array containing the Cookbook and correlating
 * CookbookKeys if found, undefined if not found or untranslatable.
 */
export function loadCookbook() : [Cookbook, CookbookKeys] | undefined  {
    let notFound : boolean = true
    while (notFound) {
        const obj : object | undefined = retriveCookbook(validAnswer("What name does your desired cookbook have? > ",
                                                                     "", 
                                                                     []))
        if (obj === undefined) {
            if (validAnswer("Try again? (y/n) > ", 
                            "opt", 
                            ["y", "n"]).toLowerCase() === "n") {
                return
            }
        } else {
            const retrievedObject = obj as {book: object, bookKeys: object}
            if (isCookbook(retrievedObject.book) && Array.isArray(retrievedObject.bookKeys)) { 
                const assertedObject = retrievedObject as {book: Cookbook, bookKeys: CookbookKeys}
                assertedObject.book.hash = hash_id
                const cookbookNKeys : [Cookbook , CookbookKeys] = [assertedObject.book,
                                                                   assertedObject.bookKeys]
                if (cookbookNKeys[1].length !== cookbookNKeys[0].entries) {
                    console.log("Error: There is a mismatch between keys and recipe entries.\n")
                    return
                } else {
                    return cookbookNKeys
                }
            } else {console.log("Error: Something went wrong when loading the cookbook.\n")
                return
            }
        }
    } return
}

/**
 * Saves a cookbook and correlating keys to the folder ./cookbookshelf/
 * @param {Recipe} cookbook - the cookbook to be saved
 * @param {CookbookKeys} keys - the keys and names for each recipe in the cookbook
 */
export function saveCookbook(cookbook : Cookbook, keys : CookbookKeys) : void {
    const cookbookName : string = validAnswer("Name your cookbook: > ", 
                                              "", 
                                              []).toLowerCase()
    if (fs.existsSync("cookbookshelf/" 
                      + cookbookName + 
                      '.json')) {
        if (validAnswer("A cookbook with the name " +
                        cookbookName +
                        " already exists, do you wish to overwrite it? > ",
                        "opt",
                        ["y", "n"]).toLowerCase() === "n") {
            console.log("Saving cancelled.")
        } else {
            cookbook.hash.toString()  //Functions are removed when stringified, in this case simply converting to a string solves the issue (pretty cool find/fix)
            const itemToSave = {book: cookbook, bookKeys: keys}
            fs.writeFileSync("cookbookshelf/" 
                                + cookbookName 
                                + ".json",
                              JSON.stringify(itemToSave))
            console.log("Overwritten succesfully. Save completed.\n")
        }
    } else {
        const itemToSave = {book: cookbook, bookKeys: keys}
        fs.writeFileSync("cookbookshelf/" 
                            + cookbookName 
                            + ".json",
                          JSON.stringify(itemToSave))
        console.log("Save completed.")
    }
}
