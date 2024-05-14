/**
 * Ajout via Dom les data dans le today-wrap
 * @param {*} date 
 */
export function addElementCurrentTemperature(date,currentTemp,sky,wind,rain,humidity,pressure,imgSky){

    const todayHeader = document.querySelector('.today-header')
    const imgheader = todayHeader.querySelector('img')

    const todayMain =  document.querySelector('.today-main')
    const mainDate = todayMain.querySelector('.date')
    const mainTemp = todayMain.querySelector('.temp')
    const mainInfo = todayMain.querySelector('.info')

    const todayFooter=  document.querySelector('.today-footer')
    const todayFooterWind = todayFooter.querySelector('#wind')
    const todayFooterRain = todayFooter.querySelector('#rain')
    const todayFooterPressure= todayFooter.querySelector('#pressure')
    const todayFooterHumidity= todayFooter.querySelector('#humidity')

    imgheader.src = imgSky

    mainDate.innerHTML = date;
    mainTemp.innerHTML = currentTemp
    mainInfo.innerHTML = sky

    todayFooterWind.innerHTML = wind
    todayFooterRain.innerHTML = rain
    todayFooterHumidity.innerHTML = humidity
    todayFooterPressure.innerHTML = pressure
}