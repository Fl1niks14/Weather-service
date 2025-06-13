import styles from './ForecastDaily.module.css'
import { getWeather } from '../api/weather'
import { useEffect, useState } from 'react'
interface Props {
	lat: number
	lon: number
}
interface DailyForecast {
	day: string
	temp: number
	icon: string
}

const ForecastDaily: React.FC<Props> = ({ lat, lon }) => {
	const [dailyData, setDailyData] = useState<DailyForecast[]>([])
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true)
			setError(null)
			try {
				const data = await getWeather(lat, lon)
				const forecasts = (data as any).forecasts.slice(0, 6)

				const formatted = forecasts.map((f: any) => ({
					day: new Date(f.date).toLocaleDateString('ru-RU', {
						weekday: 'short'
					}),
					temp: f.parts.day.temp_avg,
					icon: f.parts.day.icon
				}))
				setDailyData(formatted)
			} catch (err) {
				setError('Ошибка получения погодных данных')
				console.error(err)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [lat, lon])

	if (loading) return <p>Загрузка прогноза...</p>
	if (error) return <p style={{ color: 'red' }}>{error}</p>

	return (
		<div className={styles.card}>
			<div className={styles.container__item}>
				<h3 className={styles.title}>6 Days Forecast</h3>
				{dailyData.map((item, index) => (
					<div key={index} className={styles.container}>
						<img
							src={`https://yastatic.net/weather/i/icons/funky/dark/${item.icon}.svg`}
							alt={item.icon}
							className={styles.icon}
						/>
						<p className={styles.day}>{item.day}</p>
						<p className={styles.temp}>{item.temp}°C</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default ForecastDaily
