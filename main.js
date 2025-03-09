"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PromptSync = require("prompt-sync");
var hashtables_1 = require("./lib/hashtables");
var recipe_1 = require("../Project-group-21/lib/recipe");
var utilities_1 = require("./lib/utilities");
var ingredients_1 = require("../Project-group-21/lib/ingredients");
var filemanagment_1 = require("./filemanagment");
var prompt = PromptSync({ sigint: true });
/**
 * Menu for choosing what to do in cookbook
 * @param {Cookbook} book the cookbook hashtable
 * @param {CookbookKeys} keys id and name for every recipe
 */
function cookbookMenu(cookbook, keys) {
    var done = true;
    while (done) {
        (0, utilities_1.line)();
        console.log("What do you want to do?");
        switch ((0, utilities_1.questionnaire)(["Create recipe", "Search recipe", "Save & Exit cookbook"])) {
            case (1):
                (0, recipe_1.createRecipe)(cookbook, keys);
                break;
            case (2):
                var search = (0, recipe_1.searchRecipe)(keys, cookbook);
                if (typeof search === "boolean") {
                    console.log("Recipe not found.");
                }
                else {
                    recipeMenu(search, cookbook);
                }
                break;
            case (3):
                if ((0, utilities_1.validAnswer)("All changes will be lost if you don't save this cookbook before exiting. Do you wish to save it? (y/n)", "opt", ["y", "n"]) === "y") {
                    (0, filemanagment_1.saveCookbook)(cookbook, keys);
                }
                done = false;
            default:
                console.log("Invalid input");
        }
    }
}
/**
 * Menu for choosing what to do with current recipe
 * @param {Recipe} recipe the current recipe
 * @param {Cookbook} cookbook the cookbook hashtable
 */
function recipeMenu(recipe, cookbook) {
    var done = true;
    while (done) {
        (0, utilities_1.line)();
        console.log("What do you want to do?");
        switch ((0, utilities_1.questionnaire)(["View recipe", "Edit recipe", "Return"])) {
            case (1):
                (0, recipe_1.viewRecipe)(recipe);
                break;
            case (2):
                editRecipe(recipe, cookbook);
                break;
            case (3):
                done = false;
            default:
                console.log("Invalid input");
                break;
        }
    }
}
/**
 * Menu for choosing how to edit recipe
 * @param {Recipe} recipe the current recipe
 * @param {Cookbook} cookbook the cookbook hashtable
 */
function editRecipe(recipe, cookbook) {
    (0, recipe_1.viewRecipe)(recipe);
    var done = true;
    while (done) {
        (0, utilities_1.line)();
        console.log("What do you want to do?");
        switch ((0, utilities_1.questionnaire)(["Edit ingredients and measurements", "Edit instructions", "Edit name", "Return"])) {
            case (1):
                ingredientsMenu(recipe, cookbook);
                break;
            case (2):
                console.log("Current instructions: " + recipe.instructions);
                recipe.instructions = (0, utilities_1.validAnswer)("New Instructions: > ", "", []);
                break;
            case (3):
                console.log("Current name: " + recipe.name);
                recipe.name = (0, utilities_1.validAnswer)("New name: > ", "", []);
                break;
            case (4):
                done = false;
            default:
                console.log("Invalid input");
        }
    }
}
/**
 * Menu for choosing how to edit ingredients/measurments/servings
 * @param {Recipe} recipe the current recipe
 * @param {Cookbook} cookbook the cookbook hashtable
 */
function ingredientsMenu(recipe, cookbook) {
    while (true) {
        (0, utilities_1.line)();
        console.log("What do you want to do?");
        switch ((0, utilities_1.questionnaire)(["Change serving amount", "Change units", "Edit ingredients", "Return"])) {
            case (1):
                (0, ingredients_1.changeServing)(recipe); //funkar
                break;
            case (2):
                (0, utilities_1.changeUnits)(recipe, cookbook, "switchUnit"); //funkar inte
                (0, recipe_1.viewRecipe)(recipe);
                break;
            case (3):
                editIngredients(recipe, cookbook); //Submenu
                break;
            case (4):
                return false;
            default:
                console.log("Invalid input");
                break;
        }
    }
}
/**
 * Menu for choosing how to edit ingredients
 * @param {Recipe} recipe the current recipe
 * @param {Cookbook} cookbook the cookbook hashtable
 */
function editIngredients(recipe, cookbook) {
    while (true) {
        (0, utilities_1.line)();
        console.log("What do you want to do?");
        switch ((0, utilities_1.questionnaire)(["add ingredient", "remove ingredient", "edit ingredient", "Return"])) {
            case (1):
                console.log("current ingredients:");
                (0, ingredients_1.viewIngredients)(recipe);
                (0, utilities_1.line)();
                (0, ingredients_1.addIngredient)(recipe, cookbook);
                break;
            case (2):
                console.log("current ingredients:");
                (0, ingredients_1.viewIngredients)(recipe);
                (0, ingredients_1.removeIngredient)(recipe, (0, utilities_1.validAnswer)("What ingredient do you want to remove? > ", "", []));
                break;
            case (3):
                console.log("current ingredients:");
                (0, ingredients_1.viewIngredients)(recipe);
                (0, ingredients_1.changeIngredients)(recipe, cookbook);
                break;
            case (4):
                return false;
            default:
                console.log("Invalid input");
        }
    }
}
function createCookbook(size) {
    var emptyCookbook = (0, hashtables_1.ph_empty)(size, hashtables_1.hash_id);
    return emptyCookbook;
}
/**
 * Main function where you can open/quit
 * initializes cookbook
 */
function main() {
    //const hashedTable: Cookbook = ph_empty(3, hash_id)
    var keysToHashed = []; //pair(name, id)
    var done = true;
    while (done) {
        // const test = questionnaire(["Load", "Create new Cookbook", "Quit"])
        switch ((0, utilities_1.questionnaire)(["Load", "Create new Cookbook", "Quit"])) {
            case (1):
                var loadedCookbook = (0, filemanagment_1.loadCookbook)();
                console.log(loadedCookbook);
                if (loadedCookbook !== undefined) {
                    cookbookMenu(loadedCookbook[0], loadedCookbook[1]);
                }
                break;
            case (2):
                var newCookbook = createCookbook(Number((0, utilities_1.validAnswer)("How many recipes should your cookbook fit? (max. 250)", "num", [])));
                cookbookMenu(newCookbook, keysToHashed);
                break;
            case (3):
                done = false;
                break;
            default: console.log("default"); //bör inte existera?
        }
    }
}
//const firstRecipe = {name: "Goat tomato soup", id: 1001, ingredients: ["tomato", "heavy cream"], amount: [pair(200, "g"), pair(4, "L")], servings: 4, tags: ["good", "soup"], description: "Here is our mästerverk."}
main();
