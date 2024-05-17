import { setItem, getItem } from './modules/localstorage.js'
import {showListCity} from './modules/showData.js'

const btnAddCountry = document.querySelector('.add')
const addCountry = document.querySelector('.addCountry')
const addClose = document.querySelector('.country-header')
const btnClose = addClose.querySelector('#close')
const btnSearch = document.querySelector('#btnSearch')

/**
 * evenement click qui va ouvrir la fenete de l'ajout de ville
 */
btnAddCountry.addEventListener('click',event=>{
    showAddCity()
})
/**
 * evenement click qui va ferme la fenetre de l'ajout de ville
 */
btnClose.addEventListener('click',event=>{
    closeAddCity()
})

/**
 * evenement qui va ajouter la ville encodée dans le loclaStorage
 */
btnSearch.addEventListener('click',event =>{
    const city = document.querySelector('#citySearch')
    const cityArray = Array.from(getItem('City'))
    cityArray.push(city.value)
    setItem('City',cityArray)
    city.value = '';

    showListCity()
})

/**
 * permet d'ajouter la class  pour afficher  la fenetre de l'ajout de ville
 */
export function showAddCity(){
    addCountry.classList.add('open')
    showListCity()
}
/**
 *  permet de supprime  la  class pour afficher  la fenetre de l'ajout de ville
 */
export function closeAddCity(){
    addCountry.classList.remove('open')
    location.reload()
}