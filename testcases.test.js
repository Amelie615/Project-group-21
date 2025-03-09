"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilities_1 = require("./lib/utilities");
var list_1 = require("./lib/list");
var recipe_1 = require("./lib/recipe");
var ingredients_1 = require("./lib/ingredients");
var hashtables_1 = require("./lib/hashtables");
var testKeys = [(0, list_1.pair)("Kanelbullar", 8763)];
var testRecipe = { name: "Cheesecake",
    id: 1234,
    ingredients: ["cream cheese", "socker", "digestivekex"],
    measurements: [[400, "g"], [2, "dl"], [300, "g"]],
    servings: 4,
    instructions: "baka kaka",
    unit: "metric" };
var testRecipe2 = { name: "Cheesecake",
    id: 1234,
    ingredients: ["cream cheese", "socker", "digestivekex"],
    measurements: [[400, "g"], [2, "cups"], [300, "g"]],
    servings: 4,
    instructions: "baka kaka",
    unit: "metric" };
var cookbook = (0, hashtables_1.ph_empty)(3, hashtables_1.hash_id);
testKeys.push((0, list_1.pair)(testRecipe.name, testRecipe.id));
(0, hashtables_1.ph_insert)(cookbook, testRecipe.id, testRecipe);
function changeServing(recipe, newServings) {
    console.log("Recipe currently serves " + recipe.servings + " people"); // to use an additional argument instead of a prompt.
    for (var i = 0; i < recipe.measurements.length; i++) {
        var currentIngredient = (0, list_1.head)(recipe.measurements[i]);
        recipe.measurements[i] = (0, list_1.pair)(Math.floor(currentIngredient / recipe.servings * newServings), (0, list_1.tail)(recipe.measurements[i]));
    }
    recipe.servings = newServings;
    console.log("The new recipe: \n");
    (0, recipe_1.viewRecipe)(recipe);
}
// GetRandomArbitrary
test("Produces a random number between 1000 and 9999 that isn't already in use and checks it to be a number in said intervall.", function () {
    var testNumber = (0, utilities_1.getRandomArbitrary)(1000, 9999, testKeys);
    expect(typeof testNumber).toStrictEqual("number");
    expect(testNumber).toBeGreaterThan(999);
    expect(testNumber).toBeLessThan(10000);
});
//ChangeServings
test("Rescales the amounts in a recipe for 4 people to accommodate 5 people ", function () {
    changeServing(testRecipe, 5);
    expect(testRecipe.servings).toStrictEqual(5);
    expect((0, list_1.head)(testRecipe.measurements[0])).toStrictEqual((400 / 4) * 5);
    expect((0, list_1.head)(testRecipe.measurements[1])).toStrictEqual((2 / 4) * 5);
    expect((0, list_1.head)(testRecipe.measurements[2])).toStrictEqual((300 / 4) * 5);
});
// removeIngredients valid/unvalid cases
test("Takes a test recipe and uses the removeINgredient function to remove one of the existing ingredients.", function () {
    (0, ingredients_1.removeIngredient)(testRecipe, "socker");
    expect(testRecipe.ingredients.length).toStrictEqual(2);
});
test("Takes a test recipe and uses the removeINgredient function to try and remove an ingredient that doesn't exist.", function () {
    (0, ingredients_1.removeIngredient)(testRecipe, "jordgubbar");
    expect(testRecipe.ingredients).toStrictEqual(["cream cheese", "digestivekex"]); // Same as it was before
});
// changeUnits
test("changes units from metric to imperial by using changeUnits function", function () {
    (0, utilities_1.changeUnits)(testRecipe, cookbook, "switchUnit");
    expect(testRecipe.unit).toStrictEqual("imperial");
});
// uses changeUnits to make sure all units are metric
test("fixes mixed metric and imperial units", function () {
    (0, utilities_1.changeUnits)(testRecipe2, cookbook, "");
    expect(testRecipe2.measurements[1][1]).toStrictEqual("mL");
    expect(testRecipe2.unit).toStrictEqual("metric");
});
