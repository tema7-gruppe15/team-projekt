const productlist = document.querySelector(".product_list_container");
const dropdownItems = document.querySelectorAll(".dropdownitem");

const url = `https://dummyjson.com/recipes`;

let allRecipes = []; // Gemmer alle opskrifter fra API

// Henter data fra API
function hentData() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Konverter mealType til en streng eller håndter manglende værdier
      allRecipes = data.recipes.map((recipe) => ({
        ...recipe,
        mealType: recipe.mealType ? (Array.isArray(recipe.mealType) ? recipe.mealType.join(", ") : String(recipe.mealType)) : "Unknown",
      }));

      // Debugging: Se alle mealType værdier
      console.log("Alle mealType værdier:", new Set(allRecipes.map((r) => r.mealType)));

      showProducts(allRecipes); // Vis alle opskrifter
    });
}

// Viser opskrifter på siden
function showProducts(data) {
  const markup = data
    .map(
      (product) => `
      <div class="card">
        <img src="https://cdn.dummyjson.com/recipe-images/${product.id}.webp" alt="vege">
        <h2>${product.name}</h2>
        <p>Mealtype: ${product.mealType}</p>
        <p>Servings: ${product.servings}</p>
        <p>Calories per serving: ${product.caloriesPerServing}</p>
        <p>Difficulty: ${product.difficulty}</p>
        <div class="rating">
          <p>Rating: ${product.rating}</p>
          <p>Reviews: ${product.reviewCount}</p>
        </div>
      </div>`
    )
    .join("");

  productlist.innerHTML = markup;
}

// Filtrerer opskrifter baseret på mealType
function filterRecipes(event) {
  const selectedMealType = event.target.textContent; // Hent valgt kategori
  console.log("Valgt mealType:", selectedMealType);

  const filteredRecipes = allRecipes.filter(
    (recipe) => recipe.mealType.toLowerCase().includes(selectedMealType.toLowerCase()) // Sammenligner mealType
  );

  console.log("Filtrerede opskrifter:", filteredRecipes);
  showProducts(filteredRecipes);
}

// Lyt efter klik på dropdown-menuen
dropdownItems.forEach((item) => item.addEventListener("click", filterRecipes));

// Hent opskrifter ved load
hentData();
