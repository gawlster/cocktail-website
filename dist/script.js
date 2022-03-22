const drinkCardTemplate = document.querySelector("[data-drink-template]")
const drinkCardContainer = document.querySelector("[data-drink-card-container]")

fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=").then(res => res.json()).then(data => {
    data.drinks.forEach(drink => {
        const card = drinkCardTemplate.content.cloneNode(true).children[0]
        const thumbnail = card.querySelector("[data-drink-thumbnail]")
        const drinkName = card.querySelector("[data-drink-name]")
        const drinkAlcohol = card.querySelector("[data-drink-alcohol]")
        const drinkCategory = card.querySelector("[data-drink-category]")
        
        drinkName.textContent = drink.strDrink
        if (drink.strAlcoholic.includes("Alcohol")) {
            if (drink.strAlcoholic.includes("Optional")) {
                console.log("optional alcohol")
                drinkAlcohol.textContent = "OPTIONAL"
            } else {
                drinkAlcohol.textContent = "CONTAINS"
            }
        } else {
            drinkAlcohol.textContent = "NO"
        }
        drinkCategory.textContent = drink.strCategory
        
        console.log(drink.strDrink)
        console.log(drink.strAlcoholic)
        console.log(drink.strCategory)
        drinkCardContainer.append(card)
    })
})