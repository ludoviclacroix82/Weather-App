import { getItem } from './modules/localstorage.js'
import { swipe } from './modules/swipe.js'
import { showAddCity } from './menu.js'
import { showTemperature, showAllTemperature } from './modules/apiFunction.js'
import { showListCity } from './modules/showData.js'

const dateCurrent = new Date();
const arrayCity = Array.from(getItem('City'))


initial(arrayCity, dateCurrent)

/**
 * function initial appel les fonctions importante pour la visualisation
 * @param {*} apiKey clé pour Api
 * @param {*} arrayCity localstorage pour les ville ajoutées
 * @param {*} dateCurrent date en cours
 * @param {*} apiUrlWeather url de l'api
 */
function initial(apiKey, dateCurrent) {
    let cpt = 0;

    if (arrayCity.length == 0) {
        showAddCity()
    } else {
        for (const city of arrayCity) {
            showTemperature(city, dateCurrent)
            if (cpt === 0)
                showAllTemperature(city, dateCurrent)
            cpt++
        }
        showListCity()
        swipe();
    }
}



