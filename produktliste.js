const myCategory = new URLSearchParams(window.location.search).get("category");

const productlist = document.querySelector(".product_list_container");
const selectElement = document.querySelector("#selectElement");

// let url = `https://dummyjson.com/recipes?category=${category}`;
// let url = `https://dummyjson.com/recipes/meal-type/${myCategory}`;

let url = myCategory
  ? `https://dummyjson.com/recipes/meal-type/${myCategory}` // Hvis der er en kategori, hent produkter for den
  : `https://dummyjson.com/recipes`;
function showProducts(data) {
  const markup = data.recipes
    .map(
      (product) => `

                <div class="card">
                <img src="https://cdn.dummyjson.com/recipe-images/${product.id}.webp" alt="vege">
                <h2>${product.name}</h2>
                <p>Mealtype:${product.mealType}</p>
                <p>Servings: ${product.servings}</p>
                <p>Calories per serving: ${product.caloriesPerServing}</p>
                <p>Difficulty: ${product.difficulty}</p>
                <a class="readmore_knap" href="produkt.html?id=${product.id}">Read More</a>
                <div class="rating">
                    <p>Rating: ${product.rating}</p>
                    <p>Reviews: ${product.reviewCount}</p>
                </div>
            </div>`
    )
    .join(``);

  productlist.innerHTML = markup;
}

function hentData() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
}

hentData();
