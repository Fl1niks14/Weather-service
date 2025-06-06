import axios from 'axios'

const API_KEY = '922ff3cd-74eb-4742-a770-8c76fbea8b3b' //
const BASE_URL = 'https://api.weather.yandex.ru/v2/forecast'

export const getWeather = async (lat: number, lon: number) => {
	try {
		const response = await axios.get(BASE_URL, {
			params: {
				lat,
				lon,
				lang: 'ru_RU',
				hours: true,
				extra: false
			},
			headers: {
				'X-Yandex-API-Key': API_KEY
			}
		})
		return response.data
	} catch (error) {
		console.error('Ошибка при получении данных о погоде:', error)
		throw error
	}
}
