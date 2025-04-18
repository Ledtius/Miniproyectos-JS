const apiKey = "04f61db90fa6c49f9e2bf4d144a75a2c";

// const apiKey = "";

const $weatherCard = document.querySelector(".weather-card");

const $information = document.querySelector(".weather-card__information");

const $notFound = document.querySelector(".weather-card__not-found-content");

const $notFoundIcon = document.querySelector(".weather-card__not-found-icon");

const $notFoundText = document.querySelector(".weather-card__not-found-text");

const $error = document.querySelector(".weather-card__error-content");

const $errorIcon = document.querySelector(".weather-card__error-icon");

const $errorText = document.querySelector(".weather-card__error-text");

const $input = document.querySelector(".weather-card__input");

const $btn = document.querySelector(".weather-card__button");

const $loader = document.querySelector(".weather-card__loader");

$weatherCard.addEventListener("submit", (e) => {
  e.preventDefault();
});

$btn.addEventListener("click", () => {
  callAPILatLon($input.value.trim());
});

$input.value = "Barrancabermeja";

function callAPILatLon(inputValue) {
  $loader.style.display = "block";
  $information.style.display = "none";

  fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=1&appid=${apiKey}`
  )
    .then((response) => {
      if (!response.ok) {
        $loader.style.display = "none";

        console.log("Error en la respuesta ");
      } else {
        $loader.style.display = "none";
        $information.style.display = "block";
        $error.style.display = "none";

        return response.json();
      }
    })

    .then((data) => {
      if (data.length === 0) {
        $information.style.display = "none";

        $notFound.style.display = "block";
        $error.style.display = "none";

        console.log("Ciudad no encontrada");
      } else {
        $notFound.style.display = "none";
        $error.style.display = "none";

        callAPIWeather(data[0].lat, data[0].lon);
      }
    })

    .catch((error) => {
      $information.style.display = "none";
      $loader.style.display = "none";

      $error.style.display = "block";

      console.error(error.message);
      $errorText.innerText = `Error: ${error}`;
    });
}
/* assent */
function callAPIWeather(lat, lon) {
  console.log(lat, lon);
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude=&appid=${apiKey}&units=metric&lang=es`
  )
    .then((response) => {
      if (!response.ok) {
        console.log("Error al buscar la ciudad");
      } else {
        return response.json();
      }
    })
    .then((data) => {
      if (data.length === 0) {
        console.log("Valor vacio");
      } else {
        console.log(data);
        console.log(data[0]);
        console.log();
        $information.innerHTML = "";

        const descriptionFirstUppercase = data.weather[0].description.replace(
          data.weather[0].description[0],
          data.weather[0].description[0].toUpperCase()
        );
        console.log(data.weather[0].main);

        createElement(
          data.name,
          data.sys.country,
          data.weather[0].icon,
          data.weather[0].main,
          data.dt,
          data.sys.sunrise,
          data.sys.sunset,
          Math.round(data.main.temp),
          descriptionFirstUppercase,
          Math.round(data.main.humidity),
          Math.round(data.wind.speed)
        );
      }
    });
}

callAPIWeather(7.0673313, -73.8525627);

function createElement(
  city,
  country,
  icon,
  mainWeather,
  dt,
  sunrise,
  sunset,
  temp,
  description,
  humidity,
  windSpeed
) {
  const $status = document.createElement("div");

  $status.className = "weather-card__status";

  $information.append($status);

  const $icon = document.createElement("img");

  $icon.className = "weather-card__status-icon";

  $icon.setAttribute("src", `https://openweathermap.org/img/wn/${icon}@4x.png`);

  $icon.setAttribute("alt", `${description}`);

  $status.append($icon);

  const $statusText = document.createElement("div");

  $statusText.className = "weather-card__status-text";

  $status.append($statusText);

  const $temp = document.createElement("p");

  $temp.className = "weather-card__temperature";

  $temp.textContent = `${temp}`;

  $statusText.append($temp);

  const $degreeSymbol = document.createElement("small");

  $degreeSymbol.className = "weather-card__degree-symbol";

  $degreeSymbol.textContent = "°C";

  $temp.append($degreeSymbol);

  const $description = document.createElement("p");

  $description.className = "weather-card__status-description";

  $description.textContent = `${description}`;

  $statusText.append($description);

  const $humidityWind = document.createElement("div");

  $humidityWind.className = "weather-card__humidity-wind";

  $information.append($humidityWind);

  const $humidity = document.createElement("div");

  $humidity.className = "weather-card__humidity-card";

  $humidity.innerHTML = `  <svg
                  class="humidity-card__icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path
                    d="M269.5 69.9c11.1-7.9 25.9-7.9 37 0C329 85.4 356.5 96 384 96c26.9 0 55.4-10.8 77.4-26.1c0 0 0 0 0 0c11.9-8.5 28.1-7.8 39.2 1.7c14.4 11.9 32.5 21 50.6 25.2c17.2 4 27.9 21.2 23.9 38.4s-21.2 27.9-38.4 23.9c-24.5-5.7-44.9-16.5-58.2-25C449.5 149.7 417 160 384 160c-31.9 0-60.6-9.9-80.4-18.9c-5.8-2.7-11.1-5.3-15.6-7.7c-4.5 2.4-9.7 5.1-15.6 7.7c-19.8 9-48.5 18.9-80.4 18.9c-33 0-65.5-10.3-94.5-25.8c-13.4 8.4-33.7 19.3-58.2 25c-17.2 4-34.4-6.7-38.4-23.9s6.7-34.4 23.9-38.4C42.8 92.6 61 83.5 75.3 71.6c11.1-9.5 27.3-10.1 39.2-1.7c0 0 0 0 0 0C136.7 85.2 165.1 96 192 96c27.5 0 55-10.6 77.5-26.1zm37 288C329 373.4 356.5 384 384 384c26.9 0 55.4-10.8 77.4-26.1c0 0 0 0 0 0c11.9-8.5 28.1-7.8 39.2 1.7c14.4 11.9 32.5 21 50.6 25.2c17.2 4 27.9 21.2 23.9 38.4s-21.2 27.9-38.4 23.9c-24.5-5.7-44.9-16.5-58.2-25C449.5 437.7 417 448 384 448c-31.9 0-60.6-9.9-80.4-18.9c-5.8-2.7-11.1-5.3-15.6-7.7c-4.5 2.4-9.7 5.1-15.6 7.7c-19.8 9-48.5 18.9-80.4 18.9c-33 0-65.5-10.3-94.5-25.8c-13.4 8.4-33.7 19.3-58.2 25c-17.2 4-34.4-6.7-38.4-23.9s6.7-34.4 23.9-38.4c18.1-4.2 36.2-13.3 50.6-25.2c11.1-9.4 27.3-10.1 39.2-1.7c0 0 0 0 0 0C136.7 373.2 165.1 384 192 384c27.5 0 55-10.6 77.5-26.1c11.1-7.9 25.9-7.9 37 0zm0-144C329 229.4 356.5 240 384 240c26.9 0 55.4-10.8 77.4-26.1c0 0 0 0 0 0c11.9-8.5 28.1-7.8 39.2 1.7c14.4 11.9 32.5 21 50.6 25.2c17.2 4 27.9 21.2 23.9 38.4s-21.2 27.9-38.4 23.9c-24.5-5.7-44.9-16.5-58.2-25C449.5 293.7 417 304 384 304c-31.9 0-60.6-9.9-80.4-18.9c-5.8-2.7-11.1-5.3-15.6-7.7c-4.5 2.4-9.7 5.1-15.6 7.7c-19.8 9-48.5 18.9-80.4 18.9c-33 0-65.5-10.3-94.5-25.8c-13.4 8.4-33.7 19.3-58.2 25c-17.2 4-34.4-6.7-38.4-23.9s6.7-34.4 23.9-38.4c18.1-4.2 36.2-13.3 50.6-25.2c11.1-9.5 27.3-10.1 39.2-1.7c0 0 0 0 0 0C136.7 229.2 165.1 240 192 240c27.5 0 55-10.6 77.5-26.1c11.1-7.9 25.9-7.9 37 0z"
                  />
                </svg>`;

  const $humidityStatus = document.createElement("div");

  $humidityStatus.className = "humidity-card__status";

  $humidity.append($humidityStatus);

  const $humidityPercentage = document.createElement("p");

  $humidityPercentage.className = "humidity-card__percentage";

  $humidityPercentage.textContent = `${humidity}%`;

  $humidityStatus.append($humidityPercentage);

  const $humidityTitle = document.createElement("small");

  $humidityTitle.className = "humidity-card__title";

  $humidityTitle.innerText = "Humedad";

  $humidityStatus.append($humidityTitle);

  $humidityWind.append($humidity);

  // const $humiditySvg = document.createElement("svg");

  // $humiditySvg.className = ""

  const $wind = document.createElement("div");

  $wind.className = "weather-card__wind-card";

  $wind.innerHTML = `  <svg
                  class="wind-card__icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M288 32c0 17.7 14.3 32 32 32l32 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128c-17.7 0-32 14.3-32 32s14.3 32 32 32l320 0c53 0 96-43 96-96s-43-96-96-96L320 0c-17.7 0-32 14.3-32 32zm64 352c0 17.7 14.3 32 32 32l32 0c53 0 96-43 96-96s-43-96-96-96L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-32 0c-17.7 0-32 14.3-32 32zM128 512l32 0c53 0 96-43 96-96s-43-96-96-96L32 320c-17.7 0-32 14.3-32 32s14.3 32 32 32l128 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-32 0c-17.7 0-32 14.3-32 32s14.3 32 32 32z"
                  />
                </svg>`;

  $humidityWind.append($wind);

  const $windStatus = document.createElement("div");

  $windStatus.className = "wind-card__status";

  $wind.append($windStatus);

  const $windValue = document.createElement("p");

  $windValue.className = "wind-card__value";

  $windValue.innerText = `${windSpeed}Km/h`;

  $windStatus.append($windValue);

  const $windTitle = document.createElement("small");

  $windTitle.className = "wind-card__title";
  $windTitle.textContent = "Vel. viento";

  $windStatus.append($windTitle);

  changeColorBody(mainWeather, dt, sunrise, sunset);

  // $weatherCard.append($information);
}

function changeColorBody(mainWeather, dt, sunrise, sunset) {
  const $body = document.querySelector("body");

  const $main = document.querySelector("main");

  const $title = document.querySelector(".weather-card__title");

  const $weatherTemperature = document.querySelector(
    ".weather-card__temperature"
  );

  const $weatherDescription = document.querySelector(
    ".weather-card__status-description"
  );

  const $weatherHumidityWind = document.querySelector(
    ".weather-card__humidity-wind"
  );

  const $weatherHumidityIcon = document.querySelector(".humidity-card__icon");

  const $weatherWindIcon = document.querySelector(".wind-card__icon");

  const $footer = document.querySelector("footer");

  console.log(
    `dt: ${dt - 1742000000}\nsunrise: ${sunrise - 1742000000}\nsunset: ${
      sunset - 1742000000
    }`
  );

  // mainWeather = "Fog";

  if (mainWeather === "Thunderstorm") {
    $body.style = "background-color: #1C1F2B";

    $title.style = "color: #FFC107";
    $footer.style = "color: #FFC107";

    $weatherTemperature.style = "color: #FFFFFF";
    $weatherDescription.style = "color: #FFFFFF";
    $weatherHumidityWind.style = "color:rgba(255, 193, 7, 0.82)";
    $weatherHumidityIcon.style = "fill: #FFC107";
    $weatherWindIcon.style = "fill: #FFC107";
    $notFoundIcon.setAttribute("stroke", " #FFC107");
    $notFoundText.style.color = " #FFC107";
    $errorIcon.setAttribute("stroke", " #FFC107");
    $errorText.style.color = " #FFC107";
  }
  if (mainWeather === "Drizzle") {
    $body.style = "background-color: #5E7E96";

    $title.style = "color: #F2F2F2";
    $footer.style = "color: #F2F2F2";

    $weatherTemperature.style = "color: #FFFFFF";
    $weatherDescription.style = "color: #FFFFFF";
    $weatherHumidityWind.style = "color:rgba(242, 242, 242, 0.82)";
    $weatherHumidityIcon.style = "fill: #F2F2F2";
    $weatherWindIcon.style = "fill: #F2F2F2";
    $loader.style = "color: #F2F2F2";
    $notFoundIcon.setAttribute("stroke", " #F2F2F2");
    $notFoundText.style.color = " #F2F2F2";
    $errorIcon.setAttribute("stroke", " #F2F2F2");
    $errorText.style.color = " #F2F2F2";
  }
  if (mainWeather === "Rain") {
    $body.style = "background-color: #324b67";

    $title.style = "color: #FFFFFF";
    $footer.style = "color: #FFFFFF";

    $weatherTemperature.style = "color: #FFFFFF";
    $weatherDescription.style = "color: #FFFFFF";
    $weatherHumidityWind.style = "color:rgba(242, 242, 242, 0.82)";
    $weatherHumidityIcon.style = "fill: #A3CFF8";
    $weatherWindIcon.style = "fill: #A3CFF8";
    $loader.style = "color: #FFFFFF";
    $notFoundIcon.setAttribute("stroke", " #FFFFFF");
    $notFoundText.style.color = " #FFFFFF";
    $errorIcon.setAttribute("stroke", " #FFFFFF");
    $errorText.style.color = " #FFFFFF";
  }
  if (mainWeather === "Snow") {
    $body.style = "background-color: #DDE4EA";

    $title.style = "color: #434343";
    $footer.style = "color: #434343";

    $weatherTemperature.style = "color:  #434343";
    $weatherDescription.style = "color: #434343";
    $weatherHumidityWind.style = "color:rgba(67, 67, 67, 0.82)";
    $weatherHumidityIcon.style = "fill: #434343";
    $weatherWindIcon.style = "fill: #434343";
    $loader.style = "color: #434343";
    $notFoundIcon.setAttribute("stroke", " #434343");
    $notFoundText.style.color = " #434343";
    $errorIcon.setAttribute("stroke", " #434343");
    $errorText.style.color = " #434343";
  }
  if (
    mainWeather === "Mist" ||
    mainWeather === "Haze" ||
    mainWeather === "Dust" ||
    mainWeather === "Fog" ||
    mainWeather === "Sand" ||
    mainWeather === "Dust" ||
    mainWeather === "Ash" ||
    mainWeather === "Squall" ||
    mainWeather === "Tomato"
  ) {
    $body.style = "background-color: #444a50";

    $title.style = "color: #F8F9FA";
    $footer.style = "color: #F8F9FA";

    $weatherTemperature.style = "color:  #F8F9FA";
    $weatherDescription.style = "color: #F8F9FA";
    $weatherHumidityWind.style = "color:rgba(248, 249, 250, 0.82)";
    $weatherHumidityIcon.style = "fill: #F8F9FA";
    $weatherWindIcon.style = "fill: #F8F9FA";
    $loader.style = "color: #F8F9FA";
    $notFoundIcon.setAttribute("stroke", " #F8F9FA");
    $notFoundText.style.color = " #F8F9FA";
    $errorIcon.setAttribute("stroke", " #F8F9FA");
    $errorText.style.color = " #F8F9FA";
  }
  if (mainWeather === "Clear") {
    if (dt >= sunrise && dt < sunset) {
      $body.style = "background-color: #72BCE8";

      $weatherTemperature.style = "color:  #0D0D0D";
      $weatherDescription.style = "color: #0D0D0D";
      $weatherHumidityWind.style = "color:rgba(13, 13, 13, 0.82)";
      $weatherHumidityIcon.style = "fill: #0D0D0D";
      $weatherWindIcon.style = "fill: #0D0D0D";
      $loader.style = "color: #0D0D0D";
      $notFoundIcon.setAttribute("stroke", " #0D0D0D");
      $notFoundText.style.color = " #0D0D0D";
      $errorIcon.setAttribute("stroke", " #0D0D0D");
      $errorText.style.color = " #0D0D0D";
    }

    if (dt < sunrise || dt >= sunset) {
      $body.style = "background-color: #14173D";

      $title.style = "color: #FFFFFF";
      $footer.style = "color: #FFFFFF";

      $weatherTemperature.style = "color:  #FFFFFF";
      $weatherDescription.style = "color: #FFFFFF";
      $weatherHumidityWind.style = "color:rgba(255, 255, 255, 0.82)";
      $weatherHumidityIcon.style = "fill: #FFFFFF";
      $weatherWindIcon.style = "fill: #FFFFFF";
      $loader.style = "color: #FFFFFF";

      $notFoundIcon.setAttribute("stroke", " #FFFFFF");
      $notFoundText.style.color = " #FFFFFF";
      $errorIcon.setAttribute("stroke", " #FFFFFF");
      $errorText.style.color = " #FFFFFF";
    }
  }

  if (mainWeather === "Clouds") {
    $body.style = "background-color: #BFC7D6";

    $title.style = "color: #282828";

    $footer.style = "color: #282828";

    $weatherTemperature.style = "color:  #282828";
    $weatherDescription.style = "color: #282828";
    $weatherHumidityWind.style = "color:rgba(40, 40, 40, 0.82)";
    $weatherHumidityIcon.style = "fill: #282828";
    $weatherWindIcon.style = "fill: #282828";
    $loader.style = "color: #282828";
    $notFoundIcon.setAttribute("stroke", " #282828");
    $notFoundText.style.color = " #282828";
    $errorIcon.setAttribute("stroke", " #282828");
    $errorText.style.color = " #282828";
  }
}
