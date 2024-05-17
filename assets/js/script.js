import { getItem } from './modules/localstorage.js'
import { swipe } from './modules/swipe.js'
import { showAddCity } from './menu.js'
import { showTemperature} from './modules/apiFunction.js'
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
async function initial(apiKey, dateCurrent) {

    if (arrayCity.length == 0) {
        showAddCity()
    } else {
        for (const city of arrayCity) {
            await showTemperature(city, dateCurrent)
        }
        showListCity()
        swipe();
    }
}



