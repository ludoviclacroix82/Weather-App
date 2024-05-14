//Date / Month
const dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


/**
 * Conversion de date 
 * @param {*} date 
 * @returns des variables multiple 
 */
export function date(date) {

    let month, day, dayTitle, hour, min;

    const dayArrayTemp = [...dayArray]
    const monthArrayTemp = [...monthArray]

    month = date.getMonth();
    day = date.getDate();
    dayTitle = date.getDay();


    hour = (date.getHours() <= 9) ? '0' + date.getHours() : date.getHours()
    min = (date.getMinutes() <= 9) ? '0' + date.getMinutes() : date.getMinutes()

    return [dayArrayTemp[dayTitle], monthArrayTemp[month], day, hour, min]

}
/**
 * Conversion tem Kelvin en Celsius
 * @param {*} temp en Kelvin
 * @returns la conversion temp Celsisus
 */
export function conversionKelvinCelsius(temp) {
    let tempKelvin = temp
    let tempCelsius = tempKelvin - 273.15;


    return Math.floor(tempCelsius)
}

export function conversionWind(wind, unit) {
    let windMeterSec = wind
    var windKmHeure = windMeterSec * (3600 / 1000);

    return windKmHeure.toFixed(0) + ' ' + unit
}