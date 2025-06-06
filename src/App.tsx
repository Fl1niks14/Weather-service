import WeatherCard from './components/WeatherCard/WeatherCard'
import ForecastDaily from './components/ForecastDaily/ForecastDaily'
import ForecastHourly from './components/ForecastHourly/ForecastHourly'
import ThemeToggle from './components/ThemeToggle/ThemeToggle'
import styles from './App.module.css'
import CurrentTime from './components/CurrentTime/CurrentTime'

const App: React.FC = () => {
	return (
		<>
			<div className={styles.global__container}>
				<div className={styles.header_theme}>
					<ThemeToggle />
				</div>
				<div className={styles.app__wrapper}>
					<div className={styles.app__container}>
						<div className={styles.header_time}>
							<CurrentTime />
						</div>
						<div className={styles.weather_card}>
							<WeatherCard />
						</div>
						<div className={styles.forecast_daily}>
							<ForecastDaily />
						</div>
						<div className={styles.forecast_hourly}>
							<ForecastHourly />
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default App
