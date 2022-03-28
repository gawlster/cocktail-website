const categories = ["All categories", "optional", "Cocktail", "Shot", "punch / Party Drink", "Coffee / tea"]


const drinkCardTemplate = document.querySelector("[data-drink-template]")
const drinkCardContainer = document.querySelector("[data-drink-card-container]")

const drinkSearch = document.querySelector("[data-search]")

const categorySearch = document.querySelector("[data-category]")

let drinksArray = []
let drinksToShow = []
var drinkToShowOnPage = {}

drinkSearch.addEventListener("input", (e) => {
    showDrinks()
})

categorySearch.addEventListener("change", (e) => {
    showDrinks()
})

function drinkButtonClick(clickedDrinkID) {
    sessionStorage.setItem("curDrinkID", clickedDrinkID)
    showDrinkPage()
}

function findDrink() {
    let randomIndex = 0
    if (drinksToShow.length == 0) {
        randomIndex = getRandomInt(drinksArray.length)
        drinkToShowOnPage = drinksArray[randomIndex]
    } else {
        randomIndex = getRandomInt(drinksToShow.length)
        drinkToShowOnPage = drinksToShow[randomIndex]
    }
    sessionStorage.setItem("curDrinkID", drinkToShowOnPage.drinkID)
    showDrinkPage()
}

function showDrinkPage() {
    window.location.href = "showDrink.html"
}


function showDrinks() {
    drinksToShow = checkEligibility()
    drinksArray.forEach(drink => {
        drink.element.classList.add("hide")
    })
    drinksToShow.forEach(drink => {
        drink.element.classList.remove("hide")
    })
}

function checkEligibility() {
    drinksToShow = []
    const textValue = drinkSearch.value.toLowerCase()
    const selectValue = categories[categorySearch.value].toLowerCase()
    //add all drinks of the correct category to the output array
    drinksArray.forEach(drink => {
        if (drink.category.toLowerCase() == selectValue || selectValue == "all categories" || ((drink.alcoholic.toLowerCase() == "optional" || drink.alcoholic.toLowerCase() == "no") && selectValue == "optional")) {
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
        drink.ingredients.forEach(ingredient => {
            if (ingredient.toLowerCase().includes(textValue)) {
                containsIngredient = true
            }
        })
        const isVisibleText = drink.name.toLowerCase().includes(textValue) || drink.category.toLowerCase().includes(textValue) || containsIngredient
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
        const drinkID = card.querySelector("[data-drink-id]")
        const button = card.querySelector("button")
        button.setAttribute("value", drink.idDrink)
        let alcoholicContent = ""
        
        drinkID.innerHTML = drink.idDrink
        drinkName.textContent = drink.strDrink
        if (drink.strAlcoholic.includes("Alcohol")) {
            if (drink.strAlcoholic.includes("Optional")) {
                drinkAlcohol.innerHTML = "<p class='alcohol' data-drink-alcohol>OPTIONAL<span>Alcohol</span></p>"
                alcoholicContent = "optional"
            } else {
                drinkAlcohol.innerHTML = "<p class='alcohol' data-drink-alcohol>CONTAINS<span>Alcohol</span></p>"
                alcoholicContent = "contains"
            }
        } else {
            drinkAlcohol.innerHTML = "<p class='alcohol' data-drink-alcohol>NO<span>Alcohol</span></p>"
            alcoholicContent = "no"
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

        return {drinkID: drink.idDrink, name: drink.strDrink, alcoholic: alcoholicContent, category: drink.strCategory, ingredients: drinkIngredients, element: card}
    })
})

// returns a random number between 0 and max, if max is not specified, either return 0 or 1 at random
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}