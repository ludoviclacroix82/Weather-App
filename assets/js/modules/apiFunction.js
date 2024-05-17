import { addElementCurrentTemperature, addElementtemparature } from './addData.js'
import { imageSky } from './imageSky.js'
import { date, conversionKelvinCelsius, conversionWind } from './conversionData.js'
import { showErrorFindCity } from './showData.js'
import { darkMod } from './darkMod.js';

const apiKey = '557f3c9c41c52d8aeca9d72c7c4fa0ab';
const apiUrlWeather = (city, apiKey) => 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + apiKey

const apiKeyUnsplash = 'R2kdgCPmV-BwdC34ezEjIsMCSxuL9uqLlsRoCM9NSB4'
const apiUrlUnsplash = (city, apiKey) => 'https://api.unsplash.com/search/photos?query=' + city + '&client_id=' + apiKey

const unitWind = 'km/h'

export function showTemperature(city, dateCurrent) {
    fetch(apiUrlWeather(city, apiKey))
        .then(response => {
            if (!response.ok) {
                console.log('no found')
                showErrorFindCity(city)
            }
            return response.json();
        })
        .then(data => {
            //image Sky 
            const skyDarkMod = darkMod(data);
            const imgSky = imageSky(data.list[0].weather[0].main, skyDarkMod);

            // temp Celisus
            const temperature = conversionKelvinCelsius(data.list[0].main.temp);
            const temperatureMin = conversionKelvinCelsius(data.list[0].main.temp_min);
            const temperatureMax = conversionKelvinCelsius(data.list[0].main.temp_max);
            //Description Sky
            const descriptionSky = data.list[0].weather[0].description;
            // Wind
            const wind = conversionWind(data.list[0].wind.speed, unitWind);
            //rain
            const rain = data.list[0].clouds.all + ' %';
            // Humidity
            const humidity = data.list[0].main.humidity + ' %';
            //pressure
            const pressure = data.list[0].main.pressure;

            // curent day
            const [dayTitle, month, day, hour, min] = date(dateCurrent);
            const dateFormat = dayTitle + ' |  ' + month + ' ' + day;

            addElementCurrentTemperature(city, dateFormat, temperature, descriptionSky, wind, rain, humidity, pressure, imgSky);
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
}

export function showAllTemperature(city, dateCurrent) {
    fetch(apiUrlWeather(city, apiKey))
        .then(response => {
            if (!response.ok) {
            }
            return response.json();
        })
        .then(data => {

            addElementtemparature(data)
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
}

/*export function unsplahApi(city) {
    fetch(apiUrlUnsplash = (city, apiKeyUnsplash))
        .then(response => {
            if (!response.ok) {
                console.log('no found')
            }
            return response.json();
        })
        .then(data => {

            console.log(data.results.regular);
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
}*/