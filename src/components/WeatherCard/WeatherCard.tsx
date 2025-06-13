import React, { useEffect, useState } from 'react'
import { getWeather } from '../api/weather'
import styles from './WeatherCard.module.css'

interface Props {
	lat: number
	lon: number
	onTimeUpdate: (nowDt: string, timezone: string) => void
}

const WeatherCard: React.FC<Props> = ({ lat, lon, onTimeUpdate }) => {
	const [weather, setWeather] = useState<any | null>(null)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getWeather(lat, lon)
				setWeather(data)
				onTimeUpdate((data as any).now_dt, (data as any).info.tzinfo.name)
			} catch (err) {
				console.error('Ошибка API:', err)
				setError('Ошибка получения данных погоды')
			}
		}

		fetchData()
	}, [lat, lon, onTimeUpdate])

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

	const date = new Date(weather.now_dt).toLocaleDateString('ru-RU', {
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
		showers: 'Ливень',
		snow: 'Снег',
		light_snow: 'Небольшой снег',
		snow_showers: 'Снегопад',
		thunderstorm: 'Гроза'
	}
	return map[code] || code
}

export default WeatherCard
