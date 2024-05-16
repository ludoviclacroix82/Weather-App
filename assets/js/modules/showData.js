import { setItem, getItem } from './localstorage.js'
import { cityListDelete } from './deleteData.js'

export function showListCity() {

    const listCityElem = document.querySelector('.listCity')
    listCityElem.innerHTML = ''

    let arrayCityList = Array.from(getItem('City'))

    for (const city of arrayCityList) {
        const listCity = document.createElement('div')
        const cityName = document.createElement('div')
        const deleteCity = document.createElement('div')
        const deleteCityImg = document.createElement('img')

        listCity.classList.add('city')
        listCityElem.appendChild(listCity)

        listCity.appendChild(cityName)
        cityName.innerHTML = city
        cityName.classList.add('name')

        listCity.appendChild(deleteCity);
        deleteCity.classList.add('delete')
        deleteCity.appendChild(deleteCityImg)
        deleteCityImg.src = './assets/images/icones/radix-icons--cross-1.svg'

        deleteCity.addEventListener('click', event => {
            cityListDelete(city)
        })
    }
}