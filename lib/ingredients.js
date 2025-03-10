"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeIngredient = makeIngredient;
exports.changeServing = changeServing;
exports.removeIngredient = removeIngredient;
exports.addIngredient = addIngredient;
exports.changeIngredients = changeIngredients;
exports.viewIngredients = viewIngredients;
var list_1 = require("./list");
var PromptSync = require("prompt-sync");
var recipe_1 = require("../lib/recipe");
var utilities_1 = require("./utilities");
var prompt = PromptSync({ sigint: true });
/**
 * Create a new ingredient
 * @param {Recipe} recipe the current recipe
 * @param {string} name name of the new ingredient
 * @param {Cookbook} cookbook the cookbook hashtable
 */
function makeIngredient(recipe, name, cookbook) {
    var inputprompt = "Enter amount of "
        + name
        + " > ";
    var inputMeasurements = (0, utilities_1.validAnswer)(inputprompt, "", []).toLowerCase();
    var integersFromMeasurements = inputMeasurements.match(/(\d+)/);
    if (integersFromMeasurements === null) {
        console.log("Invalid input");
        makeIngredient(recipe, name, cookbook);
        return;
    }
    else {
        var validints = parseInt(integersFromMeasurements[1]);
        var lettersFromMeasurements = inputMeasurements
            .replace(/[\d\s]+/g, '');
        if (lettersFromMeasurements === "") {
            console.log("Invalid input");
            makeIngredient(recipe, name, cookbook);
            return;
        }
        recipe.ingredients.push(name);
        recipe.measurements.push((0, list_1.pair)(validints, (0, utilities_1.stringToUnit)(lettersFromMeasurements)));
        (0, utilities_1.changeUnits)(recipe, cookbook, "");
    }
}
/**
 * Change serving amount for current recipe
 * @param {Recipe} recipe the current recipe
 * @param {Cookbook} cookbook the cookbook hashtable
 */
function changeServing(recipe) {
    if (recipe.servings < 1) {
        console.log("Recipe lacks reasonable serving amounts for scaling\n");
    }
    else if (recipe.servings !== 0) {
        console.log("Recipe currently serves "
            + recipe.servings
            + " people");
        var newServings = parseInt((0, utilities_1.validAnswer)("New serving size: ", "num", []), 10);
        for (var i = 0; i < recipe.measurements.length; i++) {
            var currentIngredient = (0, list_1.head)(recipe.measurements[i]);
            recipe.measurements[i] = (0, list_1.pair)((0, utilities_1.round)(currentIngredient / recipe.servings * newServings, 2), (0, list_1.tail)(recipe.measurements[i]));
        }
        recipe.servings = newServings;
        console.log("The new recipe: \n");
        (0, recipe_1.viewRecipe)(recipe);
    }
}
/**
 * remove chosen ingredient
 * @param {Recipe} recipe the current recipe
 * @param {string} ingredientSearch ingredient to remove
 */
function removeIngredient(recipe, ingredientSearch) {
    var indexToRemove = recipe
        .ingredients
        .indexOf(ingredientSearch);
    if (indexToRemove !== -1) {
        console.log("\nRemoved "
            + recipe.ingredients[indexToRemove]
            + " from "
            + recipe.name
            + "\n");
        recipe
            .ingredients
            .splice(indexToRemove, 1);
        recipe
            .measurements
            .splice(indexToRemove, 1);
    }
    else {
        console.log("Ingredient doesn't exist");
    }
}
/**
 * Add new ingredient to current recipe
 * @param {Recipe} recipe the current recipe
 * @param {Cookbook} cookbook the cookbook hashtable
 */
function addIngredient(recipe, cookbook) {
    var done = true;
    while (done === true) {
        makeIngredient(recipe, (0, utilities_1.validAnswer)("Ingredient name > ", "", []), cookbook);
        if ((0, utilities_1.validAnswer)("Do you want to add another ingredient? y/n > ", "opt", ["y", "n"]).toLowerCase() === "n") {
            done = false;
        }
    }
}
/**
 * Change a chosen ingredient
 * @param {Recipe} recipe the current recipe
 * @param {Cookbook} cookbook the cookbook hashtable
 */
function changeIngredients(recipe, cookbook) {
    var done = true;
    while (done === true) {
        var ingredientSearch = (0, utilities_1.validAnswer)("What ingredient do you want to change? > ", "", []);
        var indexToChange = recipe
            .ingredients
            .indexOf(ingredientSearch);
        if (indexToChange !== -1) {
            console.log("Current ingredient:\n"
                + recipe.ingredients[indexToChange]
                + " "
                + recipe.measurements[indexToChange]);
            recipe
                .ingredients
                .splice(indexToChange, 1);
            recipe
                .measurements
                .splice(indexToChange, 1);
            makeIngredient(recipe, (0, utilities_1.validAnswer)("Ingredient name > ", "", []), cookbook);
        }
        else {
            console.log("Ingredient doesn't exist");
        }
        if ((0, utilities_1.validAnswer)("Do you want to change another ingredient? y/n > ", "opt", ["y", "n"]).toLowerCase() === "n") {
            viewIngredients(recipe);
            done = false;
        }
    }
}
/**
 * Prints out ingredients in terminal
 * @param {Recipe} recipe the current recipe
 */
function viewIngredients(recipe) {
    for (var i = 0; i < recipe.ingredients.length; i++) {
        console.log(recipe.ingredients[i]
            + " "
            + (0, list_1.head)(recipe.measurements[i])
            + " "
            + (0, list_1.tail)(recipe.measurements[i])
            + "\n");
    }
}
