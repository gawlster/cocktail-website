let curDrinkToShowID = sessionStorage.getItem("curDrinkID")

let curDrinkArray = []

function populatePage() {
    const curDrink = curDrinkArray[0]

    const image = document.querySelector(".image")
    const name = document.querySelector(".drink-name")
    const category = document.querySelector(".category")
    const alcoholic = document.querySelector(".alcoholic")
    const glass = document.querySelector(".glass")
    const instructions = document.querySelector(".instructions")
    const ingredients = document.querySelector(".left")
    const title = document.querySelector("title")
    title.innerHTML = curDrink.drink_name

    image.innerHTML = "<img src='" + curDrink.drink_thumbnail + "'>"
    name.innerHTML = curDrink.drink_name
    category.innerHTML = curDrink.drink_category
    alcoholic.innerHTML = curDrink.drink_alcoholic
    glass.innerHTML = curDrink.drink_glass
    instructions.innerHTML = curDrink.drink_instructions
    let i = 0
    curDrink.drink_ingredients.forEach(ingredient => {
        var tag = document.createElement("p")
        let cur_measurement = ""
        if (curDrink.drink_measurements.length > i) {
            cur_measurement = ": " + curDrink.drink_measurements[i]
        }
        tag.innerHTML = "&#10003 " + ingredient + cur_measurement
        ingredients.append(tag)
        i+=1
    })


    //need to fix the heights so right is always taller than left
    let leftHeight = getComputedStyle(document.querySelector(".left")).height
    let leftHeightArray = leftHeight.split("p")
    leftHeight = leftHeightArray[0]
    let leftHeightInt = Number(leftHeight)
    const rightHeight = leftHeightInt + 70
    let rightHeightString = rightHeight + "px"
    const rightSide = document.querySelector(".right");
    rightSide.style.minHeight = rightHeightString
}

fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + curDrinkToShowID).then(res => res.json()).then(data => {
    curDrinkArray = data.drinks.map(drink => {
        let drinkName = drink.strDrink
        let drinkCategory = drink.strCategory
        let drinkAlcoholic = drink.strAlcoholic
        let drinkGlass = drink.strGlass
        let drinkInstructions = drink.strInstructions
        let drinkThumbnailSRC = drink.strDrinkThumb
        let drinkIngredients = []
        let drinkMeasurements = []
        let i = 1
        while (true) {
            if (i == 1) {
                if (drink.strIngredient1 != null) {
                    drinkIngredients.push(drink.strIngredient1)
                    if (drink.strMeasure1 != null) {
                        drinkMeasurements.push(drink.strMeasure1)
                    }
                } else {
                    break
                }
            }
    
            if (i == 2) {
                if (drink.strIngredient2 != null) {
                    drinkIngredients.push(drink.strIngredient2)
                    if (drink.strMeasure2 != null) {
                        drinkMeasurements.push(drink.strMeasure2)
                    }
                } else {
                    break
                }
            }
    
            if (i == 3) {
                if (drink.strIngredient3 != null) {
                    drinkIngredients.push(drink.strIngredient3)
                    if (drink.strMeasure3 != null) {
                        drinkMeasurements.push(drink.strMeasure3)
                    }
                } else {
                    break
                }
            }
    
            if (i == 4) {
                if (drink.strIngredient4 != null) {
                    drinkIngredients.push(drink.strIngredient4)
                    if (drink.strMeasure4 != null) {
                        drinkMeasurements.push(drink.strMeasure4)
                    }
                } else {
                    break
                }
            }
    
            if (i == 5) {
                if (drink.strIngredient5 != null) {
                    drinkIngredients.push(drink.strIngredient5)
                    if (drink.strMeasure5 != null) {
                        drinkMeasurements.push(drink.strMeasure5)
                    }
                } else {
                    break
                }
            }
    
            if (i == 6) {
                if (drink.strIngredient6 != null) {
                    drinkIngredients.push(drink.strIngredient6)
                    if (drink.strMeasure6 != null) {
                        drinkMeasurements.push(drink.strMeasure6)
                    }
                } else {
                    break
                }
            }
    
            if (i == 7) {
                if (drink.strIngredient7 != null) {
                    drinkIngredients.push(drink.strIngredient7)
                    if (drink.strMeasure7 != null) {
                        drinkMeasurements.push(drink.strMeasure7)
                    }
                } else {
                    break
                }
            }
    
            if (i == 8) {
                if (drink.strIngredient8 != null) {
                    drinkIngredients.push(drink.strIngredient8)
                    if (drink.strMeasure8 != null) {
                        drinkMeasurements.push(drink.strMeasure8)
                    }
                } else {
                    break
                }
            }
    
            i+=1
        }
        return {drink_name: drinkName, drink_category: drinkCategory, drink_alcoholic: drinkAlcoholic, drink_glass: drinkGlass, drink_instructions: drinkInstructions, drink_thumbnail: drinkThumbnailSRC, drink_ingredients: drinkIngredients, drink_measurements: drinkMeasurements}
    })
    populatePage()
})
