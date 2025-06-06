import React, { useEffect, useState } from 'react'
import styles from './CurrentTime.module.css'

const CurrentTime: React.FC = () => {
	const [time, setTime] = useState('')

	useEffect(() => {
		const updateTime = () => {
			const now = new Date()
			const formatted = now.toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
				hour12: false
			})
			setTime(formatted)
		}

		updateTime()
		const timerId = setInterval(updateTime, 1000)
		return () => clearInterval(timerId)
	}, [])

	return (
		<>
			<div className={styles.container}>
				<h2 className={styles.title}>Tolyatty</h2>
				<h2 className={styles.time}>{time}</h2>
			</div>
		</>
	)
}

export default CurrentTime
