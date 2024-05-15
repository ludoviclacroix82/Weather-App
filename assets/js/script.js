import { date, conversionKelvinCelsius, conversionWind } from './modules/conversionData.js'
import { addElementCurrentTemperature, addElementNowtemperature, addElementAlltemperature, showListCity } from './modules/addDataElement.js'
import { imageSky } from './modules/imageSky.js'
import { setItem, getItem } from './modules/localstorage.js'
import { swipe } from './modules/swipe.js'

const apiKey = '557f3c9c41c52d8aeca9d72c7c4fa0ab'

const city = "Charleroi"
const unitWind = 'km/h'
const nbrAllTemp = 10

const dateCurrent = new Date();

let cpt = 0;

const apiUrlWeather = (city, apiKey) => fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + apiKey)

const arrayCity = Array.from(getItem('City'))

for (const city of arrayCity) {
	showTemperature(city, apiKey)
}

showListCity()
swipe();

async function showTemperature(city, apiKey) {

	try {
		let responseApiUrlWeather = await apiUrlWeather(city, apiKey);
		let data = await responseApiUrlWeather.json();

		//image Sky 
		const imgSky = imageSky(data.list[0].weather[0].main)

		// temp Celisus
		const temperature = conversionKelvinCelsius(data.list[0].main.temp)
		const temperatureMin = conversionKelvinCelsius(data.list[0].main.temp_min)
		const temperatureMax = conversionKelvinCelsius(data.list[0].main.temp_max)
		//Description Sky
		const descriptionSky = data.list[0].weather[0].description
		// Wind
		const wind = conversionWind(data.list[0].wind.speed, unitWind)
		//rain
		const rain = data.list[0].clouds.all + ' %'
		// Humidity
		const humidity = data.list[0].main.humidity + ' %'
		//pressure
		const pressure = data.list[0].main.pressure

		// curent day
		const [dayTitle, month, day, hour, min] = date(dateCurrent)
		const dateFormat = dayTitle + ' |  ' + month + ' ' + day

		addElementCurrentTemperature(city, dateFormat, temperature, descriptionSky, wind, rain, humidity, pressure, imgSky)

		
		for (const list of data.list) {

			if (cpt == nbrAllTemp) {
				break
			}else{
				if (cpt === 0) {
					addElementNowtemperature(imgSky, temperatureMin, temperatureMax, rain)
				} else {
					let dateTime = new Date(data.list[0].dt_txt)
					const [dayTitle, month, day, hour, min] = date(dateTime)
					const hourFormat = hour + ":" + min
					addElementAlltemperature(hourFormat, dateFormat, imgSky, temperatureMin, temperatureMax, rain)
				}
			}
			cpt++;
		}

	} catch (error) {
		console.log("There was an error!", error);
	}
}

