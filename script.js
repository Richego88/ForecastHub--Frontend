fetch("https://weather-app-backend-one.vercel.app/weather")
  .then((response) => response.json())
  .then((data) => {
    const city = data.weather;
    if (city) {
      for (let i = 0; i < city.length; i++) {
        document.querySelector(
          "#cityList"
        ).innerHTML += `<div class="cityContainer">
          <p class="name">${capitalizeFirst(city[i].cityName)}</p>
          <p class="description">${capitalizeFirst(city[i].description)}</p>
          <img class="weatherIcon" src="assets/${city[i].main}.png" />
          <div class="temperature">
          <p class="tempMin">${city[i].tempMin}°C</p>
          <span>-</span>
          <p class="tempMax">${city[i].tempMax}°C</p>
        </div>
        <button class="deleteCity" id="${city[i].cityName}">Delete</button>
      </div>`;
      }
      addEventDelete();
    }
  });
// .catch((error) => {
//   console.error(error);
// });

const capitalizeFirst = function (word) {
  word = word.charAt(0).toUpperCase() + word.slice(1);
  return word;
};

const addNewCity = function () {
  const newCity = document.getElementById("cityNameInput").value;
  fetch("https://weather-app-backend-one.vercel.app/weather", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cityName: newCity }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.result) {
        const city = data.weather;
        document.querySelector(
          "#cityList"
        ).innerHTML += `<div class="cityContainer">
          <p class="name">${capitalizeFirst(city.cityName)}</p>
          <p class="description">${capitalizeFirst(city.description)}</p>
          <img class="weatherIcon" src="assets/${city.main}.png" />
          <div class="temperature">
          <p class="tempMin">${city.tempMin}°C</p>
          <span>-</span>
          <p class="tempMax">${city.tempMax}°C</p>
        </div>
        <button class="deleteCity" id="${city.cityName}">Delete</button>
      </div>`;
        addEventDelete();
        document.getElementById("cityNameInput").value = "";
      }
    });
  // .catch((error) => {
  //   console.error(error);
  // });
};

const addEventDelete = function () {
  const deleteCity = document.querySelectorAll(".deleteCity");
  for (let i = 0; i < deleteCity.length; i++) {
    deleteCity[i].addEventListener("click", function () {
      console.log("clicked");
      fetch(`https://weather-app-backend-one.vercel.app/weather/${this.id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            this.parentNode.remove();
          }
        });
      // .catch((error) => {
      //   console.error(error);
      // });
    });
  }
};

document.getElementById("addCity").addEventListener("click", addNewCity);
document
  .getElementById("cityNameInput")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      addNewCity();
    }
  });
