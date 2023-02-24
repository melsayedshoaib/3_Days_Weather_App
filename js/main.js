// Variables

// Nav links

let links = document.querySelectorAll(".nav-item a");

// Find input field

let findACity = document.querySelector("#findacity");

// Week days

let daysOfTheWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Year months

let monthsOfTheYear = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

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

// Fetching the data with async and await to make sure that the promise result is ok before moving forward

async function find(city) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=67deb1cf48e949ebb65115940232302&q=${city}&days=3`,
    { method: "GET" }
  );
  if (response.ok && response.status !== 400) {
    let data = await response.json();
    getCurrent(data.location, data.current);
    getTomorrow(data.forecast.forecastday);
    getDayAfterTomorrow(data.forecast.forecastday);
    console.log(data);
  }
}

// Find the city on typing

findACity.addEventListener("keyup", (e) => {
  find(e.target.value);
});

// Test City

find("Cairo");

// Get current day

function getCurrent(theLocation, theCurrent) {
  if (theCurrent !== null) {
    let day = new Date(theCurrent.last_updated);
    document.querySelector(".today .top-info").innerHTML = `
        <p class="current_week_day fs-5">${daysOfTheWeek[day.getDay()]}</p>
        <p class="current_month_day fs-5">${
          day.getDate() + " " + monthsOfTheYear[day.getMonth()]
        }</p>
      `;
    document.querySelector(".today .middle-info").innerHTML = `
        <p class="fs-4 text-center">${theLocation.name}</p>
        <div class="d-flex align-items-center justify-content-evenly">
          <p class="fs-3 fw-bolder">${theCurrent.temp_c}<sup>O</sup>C</p>
          <img src="${theCurrent.condition.icon}" alt="condition" class="w-25">
        </div>
        <div class="mb-2 text-center">${theCurrent.condition.text}</div>
    `;
    document.querySelector(".today .bottom-info").innerHTML = `
        <div class="stats d-flex align-items-center justify-content-evenly">
          <p><i class="fa-solid fa-umbrella"></i> ${theCurrent.humidity} %</p>
          <p><i class="fa-solid fa-wind"></i> ${theCurrent.wind_kph} km/h</p>
          <p><i class="fa-solid fa-compass"></i> ${
            theCurrent.wind_dir === "N"
              ? "North"
              : theCurrent.wind_dir === "S"
              ? "South"
              : theCurrent.wind_dir === "E"
              ? "East"
              : "West"
          }</p>
        </div>
    `;
  }
}

// Get Tomorrow

function getTomorrow(theForecase) {
  let day = new Date(theForecase[1].date);
  document.querySelector(".tomorrow .top-info").innerHTML = `
    <p class="fs-5">${daysOfTheWeek[day.getDay()]}</p>
  `;
  document.querySelector(".tomorrow .middle-info").innerHTML = `
    <img src="${theForecase[1].day.condition.icon}" alt="condition">
    <p class="fs-3">${theForecase[1].day.maxtemp_c}<sup>O</sup>C</p>
    <p class="fs-3">${theForecase[1].day.mintemp_c}<sup>O</sup>C</p>
    <p>${theForecase[1].day.condition.text}</p>
  `;
}

// Get the day after tomorrow

function getDayAfterTomorrow(theForecase) {
  let day = new Date(theForecase[2].date);
  document.querySelector(".after-tomorrow .top-info").innerHTML = `
    <p class="fs-5">${daysOfTheWeek[day.getDay()]}</p>
  `;
  document.querySelector(".after-tomorrow .middle-info").innerHTML = `
    <img src="${theForecase[2].day.condition.icon}" alt="condition">
    <p class="fs-3">${theForecase[2].day.maxtemp_c}<sup>O</sup>C</p>
    <p class="fs-3">${theForecase[2].day.mintemp_c}<sup>O</sup>C</p>
    <p>${theForecase[2].day.condition.text}</p>
  `;
}
