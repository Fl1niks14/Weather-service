import React, { useState } from 'react'
import WeatherCard from './components/WeatherCard/WeatherCard'
import ForecastDaily from './components/ForecastDaily/ForecastDaily'
import ForecastHourly from './components/ForecastHourly/ForecastHourly'
import ThemeToggle from './components/ThemeToggle/ThemeToggle'
import CurrentTime from './components/CurrentTime/CurrentTime'
import CitySelector from './components/CitySelector/CitySelector'
import type { City } from './components/CitySelector/CitySelector'
import styles from './App.module.css'

const App: React.FC = () => {
	const [city, setCity] = useState<City>({
		name: 'Тольятти',
		lat: 53.5078,
		lon: 49.4204
	})

	const [nowDt, setNowDt] = useState('')
	const [timezone, setTimezone] = useState('Europe/Samara')

	return (
		<div className={styles.global__container}>
			<div className={styles.header_theme}>
				<ThemeToggle />
				<CitySelector onChange={setCity} />
			</div>
			<div className={styles.app__wrapper}>
				<div className={styles.app__container}>
					<div className={styles.header_time}>
						<CurrentTime nowDt={nowDt} timezone={timezone} />
					</div>
					<div className={styles.weather_card}>
						<WeatherCard
							lat={city.lat}
							lon={city.lon}
							onTimeUpdate={(now, tz) => {
								setNowDt(now)
								setTimezone(tz)
							}}
						/>
					</div>
					<div className={styles.forecast_daily}>
						<ForecastDaily lat={city.lat} lon={city.lon} />
					</div>
					<div className={styles.forecast_hourly}>
						<ForecastHourly lat={city.lat} lon={city.lon} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
