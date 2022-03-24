const categories = ["All categories", "Alcohol", "No Alcohol", "Cocktail", "Shot", "punch / Party Drink", "Coffee / tea"]


const drinkCardTemplate = document.querySelector("[data-drink-template]")
const drinkCardContainer = document.querySelector("[data-drink-card-container]")

const drinkSearch = document.querySelector("[data-search]")

const categorySearch = document.querySelector("[data-category]")

let drinksArray = []

drinkSearch.addEventListener("input", (e) => {
    showDrinks()
})

categorySearch.addEventListener("change", (e) => {
    showDrinks()
})

function findDrink() {
    //take into account current search bar and current category search.
    // choose a random drink that fits those options
    //if those options have no drinks available, show a random drink from the entire list
    const categoryValue = categorySearch.options[categorySearch.selectedIndex].value
    const searchValue = drinkSearch.value.toLowerCase()

}


function showDrinks() {
    drinksToShow = checkEligibility()
    console.log(drinksToShow)
    console.log(drinksToShow.length)
    drinksArray.forEach(drink => {
        drink.element.classList.add("hide")
    })
    drinksToShow.forEach(drink => {
        drink.element.classList.remove("hide")
    })
}

function checkEligibility() {
    let drinksToShow = []
    const textValue = drinkSearch.value.toLowerCase()
    const selectValue = categories[categorySearch.value].toLowerCase()
    //add all drinks of the correct category to the output array
    drinksArray.forEach(drink => {
        if (drink.category.toLowerCase() == selectValue || selectValue == "all categories") {
            if (!drinksToShow.includes(drink)) {
                drinksToShow.push(drink)
            }
        } else {
            for (let i = 0; i < drinksToShow.length; i++) {
                if (drinksToShow[i] == drink) {
                    drinksToShow.splice(i, 1)
                }
            }
        }
    })
    //filter output array to only show the drinks with the search elements
    drinksToShowLength = drinksToShow.length
    let drinkIndex = 0
    while (drinkIndex < drinksToShowLength) {
        let drink = drinksToShow[drinkIndex]
        let containsIngredient = false
        console.log(drink)
        drink.ingredients.forEach(ingredient => {
            if (ingredient.toLowerCase().includes(textValue)) {
                containsIngredient = true
            }
        })
        const isVisibleText = drink.name.toLowerCase().includes(textValue) || drink.category.toLowerCase().includes(textValue) || containsIngredient
        console.log(isVisibleText)
        if (!isVisibleText) {
            for (let i = 0; i < drinksToShow.length; i++) {
                if (drinksToShow[i] == drink) {
                    drinksToShow.splice(i, 1)
                    drinkIndex-=1
                    drinksToShowLength -=1
                }
            }
        }
        drinkIndex+=1
    }
    return drinksToShow
}


fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=").then(res => res.json()).then(data => {
    drinksArray = data.drinks.map(drink => {
        const card = drinkCardTemplate.content.cloneNode(true).children[0]
        const thumbnail = card.querySelector("[data-drink-thumbnail]")
        const drinkName = card.querySelector("[data-drink-name]")
        const drinkAlcohol = card.querySelector("[data-drink-alcohol]")
        const drinkCategory = card.querySelector("[data-drink-category]")
        
        drinkName.textContent = drink.strDrink
        if (drink.strAlcoholic.includes("Alcohol")) {
            if (drink.strAlcoholic.includes("Optional")) {
                drinkAlcohol.innerHTML = "<p class='alcohol' data-drink-alcohol>OPTIONAL<span>Alcohol</span></p>"
                drink.strAlcoholic = "optional"
            } else {
                drinkAlcohol.innerHTML = "<p class='alcohol' data-drink-alcohol>CONTAINS<span>Alcohol</span></p>"
                drink.strAlcoholic = "contains"
            }
        } else {
            drinkAlcohol.innerHTML = "<p class='alcohol' data-drink-alcohol>NO<span>Alcohol</span></p>"
            drink.strAlcoholic = "no"
        }
        drinkCategory.innerHTML = "<p class='category' data-drink-category>" + drink.strCategory + "<span>Category</span></p>"
        thumbnail.innerHTML = "<img src='" + drink.strDrinkThumb + "'></img>"
        
        drinkCardContainer.append(card)

        let drinkIngredients = []
        let i = 1
        while (true) {
            if (i == 1) {
                if (drink.strIngredient1 != null) {
                    drinkIngredients.push(drink.strIngredient1)
                } else {
                    break
                }
            }

            if (i == 2) {
                if (drink.strIngredient2 != null) {
                    drinkIngredients.push(drink.strIngredient2)
                } else {
                    break
                }
            }

            if (i == 3) {
                if (drink.strIngredient3 != null) {
                    drinkIngredients.push(drink.strIngredient3)
                } else {
                    break
                }
            }

            if (i == 4) {
                if (drink.strIngredient4 != null) {
                    drinkIngredients.push(drink.strIngredient4)
                } else {
                    break
                }
            }

            if (i == 5) {
                if (drink.strIngredient5 != null) {
                    drinkIngredients.push(drink.strIngredient5)
                } else {
                    break
                }
            }

            if (i == 6) {
                if (drink.strIngredient6 != null) {
                    drinkIngredients.push(drink.strIngredient6)
                } else {
                    break
                }
            }

            if (i == 7) {
                if (drink.strIngredient7 != null) {
                    drinkIngredients.push(drink.strIngredient7)
                } else {
                    break
                }
            }

            if (i == 8) {
                if (drink.strIngredient8 != null) {
                    drinkIngredients.push(drink.strIngredient8)
                } else {
                    break
                }
            }

            i+=1
        }

        return {name: drink.strDrink, alcoholic: drink.strAlcoholic, category: drink.strCategory, ingredients: drinkIngredients, element: card}
    })
})