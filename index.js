const recipesContainer = document.querySelector(".slideshow_forside");

fetch("https://dummyjson.com/recipes")
  .then((response) => response.json())
  .then((data) => showDinnerRecipes(data.recipes));

function showDinnerRecipes(dinnerRecipes) {
  const markup = dinnerRecipes
    .map(
      (recipe) => `
    <div class="slide">
      <a href="produkt.html">
        <img src="${recipe.image}" alt="${recipe.name}">
      </a>
      <h3>${recipe.name}</h3>
    </div>
  `
    )
    .join("");

  recipesContainer.insertAdjacentHTML("beforeend", markup);

  const slides = document.querySelectorAll(".slideshow_forside .slide").length;
  console.log(`Antal slides: ${slides}`);
}

// Slideshow
let currentIndex = 0;

function moveSlide(direction) {
  const slides = document.querySelectorAll(".slideshow_forside .slide").length;

  currentIndex += direction;

  if (currentIndex < 0) {
    currentIndex = slides - 1;
  } else if (currentIndex >= slides) {
    currentIndex = 0;
  }

  const offset = -currentIndex * 50;
  document.getElementById("slideshow").style.transform = `translateX(${offset}%)`;
}
