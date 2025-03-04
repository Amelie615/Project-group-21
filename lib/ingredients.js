"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeIngredient = makeIngredient;
exports.changeServing = changeServing;
exports.removeIngredient = removeIngredient;
exports.addIngredient = addIngredient;
exports.changeIngredients = changeIngredients;
var list_1 = require("./list");
var PromptSync = require("prompt-sync");
var recipe_1 = require("../lib/recipe");
var prompt = PromptSync({ sigint: true });
function makeIngredient(recipe, name) {
    recipe.ingredients.push(name);
    var ourString = "Enter amount of ".concat(name, "> ");
    var inputMeasurements = prompt(ourString).toLowerCase();
    var integersFromMeasurements = Math.floor(inputMeasurements.match(/(\d+)/)[1]);
    var lettersFromMeasurements = inputMeasurements.replace(/\d+|^\s+|\s+$/g, '');
    recipe.measurements.push((0, list_1.pair)(integersFromMeasurements, lettersFromMeasurements));
}
function changeServing(recipe, table) {
    console.log("Recipe currently serves " + recipe.servings + " people");
    var newServings = parseInt(prompt("New serving size: "), 10);
    for (var i = 0; i < recipe.measurements.length; i++) {
        var currentIngredient = (0, list_1.head)(recipe.measurements[i]);
        recipe.measurements[i] = (0, list_1.pair)(Math.floor(currentIngredient / recipe.servings * newServings), (0, list_1.tail)(recipe.measurements[i]));
    }
    recipe.servings = newServings;
    console.log("The new recipe: \n");
    (0, recipe_1.viewRecipe)(recipe);
}
function removeIngredient(recipe, ingredientSearch) {
    var indexToRemove = recipe.ingredients.indexOf(ingredientSearch);
    if (indexToRemove === 1) {
        console.log("Removed " + recipe.ingredients[indexToRemove] + " from " + recipe.name + "\n");
        recipe.ingredients.splice(indexToRemove, 1);
        recipe.measurements.splice(indexToRemove, 1);
    }
    else {
        console.log("Ingredient doesn't exist");
    }
}
function addIngredient(recipe) {
    while (true) {
        makeIngredient(recipe, prompt("Ingredient name > "));
        if (prompt("Do you want to add another ingredient? y/n > ".toLowerCase() !== "y"))
            return false;
    }
}
function changeIngredients(recipe, ingredientSearch) {
    while (true) {
        var indexToChange = recipe.ingredients.indexOf(ingredientSearch);
        if (indexToChange === 1) {
            console.log("Current ingredient: " + recipe.ingredients[indexToChange] + " " + recipe.measurements[indexToChange]);
            recipe.ingredients.splice(indexToChange, 1);
            recipe.measurements.splice(indexToChange, 1);
            makeIngredient(recipe, prompt("Ingredient name > "));
        }
        else {
            console.log("Ingredient doesn't exist");
        }
        if (prompt("Do you want to change another ingredient? y/n > ").toLowerCase() !== "y") {
            return false;
        }
    }
}
