"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PromptSync = require("prompt-sync");
var list_1 = require("./lib/list");
var hashtables_1 = require("./lib/hashtables");
var recipe_1 = require("../Project-group-21/lib/recipe");
var utilities_1 = require("./lib/utilities");
var ingredients_1 = require("../Project-group-21/lib/ingredients");
var prompt = PromptSync({ sigint: true });
function cookbook(tag, hashedTable, keysToHashed) {
    while (true) {
        var test = (0, utilities_1.questionnaire)(["Create recipe", "Search recipe", "Edit Recipe", "Close cookbook"]);
        switch (test) {
            case (1):
                (0, recipe_1.createRecipe)(hashedTable, keysToHashed);
                break;
            case (2):
                var search = (0, recipe_1.searchRecipe)(keysToHashed, hashedTable);
                if (typeof search === "boolean") {
                    console.log("Recipe not found.");
                }
                else {
                    recipeHandelingMenu(search, hashedTable);
                }
                break;
            case (4):
                return false;
            default:
                console.log("Invalid input");
        }
    }
}
function recipeHandelingMenu(recipe, table) {
    while (true) {
        console.log("What do you want to do?\n");
        switch ((0, utilities_1.questionnaire)(["View recipe", "Edit recipe", "Return"])) {
            case (1):
                (0, recipe_1.viewRecipe)(recipe);
                break;
            case (2):
                ingredientAndMesasurmentsEditSubmenu(recipe, table);
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
        console.log("What do you want to do?\n");
        switch ((0, utilities_1.questionnaire)(["Edit ingredients and measurements", "Edit instructions", "Edit name", "Return"])) {
            case (1):
                ingredientAndMesasurmentsEditSubmenu(recipe, table);
                break;
            case (2):
                console.log("current instructions: " + recipe.instructions);
                recipe.instructions = prompt("");
                break;
            case (3):
                console.log("current name: " + recipe.name);
                recipe.name = prompt("");
                break;
            case (4):
                return false;
            default:
                console.log("Invalid input");
        }
    }
}
function ingredientAndMesasurmentsEditSubmenu(recipe, table) {
    while (true) {
        console.log("What do you want to do?\n");
        switch ((0, utilities_1.questionnaire)(["Change serving amount", "Change units", "Edit ingredients", "Return"])) {
            case (1):
                (0, ingredients_1.changeServing)(recipe, table); //funkar
                break;
            case (2):
                (0, utilities_1.changeUnits)(recipe, table, "switchUnit"); //funkar
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
        console.log("What do you want to do?\n");
        switch ((0, utilities_1.questionnaire)(["add ingredient", "remove ingredient", "edit ingredient", "Return"])) {
            case (1):
                (0, ingredients_1.addIngredient)(recipe);
                break;
            case (2):
                (0, ingredients_1.removeIngredient)(recipe, prompt("What ingredient do you want to remove? > "));
                break;
            case (3):
                (0, ingredients_1.changeIngredients)(recipe, prompt("What ingredient do you want to change? > "));
            case (4):
                return false;
            default:
                console.log("Invalid input");
        }
    }
}
function main() {
    var hashedTable = (0, hashtables_1.ph_empty)(13, hashtables_1.hash_id);
    var keysToHashed = []; //pair(name, id)
    while (true) {
        var test = (0, utilities_1.questionnaire)(["Open", "Quit"]);
        switch (test) {
            case (1):
                cookbook("tag", hashedTable, keysToHashed); //Använder inte tagen just nu så bara placeholder
                break;
            case (2):
                return false;
            default: console.log("default");
        }
    }
}
var firstRecipe = { name: "Goat tomato soup", id: 1001, ingredients: ["tomato", "heavy cream"], amount: [(0, list_1.pair)(200, "g"), (0, list_1.pair)(4, "L")], servings: 4, tags: ["good", "soup"], description: "Here is our mästerverk." };
main();
