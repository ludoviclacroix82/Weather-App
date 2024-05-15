import {addElementCurrentTemperature, addElementNowtemperature, addElementAlltemperature, showListCity } from './addDataElement.js'
import { imageSky } from './imageSky.js'
import { date, conversionKelvinCelsius, conversionWind } from './conversionData.js'

const apiKey = '557f3c9c41c52d8aeca9d72c7c4fa0ab'
const apiUrlWeather = (city, apiKey) => fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + apiKey)

const unitWind = 'km/h'
const nbrAllTemp = 10
let cpt = 0;

export async function showTemperature(city,dateCurrent) {

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

	} catch (error) {
		console.log("There was an error!", error);
	}
}

export async function showAllTemperature(city,dateCurrent) {
    console.log(city)
	try {
		let responseApiUrlWeather = await apiUrlWeather(city, apiKey);
		let data = await responseApiUrlWeather.json();

		//image Sky 
		const imgSky = imageSky(data.list[0].weather[0].main)
		// temp Celisus
		const temperatureMin = conversionKelvinCelsius(data.list[0].main.temp_min)
		const temperatureMax = conversionKelvinCelsius(data.list[0].main.temp_max)

		// curent day
		const [dayTitle, month, day, hour, min] = date(dateCurrent)
		const dateFormat = dayTitle + ' |  ' + month + ' ' + day

		//rain
		const rain = data.list[0].clouds.all + ' %'

		for (const list of data.list) {

			if (cpt == nbrAllTemp) {
				break
			} else {
				if (cpt === 0) {
					addElementNowtemperature(city,imgSky, temperatureMin, temperatureMax, rain)
				} else {
					let dateTime = new Date(list.dt_txt)
					const [dayTitle, month, day, hour, min] = date(dateTime)
					const hourFormat = hour + ":" + min
					addElementAlltemperature(city,hourFormat, dateFormat, imgSky, temperatureMin, temperatureMax, rain)
				}
			}
			cpt++;
		}

	} catch (error) {
		console.log("There was an error!", error);
	}
}