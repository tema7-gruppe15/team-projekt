/*
let productContainer = document.querySelector(".produkt_container");

const id = new URLSearchParams(window.location.search).get("id");

let productId = id;

fetch(`https://dummyjson.com/recipes/${Id}`)
  .then((Response) => Response.json())
  .then((data) => showProduct(data));

function showProduct(data) {
  productContainer.innerHTML = `   
                <h1>${data.name}</h1>
            <div class="content">

                <div class="image">
                    <img src="https://cdn.dummyjson.com/recipe-images/${Id}.webp">
                </div>


                <div class="text-boxes">
                    <div class="description">
                      <p>${data.instructions}</p>
                    </div>
                    <div class="recipe-text">
                             <p>${data.ingredients}</p>
                    </div>
                    <div class="info-box">
                       <p> <strong>Mealtype:${data.mealType}</strong> </p> Lunch <br> 
                       <p> <strong>Servings:${data.servings}</strong> 3 <br>
                        <strong>Calories per serving:${data.caloriesPerServing}</strong> 250 <br>
                        <strong>Difficulty:${data.difficulty}</strong> Medium
                    </div>
                </div>
            </div>
        `;
} */

let productContainer = document.querySelector(".container"); // Make sure this matches your HTML class

const id = new URLSearchParams(window.location.search).get("id");

// Corrected variable reference

fetch(`https://dummyjson.com/recipes/${id}`)
  .then((response) => response.json()) // Corrected 'Response' to 'response'
  .then((data) => showProduct(data))
  .catch((error) => console.error("Error fetching data:", error)); // Added error handling

function showProduct(data) {
  productContainer.innerHTML = `   
      <h1>${data.name}</h1>
      <div class="content">

          <div class="image">
              <img src="${data.image}" alt="${data.name}">
          </div>

          <div class="text-boxes">
              <div class="description">
                <p>${data.instructions}</p>
              </div>
              <div class="recipe-text">
              <ul>  
              ${data.ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
               </ul>             

              </div>
              <div class="info-box">
                 <p><strong>Meal Type:</strong> ${data.mealType}</p>  
                 <p><strong>Servings:</strong> ${data.servings}</p>
                 <p><strong>Calories per serving:</strong> ${data.caloriesPerServing}</p>
                 <p><strong>Difficulty:</strong> ${data.difficulty}</p>
              </div>
          </div>
      </div>
  `;
}

window.onload = function () {
  document.getElementById("popup").style.display = "flex";
};
function closePopup() {
  document.getElementById("popup").style.display = "none";
}

//  <p><strong>Ingredients:<br></strong> ${data.ingredients.join("<br>")}</p> //
