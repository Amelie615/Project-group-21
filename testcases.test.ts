import { IDGenerator, changeUnits, round } from "./lib/utilities";
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

export function changeServing(recipe: Recipe, newServings: number): void { 
    if(newServings < 1) {
        console.log("Recipe lacks reasonable serving amounts for scaling\n")
    } else if(recipe.servings > 0 || newServings > 0){
        console.log("Recipe currently serves " 
                    + recipe.servings 
                    + " people")
        for(let i = 0; i < recipe.measurements.length; i ++) {
            let currentIngredient: number = head(recipe.measurements[i])
            recipe.measurements[i] = pair(round(currentIngredient / recipe.servings * newServings,
                                                2),
                                          tail(recipe.measurements[i]))
        }

        recipe.servings = newServings
        console.log("The new recipe: \n")
        viewRecipe(recipe)
    }
}


// GetRandomArbitrary
test("Produces a random number between 1000 and 9999 that isn't already in use and checks it to be a number in said intervall.", () => {
    const testNumber: number = IDGenerator(1000, 9999, testKeys)
    expect(typeof testNumber).toStrictEqual("number")
    expect(testNumber).toBeGreaterThan(999)
    expect(testNumber).toBeLessThan(10000)
});

//ChangeServings. Uses the test version of the ChangeServings function seen above.
test("Rescales the amounts in a recipe for 4 people to accommodate 5 people ", () => { 
    changeServing(testRecipe, 5)                                                       
    expect(testRecipe.servings).toStrictEqual(5)
    expect(head(testRecipe.measurements[0])).toStrictEqual(round(400 / 4, 1) * 5)
    expect(head(testRecipe.measurements[1])).toStrictEqual(round(2 / 4, 1) * 5)
    expect(head(testRecipe.measurements[2])).toStrictEqual(round(300 / 4, 1) * 5)
});

test("Attempts to rescale a recipe with serving size set to 0 and encounters a failsafe.", () => { 
    changeServing(testRecipe, 0)                                            
    expect(testRecipe.servings).toStrictEqual(5)
    expect(head(testRecipe.measurements[0])).toStrictEqual(round(400 / 4, 1) * 5)
    expect(head(testRecipe.measurements[1])).toStrictEqual(round(2 / 4, 1) * 5)
    expect(head(testRecipe.measurements[2])).toStrictEqual(round(300 / 4, 1) * 5)
});

// removeIngredients valid/unvalid cases
test("Takes a test recipe and uses the removeIngredient function to remove one of the existing ingredients.", () => {
    removeIngredient(testRecipe, "socker")
    expect(testRecipe.ingredients.length).toStrictEqual(2)
})

test("Takes a test recipe and uses the removeIngredient function to try and remove an ingredient that doesn't exist.", () => {
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
    expect(testRecipe2.measurements[1][1]).toStrictEqual!("mL")
    expect(testRecipe2.unit).toStrictEqual("metric")
})
