// Predefined array of recipes
const recipes = [
    {
        id: 1,
        name: "Chicken Fajitas",
        ingredients: ["chicken", "bell peppers", "onions", "tortillas"],
        instructions: "Cook chicken and vegetables in a skillet. Serve with tortillas."
    },
    {
        id: 2,
        name: "Vegetable Soup",
        ingredients: ["carrots", "potatoes", "celery", "tomatoes"],
        instructions: "Boil vegetables in a pot of broth. Season with salt and pepper."
    },
    {
        id: 3,
        name: "Grilled Cheese Sandwich",
        ingredients: ["bread", "cheese", "butter"],
        instructions: "Butter bread, place cheese in between, and grill until cheese melts."
    },
    // Add more recipes here...
];

// Function to search for recipes based on ingredients
function searchRecipes(ingredients) {
    const searchedRecipes = recipes.filter(recipe => {
        return recipe.ingredients.some(ingredient => ingredients.includes(ingredient));
    });
    return searchedRecipes;
}

// Function to display recipes
function displayRecipes(recipes) {
    const recipesList = document.getElementById("recipes-list");
    recipesList.innerHTML = "";
    recipes.forEach(recipe => {
        const recipeHTML = `
            <li class="recipe">
                <h3>${recipe.name}</h3>
                <p>Ingredients: ${recipe.ingredients.join(", ")}</p>
                <p>Instructions: ${recipe.instructions}</p>
                <button class="save-btn" data-id="${recipe.id}">Save to Favorites</button>
            </li>
        `;
        recipesList.insertAdjacentHTML("beforeend", recipeHTML);
    });
}

// Function to save recipe to favorites
function saveToFavorites(recipeId) {
    const favoriteRecipes = JSON.parse(localStorage.getItem("favoriteRecipes")) || [];
    const recipe = recipes.find(recipe => recipe.id === parseInt(recipeId));
    if (!favoriteRecipes.includes(recipe)) {
        favoriteRecipes.push(recipe);
        localStorage.setItem("favoriteRecipes", JSON.stringify(favoriteRecipes));
    }
}

// Function to remove recipe from favorites
function removeFromFavorites(recipeId) {
    const favoriteRecipes = JSON.parse(localStorage.getItem("favoriteRecipes")) || [];
    const updatedFavorites = favoriteRecipes.filter(recipe => recipe.id !== parseInt(recipeId));
    localStorage.setItem("favoriteRecipes", JSON.stringify(updatedFavorites));
}

// Event listeners
document.getElementById("search-btn").addEventListener("click", (e) => {
    e.preventDefault();
    const ingredients = document.getElementById("ingredients").value.split(",");
    const searchedRecipes = searchRecipes(ingredients.map(ingredient => ingredient.trim()));
    displayRecipes(searchedRecipes);
});

document.getElementById("recipes-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("save-btn")) {
        saveToFavorites(e.target.dataset.id);
    }
});

document.getElementById("favorites-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
        removeFromFavorites(e.target.dataset.id);
    }
});

// Display favorite recipes on page load
document.addEventListener("DOMContentLoaded", () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem("favoriteRecipes")) || [];
    const favoritesList = document.getElementById("favorites-list");
    favoritesList.innerHTML = "";
    favoriteRecipes.forEach(recipe => {
        const favoriteHTML = `
            <li class="favorite">
                <h3>${recipe.name}</h3>
                <p>Ingredients: ${recipe.ingredients.join(", ")}</p>
                <p>Instructions: ${recipe.instructions}</p>
                <button class="remove-btn" data-id="${recipe.id}">Remove from Favorites</button>
            </li>
        `;
        favoritesList.insertAdjacentHTML("beforeend", favoriteHTML);
    });
});