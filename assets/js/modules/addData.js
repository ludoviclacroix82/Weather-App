
import { getItem } from './localstorage.js'
import { imageSky } from './imageSky.js'
import { conversionKelvinCelsius, date } from './conversionData.js'
import { darkModAll } from './darkMod.js'
import { graphicTemp } from './graphic.js'

/**
 * Ajout des donné de l'api sur la zone current temperature
 * @param {*} city nom de la ville
 * @param {*} date 
 * @param {*} currentTemp la temperature current
 * @param {*} sky donnée sur l'etait du ciel
 * @param {*} wind donnée sur le vent
 * @param {*} rain donnée sur la pluie
 * @param {*} humidity  donnée de l'humidité
 * @param {*} pressure donnée de la pression
 * @param {*} imgSky icone du ciel
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
/**
 * Ajout des donné de temparature tous les 3h 
 * @param {*} dataApi donnée recupere par l'api
 */
export function addElementtemparature(dataApi,cptCity) {

    let cpt = 0
    const nbrAllTemp = 10
    let hourFormat
    const dateCurrent = new Date();
    let dataSunSet = dataApi.city.sunset
    let dataList = dataApi.list
    let arrayChart = []

    const city = dataApi.city.name

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
        const [dayTitleChart, monthChart, dayChart, hourChart, minChart] = date(new Date(data.dt_txt))
        let chartHourFormat = hourChart + ":" + minChart
        const chartTemperature = conversionKelvinCelsius(data.main.temp_min)
        arrayChart.push({'hour':chartHourFormat,"temp":chartTemperature})

        if (cpt <= nbrAllTemp)

            if (cpt === 0) {
                hourFormat = hour + ":" + min
                skyDarkMod = darkModAll(dataSunSet, hourFormat)
                imgSky = imageSky(data.weather[0].main, skyDarkMod)
                addElementNowtemperature(cptCity, city, imgSky, temperatureMin, temperatureMax, rain)
            } else {
                let dateTime = new Date(data.dt_txt);
                const [dayTitle, month, day, hour, min] = date(dateTime)
                hourFormat = hour + ":" + min
                skyDarkMod = darkModAll(dataSunSet, hourFormat)
                imgSky = imageSky(data.weather[0].main, skyDarkMod)
                addElementAlltemperature(city, hourFormat, dateFormat, imgSky, temperatureMin, temperatureMax, rain)
            }

        cpt++;

    }
    graphicTemp(city, arrayChart);

}
/**
 * Affiche dans les temparateur celle current
 * @param {*} cpt compteur pour gerer la visibilité via css
 * @param {*} city le nom de la ville
 * @param {*} imgSky icone du status du ciel
 * @param {*} tempMin temperature minimum
 * @param {*} tempMax temperature maximum
 * @param {*} rain donnée de la pluis
 */
export function addElementNowtemperature(cpt, city, imgSky, tempMin, tempMax, rain) {

    const daytemp = document.querySelector('.day-temp')
    const dayTempList = document.createElement('div')
    daytemp.appendChild(dayTempList)
    dayTempList.id = 'temp' + city
    dayTempList.classList.add('day-temp-city')

    if (cpt === 0)
        dayTempList.classList.add('open')

    console.log(cpt);

    //const dayNow = daytempListNow.querySelector('.now')
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

    dayTempList.appendChild(articletemp)
    articletemp.classList.add('now')

}

/**
 * Affiche les temparteure avenir
 * @param {*} city nom de la ville
 * @param {*} hour heure (tous les 3:00)
 * @param {*} city le nom de la ville
 * @param {*} imgSky icone du status du ciel
 * @param {*} tempMin temperature minimum
 * @param {*} tempMax temperature maximum
 * @param {*} rain donnée de la pluis
 */
export function addElementAlltemperature(city, hour, date, imgSky, tempMin, tempMax, rain) {

    const allTempElem = document.querySelector('#allTemp')
    const daytempListNow = allTempElem.querySelector('.day-temp')
    const dayTempList = daytempListNow.querySelector('#temp' + city)

    /*if (daytempListNow.querySelector('.day-temp-list') === null) {
        daytempList = document.createElement('div');
        daytempListNow.appendChild(daytempList);
        daytempList.classList.add('day-temp-list');
    } else {
        daytempList = allTempElem.querySelector('.day-temp-list');
    }*/

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

    articletemp.classList.add('day-temp-list')
    dayTempList.appendChild(articletemp);

}

export function addImgUnsplsh(imgUrl,city){
    const allCityElem = document.querySelector('#allCity')
    const warpElem = allCityElem.querySelector('#wrap'+city)
    warpElem.style.backgroundImage = 'url(' +  imgUrl +')'
    console.log(warpElem);
}
