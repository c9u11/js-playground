const API_KEY = "2231422ed43d5e60f7e3ea2a0e7e997a";

function onGeoOK(position){
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
  .then(res => res.json())
  .then(data => {
    const city = document.querySelector("#weather span:last-child");
    const weather = document.querySelector("#weather span:first-child");
    city.innerText = data.name;
    weather.innerText = `${data.weather[0].main} / ${data.main.temp}`
  })
}

function onGeoErr(){
  alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOK, onGeoErr);