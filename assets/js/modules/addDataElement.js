
import { setItem, getItem } from './localstorage.js'


/**
 * Ajout via Dom les data dans le today-wrap
 * @param {*} date 
 */
export function addElementCurrentTemperature(city,date, currentTemp, sky, wind, rain, humidity, pressure, imgSky) {

    const todayHeader = document.querySelector('section')
    const today = document.createElement('div')

    todayHeader.appendChild(today)
    today.classList.add('today')

    today.innerHTML = `
                <div class="country">
                    <h2>${city}</h2>
                    <div class="country-select">
                        <div class="circle selected"></div>
                        <div class="circle"></div>
                        <div class="circle"></div>
                    </div>
                </div>
                <div class="today-warp">
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


    /*const imgheader = todayHeader.querySelector('img')

    const todayMain = document.querySelector('.today-main')
    const mainDate = todayMain.querySelector('.date')
    const mainTemp = todayMain.querySelector('.temp')
    const mainInfo = todayMain.querySelector('.info')

    const todayFooter = document.querySelector('.today-footer')
    const todayFooterWind = todayFooter.querySelector('#wind')
    const todayFooterRain = todayFooter.querySelector('#rain')
    const todayFooterPressure = todayFooter.querySelector('#pressure')
    const todayFooterHumidity = todayFooter.querySelector('#humidity')

    imgheader.src = imgSky

    mainDate.innerHTML = date;
    mainTemp.innerHTML = currentTemp
    mainInfo.innerHTML = sky

    todayFooterWind.innerHTML = wind
    todayFooterRain.innerHTML = rain
    todayFooterHumidity.innerHTML = humidity
    todayFooterPressure.innerHTML = pressure*/
}

export function addElementNowtemperature(imgSky, tempMin, tempMax, rain) {

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

export function addElementAlltemperature(hour, date, imgSky, tempMin, tempMax, rain) {

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
        listCity.classList.add('city')
        listCityElem.appendChild(listCity)

        listCity.appendChild(cityName)
        cityName.innerHTML = city
        cityName.classList.add('name')
    }
}