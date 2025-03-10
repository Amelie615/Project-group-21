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
    var active = true;
    while (active) {
        (0, utilities_1.line)();
        console.log("What do you want to do?");
        switch ((0, utilities_1.questionnaire)(["Create recipe",
            "Search recipe",
            "Save & Exit cookbook"])) {
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
                if ((0, utilities_1.validAnswer)("All changes will be lost if you don't save this cookbook before exiting. Do you wish to save it? (y/n) > ", "opt", ["y", "n"]) === "y") {
                    (0, filemanagment_1.saveCookbook)(cookbook, keys);
                }
                active = false;
                break;
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
    var active = true;
    while (active) {
        (0, utilities_1.line)();
        console.log("What do you want to do?");
        switch ((0, utilities_1.questionnaire)(["View recipe",
            "Edit recipe",
            "Return"])) {
            case (1):
                (0, recipe_1.viewRecipe)(recipe);
                break;
            case (2):
                editRecipe(recipe, cookbook);
                break;
            case (3):
                active = false;
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
    var active = true;
    while (active) {
        (0, utilities_1.line)();
        console.log("What do you want to do?");
        switch ((0, utilities_1.questionnaire)(["Edit ingredients and measurements",
            "Edit instructions",
            "Edit name",
            "Return"])) {
            case (1):
                ingredientsMenu(recipe, cookbook);
                break;
            case (2):
                console.log("Current instructions: "
                    + recipe.instructions);
                recipe.instructions = (0, utilities_1.validAnswer)("New Instructions: > ", "", []);
                break;
            case (3):
                console.log("Current name: "
                    + recipe.name);
                recipe.name = (0, utilities_1.validAnswer)("New name: > ", "", []);
                break;
            case (4):
                active = false;
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
    var active = true;
    while (active) {
        (0, utilities_1.line)();
        console.log("What do you want to do?");
        switch ((0, utilities_1.questionnaire)(["Change serving amount",
            "Change units",
            "Edit ingredients",
            "Return"])) {
            case (1):
                (0, ingredients_1.changeServing)(recipe);
                break;
            case (2):
                (0, utilities_1.changeUnits)(recipe, cookbook, "switchUnit");
                (0, recipe_1.viewRecipe)(recipe);
                break;
            case (3):
                editIngredients(recipe, cookbook); //Submenu
                break;
            case (4):
                active = false;
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
    var active = true;
    while (active) {
        (0, utilities_1.line)();
        console.log("What do you want to do?");
        switch ((0, utilities_1.questionnaire)(["add ingredient",
            "remove ingredient",
            "edit ingredient",
            "Return"])) {
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
                active = false;
            default:
                console.log("Invalid input");
        }
    }
}
/**
 * initializes a new cookbook
 * @param {number} size the size of the new hashtable
 * @returns an empty cookbook hashtable
 */
function createCookbook(size) {
    var emptyCookbook = (0, hashtables_1.ph_empty)(size, hashtables_1.hash_id);
    return emptyCookbook;
}
/**
 * Main function where you can load an existing cookbook, create a new cookbook or quit the program
 */
function main() {
    var keysToHashed = [];
    var done = true;
    while (done) {
        switch ((0, utilities_1.questionnaire)(["Load",
            "Create new Cookbook",
            "Quit"])) {
            case (1):
                var loadedCookbook = (0, filemanagment_1.loadCookbook)();
                if (loadedCookbook !== undefined) {
                    cookbookMenu(loadedCookbook[0], loadedCookbook[1]);
                }
                break;
            case (2):
                var sizeOfCookbook = Number((0, utilities_1.validAnswer)("How many recipes should your cookbook fit? (max. 250) > ", "num", []));
                (0, utilities_1.round)(sizeOfCookbook, 0);
                sizeOfCookbook > 250
                    ? sizeOfCookbook = 250
                    : sizeOfCookbook < 1
                        ? sizeOfCookbook = 1
                        : sizeOfCookbook;
                var newCookbook = createCookbook(sizeOfCookbook);
                cookbookMenu(newCookbook, keysToHashed);
                break;
            case (3):
                done = false;
                break;
            default: console.log("Invalid Answer.");
        }
    }
}
main();
