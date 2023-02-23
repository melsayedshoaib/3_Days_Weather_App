// Variables

let links = document.querySelectorAll(".nav-item a");

// Updating the fav icon

var link = document.querySelector("link[rel~='icon']");
if (!link) {
  link = document.createElement("link");
  link.rel = "icon";
  document.head.appendChild(link);
}
link.href = "https://img.icons8.com/cute-clipart/256/apple-weather.png";

// Getting nav links from the dom and apply the active class on the clicked link

for (i = 0; i < links.length; i++) {
  if (links[i].href === location.href) {
    links[i].classList.add("active");
  }
}
