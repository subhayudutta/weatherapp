var search = document.querySelector(".search");
var button = document.querySelector(".s-ic");
var city = document.querySelectorAll(".city");

window.addEventListener('load', () => {
    geolocat();
})

button.addEventListener('click', () => {
    searchMe();

})


function week() {
    const d = new Date();
    const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

    function getWeek(day) {
        if (day + d.getDay() > 6) {
            return day + d.getDay() - 7;
        } else {
            return day + d.getDay();
        }
    }
    for (let index = 0; index < 5; index++) {
        document.querySelector(`.date-time${index + 1}`).innerHTML = week[getWeek(index)];
    }
}


function geolocat() {
    var lat;
    var long;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&cnt=3&appid=50596f0825ef697aba5896bbab282625`)
                .then(response => (response.json()))
                .then(data => {
                    for (let index = 0; index < 3; index++) {
                        document.querySelector(`.temperature${index + 1}`).innerHTML = `${(data.list[index].main.temp - 273.15).toFixed(1)}&#8451;`;
                    }
                    for (let index = 0; index < 2; index++) {
                        document.querySelector(`.temperature${index + 4}`).innerHTML = `${(data.list[index].main.temp - 273.15).toFixed(1)}&#8451;`;
                    }
                    for (let index = 0; index < city.length; index++) {
                        city[index].innerHTML = data.city.name;
                    }
                    for (let index = 0; index < 3; index++) {
                        document.querySelector(`.factor${index + 1}`).innerHTML = data.list[index].weather[0].description;
                    }
                    for (let index = 0; index < 2; index++) {
                        document.querySelector(`.factor${index + 4}`).innerHTML = data.list[index].weather[0].description;
                    }
                    for (let index = 0; index < 3; index++) {
                        document.querySelector(`.img${index + 1}`).innerHTML = `<img src="Weatherimg/${data.list[index].weather[0].icon}.png" width="100px"></img>`;
                    }
                    for (let index = 0; index < 2; index++) {
                        document.querySelector(`.img${index + 4}`).innerHTML = `<img src="Weatherimg/${data.list[index].weather[0].icon}.png" width="100px"></img>`;
                    }
                    for (let index = 0; index < 3; index++) {
                        document.querySelector(`.windspeed${index + 1}`).innerHTML = `<i class="fas fa-wind fa-fw"></i> ${data.list[index].wind.speed}`;
                    }
                    for (let index = 0; index < 2; index++) {
                        document.querySelector(`.windspeed${index + 4}`).innerHTML = `<i class="fas fa-wind fa-fw"></i> ${data.list[index].wind.speed}`;
                    }
                    for (let index = 0; index < 3; index++) {
                        document.querySelector(`.humidity${index + 1}`).innerHTML = `<i class="fas fa-tint fa-fw"></i> ${data.list[index].main.humidity}`;
                    }
                    for (let index = 0; index < 2; index++) {
                        document.querySelector(`.humidity${index + 4}`).innerHTML = `<i class="fas fa-tint fa-fw"></i> ${data.list[index].main.humidity}`;
                    }
                    for (let index = 0; index < 3; index++) {
                        document.querySelector(`.speed${index + 1}`).innerHTML = ` <i class="fas fa-solid fa-p" style="padding-left:5px;"></i>&nbsp;${data.list[index].main.pressure}`;
                    }
                    for (let index = 0; index < 2; index++) {
                        document.querySelector(`.speed${index + 4}`).innerHTML = ` <i class="fas fa-solid fa-p" style="padding-left:5px;"></i>&nbsp;${data.list[index].main.pressure}`;
                    }
                    document.body.style.backgroundImage = `url('Weatherimghd/${data.list[0].weather[0].icon}.jpg')`
                    console.log(data);
                })
                .catch(err => alert("Location not found"))

            week();

        })

    }
}


function searchMe() {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${search.value}&appid=50596f0825ef697aba5896bbab282625`)
        .then(response => (response.json()))
        .then(data => {

            for (let index = 0; index < 5; index++) {
                document.querySelector(`.temperature${index + 1}`).innerHTML = `${(data.list[index].main.temp - 273.15).toFixed(1)}&#8451;`;
            }

            for (let index = 0; index < 5; index++) {
                document.querySelector(`.factor${index + 1}`).innerHTML = data.list[index].weather[0].description;
            }

            for (let index = 0; index < 5; index++) {
                document.querySelector(`.windspeed${index + 1}`).innerHTML = `<i class="fas fa-wind fa-fw"></i> ${data.list[index].wind.speed}`;
            }

            for (let index = 0; index < 5; index++) {
                document.querySelector(`.humidity${index + 1}`).innerHTML = `<i class="fas fa-tint fa-fw"></i> ${data.list[index].main.humidity}`;
            }

            for (let index = 0; index < 5; index++) {
                document.querySelector(`.speed${index + 1}`).innerHTML = ` <i class="fas fa-solid fa-p" style="padding-left:5px;"></i>&nbsp;${data.list[index].main.pressure}`;
            }

            for (let index = 0; index < 5; index++) {
                document.querySelector(`.img${index + 1}`).innerHTML = `<img src="Weatherimg/${data.list[index].weather[0].icon}.png" width="100px"></img>`;
            }

            for (let index = 0; index < city.length; index++) {
                city[index].innerHTML = data.city.name;
            }

            document.body.style.backgroundImage = `url('Weatherimghd/${data.list[0].weather[0].icon}.jpg')`
        })
        .catch(err => alert("Location not found"));

    week();
}
