"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PromptSync = require("prompt-sync");
var hashtables_1 = require("./lib/hashtables");
var recipe_1 = require("../Project-group-21/lib/recipe");
var utilities_1 = require("./lib/utilities");
var ingredients_1 = require("../Project-group-21/lib/ingredients");
var prompt = PromptSync({ sigint: true });
/**
 * Menu for choosing what to do in cookbook
 * @param table the hash table
 * @param table the hash table
 * @returns all keys in the table
 */
function cookbook(book, keys) {
    while (true) {
        (0, utilities_1.line)();
        console.log("What do you want to do?");
        switch ((0, utilities_1.questionnaire)(["Create recipe", "Search recipe", "Close cookbook"])) {
            case (1):
                (0, recipe_1.createRecipe)(book, keys);
                break;
            case (2):
                var search = (0, recipe_1.searchRecipe)(keys, book);
                if (typeof search === "boolean") {
                    console.log("Recipe not found.");
                }
                else {
                    recipeMenu(search, book);
                }
                break;
            case (3):
                return false;
            default:
                console.log("Invalid input");
        }
    }
}
function recipeMenu(recipe, table) {
    while (true) {
        (0, utilities_1.line)();
        console.log("What do you want to do?");
        switch ((0, utilities_1.questionnaire)(["View recipe", "Edit recipe", "Return"])) {
            case (1):
                (0, recipe_1.viewRecipe)(recipe);
                break;
            case (2):
                ingredientsMenu(recipe, table);
                break;
            case (3):
                return false;
            default:
                console.log("Invalid input");
                break;
        }
    }
}
function editRecipe(recipe, table) {
    (0, recipe_1.viewRecipe)(recipe);
    while (true) {
        (0, utilities_1.line)();
        console.log("What do you want to do?");
        switch ((0, utilities_1.questionnaire)(["Edit ingredients and measurements", "Edit instructions", "Edit name", "Return"])) {
            case (1):
                ingredientsMenu(recipe, table);
                break;
            case (2):
                console.log("Current instructions: " + recipe.instructions);
                recipe.instructions = (0, utilities_1.validAnswer)("New Instructions: > ", "");
                break;
            case (3):
                console.log("Current name: " + recipe.name);
                recipe.name = (0, utilities_1.validAnswer)("New name: > ", "");
                break;
            case (4):
                return false;
            default:
                console.log("Invalid input");
        }
    }
}
function ingredientsMenu(recipe, table) {
    while (true) {
        (0, utilities_1.line)();
        console.log("What do you want to do?");
        switch ((0, utilities_1.questionnaire)(["Change serving amount", "Change units", "Edit ingredients", "Return"])) {
            case (1):
                (0, ingredients_1.changeServing)(recipe, table); //funkar
                break;
            case (2):
                (0, utilities_1.changeUnits)(recipe, table, "switchUnit"); //funkar inte
                (0, recipe_1.viewRecipe)(recipe);
                break;
            case (3):
                editIngredients(recipe, table); //Submenu
                break;
            case (4):
                return false;
            default:
                console.log("Invalid input");
                break;
        }
    }
}
function editIngredients(recipe, table) {
    while (true) {
        (0, utilities_1.line)();
        console.log("What do you want to do?");
        switch ((0, utilities_1.questionnaire)(["add ingredient", "remove ingredient", "edit ingredient", "Return"])) {
            case (1):
                (0, ingredients_1.addIngredient)(recipe, table);
                break;
            case (2):
                // printa ut ingredients
                (0, ingredients_1.removeIngredient)(recipe, (0, utilities_1.validAnswer)("What ingredient do you want to remove? > ", ""));
                break;
            case (3):
                // printa ut ingredients
                (0, ingredients_1.changeIngredients)(recipe, table);
                break;
            case (4):
                return false;
                break;
            default:
                console.log("Invalid input");
        }
    }
}
function main() {
    var hashedTable = (0, hashtables_1.ph_empty)(3, hashtables_1.hash_id);
    var keysToHashed = []; //pair(name, id)
    while (true) {
        var test = (0, utilities_1.questionnaire)(["Open", "Quit"]);
        switch (test) {
            case (1):
                cookbook(hashedTable, keysToHashed); //Använder inte tagen just nu så bara placeholder
                break;
            case (2):
                return false;
                break;
            default: console.log("default");
        }
    }
}
//const firstRecipe = {name: "Goat tomato soup", id: 1001, ingredients: ["tomato", "heavy cream"], amount: [pair(200, "g"), pair(4, "L")], servings: 4, tags: ["good", "soup"], description: "Here is our mästerverk."}
main();
