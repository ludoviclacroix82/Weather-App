import { date, conversionKelvinCelsius, conversionWind } from './modules/conversionData.js'
import { addElementCurrentTemperature, addElementNowtemperature, addElementAlltemperature } from './modules/addDataElement.js'
import { imageSky } from './modules/imageSky.js'

const apiKey = '557f3c9c41c52d8aeca9d72c7c4fa0ab'

const city = "Charleroi"
const unitWind = 'km/h'

const dateCurrent = new Date();

let cpt = 0;

const apiUrlWeather = (city, apiKey) => fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + apiKey)

showTemperature(city, apiKey)

async function showTemperature(city, apiKey) {

	try {
		let responseApiUrlWeather = await apiUrlWeather(city, apiKey);
		let data = await responseApiUrlWeather.json();

		const arrayList = data.list

		for (const list of arrayList) {
			//image Sky 
			const imgSky = imageSky(list.weather[0].main)

			// temp Celisus
			const temperature = conversionKelvinCelsius(list.main.temp)
			const temperatureMin = conversionKelvinCelsius(list.main.temp_min)
			const temperatureMax = conversionKelvinCelsius(list.main.temp_max)
			//Description Sky
			const descriptionSky = list.weather[0].description
			// Wind
			const wind = conversionWind(list.wind.speed, unitWind)
			//rain
			const rain = list.clouds.all + ' %'
			// Humidity
			const humidity = list.main.humidity + ' %'
			//pressure
			const pressure = list.main.pressure

			if (cpt === 0) {
				// curent day
				const [dayTitle, month, day, hour,min] = date(dateCurrent)
				const dateFormat = dayTitle + ' |  ' + month + ' ' + day
				addElementCurrentTemperature(dateFormat, temperature, descriptionSky, wind, rain, humidity, pressure, imgSky)
				addElementNowtemperature(imgSky, temperatureMin, temperatureMax, rain)
			} else {
				let dateTime = new Date(list.dt_txt)
				const [dayTitle, month, day, hour,min] = date(dateTime)
				const hourFormat = hour + ":" + min
				addElementAlltemperature(hourFormat, imgSky, temperatureMin, temperatureMax, rain)
			}


			cpt++;

		}


	} catch (error) {
		console.log("There was an error!", error);
	}
}

