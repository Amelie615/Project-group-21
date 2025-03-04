"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeServing = changeServing;
exports.removeIngredient = removeIngredient;
exports.addIngredient = addIngredient;
exports.changeIngredients = changeIngredients;
var list_1 = require("./list");
var PromptSync = require("prompt-sync");
var utilities_1 = require("./utilities");
var recipe_1 = require("../lib/recipe");
var prompt = PromptSync({ sigint: true });
function changeServing(recipe, table) {
    console.log("Recipe currently serves " + recipe.servings + " people");
    var newServings = parseInt(prompt("New serving size: "), 10);
    for (var i = 0; i < recipe.measurements.length; i++) {
        var currentIngredient = (0, list_1.head)(recipe.measurements[i]);
        recipe.measurements[i] = (0, list_1.pair)(currentIngredient / recipe.servings * newServings, (0, list_1.tail)(recipe.measurements[i]));
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
    //recipe.ingredients.push(what ever vi returnar från makeIngredient())
    //recipe.measurements.puch(what ever vi returnar från makeIngredient())
}
function changeIngredients(recipe, ingredientSearch) {
    while (true) {
        var indexToChange = recipe.ingredients.indexOf(ingredientSearch);
        if (indexToChange === 1) {
            console.log("Current ingredient: " + recipe.ingredients[indexToChange] + " " + recipe.measurements[indexToChange]);
            var newIngredient = prompt("Name a ingredient > ");
            recipe.ingredients[indexToChange];
            var ourString = "Enter amount of ".concat(newIngredient, "> ");
            var inputMeasurements = prompt(ourString);
            var integersFromMeasurements = inputMeasurements.match(/(\d+)/)[1];
            var lettersFromMeasurements = ""; //ful default
            for (var i = 0; i < utilities_1.units.length; i++) {
                if (inputMeasurements.search(utilities_1.units[i]) === -1) {
                    continue;
                }
                else {
                    lettersFromMeasurements = utilities_1.units[i];
                }
            }
            recipe.measurements[indexToChange] = (0, list_1.pair)(integersFromMeasurements, lettersFromMeasurements);
        }
        else {
            console.log("Ingredient doesn't exist");
        }
        console.log("Do you want to change another ingredient? y/n");
        if (prompt("> ").toLowerCase() !== "y") {
            return false;
        }
    }
    //ska bli
    //let indexToChange: number = recipe.ingredients.indexOf(ingredientSearch)
    //if(indexToChange === 1) {
    //  console.log("Current ingredient: " + recipe.ingredients[indexToChange] + " " + recipe.measurements[indexToChange])
    //  recipe.ingredient[indexToChange] = what ever vi returnar från den som är namnet
    //  recipe.measurements[indexToChange] = what ever vi returnar från measurments delen
    //} else { console.log("Ingredient doesn't exist") }
    //}
}
