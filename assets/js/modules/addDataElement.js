
import { setItem, getItem } from './localstorage.js'



/**
 * Ajout via Dom les data dans le today-wrap
 * @param {*} date 
 */
export function addElementCurrentTemperature(city, date, currentTemp, sky, wind, rain, humidity, pressure, imgSky) {

    const section = document.querySelector('section')
    const today = document.createElement('div')
    const todayHeader = document.querySelector('.today-header')

    section.appendChild(today)
    today.classList.add('today')

    today.style.width = todayHeader.offsetWidth - 40 + 'px'


    today.innerHTML = `
                <div class="country">
                    <h2>${city}</h2>
                    <div class="country-select" id="${city}">
                    </div>
                </div>
                <div class="today-warp" id="wrap${city}">
                    <div class="today-header">
                        <img class="svg-today-header" src="${imgSky}" alt="">
                    </div>
                    <div class="today-main">
                        <div class="date">${date}</div>
                        <div class="temp">${currentTemp}</div>
                        <div class="info">${sky}</div>
                    </div>
                </div>
                <div class="today-footer">
                    <article>
                        <img class="svg" src="./assets/images/icones/carbon--location-current.svg" alt="Win">
                        <div class="info">
                            <p id="wind">${wind}</p>
                            <p>wind</p>
                        </div>
                    </article>
                    <article>
                        <img class="svg" src="./assets/images/icones/mdi--weather-rainy.svg" alt="Rain">
                        <div class="info">
                            <p id="rain">${rain}</p>
                            <p>Chance of rain</p>
                        </div>
                    </article>
                    <article>
                        <img class="svg" src="./assets/images/icones/fluent--temperature-24-regular.svg" alt="Pressure">
                        <div class="info">
                            <p class="pressure" id="pressure">${pressure}</p>
                            <p>Pressure</p>
                        </div>
                    </article>
                    <article>
                        <img class="svg" src="./assets/images/icones/ion--water-outline.svg" alt="Humidity">
                        <div class="info">
                            <p id="humidity">${humidity}</p>
                            <p>Humidity</p>
                        </div>
                    </article>
                </div>`

    const nbrCity = Array.from(getItem('City'))
    const countrySelect = document.querySelector('#'+city)

    for (const cityArray of nbrCity) {
        
        const circle = document.createElement('div')
        countrySelect.appendChild(circle)
        circle.classList.add('circle')
        if(cityArray == city)
            circle.classList.add('selected')
    }

}

export function addElementNowtemperature(city,imgSky, tempMin, tempMax, rain) {

    const daytempListNow = document.querySelector('.day-temp')
    const articletemp = document.createElement('article');

    articletemp.innerHTML = `
        <div class="day-temp-header">Now</div>
        <div class="day-temp-main">
        <img class="svg" src="${imgSky}" alt="">
        </div>
        <div class="day-temp-footer">
        <p class="temperature">${tempMin}/${tempMax}°</p>
        <p class="rain">${rain}</p>
        </div>`

    daytempListNow.prepend(articletemp)
    articletemp.classList.add('now')

}

export function addElementAlltemperature(city,hour, date, imgSky, tempMin, tempMax, rain) {

    const daytempList = document.querySelector('.day-temp-list')
    const articletemp = document.createElement('article');
    const allTempElem = document.querySelector('#allTemp')
    const allTempTitle = allTempElem.querySelector('h2')

    allTempTitle.innerHTML = date
    articletemp.innerHTML = `
        <div class="day-temp-header">${hour}</div>
        <div class="day-temp-main">
        <img class="svg" src="${imgSky}" alt="">
        </div>
        <div class="day-temp-footer">
        <p class="temperature">${tempMin}/${tempMax}°</p>
        <p class="rain">${rain}</p>
        </div>`

    daytempList.appendChild(articletemp)

}
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
        deleteCityImg.src='./assets/images/icones/radix-icons--cross-1.svg'
        
        deleteCity.addEventListener('click',event =>{
            cityDelete(city)
        })
    }
}

export function cityDelete(city){

    const arrayCity = getItem('City')
    const cityPositionArray = arrayCity.indexOf(city)
    arrayCity.splice(cityPositionArray,1)

    setItem('City',arrayCity)
    showListCity()
}