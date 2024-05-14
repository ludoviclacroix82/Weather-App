import { date, conversionKelvinCelsius, conversionWind } from './modules/conversionData.js'
import { addElementCurrentTemperature } from './modules/addDataElement.js'
import { imageSky} from './modules/imageSky.js'

const apiKey = '56cb53b395d755b7e4601f7d532a3ec0'

const lon = 4.44448
const lat = 50.411362
const unitWind = 'km/h'

const currentDate = new Date();


//const apiUrlWeather = (city, apikey) => fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey)
const apiUrlWeather = (lat, lon, apiKey) => fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey)

showCurrentTemperature(lat, lon, apiKey)

async function showCurrentTemperature(lat, lon, apiKey) {

	try {
		let responseApiUrlWeather = await apiUrlWeather(lat, lon, apiKey);
		let data = await responseApiUrlWeather.json();

		//image Sky 
		const imgSky = imageSky(data.weather[0].main)
		// curent day
		const [dayTitle, month, day] = date(currentDate)
		const dateCurrentFormat = dayTitle + ' |  ' + month + ' ' + day
		//Current temp Celisus
		const temperatureCurrent = conversionKelvinCelsius(data.main.temp)
		//Description Sky
		const descriptionSky = data.weather[0].description
		// Wind
		const wind = conversionWind(data.wind.speed, unitWind)
		//rain
		const rain = data.clouds.all + ' %'
		// Humidity
		const humidity = data.main.humidity + ' %'
		//pressure
		const pressure = data.main.pressure

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