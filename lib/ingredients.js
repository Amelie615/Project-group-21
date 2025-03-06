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
var utilities_1 = require("./utilities");
var prompt = PromptSync({ sigint: true });
function makeIngredient(recipe, name, cookbook) {
    var inputMeasurements = prompt("Enter amount of " + name + " > ").toLowerCase(); //Kan inte bli typed som string av anledningar
    if (inputMeasurements === "") {
        console.log("invalid input");
        makeIngredient(recipe, name, cookbook);
        return;
    }
    var integersFromMeasurements = inputMeasurements.match(/(\d+)/); // lägg till "invalid input"
    if (integersFromMeasurements === null) {
        console.log("invalid input");
        makeIngredient(recipe, name, cookbook);
        return;
    }
    else {
        var validints = parseInt(integersFromMeasurements[1]);
        var lettersFromMeasurements = inputMeasurements.replace(/[\d\s]+/g, '');
        if (lettersFromMeasurements === "") {
            console.log("invalid input");
            makeIngredient(recipe, name, cookbook);
            return;
        }
        recipe.ingredients.push(name);
        recipe.measurements.push((0, list_1.pair)(validints, stringToUnit(lettersFromMeasurements)));
        (0, utilities_1.changeUnits)(recipe, cookbook, "");
    }
}
function stringToUnit(unit) {
    var newUnit = "ml";
    for (var i = 0; i < utilities_1.unitstring.length; i++) {
        if (unit === utilities_1.unitstring[i]) {
            newUnit = utilities_1.units[i];
            return newUnit;
        }
    }
    return unit;
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
function addIngredient(recipe, cookbook) {
    var done = true;
    while (done === true) {
        makeIngredient(recipe, prompt("Ingredient name > "), cookbook);
        if (prompt("Do you want to add another ingredient? y/n > ").toLowerCase() !== "y") {
            done = false;
        }
    }
}
function changeIngredients(recipe, cookbook) {
    var done = true;
    while (done === true) {
        var ingredientSearch = prompt("What ingredient do you want to change? > ");
        var indexToChange = recipe.ingredients.indexOf(ingredientSearch);
        console.log(indexToChange); //testmeme
        if (indexToChange !== -1) {
            console.log("Current ingredient: " + recipe.ingredients[indexToChange] + " " + recipe.measurements[indexToChange]);
            recipe.ingredients.splice(indexToChange, 1);
            recipe.measurements.splice(indexToChange, 1);
            makeIngredient(recipe, prompt("Ingredient name > "), cookbook);
        }
        else {
            console.log("Ingredient doesn't exist");
        }
        if (prompt("Do you want to change another ingredient? y/n > ").toLowerCase() !== "y") {
            done = false;
        }
    }
}
