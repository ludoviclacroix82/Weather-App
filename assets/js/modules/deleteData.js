import { setItem, getItem } from './localstorage.js'
import {showListCity} from './showData.js'

/**
 * Suppresion d'une villedans le localStorage  pour la liste 
 * @param {*} city nom de la ville
 */
export function cityListDelete(city){

    const arrayCity = getItem('City')
    const cityPositionArray = arrayCity.indexOf(city)
    arrayCity.splice(cityPositionArray,1)

    setItem('City',arrayCity)
    showListCity()
}
/**
 * suppression de la ville dans le localStorage
 * @param {*} city nom de la ville
 */
export function cityDelete(city){

    const arrayCity = getItem('City')
    const cityPositionArray = arrayCity.indexOf(city)
    arrayCity.splice(cityPositionArray,1)

    setItem('City',arrayCity)
    showListCity()
}