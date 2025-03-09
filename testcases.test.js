"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilities_1 = require("./lib/utilities");
var list_1 = require("./lib/list");
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
var cookbook = (0, hashtables_1.ph_empty)(3, hashtables_1.hash_id);
testKeys.push((0, list_1.pair)(testRecipe.name, testRecipe.id));
(0, hashtables_1.ph_insert)(cookbook, testRecipe.id, testRecipe);
test("Produces a random number between 1000 and 9999 that isn't already in use and checks it to be a number in said intervall.", function () {
    var testNumber = (0, utilities_1.getRandomArbitrary)(1000, 9999, testKeys);
    expect(typeof testNumber).toStrictEqual("number");
    expect(testNumber).toBeGreaterThan(999);
    expect(testNumber).toBeLessThan(10000);
});
test("Takes a test recipe and uses the removeINgredient function to remove one of the existing ingredients.", function () {
    (0, ingredients_1.removeIngredient)(testRecipe, "socker");
    expect(testRecipe.ingredients.length).toStrictEqual(2);
});
test("Takes a test recipe and uses the removeINgredient function to try and remove an ingredient that doesn't exist.", function () {
    (0, ingredients_1.removeIngredient)(testRecipe, "jordgubbar");
    expect(testRecipe.ingredients).toStrictEqual(["cream cheese", "digestivekex"]); // Same as it was before
});
test("changes units from metric to imperial by using changeUnits function", function () {
    (0, utilities_1.changeUnits)(testRecipe, cookbook, "switchUnit");
    expect(testRecipe.unit).toStrictEqual("imperial");
});
