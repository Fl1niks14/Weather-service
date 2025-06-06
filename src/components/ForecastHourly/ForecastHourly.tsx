import React, { useEffect, useState } from 'react'
import styles from './ForecastHourly.module.css'
import { getWeather } from '../api/weather'

interface HourlyForecast {
	hour: string
	temp: number
	icon: string
}

const ForecastHourly: React.FC = () => {
	const [hourlyData, setHourlyData] = useState<HourlyForecast[]>([])

	useEffect(() => {
		getWeather(53.5078, 49.4204)
			.then(data => {
				const hours = (data as any).forecasts[0].hours.slice(0, 10)
				const formatted = hours.map((h: any) => ({
					hour: `${h.hour}:00`,
					temp: h.temp,
					icon: h.icon
				}))
				setHourlyData(formatted)
			})
			.catch(err => {
				console.error('Ошибка получения погодных данных:', err)
			})
	}, [])

	return (
		<div className={styles.card}>
			<h3 className={styles.title}>Hourly Forecast</h3>
			<div className={styles.scroll}>
				{hourlyData.map((item, index) => (
					<div key={index} className={styles.item}>
						<p className={styles.hour}>{item.hour}</p>
						<img
							src={`https://yastatic.net/weather/i/icons/funky/dark/${item.icon}.svg`}
							alt={item.icon}
							className={styles.icon}
						/>
						<p className={styles.temp}>{item.temp}°C</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default ForecastHourly
