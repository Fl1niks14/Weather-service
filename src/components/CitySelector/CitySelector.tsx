import React, { useState, useRef, useEffect } from 'react'
import styles from './CitySelector.module.css'

export interface City {
	name: string
	lat: number
	lon: number
}

interface Props {
	onChange: (city: City) => void
}

const allCities: City[] = [
	{ name: 'Москва', lat: 55.7558, lon: 37.6173 },
	{ name: 'Тольятти', lat: 53.5078, lon: 49.4204 },
	{ name: 'Санкт-Петербург', lat: 59.9343, lon: 30.3351 },
	{ name: 'Казань', lat: 55.7963, lon: 49.1088 },
	{ name: 'Новосибирск', lat: 55.0084, lon: 82.9357 },
	{ name: 'Екатеринбург', lat: 56.8389, lon: 60.6057 },
	{ name: 'Нижний Новгород', lat: 56.2965, lon: 43.9361 },
	{ name: 'Ростов-на-Дону', lat: 47.2357, lon: 39.7015 },
	{ name: 'Уфа', lat: 54.7388, lon: 55.9721 },
	{ name: 'Самара', lat: 53.1959, lon: 50.1008 }
]

const CitySelector: React.FC<Props> = ({ onChange }) => {
	const [query, setQuery] = useState('')
	const [suggestions, setSuggestions] = useState<City[]>([])
	const [showDropdown, setShowDropdown] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setShowDropdown(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value
		setQuery(val)
		if (val.length === 0) {
			setSuggestions([])
			setShowDropdown(false)
			return
		}
		const filtered = allCities.filter(city =>
			city.name.toLowerCase().includes(val.toLowerCase())
		)
		setSuggestions(filtered)
		setShowDropdown(true)
	}

	const handleSelectCity = (city: City) => {
		setQuery(city.name)
		setSuggestions([])
		setShowDropdown(false)
		onChange(city)
	}

	return (
		<div className={styles.selector} ref={containerRef}>
			<input
				type='text'
				placeholder='Поиск города...'
				value={query}
				onChange={handleInputChange}
				onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
				className={styles.search}
			/>
			{showDropdown && suggestions.length > 0 && (
				<ul className={styles.dropdown}>
					{suggestions.map((city, index) => (
						<li key={index} onClick={() => handleSelectCity(city)}>
							{city.name}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default CitySelector
