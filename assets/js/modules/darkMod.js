import { date } from "./conversionData.js";

/**
 * function qui gére le darkmod en function de la date current
 * @param {*} dataApi donnée de l'api
 * @returns 
 */
export function darkMod(dataApi) {
    const body = document.querySelector('body')
    let modeImage
    const dateCurrent = new Date()
    const toTimeZone = 'Europe/Brussels'; // Fuseau horaire cible (par exemple Bruxelles)
    let data = dataApi

    const timeZone = data.city.timezone
    const targetDate = convertTimeZone(dateCurrent, timeZone)
    const sunSet = new Date(data.city.sunset)
    const [dayTitle, month, day, hour, min] = date(sunSet)
    const sunSetFormat = hour + ":" + min

    /**
     * gere le dark mod en fonctionde l'heure 
     */
    if (targetDate < sunSetFormat && targetDate > "08:00") {
        modeImage = 'day'
        body.classList.add('ligther')
        body.classList.remove('dark')
    } else {
        modeImage = "night"
        body.classList.add('dark')
        body.classList.remove('ligther')
    }
    return modeImage
}

/**
 * la gestion des icones pour les temperature prochaine en fucntionde l'heure de celles-ci
 * @param {*} dataSunSet coucher du soleil
 * @param {*} hours heures des temperatures prochaines
 * @returns 
 */
export function darkModAll(dataSunSet, hours) {

    let modeImage
    const dateCurrent = new Date()
    const toTimeZone = 'Europe/Brussels'; // Fuseau horaire cible (par exemple Bruxelles)

    const sunSet = new Date(dataSunSet)
    const [dayTitle, month, day, hour, min] = date(sunSet)
    const sunSetFormat = hour + ":" + min

    if (hours < sunSetFormat && hours > "06:00") {
        modeImage = 'day'
    } else {
        modeImage = "night"
    }

    return modeImage
}

// Fonction pour calculer une date dans un autre fuseau horaire
export function convertTimeZone(date, timeZone) {

    let currentOffsetMinutes = date.getTimezoneOffset()
    let targetTimezoneOffsetSeconds = timeZone + (2 * 3600)
    let targetOffsetMinutes = currentOffsetMinutes - (targetTimezoneOffsetSeconds / 60)
    let targetTime = new Date(date.getTime() + (targetOffsetMinutes))

    return targetTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}