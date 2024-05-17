
/**
 * Function qui va asigner les icones pour chaque temperature
 * @param {*} sky le visuel du ciel ( nuageux ....)
 * @param {*} drakMod donné de la fonction du darkmod (night/day)
 * @returns l'icones 
 */
export function imageSky(sky,drakMod) {
    let imgSky

    switch (sky) {
        case "Rain":
            imgSky = "./assets/images/icones/fluent--weather-rain-showers-"+drakMod+"-24-regular.svg";
            break;
        case "Drizzle":
            imgSky = "./assets/images/icones/fluent--weather-rain-showers-"+drakMod+"-24-regular";
            break;
        case "Squall":
            imgSky = "./assets/images/icones/fluent--weather-squalls-24-regular.svg";
            break;
        case "Clear":
            imgSky = "./assets/images/icones/fluent--weather-sunny-"+drakMod+"-24-regular.svg";
            break;
        case "Clouds":
            imgSky = "./assets/images/icones/fluent--weather-partly-cloudy-"+drakMod+"-24-regular.svg";
            break;
        case "Snow":
            imgSky = "./assets/images/icones/fluent--weather-snow-24-regular.svg";
            break;
        default:
            imgSky = "./assets/images/icones/fluent--weather-partly-cloudy-"+drakMod+"-24-regular.svg";
            break;
    }

    return imgSky;
}