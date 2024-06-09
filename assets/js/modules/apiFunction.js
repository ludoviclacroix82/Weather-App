import { addElementCurrentTemperature, addElementtemparature, addImgUnsplsh } from './addData.js'
import { imageSky } from './imageSky.js'
import { date, conversionKelvinCelsius, conversionWind } from './conversionData.js'
import { showErrorFindCity } from './showData.js'
import { darkMod } from './darkMod.js';

//key Api
const apiKey = '557f3c9c41c52d8aeca9d72c7c4fa0ab';
const apiKeyUnsplash = 'R2kdgCPmV-BwdC34ezEjIsMCSxuL9uqLlsRoCM9NSB4'
//Url Api + params
const apiUrlWeather = (city, apiKey) => 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + apiKey
const apiUrlUnsplash = (city, apiKey) => 'https://api.unsplash.com/search/photos?query=' + city + '&client_id=' + apiKey

const unitWind = 'km/h'
let cpt = 0


/**
 * Recuperation des donnée de l'api openweathermap
 * @param {*} city nom de la ville
 * @param {*} dateCurrent la date du jour
 */
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

            //country 
            const country = data.city.country
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
            addElementtemparature(data,cpt)
            unsplashApi(city, country)

            cpt ++
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
}
/**
 *  recuperation des donnée de l'api unsplash
 * @param {*} city nom de la ville
 */
export function unsplashApi(city, country) {
    fetch(apiUrlUnsplash(city, apiKeyUnsplash))
        .then(response => {
            if (!response.ok) {
                console.log('no found')
            }
            return response.json();
        })
        .then(data => {
            console.log(data.results[0].urls.regular);

            addImgUnsplsh(data.results[0].urls.regular, city)
            //return data.results[0].urls.regular
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
}