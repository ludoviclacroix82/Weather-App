import { getItem } from './localstorage.js'

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

    todayHeader.addEventListener('touchstart', event => {
        console.log(nbrCitySlected + '//' + nbrCity);

        if (nbrCitySlected < nbrCity) {
            todayHeader.scrollLeft += todayHeaderOffesWidth - 10
            nbrCitySlected +=1
        } else if (nbrCitySlected == nbrCity) {
            todayHeader.scrollLeft = 0
            nbrCitySlected = 1
        }
    })
}