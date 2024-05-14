export function imageSky(sky) {
    let imgSky

    switch (sky) {
        case "Rain":
            imgSky = "./assets/images/icones/fluent--weather-rain-showers-day-24-regular.svg";
            break;
        case "Drizzle":
            imgSky = "./assets/images/icones/fluent--weather-rain-24-regular.svg";
            break;
        case "Squall":
            imgSky = "./assets/images/icones/fluent--weather-squalls-24-regular.svg";
            break;
        case "Clear":
            imgSky = "./assets/images/icones/fluent--weather-sunny-24-regular.svg";
            break;
        case "Clouds":
            imgSky = "./assets/images/icones/fluent--weather-partly-cloudy-day-24-regular.svg";
            break;
        case "Snow":
            imgSky = "./assets/images/icones/fluent--weather-snow-24-regular.svg";
            break;
        default:
            imgSky = "./assets/images/icones/fluent--weather-partly-cloudy-day-24-regular.svg";
            break;
    }

    return imgSky;
}