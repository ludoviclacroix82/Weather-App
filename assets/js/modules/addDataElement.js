
import { setItem, getItem } from './localstorage.js'


/**
 * Ajout via Dom les data dans le today-wrap
 * @param {*} date 
 */
export function addElementCurrentTemperature(date, currentTemp, sky, wind, rain, humidity, pressure, imgSky) {

    const todayHeader = document.querySelector('.today-header')
    const imgheader = todayHeader.querySelector('img')

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
    todayFooterPressure.innerHTML = pressure
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

export function addElementAlltemperature(hour,date, imgSky, tempMin, tempMax, rain) {

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
export function showListCity(){

	const listCityElem = document.querySelector('.listCity')
    listCityElem.innerHTML=''

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