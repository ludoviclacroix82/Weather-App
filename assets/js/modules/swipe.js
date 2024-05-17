import { getItem } from './localstorage.js'
import { showAllTemperature } from './apiFunction.js'
import { addElementNowtemperature } from './addData.js'

/**
 * Swipe : gère le défilement horizontal 
 * Les variables initialX, moveX et plannerOffset sont déclarées pour stocker les positions initiales et de déplacement lors de l'interaction tactile.
 * écouteur d'événements  touchstart touchmove
 * @param {*} reverse détermine la direction du défilement. -- boolean true : drag&drop ; false swipe noraml 
 */
export function swipe(data) {
    const todayHeader = document.querySelector('.today-header')
    const todayHeaderOffesWidth = todayHeader.offsetWidth
    const nbrCity = Array.from(getItem('City')).length
    let nbrCitySlected = 1

    const dateCurrent = new Date();

    todayHeader.addEventListener('touchend', event => {
        //console.log(nbrCitySlected + '//' + nbrCity);
        const arrayCity = Array.from(getItem('City'))
        const dayTempList = document.querySelector('.day-temp')
        dayTempList.innerHTML = ''

        if (nbrCitySlected < nbrCity) {
            todayHeader.scrollLeft += todayHeaderOffesWidth - 20
            nbrCitySlected += 1

            showAllTemperature(arrayCity[nbrCitySlected - 1], dateCurrent)
            
            
        } else if (nbrCitySlected == nbrCity) {
            todayHeader.scrollLeft = 0
            nbrCitySlected = 1

            showAllTemperature(arrayCity[nbrCitySlected - 1], dateCurrent)

        }

    })
}