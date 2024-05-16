import { setItem, getItem } from './modules/localstorage.js'
import {showListCity} from './modules/showData.js'

const btnAddCountry = document.querySelector('.add')
const addCountry = document.querySelector('.addCountry')
const addClose = document.querySelector('.country-header')
const btnClose = addClose.querySelector('#close')
const btnSearch = document.querySelector('#btnSearch')


btnAddCountry.addEventListener('click',event=>{
    showAddCity()
})
btnClose.addEventListener('click',event=>{
    closeAddCity()
})

btnSearch.addEventListener('click',event =>{
    const city = document.querySelector('#citySearch')
    const cityArray = Array.from(getItem('City'))
    cityArray.push(city.value)
    setItem('City',cityArray)
    city.value = '';

    showListCity()
})

export function showAddCity(){
    addCountry.classList.add('open')
    showListCity()
}
export function closeAddCity(){
    addCountry.classList.remove('open')
    location.reload()
}