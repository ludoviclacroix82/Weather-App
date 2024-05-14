import { setItem, getItem } from './modules/localstorage.js'


const btnAddCountry = document.querySelector('.add')
const addCountry = document.querySelector('.addCountry')
const addClose = document.querySelector('.country-header')
const btnClose = addClose.querySelector('#close')
const btnSearch = document.querySelector('#btnSearch')


btnAddCountry.addEventListener('click',event=>{
    addCountry.classList.toggle('open')
})
btnClose.addEventListener('click',event=>{
    addCountry.classList.toggle('open')
})

btnSearch.addEventListener('click',event =>{
    const city = document.querySelector('#citySearch')
    const cityArray = Array.from(getItem('City'))
    cityArray.push(city.value)
    setItem('City',cityArray)
    city.value = '';
})