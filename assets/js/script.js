import { date, conversionKelvinCelsius, conversionWind } from './modules/conversionData.js'
import { addElementCurrentTemperature } from './modules/addDataElement.js'
import { imageSky } from './modules/imageSky.js'

const apiKey = '557f3c9c41c52d8aeca9d72c7c4fa0ab'

const city = "Charleroi"
const unitWind = 'km/h'

const currentDate = new Date();


const apiUrlWeather = (city, apiKey) => fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + apiKey)

showCurrentTemperature(city, apiKey)

async function showCurrentTemperature(city, apiKey) {

	try {
		let responseApiUrlWeather = await apiUrlWeather(city, apiKey);
		let data = await responseApiUrlWeather.json();

		//image Sky 
		const imgSky = imageSky(data.list[0].weather[0].main)
		// curent day
		const [dayTitle, month, day] = date(currentDate)
		const dateCurrentFormat = dayTitle + ' |  ' + month + ' ' + day
		//Current temp Celisus
		const temperatureCurrent = conversionKelvinCelsius(data.list[0].main.temp)
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

		addElementCurrentTemperature(
			dateCurrentFormat,
			temperatureCurrent,
			descriptionSky,
			wind,
			rain,
			humidity,
			pressure,
			imgSky)


	} catch (error) {
		console.log("There was an error!", error);
	}
}