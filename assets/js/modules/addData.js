
import { setItem, getItem } from './localstorage.js'
import { imageSky } from './imageSky.js'
import { conversionKelvinCelsius, date } from './conversionData.js'
import { darkModAll } from './darkMod.js'
import { graphicTemp } from './graphic.js'
//import {unsplahApi} from './apiFunction.js'
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

    //const imgUnsplash = unsplahApi(city)

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
    const countrySelect = document.querySelector('#' + city)

    for (const cityArray of nbrCity) {

        const circle = document.createElement('div')
        countrySelect.appendChild(circle)
        circle.classList.add('circle')
        if (cityArray == city)
            circle.classList.add('selected')
    }

}

export function addElementtemparature(dataApi) {

    let cpt = 0
    const nbrAllTemp = 10
    let hourFormat
    const dateCurrent = new Date();
    let dataSunSet = dataApi.city.sunset
    let dataList = dataApi.list
    let arrayTempGraph = []
    let arrayHourGraph = []

    for (const data of dataList) {


        //image Sky 
        let imgSky, skyDarkMod

        // temp Celisus
        const temperatureMin = conversionKelvinCelsius(data.main.temp_min)
        const temperatureMax = conversionKelvinCelsius(data.main.temp_max)
        // curent day
        const [dayTitle, month, day, hour, min] = date(dateCurrent)
        const dateFormat = dayTitle + ' |  ' + month + ' ' + day
        //rain
        const rain = data.clouds.all + ' %';
        // Graphic data Hour / Temp
        arrayHourGraph.push(data.dt_txt)
        arrayTempGraph.push(data.main.temp)

        if (cpt <= nbrAllTemp)

            if (cpt === 0) {
                hourFormat = hour + ":" + min
                skyDarkMod = darkModAll(dataSunSet, hourFormat)
                imgSky = imageSky(data.weather[0].main, skyDarkMod)
                addElementNowtemperature(imgSky, temperatureMin, temperatureMax, rain)
            } else {
                let dateTime = new Date(data.dt_txt);
                const [dayTitle, month, day, hour, min] = date(dateTime)
                hourFormat = hour + ":" + min
                skyDarkMod = darkModAll(dataSunSet, hourFormat)
                imgSky = imageSky(data.weather[0].main, skyDarkMod)
                addElementAlltemperature(hourFormat, dateFormat, imgSky, temperatureMin, temperatureMax, rain)
            }

        cpt++;
    }
    graphicTemp(arrayTempGraph, arrayHourGraph);
}

export function addElementNowtemperature(imgSky, tempMin, tempMax, rain) {

    const daytempListNow = document.querySelector('.day-temp')
    const dayNow = daytempListNow.querySelector('.now')
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

export function addElementAlltemperature(hour, date, imgSky, tempMin, tempMax, rain) {

    const allTempElem = document.querySelector('#allTemp')
    const daytempListNow = allTempElem.querySelector('.day-temp')
    let daytempList;

    if (daytempListNow.querySelector('.day-temp-list') === null) {
        daytempList = document.createElement('div');
        daytempListNow.appendChild(daytempList);
        daytempList.classList.add('day-temp-list');
    } else {
        daytempList = allTempElem.querySelector('.day-temp-list');
    }

    const articletemp = document.createElement('article');
    const allTempTitle = allTempElem.querySelector('h2');

    allTempTitle.innerHTML = date;
    articletemp.innerHTML = `
        <div class="day-temp-header">${hour}</div>
        <div class="day-temp-main">
            <img class="svg" src="${imgSky}" alt="">
        </div>
        <div class="day-temp-footer">
            <p class="temperature">${tempMin}/${tempMax}°</p>
            <p class="rain">${rain}</p>
        </div>`;

    daytempList.appendChild(articletemp);

}
