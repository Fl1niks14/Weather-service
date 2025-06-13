import React, { useEffect, useState } from 'react'
import styles from './CurrentTime.module.css'

interface Props {
	nowDt: string
	timezone: string
}

const CurrentTime: React.FC<Props> = ({ nowDt, timezone }) => {
	const [currentTime, setCurrentTime] = useState<Date | null>(null)

	useEffect(() => {
		if (nowDt) {
			setCurrentTime(new Date(nowDt))
		}
	}, [nowDt, timezone])

	useEffect(() => {
		if (!currentTime) return

		const interval = setInterval(() => {
			setCurrentTime(prev => (prev ? new Date(prev.getTime() + 60000) : null))
		}, 60000)

		return () => clearInterval(interval)
	}, [currentTime])

	if (!currentTime) return <p className={styles.loading}>Загрузка времени...</p>

	const formatted = new Intl.DateTimeFormat('ru-RU', {
		hour: '2-digit',
		minute: '2-digit',
		timeZone: timezone,
		timeZoneName: 'short'
	}).format(currentTime)

	return (
		<>
			<div className={styles.container}>
				<h2 className={styles.time__title}>Время</h2>
				<p className={styles.time}>{formatted}</p>
			</div>
		</>
	)
}

export default CurrentTime
