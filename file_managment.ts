import { Cookbook } from "./main";
import { ph_empty, hash_id, ph_insert, ph_lookup } from "./lib/hashtables";
import { Recipe, createRecipe, Measurements } from "./lib/recipe";
import { Pair } from "./lib/list";
import * as fs from 'fs';
import { validAnswer } from "./lib/utilities";


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



function saveCookbook(cookbook : Cookbook) : void {
    const cookbookName : string = validAnswer("Name your cookbook: >", "", []).toLowerCase()
    if (fs.existsSync("cookbookShelf/" + cookbookName + '.json')) {
        if (validAnswer("A cookbook with the name " + cookbookName + " already exists, do you wish to overwrite it?", "opt", ["y", "n"]).toLowerCase() === "n") {
            console.log("Saving cancelled.")
        } else {
            fs.writeFileSync("cookbookShelf/" + cookbookName + ".json", JSON.stringify(cookbook))
            console.log("Overwritten succesfully. Save completed.")
        }
    } else {
        fs.writeFileSync("cookbookShelf/" + cookbookName + ".json", JSON.stringify(cookbook))
        console.log("Save completed.")
    }
}

//Typeguards
function isCookbook(possibleCookbook : unknown): possibleCookbook is Cookbook {
    console.log("Öppnar iscookbook")
    if (typeof possibleCookbook === "object" || possibleCookbook !== null) {
        const assertedCookbook = possibleCookbook as Cookbook
        console.log("asserts cookbook")
        return isKeys(assertedCookbook.keys) && isCookbookValues(assertedCookbook.values) && typeof assertedCookbook.entries === "number"

        
    } else {
        console.log("isCookbook hamnar i else")
        return false}
        
}

function isKeys(possibleKeys : unknown): possibleKeys is number | null | undefined {
    console.log("Öppnar isKeys")
    return typeof possibleKeys === "number" || possibleKeys === "null" || possibleKeys === "undefined";
}

function isCookbookValues(obj : unknown) : obj is Array<Recipe | undefined> {
    console.log("Öppnar isCookbookValues")
    if (Array.isArray(obj) && obj !== null) {
        const values = obj as unknown[]
        values.every(item => isRecipe(item) || typeof item === undefined)
    } else {console.log("cookbook values returnar false")
        return false}
}

function isRecipe(possibleRecipe : unknown): possibleRecipe is Recipe | undefined { //saknar check för measurements & ingredients
    console.log("Öppnar isRecipe")
    if (typeof possibleRecipe === "object" || possibleRecipe !== null) {
        const assertedRecipe = possibleRecipe as Recipe
        return typeof assertedRecipe.id === "number" && typeof assertedRecipe.instructions === "string" &&
            typeof assertedRecipe.name === "string" && typeof assertedRecipe.servings === "number" &&
            (assertedRecipe.unit === "imperial" || assertedRecipe.unit === "metric")
    } else if (possibleRecipe === undefined){
        return true;
    } else {
       return false; 
    }
    
}
//
function retriveCookbook(filename: string) : object  {
    const possibleCookbook = fs.readFileSync(filename, 'utf-8')
    return JSON.parse(possibleCookbook)
}

function newFunction() {
    // const possibleCookbook : object = retriveCookbook("italian.json")
    // saveCookbook(myBook)
    const obj = retriveCookbook("cookbookShelf/italian.json")
    if (isCookbook(obj)) {
        const cookbook = obj as Cookbook
    } else {console.log("Error when loading cookbook.")}    
}
newFunction()
