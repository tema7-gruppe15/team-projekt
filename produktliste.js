const container = document.querySelector(".product_list_container");
const h2 = document.querySelector("h2");
const selectCuisine = document.querySelector("#cuisine");
const selectMealType = document.querySelector("#mealType");
selectCuisine.addEventListener("change", filterCuisine);
selectMealType.addEventListener("change", filterMealType);
const url = "https://dummyjson.com/recipes?limit=0"; // limit=0 henter alle 50 opskrifter

let allRecipes,
  filteredData,
  cuisine = "All",
  mealType = "All";

function hentData() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      allRecipes = data.recipes;
      filteredData = allRecipes;
      buildSelects();
      visListe(allRecipes);
    });
}

hentData();

function buildSelects() {
  // Først dannes et nyt array med en liste over cuisine (kun en gang hver)
  const uniqueCuisines = Array.from(new Set(allRecipes.map((recipe) => recipe.cuisine)));
  // Herefter dannes en select-liste med de cuisines der findes i det hentede data
  const markup = uniqueCuisines.map((cuisine) => ` <option value="${cuisine}">${cuisine}</option>`).join("");
  selectCuisine.innerHTML += markup;

  // Her dannes en anden select-liste med de mealTypes der findes i det hentede data på samme måde
  const uniqueMTypes = Array.from(new Set(allRecipes.map((recipe) => recipe.mealType[0])));
  const markup2 = uniqueMTypes.map((element) => ` <option value="${element}">${element}</option>`).join("");
  selectMealType.innerHTML += markup2;
}

function visListe(data) {
  const markup = data
    .map(
      (opskrift) => `        
                <div class="card">
                <img src="https://cdn.dummyjson.com/recipe-images/${opskrift.id}.webp" alt="vege">
                <h2 class="h2produktliste">${opskrift.name}</h2>
                <p class="pproduktliste"><strong>Mealtype:</strong> ${opskrift.mealType.join(", ")}</p>
                <p class="pproduktliste"><strong>Servings:</strong> ${opskrift.servings}</p>
                <p class="pproduktliste"><strong>Calories per serving:</strong> ${opskrift.caloriesPerServing}</p>
                <p class="pproduktliste"><strong>Difficulty:</strong> ${opskrift.difficulty}</p>

                <div class="rating">
                    <p><strong>Rating:</strong> ${opskrift.rating}</p>
                    <p><strong>Reviews:</strong> ${opskrift.reviewCount}</p>
                </div>
                <a class="read" href="produkt.html?id=${opskrift.id}">Read more</a>
            </div>`
    )
    .join("");
  container.innerHTML = markup;
  h2.textContent = cuisine + " (" + data.length + ")"; // data.length giver antallet af opskrifter på listen
}

function filterCuisine(event) {
  // Hvilken cuisine er valgt på select-listen?
  cuisine = event.target.value;
  if (cuisine == "All") {
    filteredData = allRecipes;
  } else {
    // hvis der valgt andet end "All" filtreres data med den valgte cuisine
    filteredData = allRecipes.filter((recipe) => recipe.cuisine == cuisine);
  }
  // Det filtrerede data vises
  visListe(filteredData);

  // overskriften rettes så den viser, hvad der er valgt
  h2.textContent = cuisine + " (" + filteredData.length + ")";

  // Når opskrifterne er filtreret dannes en ny liste med kun de mealTypes der findes i det filtrerede data:
  const uniqueMTypes = Array.from(new Set(filteredData.map((recipe) => recipe.mealType[0])));
  const markup = uniqueMTypes.map((element) => `<option value="${element}">${element}</option>`).join("");
  selectMealType.innerHTML = '<option value="All">All</option>' + markup;
}

function filterMealType(event) {
  // Hvilken mealType er valgt på select-listen?
  mealType = event.target.value;
  if (mealType == "All") {
    visListe(filteredData);
  } else {
    // Her filtreres det allerede filtrerede data efter den valgte mealType
    const filteredMealtypeData = filteredData.filter((recipe) => recipe.mealType.includes(mealType));
    // Det filtrerede data vises
    visListe(filteredMealtypeData);

    // overskriften rettes så den viser, hvad der er valgt. Med .length vises antallet af opskrifter på den aktuelle liste
    h2.textContent = cuisine + " / " + mealType + "  (" + filteredMealtypeData.length + ")";
  }
}
