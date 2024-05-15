import { date, conversionKelvinCelsius, conversionWind } from './modules/conversionData.js'
import { addElementCurrentTemperature, addElementNowtemperature, addElementAlltemperature, showListCity } from './modules/addDataElement.js'
import { imageSky } from './modules/imageSky.js'
import {  getItem } from './modules/localstorage.js'
import { swipe } from './modules/swipe.js'
import { showAddCity } from './menu.js'
import {showTemperature ,showAllTemperature} from './modules/apiFunction.js'

const apiKey = '557f3c9c41c52d8aeca9d72c7c4fa0ab'
const apiUrlWeather = (city, apiKey) => fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + apiKey)

const dateCurrent = new Date();
const arrayCity = Array.from(getItem('City'))
console.log(arrayCity.length);


initial(apiKey,arrayCity,dateCurrent,apiUrlWeather)

/**
 * function initial appel les fonctions importante pour la visualisation
 * @param {*} apiKey clé pour Api
 * @param {*} arrayCity localstorage pour les ville ajoutées
 * @param {*} dateCurrent date en cours
 * @param {*} apiUrlWeather url de l'api
 */
function initial(apiKey,arrayCity,dateCurrent,apiUrlWeather){
    if(arrayCity.length == 0 ){
        showAddCity()
    }else{
        for (const city of arrayCity) {
        showTemperature(city,apiUrlWeather,apiKey,dateCurrent)
        showAllTemperature(city,apiUrlWeather , apiKey,dateCurrent)
        }
        showListCity()
        swipe();    
    }
}



