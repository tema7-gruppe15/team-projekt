// const currentPage = window.location.pathname.split("/").pop();

// const menuLinks = document.querySelectorAll(".menu a");

// menuLinks.forEach((link) => {
//   if (link.getAttribute("href") === currentPage) {
//     link.classList.add("active");
//   } else {
//     link.classList.remove("active");
//   }
// });

const currentPage = window.location.pathname.split("/").pop();
const menuLinks = document.querySelectorAll(".menu a");

menuLinks.forEach((link) => {
  // Fjern 'active' fra alle links
  link.classList.remove("active");

  // Tjek om linkets href matcher den aktuelle side
  if (link.getAttribute("href") === currentPage && !link.querySelector("img")) {
    link.classList.add("active");
  }
});
