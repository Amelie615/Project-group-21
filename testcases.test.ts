import { getRandomArbitrary, changeUnits } from "./lib/utilities";
import { CookbookKeys, Cookbook} from "./main";
import { pair, head , tail} from "./lib/list";
import { Recipe, viewRecipe } from "./lib/recipe";
import { removeIngredient } from "./lib/ingredients";
import {ph_empty, hash_id, ph_insert} from "./lib/hashtables"

let testKeys: CookbookKeys = [pair("Kanelbullar", 8763)]

const testRecipe: Recipe = {name: "Cheesecake",
                            id: 1234,
                            ingredients: ["cream cheese", "socker", "digestivekex"],
                            measurements: [[400, "g"], [2, "dl"], [300, "g"]],
                            servings: 4,
                            instructions: "baka kaka",
                            unit: "metric" }

const testRecipe2: Recipe = {name: "Cheesecake",
    id: 1234,
    ingredients: ["cream cheese", "socker", "digestivekex"],
    measurements: [[400, "g"], [2, "cups"], [300, "g"]],
    servings: 4,
    instructions: "baka kaka",
    unit: "metric" }

const cookbook: Cookbook = ph_empty(3, hash_id)
testKeys.push(pair(testRecipe.name, testRecipe.id))
ph_insert(cookbook, testRecipe.id, testRecipe)

function changeServing(recipe: Recipe, table: Cookbook, newServings: number): void {  // The function has been changed for testing purposes
    console.log("Recipe currently serves " + recipe.servings + " people")             // to use an additional argument instead of a prompt.
    for(let i = 0; i < recipe.measurements.length; i ++) {
        let currentIngredient: number = head(recipe.measurements[i])
        recipe.measurements[i] = pair(Math.floor(currentIngredient/recipe.servings * newServings), tail(recipe.measurements[i]))
    }
    recipe.servings = newServings
    console.log("The new recipe: \n")
    viewRecipe(recipe)
}


// GetRandomArbitrary
test("Produces a random number between 1000 and 9999 that isn't already in use and checks it to be a number in said intervall.", () => {
    const testNumber: number = getRandomArbitrary(1000, 9999, testKeys)
    expect(typeof testNumber).toStrictEqual("number")
    expect(testNumber).toBeGreaterThan(999)
    expect(testNumber).toBeLessThan(10000)
});

//ChangeServings
test("Rescales the amounts in a recipe for 2 people to accommodate 5 people ", () => { //Uses the test version of the ChangeServings function seen above
    
});

// removeIngredients valid/unvalid cases
test("Takes a test recipe and uses the removeINgredient function to remove one of the existing ingredients.", () => {
    removeIngredient(testRecipe, "socker")
    expect(testRecipe.ingredients.length).toStrictEqual(2)
})

test("Takes a test recipe and uses the removeINgredient function to try and remove an ingredient that doesn't exist.", () => {
    removeIngredient(testRecipe, "jordgubbar")
    expect(testRecipe.ingredients).toStrictEqual(["cream cheese", "digestivekex"]) // Same as it was before
})

// changeUnits
test("changes units from metric to imperial by using changeUnits function", () => {
    changeUnits(testRecipe, cookbook, "switchUnit")
    expect(testRecipe.unit).toStrictEqual("imperial")
})

// uses changeUnits to make sure all units are metric
test("fixes mixed metric and imperial units", () => {
    changeUnits(testRecipe2, cookbook, "")
    expect(testRecipe2.measurements[1][1]).toStrictEqual!("cups")
    expect(testRecipe2.unit).toStrictEqual("metric")
})
