import React, { useEffect, useState } from 'react'
import { getWeather } from '../api/weather'
import styles from './WeatherCard.module.css'

const WeatherCard: React.FC = () => {
	const [weather, setWeather] = useState<any | null>(null)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		getWeather(53.5078, 49.4204)
			.then(data => setWeather(data))
			.catch(err => {
				console.error('Ошибка API:', err)
				setError('Не удалось загрузить погоду')
			})
	}, [])

	if (error) return <div className={styles.card}>{error}</div>
	if (!weather || !weather.fact)
		return <div className={styles.card}>Загрузка...</div>

	const {
		temp,
		condition,
		feels_like,
		pressure_mm,
		humidity,
		wind_speed,
		icon
	} = weather.fact
	const date = new Date().toLocaleDateString('ru-RU', {
		weekday: 'long',
		day: 'numeric',
		month: 'long'
	})

	return (
		<div className={styles.card}>
			<div className={styles.left}>
				<div>
					<p className={styles.date}>{date}</p>
					<p className={styles.temp}>{temp}°C</p>
				</div>

				<ul className={styles.details}>
					<li>💨 Ветер: {wind_speed} м/с</li>
					<li>🧭 Давление: {pressure_mm} мм</li>
					<li>💧 Влажность: {humidity}%</li>
					<li>🌤 Погода: {translateCondition(condition)}</li>
				</ul>
				<p className={styles.feels}>Ощущается как: {feels_like}°C</p>
				<img
					src={`https://yastatic.net/weather/i/icons/funky/dark/${icon}.svg`}
					alt={condition}
					className={styles.icon}
				/>
			</div>
		</div>
	)
}

// Перевод кода состояния погоды в читаемый формат
function translateCondition(code: string): string {
	const map: Record<string, string> = {
		clear: 'Ясно',
		partly_cloudy: 'Малооблачно',
		cloudy: 'Облачно с прояснениями',
		overcast: 'Пасмурно',
		drizzle: 'Морось',
		light_rain: 'Небольшой дождь',
		rain: 'Дождь',
		moderate_rain: 'Умеренный дождь',
		heavy_rain: 'Сильный дождь',
		continuous_heavy_rain: 'Длительный сильный дождь',
		showers: 'Ливень',
		snow: 'Снег',
		light_snow: 'Небольшой снег',
		snow_showers: 'Снегопад',
		hail: 'Град',
		thunderstorm: 'Гроза',
		thunderstorm_with_rain: 'Гроза с дождем',
		thunderstorm_with_hail: 'Гроза с градом'
	}
	return map[code] || code
}

export default WeatherCard
